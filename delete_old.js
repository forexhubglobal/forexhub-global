const fs = require('fs');
let envContent = fs.readFileSync('.env.local', 'utf8');
if (envContent.charCodeAt(0) === 0xFFFD || envContent.charCodeAt(0) === 0xFEFF || envContent.includes('\u0000')) {
  envContent = fs.readFileSync('.env.local', 'utf16le');
}
const tokenLine = envContent.split(/\r?\n/).find(l => l.includes('GITHUB_TOKEN'));
if (tokenLine) process.env.GITHUB_TOKEN = tokenLine.split('=')[1].trim();

async function deleteFromGitHub(posixPath, message) {
  const url = `https://api.github.com/repos/forexhubglobal/forexhub-global/contents/${posixPath}?ref=main`;
  
  const getRes = await fetch(url, {
    headers: {
      'Authorization': `token ${process.env.GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
    },
  });
  
  if (!getRes.ok) {
    if (getRes.status === 404) return;
    throw new Error(`Failed to fetch file info for ${posixPath}: ${getRes.status}`);
  }
  
  const fileData = await getRes.json();
  const sha = fileData.sha;
  
  const delRes = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `token ${process.env.GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: message,
      sha: sha,
      branch: 'main'
    }),
  });
  
  if (!delRes.ok) {
    throw new Error(`Failed to delete from GitHub: ${delRes.status}`);
  }
  console.log('Deleted:', posixPath);
}

async function main() {
  const files = [
    'dollar-set-for-biggest-weekly-gain-in-over-a-month-yen-eyes-worst-week-since-may',
    'canadian-dollar-slips-as-oil-retreats-fed-decision-looms',
    'south-african-rand-nears-17-per-dollar-after-rate-decision'
  ];

  for (const slug of files) {
    try {
      await deleteFromGitHub(`content/articles/${slug}.md`, 'Delete old AI article for image regen');
    } catch (e) {
      console.error(e);
    }
  }
}
main();
