import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { saveToGitHub } from '@/lib/github';

const REVIEWS_DIR = path.join(process.cwd(), 'content', 'reviews');

// Helper to ensure directory exists
const ensureDir = () => {
  if (process.env.GITHUB_TOKEN) return; // Skip in prod
  if (!fs.existsSync(REVIEWS_DIR)) {
    fs.mkdirSync(REVIEWS_DIR, { recursive: true });
  }
};

export async function GET() {
  try {
    ensureDir();
    if (!fs.existsSync(REVIEWS_DIR)) {
      return NextResponse.json({ success: true, reviews: [] });
    }
    
    const files = fs.readdirSync(REVIEWS_DIR);
    let allReviews: any[] = [];

    for (const file of files) {
      if (file.endsWith('.json')) {
        const slug = file.replace('.json', '');
        const filePath = path.join(REVIEWS_DIR, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const reviews = JSON.parse(content);
        
        // Attach slug to each review so we know which broker it belongs to
        const reviewsWithSlug = reviews.map((r: any) => ({ ...r, slug }));
        allReviews = [...allReviews, ...reviewsWithSlug];
      }
    }

    // Sort by date descending (newest first)
    allReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json({ success: true, reviews: allReviews });
  } catch (error: any) {
    console.error('Error fetching admin reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { slug, id, adminReply } = await req.json();

    if (!slug || !id) {
      return NextResponse.json({ error: 'Slug and ID are required' }, { status: 400 });
    }

    const filePath = path.join(REVIEWS_DIR, `${slug}.json`);
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Reviews file not found' }, { status: 404 });
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    let reviews = JSON.parse(content);

    const reviewIndex = reviews.findIndex((r: any) => r.id === id);
    if (reviewIndex === -1) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    // Update the review with admin reply
    reviews[reviewIndex].adminReply = adminReply;

    if (process.env.GITHUB_TOKEN) {
      await saveToGitHub(`content/reviews/${slug}.json`, JSON.stringify(reviews, null, 2), `CMS: Admin reply to review on ${slug}`);
    } else {
      fs.writeFileSync(filePath, JSON.stringify(reviews, null, 2), 'utf-8');
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error updating review:', error);
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    const id = searchParams.get('id');

    if (!slug || !id) {
      return NextResponse.json({ error: 'Slug and ID are required' }, { status: 400 });
    }

    const filePath = path.join(REVIEWS_DIR, `${slug}.json`);
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Reviews file not found' }, { status: 404 });
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    let reviews = JSON.parse(content);

    // Filter out the review to delete
    reviews = reviews.filter((r: any) => r.id !== id);

    if (process.env.GITHUB_TOKEN) {
      await saveToGitHub(`content/reviews/${slug}.json`, JSON.stringify(reviews, null, 2), `CMS: Delete review on ${slug}`);
    } else {
      fs.writeFileSync(filePath, JSON.stringify(reviews, null, 2), 'utf-8');
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting review:', error);
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
  }
}
