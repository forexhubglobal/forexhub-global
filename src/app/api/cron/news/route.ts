import { NextResponse } from 'next/server';
import { saveToGitHub, saveImageToGitHub } from '@/lib/github';

// Force Edge or Node runtime depending on what works best with standard fetch.
// Vercel cron jobs can run on standard Node runtime.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const RSS_URL = 'https://www.investing.com/rss/news_1.rss';

export async function GET(request: Request) {
  // Authentication for cron job to prevent unauthorized triggers (optional but recommended)
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  if (!GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is not set.");
    return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
  }

  try {
    const newsList = await fetchLatestNewsItems();
    if (newsList.length === 0) return NextResponse.json({ message: "No news found" });

    let selectedNews = null;
    let selectedSlug = '';

    for (const news of newsList) {
      const slug = news.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const checkExistsUrl = `https://api.github.com/repos/forexhubglobal/forexhub-global/contents/content/articles/${slug}.md?ref=main`;
      const checkRes = await fetch(checkExistsUrl, {
        headers: {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });
      
      if (!checkRes.ok) {
        selectedNews = news;
        selectedSlug = slug;
        break;
      }
    }

    if (!selectedNews) {
      return NextResponse.json({ message: "All top 15 articles already exist." });
    }

    const aiContent = await generateArticleWithAI(selectedNews);
    let imageUrl = '';
    
    // Attempt to download RSS image
    if (selectedNews.imageUrl) {
       imageUrl = await downloadImageToGitHub(selectedNews.imageUrl, selectedSlug);
    }
    
    // If RSS image failed or missing, use AI Image Generator (Pollinations.ai)
    if (!imageUrl) {
       const randomSeed = Math.floor(Math.random() * 100000);
       const prompt = encodeURIComponent(aiContent.imagePrompt || "forex trading financial chart candlestick screen professional dark theme");
       const fallbackAiUrl = `https://image.pollinations.ai/prompt/${prompt}?width=800&height=450&nologo=true&seed=${randomSeed}`;
       imageUrl = await downloadImageToGitHub(fallbackAiUrl, selectedSlug);
    }

    await saveArticleToGitHub(aiContent, selectedSlug, imageUrl);

    return NextResponse.json({ success: true, slug: selectedSlug });

  } catch (err: any) {
    console.error("AI News Agent Failed:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// 1. Fetch RSS and Extract Items
async function fetchLatestNewsItems() {
  const response = await fetch(RSS_URL, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });
  
  if (!response.ok) throw new Error(`Failed to fetch RSS: ${response.status}`);
  const xml = await response.text();
  
  const matches = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];
  if (matches.length === 0) throw new Error("No <item> found in RSS XML");
  
  const newsList = [];
  for (let i = 0; i < Math.min(15, matches.length); i++) {
    const itemXml = matches[i][1];
    const titleMatch = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || itemXml.match(/<title>(.*?)<\/title>/) || [];
    const title = titleMatch[1];
    const linkMatch = itemXml.match(/<link>(.*?)<\/link>/) || [];
    const link = linkMatch[1];
    
    let descriptionMatch = itemXml.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/) || itemXml.match(/<description>([\s\S]*?)<\/description>/) || [];
    let description = descriptionMatch[1];
    description = description ? description.replace(/<[^>]*>?/gm, '').trim() : '';
    
    let imageMatch = itemXml.match(/<enclosure[^>]+url="([^"]+)"/i);
    if (!imageMatch) {
      imageMatch = itemXml.match(/<img[^>]+src="([^"]+)"/i);
    }
    const imageUrl = imageMatch ? imageMatch[1] : null;

    if (title) {
      newsList.push({ title, link, description, imageUrl });
    }
  }
  
  return newsList;
}

// 2. Call Gemini to Rewrite Article
async function generateArticleWithAI(news: any) {
  const prompt = `Berdasarkan berita kewangan berikut, hasilkan satu artikel dalam Bahasa Melayu yang profesional, ringkas dan menarik untuk dibaca oleh pedagang Forex.

Tajuk Asal: ${news.title}
Ringkasan: ${news.description}

Sila balas dalam format JSON yang sah seperti di bawah:
{
  "title": "Tajuk artikel yang gempak dalam Bahasa Melayu (maksimum 60 patah perkataan)",
  "excerpt": "Ringkasan pendek yang menarik untuk menarik minat pembaca (maksimum 2 ayat)",
  "content": "Kandungan artikel yang lengkap dalam 3-4 perenggan, letakkan 'Sumber asal: [Pautan]' di hujung jika sesuai. Boleh gunakan format markdown.",
  "imagePrompt": "A highly descriptive, comma-separated English prompt for an AI image generator based on this article. Must not contain Malay words. e.g., 'US dollar bill rising, forex trading chart, realistic, dark theme, cinematic lighting, 8k'"
}`;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7 }
    })
  });

  const data = await response.json();
  if (data.error) throw new Error(`Gemini API Error: ${data.error.message}`);
  
  let aiText = data.candidates[0].content.parts[0].text;
  aiText = aiText.replace(/```json/gi, '').replace(/```/gi, '').trim();
  
  return JSON.parse(aiText);
}

// 3. Download Image and Push to GitHub
async function downloadImageToGitHub(url: string, slug: string) {
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    if (!response.ok) return '';
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('image')) {
      console.warn(`URL ${url} did not return an image (returned ${contentType}). Using fallback.`);
      return '';
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    let ext = 'jpg';
    const possibleExt = url.split('.').pop()?.split('?')[0];
    if (possibleExt && possibleExt.length <= 4 && /^[a-zA-Z]+$/.test(possibleExt)) {
      ext = possibleExt;
    }
    const fileName = `${slug}-${Date.now()}.${ext}`;
    const imagePath = `public/images/${fileName}`;
    
    await saveImageToGitHub(imagePath, buffer, `Cron: Download image for ${slug}`);
    return `/images/${fileName}`;
  } catch (err) {
    console.error("Image download failed:", err);
    return '';
  }
}

// 4. Save Markdown File to GitHub
async function saveArticleToGitHub(aiContent: any, slug: string, localImageUrl: string) {
  const date = new Date().toISOString().split('T')[0];
  const id = Date.now().toString();
  
  // Use Tailwind gradient as fallback if image download failed
  const finalImage = localImageUrl || "bg-gradient-to-br from-indigo-900 to-black";
  
  const frontmatter = `---
id: "${id}"
title: "${aiContent.title.replace(/"/g, '\\"')}"
category: "Berita"
date: "${date}"
author: "Admin ForexHub"
excerpt: "${aiContent.excerpt.replace(/"/g, '\\"')}"
image: "${finalImage}"
---

${aiContent.content}
`;

  await saveToGitHub(`content/articles/${slug}.md`, frontmatter, `Cron: Auto-Publish ${slug}`);
}
