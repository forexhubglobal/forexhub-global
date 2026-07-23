const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = 'forexhubglobal';
const GITHUB_REPO = 'forexhub-global';
const BRANCH = 'master'; // Vercel defaults to master or main, we used master earlier

export async function saveToGitHub(filePath: string, content: string, commitMessage: string) {
  if (!GITHUB_TOKEN) {
    console.warn('GITHUB_TOKEN not found, skipping GitHub commit for', filePath);
    return;
  }

  // Convert Windows paths to posix for GitHub API
  const posixPath = filePath.replace(/\\/g, '/');
  
  // We need to fetch the file first to get its SHA if it exists
  const getUrl = `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${posixPath}?ref=${BRANCH}`;
  let sha: string | undefined;

  try {
    const res = await fetch(getUrl, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });
    
    if (res.ok) {
      const data = await res.json();
      sha = data.sha;
    }
  } catch (err) {
    console.error('Error fetching file SHA from GitHub:', err);
  }

  // Now create or update the file
  const putUrl = `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${posixPath}`;
  const body = JSON.stringify({
    message: commitMessage,
    content: Buffer.from(content, 'utf-8').toString('base64'),
    branch: BRANCH,
    ...(sha ? { sha } : {}), // include SHA if updating
  });

  const res = await fetch(putUrl, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
    },
    body,
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`GitHub API error saving ${posixPath}:`, res.status, errorText);
    throw new Error(`Failed to save to GitHub: ${res.status}`);
  }
}

export async function deleteFromGitHub(filePath: string, commitMessage: string) {
  if (!GITHUB_TOKEN) {
    console.warn('GITHUB_TOKEN not found, skipping GitHub delete for', filePath);
    return;
  }

  const posixPath = filePath.replace(/\\/g, '/');
  
  // Fetch file to get SHA
  const getUrl = `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${posixPath}?ref=${BRANCH}`;
  let sha: string;

  try {
    const getRes = await fetch(getUrl, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });
    
    if (getRes.ok) {
      const data = await getRes.json();
      sha = data.sha;
    } else {
      console.warn(`File ${posixPath} not found on GitHub, skip delete.`);
      return;
    }
  } catch (err) {
    console.error('Error fetching file SHA from GitHub for deletion:', err);
    return;
  }

  // Delete the file
  const deleteUrl = `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${posixPath}`;
  const body = JSON.stringify({
    message: commitMessage,
    branch: BRANCH,
    sha,
  });

  const res = await fetch(deleteUrl, {
    method: 'DELETE',
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
    },
    body,
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`GitHub API error deleting ${posixPath}:`, res.status, errorText);
    throw new Error(`Failed to delete from GitHub: ${res.status}`);
  }
}
