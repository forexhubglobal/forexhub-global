const fs = require('fs');
const files = fs.readdirSync('./content/articles');
const academy = files.filter(f => fs.readFileSync('./content/articles/'+f, 'utf8').includes('category: "Edukasi"'));
const chunks = [[],[],[],[],[],[]];
academy.forEach((f, i) => chunks[i % 6].push(f));
fs.writeFileSync('./scripts/chunks.json', JSON.stringify(chunks, null, 2));
console.log(`Found ${academy.length} files. Split into 6 chunks.`);
