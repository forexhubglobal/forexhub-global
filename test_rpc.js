const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ctphnmwzzsaeuzzhxspj.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_iYB1mJb85t3IbDvcRthHfA_AixEHeQ4'; // Wait, let me just read from env if possible
// Actually, I'll just put the hardcoded keys I saw earlier from the .env.local output.
const supabase = createClient(supabaseUrl, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0cGhubXd6enNhZXV6emh4c3BqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUxNjQwMDAsImV4cCI6MjEwMDcyODAwMH0.your-anon-key-here... wait, I need the exact anon key');
// Let's just use fetch directly.

fetch('https://forexhubglobal.com/api/webhook/mt4', {
  method: 'POST',
  body: JSON.stringify({
    secret_key: 'fh_y8cy16smzp45mo3q',
    account_number: 89964593,
    balance: 100.50,
    equity: 105.20,
    trades: []
  }),
  headers: { 'Content-Type': 'application/json' }
})
.then(r => r.text())
.then(console.log)
.catch(console.error);
