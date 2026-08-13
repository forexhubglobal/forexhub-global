fetch('https://forexhubglobal.com/api/webhook/mt4', {
  method: 'POST',
  body: JSON.stringify({}),
  headers: { 'Content-Type': 'application/json' }
})
.then(r => r.json().then(data => ({status: r.status, data})))
.then(console.log)
.catch(console.error);
