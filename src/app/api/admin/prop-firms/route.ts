import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { saveToGitHub, deleteFromGitHub } from '@/lib/github';

const contentDir = path.join(process.cwd(), 'content/prop-firms');

// Ensure directory exists (only local)
if (!process.env.GITHUB_TOKEN && !fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { 
      slug, title, logo, maxFunding, fee, profitSplit, affiliateLink, content 
    } = data;

    if (!slug || !title) {
      return NextResponse.json({ error: 'Slug and Title are required' }, { status: 400 });
    }

    const frontmatter = {
      id: Date.now().toString(),
      slug,
      date: new Date().toISOString().split('T')[0],
      title,
      logo: logo || '',
      maxFunding: maxFunding || '',
      fee: fee || '',
      profitSplit: profitSplit || '',
      affiliateLink: affiliateLink || '',
    };

    const fileContent = matter.stringify(content || '', frontmatter);
    
    if (process.env.GITHUB_TOKEN) {
      await saveToGitHub(`content/prop-firms/${slug}.md`, fileContent, `CMS: Update prop firm ${slug}`);
    } else {
      const filePath = path.join(contentDir, `${slug}.md`);
      fs.writeFileSync(filePath, fileContent);
    }

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error('Error saving prop firm:', error);
    return NextResponse.json({ error: 'Failed to save prop firm' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    if (process.env.GITHUB_TOKEN) {
      await deleteFromGitHub(`content/prop-firms/${slug}.md`, `CMS: Delete prop firm ${slug}`);
      return NextResponse.json({ success: true });
    } else {
      const filePath = path.join(contentDir, `${slug}.md`);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json({ error: 'Prop Firm not found' }, { status: 404 });
      }
    }
  } catch (error) {
    console.error('Error deleting prop firm:', error);
    return NextResponse.json({ error: 'Failed to delete prop firm' }, { status: 500 });
  }
}
