const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

const replacements = {
  // Backgrounds
  'bg-slate-50': 'bg-[#09090b]',
  'bg-white': 'bg-black/40 backdrop-blur-md',
  'hover:bg-slate-50': 'hover:bg-white/5',
  'hover:bg-slate-100': 'hover:bg-white/10',
  'bg-slate-100': 'bg-white/5',
  'bg-slate-800': 'bg-black/60',
  'bg-slate-900': 'bg-black',
  
  // Text colors
  'text-slate-900': 'text-white',
  'text-slate-800': 'text-slate-200',
  'text-slate-700': 'text-slate-300',
  'text-slate-600': 'text-slate-400',
  'text-slate-500': 'text-slate-400',
  'hover:text-slate-900': 'hover:text-white',
  
  // Borders
  'border-slate-100': 'border-white/10',
  'border-slate-200': 'border-white/10',
  'border-slate-300': 'border-white/20',
  'border-slate-400': 'border-white/20',
  
  // Primary (make it neon)
  'bg-primary-50': 'bg-neon-blue/10',
  'bg-primary-100': 'bg-neon-blue/20',
  'bg-primary-600': 'bg-neon-blue text-black font-bold',
  'hover:bg-primary-700': 'hover:bg-neon-blue/80 hover:shadow-[0_0_15px_rgba(0,243,255,0.5)]',
  'text-primary-600': 'text-neon-blue',
  'text-primary-500': 'text-neon-blue',
  'text-primary-700': 'text-neon-blue',
  'hover:text-primary-600': 'hover:text-neon-blue hover:drop-shadow-[0_0_5px_rgba(0,243,255,0.8)]',
  'hover:text-primary-500': 'hover:text-neon-blue',
  'border-primary-500': 'border-neon-blue/50',
  'border-primary-200': 'border-neon-blue/30',
  'ring-primary-500': 'ring-neon-blue',
  'focus:ring-primary-500': 'focus:ring-neon-blue focus:border-neon-blue',
  'focus:border-primary-500': 'focus:border-neon-blue',
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let hasChanges = false;

  for (const [oldClass, newClass] of Object.entries(replacements)) {
    // We use a regex to match the exact class word, preventing partial matches
    // Note: since classes can be inside strings, we can just replace the exact substrings
    const regex = new RegExp(`\\b${oldClass.replace(':', '\\:')}\\b`, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, newClass);
      hasChanges = true;
    }
  }

  if (hasChanges) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.js')) {
      processFile(fullPath);
    }
  }
}

processDirectory(directoryPath);
console.log('Conversion complete!');
