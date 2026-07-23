import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const REVIEWS_DIR = path.join(process.cwd(), 'content', 'reviews');

// Ensure directory exists
if (!fs.existsSync(REVIEWS_DIR)) {
  fs.mkdirSync(REVIEWS_DIR, { recursive: true });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  const filePath = path.join(REVIEWS_DIR, `${slug}.json`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json([]); // Return empty array if no reviews yet
  }

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const reviews = JSON.parse(fileContent);
    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error reading reviews:', error);
    return NextResponse.json({ error: 'Failed to read reviews' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { slug, name, email, phone, rating, comment } = data;

    if (!slug || !name || !email || !phone || !rating || !comment) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const filePath = path.join(REVIEWS_DIR, `${slug}.json`);
    let reviews = [];

    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      reviews = JSON.parse(fileContent);
    }

    const newReview = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      rating: Number(rating),
      comment,
      date: new Date().toISOString()
    };

    // Add new review at the beginning of the array (newest first)
    reviews.unshift(newReview);

    fs.writeFileSync(filePath, JSON.stringify(reviews, null, 2), 'utf-8');

    return NextResponse.json({ success: true, review: newReview });
  } catch (error: any) {
    console.error('Error saving review:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
