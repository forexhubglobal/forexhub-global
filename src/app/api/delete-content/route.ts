import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { deleteFromGitHub } from '@/lib/github';

export async function POST(request: Request) {
  try {
    const { type, slug } = await request.json();

    if (!type || !slug || slug === 'new') {
      return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 });
    }

    const folderMap: Record<string, string> = {
      'articles': 'articles',
      'brokers': 'brokers',
      'prop-firms': 'prop-firms',
      'bonus': 'bonus',
      'pamm': 'pamm'
    };

    const targetFolder = folderMap[type as string];

    if (!targetFolder) {
      return NextResponse.json({ success: false, message: 'Invalid content type' }, { status: 400 });
    }

    if (process.env.GITHUB_TOKEN) {
      // Padam dari GitHub (Production)
      const githubPath = `content/${targetFolder}/${slug}.md`;
      await deleteFromGitHub(githubPath, `CMS: Delete ${slug} from ${targetFolder}`);
      return NextResponse.json({ success: true, message: 'Content deleted from GitHub' });
    } else {
      // Padam secara Local (Development)
      const contentDir = path.join(process.cwd(), 'content', targetFolder);
      const filePath = path.join(contentDir, `${slug}.md`);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return NextResponse.json({ success: true, message: 'Content deleted locally' });
      } else {
        return NextResponse.json({ success: false, message: 'File not found' }, { status: 404 });
      }
    }

  } catch (err: any) {
    console.error('Delete Content Error:', err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
