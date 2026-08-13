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
.then(r => r.json().then(data => ({status: r.status, data})))
.then(console.log)
.catch(console.error);
