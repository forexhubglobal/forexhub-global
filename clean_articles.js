async function del(slug) {
  const t = 'ghp_wV016l5U4sKBVdnbWMQOH8FqRetJev83E47cw';
  const url = 'https://api.github.com/repos/forexhubglobal/forexhub-global/contents/content/articles/' + slug + '.md?ref=main';
  const getRes = await fetch(url, { headers: { 'Authorization': 'token ' + t } });
  if (!getRes.ok) { console.log('not found', slug); return; }
  const data = await getRes.json();
  const sha = data.sha;
  const delRes = await fetch(url, {
    method: 'DELETE',
    headers: { 'Authorization': 'token ' + t, 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'Delete for image regen', sha, branch: 'main' })
  });
  console.log(slug, delRes.status);
}
async function main() {
  await del('dollar-set-for-biggest-weekly-gain-in-over-a-month-yen-eyes-worst-week-since-may');
  await del('canadian-dollar-slips-as-oil-retreats-fed-decision-looms');
  await del('south-african-rand-nears-17-per-dollar-after-rate-decision');
}
main();
