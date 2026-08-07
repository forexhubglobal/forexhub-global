import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { saveToGitHub } from '@/lib/github';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, phone, tvUsername, plan, brokerAccount } = data;

    if (!name || !phone || !tvUsername || !plan) {
      return NextResponse.json({ error: 'Sila isi semua ruangan wajib' }, { status: 400 });
    }

    if (plan === 'vip' && !brokerAccount) {
      return NextResponse.json({ error: 'Sila masukkan nombor akaun broker untuk pelan VIP' }, { status: 400 });
    }

    // Clean username for slug
    const cleanUsername = tvUsername.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const id = Date.now().toString();
    const dateStr = new Date().toISOString();
    const date = dateStr.split('T')[0];
    const slug = `${cleanUsername}-${id}`;

    // Status: 'pending' (baru mohon), 'active' (dah diberi akses), 'revoked' (ditarik akses)
    const status = 'pending';
    
    // Frontmatter
    let frontmatter = `---
id: "${id}"
slug: "${slug}"
date: "${date}"
requestDate: "${dateStr}"
name: "${name.replace(/"/g, '\\"')}"
phone: "${phone.replace(/"/g, '\\"')}"
tvUsername: "${tvUsername.replace(/"/g, '\\"')}"
plan: "${plan}"
brokerAccount: "${brokerAccount ? brokerAccount.replace(/"/g, '\\"') : ''}"
status: "${status}"
expiryDate: ""
---

Permohonan akses indikator 3RDEYE Pro.
`;

    const dir = path.join(process.cwd(), 'content/3rdeye-requests');
    
    if (!process.env.GITHUB_TOKEN) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    }

    // Tulis fail
    if (process.env.GITHUB_TOKEN) {
      // Use [skip ci] to prevent rebuilding the whole site for every form submission
      await saveToGitHub(`content/3rdeye-requests/${slug}.md`, frontmatter, `[skip ci] New 3RDEYE Request: ${tvUsername}`);
    } else {
      const filePath = path.join(dir, `${slug}.md`);
      fs.writeFileSync(filePath, frontmatter, 'utf8');
    }

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal menyimpan permohonan' }, { status: 500 });
  }
}
