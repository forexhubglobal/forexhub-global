//+------------------------------------------------------------------+
//|                                           ForexHub_Tracker.mq5 |
//|                                     Copyright 2026, ForexHub |
//|                                   https://forexhubglobal.com |
//+------------------------------------------------------------------+
#property copyright "ForexHub Global"
#property link      "https://forexhubglobal.com"
#property version   "1.00"

input string SecretKey = "PASTE_YOUR_SECRET_KEY_HERE"; // Your Dashboard Secret Key
input string WebhookURL = "https://forexhubglobal.com/api/webhook/mt4";

int OnInit() {
   Print("ForexHub Tracker MT5 Started.");
   EventSetTimer(60); 
   return(INIT_SUCCEEDED);
}

void OnDeinit(const int reason) {
   EventKillTimer();
}

void OnTimer() {
   SendTradesData();
}

void SendTradesData() {
   if(SecretKey == "PASTE_YOUR_SECRET_KEY_HERE" || SecretKey == "") {
      Print("Please enter your Secret Key in the EA Settings.");
      return;
   }
   
   long accNum = AccountInfoInteger(ACCOUNT_LOGIN);
   double bal = AccountInfoDouble(ACCOUNT_BALANCE);
   double eq = AccountInfoDouble(ACCOUNT_EQUITY);
   
   string json = "{";
   json += "\"secret_key\":\"" + SecretKey + "\",";
   json += "\"account_number\":" + IntegerToString(accNum) + ",";
   json += "\"balance\":" + DoubleToString(bal, 2) + ",";
   json += "\"equity\":" + DoubleToString(eq, 2) + ",";
   json += "\"trades\":[";
   
   HistorySelect(0, TimeCurrent());
   int historyTotal = HistoryDealsTotal();
   int count = 0;
   
   for(int i = 0; i < historyTotal; i++) {
      ulong ticket = HistoryDealGetTicket(i);
      if(ticket > 0) {
         long entry = HistoryDealGetInteger(ticket, DEAL_ENTRY);
         if (entry == DEAL_ENTRY_OUT) { // Only count closed trades for profit
            long type = HistoryDealGetInteger(ticket, DEAL_TYPE);
            if(type == DEAL_TYPE_BUY || type == DEAL_TYPE_SELL) {
               if(count > 0) json += ",";
               
               string symbol = HistoryDealGetString(ticket, DEAL_SYMBOL);
               double lots = HistoryDealGetDouble(ticket, DEAL_VOLUME);
               double closePrice = HistoryDealGetDouble(ticket, DEAL_PRICE);
               double profit = HistoryDealGetDouble(ticket, DEAL_PROFIT);
               double commission = HistoryDealGetDouble(ticket, DEAL_COMMISSION);
               double swap = HistoryDealGetDouble(ticket, DEAL_SWAP);
               long closeTime = HistoryDealGetInteger(ticket, DEAL_TIME);
               
               // In MT5, an OUT deal is the closing of a position. The opening price/time is tied to the position ticket.
               long posTicket = HistoryDealGetInteger(ticket, DEAL_POSITION_ID);
               double openPrice = 0;
               long openTime = 0;
               
               // We need to find the IN deal for this position
               for(int j = 0; j < historyTotal; j++) {
                  ulong inTicket = HistoryDealGetTicket(j);
                  if(HistoryDealGetInteger(inTicket, DEAL_POSITION_ID) == posTicket && HistoryDealGetInteger(inTicket, DEAL_ENTRY) == DEAL_ENTRY_IN) {
                     openPrice = HistoryDealGetDouble(inTicket, DEAL_PRICE);
                     openTime = HistoryDealGetInteger(inTicket, DEAL_TIME);
                     break;
                  }
               }
               
               json += "{";
               json += "\"ticket\":" + IntegerToString(posTicket) + ",";
               json += "\"symbol\":\"" + symbol + "\",";
               // Reverse the type for display since closing a BUY is a SELL deal, but we want the original direction
               string dir = (type == DEAL_TYPE_SELL) ? "BUY" : "SELL"; 
               json += "\"type\":\"" + dir + "\",";
               json += "\"lots\":" + DoubleToString(lots, 2) + ",";
               json += "\"open_price\":" + DoubleToString(openPrice, 5) + ",";
               json += "\"close_price\":" + DoubleToString(closePrice, 5) + ",";
               json += "\"open_time\":" + IntegerToString(openTime) + ",";
               json += "\"close_time\":" + IntegerToString(closeTime) + ",";
               json += "\"profit\":" + DoubleToString(profit, 2) + ",";
               json += "\"commission\":" + DoubleToString(commission, 2) + ",";
               json += "\"swap\":" + DoubleToString(swap, 2);
               json += "}";
               count++;
            }
         }
      }
   }
   
   json += "]}";
   
   char data[];
   StringToCharArray(json, data, 0, WHOLE_ARRAY, CP_UTF8);
   int dataLen = ArraySize(data) - 1; 
   
   char resData[];
   string resHeaders;
   
   int timeout = 5000;
   
   // WebRequest in MQL5 has a slightly different signature
   int res = WebRequest("POST", WebhookURL, "Content-Type: application/json\r\n", timeout, data, resData, resHeaders);
   
   if(res == -1) {
      Print("Error sending data. Check Allow WebRequest in MT5 Options. Error code: ", GetLastError());
   } else if (res == 200) {
      Print("Data synced to ForexHub successfully.");
   } else {
      Print("Server returned error code: ", res);
   }
}
