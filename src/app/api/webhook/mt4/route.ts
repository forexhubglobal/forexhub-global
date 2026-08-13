import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { secret_key, account_number, balance, equity, trades } = data;

    if (!secret_key || !account_number) {
      return NextResponse.json({ error: 'Missing secret_key or account_number' }, { status: 400 });
    }

    // Call the secure RPC function to bypass RLS on the server
    const { data: result, error } = await supabase.rpc('process_mt4_webhook', {
      p_secret_key: secret_key,
      p_account_number: account_number,
      p_balance: balance || 0,
      p_equity: equity || 0,
      p_trades: trades || []
    });

    if (error) {
      console.error('RPC Error:', error);
      return NextResponse.json({ error: 'Database error processing webhook' }, { status: 500 });
    }

    if (result && result.error) {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }

    return NextResponse.json({ success: true, message: 'Data synced successfully' });
  } catch (error: any) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
