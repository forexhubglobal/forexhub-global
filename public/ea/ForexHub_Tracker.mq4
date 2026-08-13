//+------------------------------------------------------------------+
//|                                           ForexHub_Tracker.mq4 |
//|                                     Copyright 2026, ForexHub |
//|                                   https://forexhubglobal.com |
//+------------------------------------------------------------------+
#property copyright "ForexHub Global"
#property link      "https://forexhubglobal.com"
#property version   "1.00"
#property strict

input string SecretKey = "PASTE_YOUR_SECRET_KEY_HERE"; // Your Dashboard Secret Key
input string WebhookURL = "https://forexhubglobal.com/api/webhook/mt4";

int OnInit() {
   Print("ForexHub Tracker EA Started.");
   EventSetTimer(60); // Check every 60 seconds
   return(INIT_SUCCEEDED);
}

void OnDeinit(const int reason) {
   EventKillTimer();
}

void OnTick() {
   // We use timer instead of tick to reduce load
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
   
   int historyTotal = OrdersHistoryTotal();
   int count = 0;
   
   for(int i = 0; i < historyTotal; i++) {
      if(OrderSelect(i, SELECT_BY_POS, MODE_HISTORY)) {
         if(OrderType() == OP_BUY || OrderType() == OP_SELL) {
            if(count > 0) json += ",";
            json += "{";
            json += "\"ticket\":" + IntegerToString(OrderTicket()) + ",";
            json += "\"symbol\":\"" + OrderSymbol() + "\",";
            json += "\"type\":\"" + (OrderType() == OP_BUY ? "BUY" : "SELL") + "\",";
            json += "\"lots\":" + DoubleToString(OrderLots(), 2) + ",";
            json += "\"open_price\":" + DoubleToString(OrderOpenPrice(), 5) + ",";
            json += "\"close_price\":" + DoubleToString(OrderClosePrice(), 5) + ",";
            json += "\"open_time\":" + IntegerToString(OrderOpenTime()) + ",";
            json += "\"close_time\":" + IntegerToString(OrderCloseTime()) + ",";
            json += "\"profit\":" + DoubleToString(OrderProfit(), 2) + ",";
            json += "\"commission\":" + DoubleToString(OrderCommission(), 2) + ",";
            json += "\"swap\":" + DoubleToString(OrderSwap(), 2);
            json += "}";
            count++;
         }
      }
   }
   
   json += "]}";
   
   char data[];
   StringToCharArray(json, data, 0, WHOLE_ARRAY, CP_UTF8);
   int dataLen = ArraySize(data) - 1; // remove null terminator
   
   char resData[];
   string resHeaders;
   string reqHeaders = "Content-Type: application/json\r\n";
   
   int timeout = 5000;
   
   int res = WebRequest("POST", WebhookURL, reqHeaders, timeout, data, resData, resHeaders);
   
   if(res == -1) {
      Print("Error sending data. Check Allow WebRequest in MT4 Options.");
   } else if (res == 200) {
      Print("Data synced to ForexHub successfully.");
   } else {
      Print("Server returned error code: ", res);
   }
}
