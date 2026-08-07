import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET() {
  try {
    const dir = path.join(process.cwd(), 'content/omni-requests');
    if (!fs.existsSync(dir)) {
      return NextResponse.json({ success: true, requests: [] });
    }

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
    const requests = files.map(file => {
      const filePath = path.join(dir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(content);
      
      // Calculate Expiry Date
      const requestDate = new Date(data.requestDate || data.date);
      const expiryDate = new Date(requestDate);
      
      if (data.plan === 'vip') {
        expiryDate.setDate(expiryDate.getDate() + 30);
      } else {
        expiryDate.setDate(expiryDate.getDate() + 5);
      }
      
      // Check if expired
      const isExpired = new Date() > expiryDate;
      let computedStatus = data.status; // pending, active, blocked
      
      if (computedStatus === 'active' && isExpired) {
        computedStatus = 'expired';
      }

      return {
        id: data.id,
        slug: data.slug,
        date: data.date,
        requestDate: data.requestDate,
        name: data.name,
        phone: data.phone,
        tvUsername: data.tvUsername,
        plan: data.plan,
        brokerAccount: data.brokerAccount || '',
        status: computedStatus,
        originalStatus: data.status, // Database status
        expiryDate: expiryDate.toISOString()
      };
    });

    // Sort by newest first
    requests.sort((a, b) => new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime());

    return NextResponse.json({ success: true, requests });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal mendapatkan senarai Omni AI' }, { status: 500 });
  }
}

// Update status
export async function POST(request: Request) {
  try {
    const { slug, status } = await request.json();
    if (!slug || !status) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
    }

    const dir = path.join(process.cwd(), 'content/omni-requests');
    const filePath = path.join(dir, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Rekod tidak dijumpai' }, { status: 404 });
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(content);
    
    parsed.data.status = status; // Update status in frontmatter
    
    let newFrontmatter = `---\n`;
    Object.keys(parsed.data).forEach(key => {
      const val = typeof parsed.data[key] === 'string' ? parsed.data[key].replace(/"/g, '\\"') : parsed.data[key];
      newFrontmatter += `${key}: "${val}"\n`;
    });
    newFrontmatter += `---\n\n${parsed.content}`;

    // If using GitHub, we must commit. Since this is an admin action, we can trigger a build OR skip it.
    // Let's [skip ci] to avoid spamming Vercel builds, admin actions on requests don't need a public site rebuild.
    if (process.env.GITHUB_TOKEN) {
      const { saveToGitHub } = await import('@/lib/github');
      await saveToGitHub(`content/omni-requests/${slug}.md`, newFrontmatter, `[skip ci] Update Omni AI status: ${slug} -> ${status}`);
    } else {
      fs.writeFileSync(filePath, newFrontmatter, 'utf8');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal mengemaskini status' }, { status: 500 });
  }
}
