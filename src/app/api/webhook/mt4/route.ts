import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase with Service Role Key to bypass RLS for inserts
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''; // Fallback, but ideally use service role
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { secret_key, account_number, balance, equity, trades } = data;

    if (!secret_key || !account_number) {
      return NextResponse.json({ error: 'Missing secret_key or account_number' }, { status: 400 });
    }

    // 1. Verify the trading account using the secret_key
    const { data: account, error: accountError } = await supabase
      .from('trading_accounts')
      .select('id')
      .eq('secret_key', secret_key)
      .eq('account_number', account_number)
      .single();

    if (accountError || !account) {
      console.error('Account authentication failed:', accountError);
      return NextResponse.json({ error: 'Invalid secret key or account not found' }, { status: 401 });
    }

    const accountId = account.id;

    // 2. Update balance and equity
    if (balance !== undefined && equity !== undefined) {
      await supabase
        .from('trading_accounts')
        .update({ balance, equity, last_updated: new Date().toISOString() })
        .eq('id', accountId);
    }

    // 3. Process Trades
    if (trades && Array.isArray(trades) && trades.length > 0) {
      // Format trades for bulk insertion
      const formattedTrades = trades.map((t: any) => ({
        account_id: accountId,
        ticket: t.ticket,
        symbol: t.symbol,
        type: t.type, // BUY or SELL
        lots: t.lots,
        open_price: t.open_price,
        close_price: t.close_price,
        open_time: new Date(t.open_time * 1000).toISOString(), // Assuming MT4 sends Unix timestamp
        close_time: new Date(t.close_time * 1000).toISOString(),
        profit: t.profit,
        commission: t.commission || 0,
        swap: t.swap || 0,
      }));

      // Insert or ignore if ticket already exists (UPSERT)
      // Supabase supports upsert based on a unique constraint
      const { error: insertError } = await supabase
        .from('trade_history')
        .upsert(formattedTrades, { onConflict: 'account_id,ticket', ignoreDuplicates: true });

      if (insertError) {
        console.error('Failed to insert trades:', insertError);
        return NextResponse.json({ error: 'Failed to save trades' }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true, message: 'Data synced successfully' });
  } catch (error: any) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
