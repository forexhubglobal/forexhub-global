const fs = require('fs');
const path = require('path');

const curriculum = [
  {
    id: "tadika-forex",
    title: "Tadika (Preschool): Asas Forex",
    description: "Langkah pertama anda dalam dunia Forex. Belajar apa itu Forex, sejarahnya, dan siapa pemain utamanya.",
    level: "Beginner",
    lessons: [
      { slug: "apa-itu-forex-sebenar", title: "Bab 1: Apa Itu Forex Sebenarnya?", duration: "5 min" },
      { slug: "kenapa-trade-forex", title: "Bab 2: Kenapa Trade Forex?", duration: "5 min" },
      { slug: "siapa-pemain-forex", title: "Bab 3: Siapa Pemain Utama dalam Forex?", duration: "7 min" },
      { slug: "sejarah-forex", title: "Bab 4: Sejarah Ringkas Pasaran Mata Wang", duration: "10 min" },
      { slug: "apakah-itu-margin", title: "Bab 5: Memahami Margin & Leverage", duration: "8 min" },
      { slug: "apa-itu-pip", title: "Bab 6: Apa Itu Pip & Lot?", duration: "8 min" },
      { slug: "jenis-jenis-broker", title: "Bab 7: Mengenali Jenis-jenis Broker (A-Book vs B-Book)", duration: "10 min" }
    ]
  },
  {
    id: "pra-sekolah-analisis",
    title: "Pra-Sekolah (Kindergarten): Jenis Analisis",
    description: "Pelajari tiga mazhab utama dalam menganalisa pergerakan harga pasaran.",
    level: "Beginner",
    lessons: [
      { slug: "tiga-jenis-analisis", title: "Bab 1: Tiga Jenis Analisis Pasaran", duration: "5 min" },
      { slug: "analisis-teknikal-pengenalan", title: "Bab 2: Pengenalan Analisis Teknikal", duration: "6 min" },
      { slug: "analisis-fundamental-pengenalan", title: "Bab 3: Pengenalan Analisis Fundamental", duration: "7 min" },
      { slug: "analisis-sentimen-pengenalan", title: "Bab 4: Pengenalan Analisis Sentimen", duration: "6 min" },
      { slug: "mana-lebih-baik", title: "Bab 5: Teknikal vs Fundamental: Mana Lebih Baik?", duration: "5 min" }
    ]
  },
  {
    id: "sekolah-rendah-teknikal",
    title: "Sekolah Rendah (Elementary): Asas Teknikal",
    description: "Belajar membaca graf harga, mengenali candlestick, dan melukis garisan Support & Resistance.",
    level: "Beginner",
    lessons: [
      { slug: "jenis-jenis-graf", title: "Bab 1: Jenis-jenis Graf (Line, Bar, Candlestick)", duration: "5 min" },
      { slug: "anatomi-candlestick", title: "Bab 2: Anatomi Japanese Candlestick", duration: "7 min" },
      { slug: "support-and-resistance", title: "Bab 3: Asas Support & Resistance (SNR)", duration: "10 min" },
      { slug: "trendlines", title: "Bab 4: Melukis Trendlines dengan Betul", duration: "8 min" },
      { slug: "channels", title: "Bab 5: Menggunakan Channels", duration: "6 min" },
      { slug: "trade-snr-bounces", title: "Bab 6: Cara Trade SNR (Bounce & Breakout)", duration: "10 min" }
    ]
  },
  {
    id: "sekolah-menengah-indikator",
    title: "Sekolah Menengah (Middle School): Indikator Asas",
    description: "Tambahkan alat bantuan ke dalam graf anda seperti Moving Averages, MACD, dan RSI.",
    level: "Intermediate",
    lessons: [
      { slug: "pengenalan-indikator", title: "Bab 1: Pengenalan Kepada Indikator Teknikal", duration: "4 min" },
      { slug: "moving-averages", title: "Bab 2: Simple Moving Averages (SMA)", duration: "8 min" },
      { slug: "exponential-moving-averages", title: "Bab 3: Exponential Moving Averages (EMA)", duration: "7 min" },
      { slug: "macd", title: "Bab 4: Memahami MACD", duration: "9 min" },
      { slug: "rsi", title: "Bab 5: Relative Strength Index (RSI)", duration: "8 min" },
      { slug: "stochastic", title: "Bab 6: Stochastic Oscillator", duration: "7 min" },
      { slug: "bollinger-bands", title: "Bab 7: Bollinger Bands", duration: "8 min" },
      { slug: "ichimoku-kinko-hyo", title: "Bab 8: Ichimoku Kinko Hyo (Asas)", duration: "12 min" }
    ]
  },
  {
    id: "sekolah-tinggi-corak-graf",
    title: "Sekolah Tinggi (High School): Corak Graf (Chart Patterns)",
    description: "Mula mengecam bentuk dan formasi pada graf yang berulang-ulang untuk menjangka pergerakan seterusnya.",
    level: "Intermediate",
    lessons: [
      { slug: "pengenalan-chart-patterns", title: "Bab 1: Kenapa Corak Graf Terjadi?", duration: "5 min" },
      { slug: "head-and-shoulders", title: "Bab 2: Head and Shoulders", duration: "7 min" },
      { slug: "double-top-bottom", title: "Bab 3: Double Top & Double Bottom", duration: "6 min" },
      { slug: "triangles", title: "Bab 4: Symmetrical, Ascending & Descending Triangles", duration: "10 min" },
      { slug: "wedges", title: "Bab 5: Rising & Falling Wedges", duration: "8 min" },
      { slug: "flags-and-pennants", title: "Bab 6: Flags & Pennants", duration: "7 min" },
      { slug: "trading-breakouts", title: "Bab 7: Strategi Trade Breakout", duration: "10 min" },
      { slug: "fakeouts", title: "Bab 8: Hati-hati dengan Fakeouts", duration: "9 min" }
    ]
  },
  {
    id: "kolej-fibonacci",
    title: "Kolej (Undergraduate): Fibonacci & Divergence",
    description: "Kuasai nombor ajaib Fibonacci dan cara melihat kelemahan trend melalui Divergence.",
    level: "Intermediate",
    lessons: [
      { slug: "siapa-fibonacci", title: "Bab 1: Siapakah Leonardo Fibonacci?", duration: "5 min" },
      { slug: "fibonacci-retracement", title: "Bab 2: Menggunakan Fibonacci Retracement", duration: "10 min" },
      { slug: "fibonacci-extension", title: "Bab 3: Menggunakan Fibonacci Extension (Take Profit)", duration: "9 min" },
      { slug: "gabung-fibo-snr", title: "Bab 4: Menggabungkan Fibo dengan SNR", duration: "8 min" },
      { slug: "apa-itu-divergence", title: "Bab 5: Apa Itu Divergence?", duration: "7 min" },
      { slug: "regular-divergence", title: "Bab 6: Regular Divergence (Pembalikan Arah)", duration: "8 min" },
      { slug: "hidden-divergence", title: "Bab 7: Hidden Divergence (Penerusan Trend)", duration: "8 min" },
      { slug: "cara-trade-divergence", title: "Bab 8: Strategi Trade Menggunakan Divergence", duration: "10 min" }
    ]
  },
  {
    id: "universiti-fundamental",
    title: "Universiti (Graduate): Analisis Fundamental",
    description: "Fahami bagaimana berita ekonomi, inflasi, dan dasar bank pusat menggerakkan pasaran mata wang.",
    level: "Advanced",
    lessons: [
      { slug: "asas-ekonomi-makro", title: "Bab 1: Asas Ekonomi Makro", duration: "10 min" },
      { slug: "kadar-faedah", title: "Bab 2: Kadar Faedah (Interest Rates) & Bank Pusat", duration: "12 min" },
      { slug: "inflasi-cpi", title: "Bab 3: Memahami Inflasi (CPI, PPI)", duration: "9 min" },
      { slug: "data-pekerjaan-nfp", title: "Bab 4: NFP dan Data Pekerjaan", duration: "8 min" },
      { slug: "sentiment-risk-on-off", title: "Bab 5: Sentimen Pasaran (Risk-On vs Risk-Off)", duration: "7 min" },
      { slug: "safe-haven-currencies", title: "Bab 6: Mata Wang Safe Haven", duration: "6 min" },
      { slug: "cara-baca-kalendar-ekonomi", title: "Bab 7: Cara Membaca Kalendar Ekonomi", duration: "8 min" },
      { slug: "trade-the-news", title: "Bab 8: Strategi Trade Semasa Berita (News Trading)", duration: "12 min" }
    ]
  },
  {
    id: "sarjana-pengurusan-risiko",
    title: "Sarjana (Master): Pengurusan Risiko",
    description: "Rahsia sebenar kenapa 90% trader gagal adalah pengurusan risiko. Belajar lindungi modal anda.",
    level: "Advanced",
    lessons: [
      { slug: "kepentingan-risk-management", title: "Bab 1: Kenapa Pengurusan Risiko Penting?", duration: "6 min" },
      { slug: "drawdown", title: "Bab 2: Memahami Drawdown", duration: "8 min" },
      { slug: "risk-reward-ratio", title: "Bab 3: Nisbah Risiko & Ganjaran (Risk/Reward Ratio)", duration: "9 min" },
      { slug: "position-sizing", title: "Bab 4: Cara Kira Position Sizing (Lot Size)", duration: "12 min" },
      { slug: "stop-loss-hunting", title: "Bab 5: Mengelak Stop Loss Hunting", duration: "8 min" },
      { slug: "trailing-stop", title: "Bab 6: Menggunakan Trailing Stop", duration: "7 min" },
      { slug: "correlation", title: "Bab 7: Korelasi Mata Wang (Currency Correlation)", duration: "10 min" }
    ]
  },
  {
    id: "phd-psikologi-trading",
    title: "PhD (Doctorate): Psikologi Trading & Pelan",
    description: "Kawal emosi (Fear & Greed) dan bina pelan dagangan profesional (Trading Plan).",
    level: "Advanced",
    lessons: [
      { slug: "psikologi-asas", title: "Bab 1: Asas Psikologi Manusia (Fear & Greed)", duration: "7 min" },
      { slug: "lima-fasa-trader", title: "Bab 2: 5 Fasa Evolusi Seorang Trader", duration: "10 min" },
      { slug: "trading-plan", title: "Bab 3: Cara Membina Trading Plan", duration: "12 min" },
      { slug: "trading-journal", title: "Bab 4: Kepentingan Trading Journal", duration: "8 min" },
      { slug: "overtrading", title: "Bab 5: Mengenal Pasti dan Mencegah Overtrading", duration: "7 min" },
      { slug: "revenge-trading", title: "Bab 6: Bahaya Revenge Trading", duration: "6 min" },
      { slug: "disiplin-konsistensi", title: "Bab 7: Disiplin dan Konsistensi Jangka Panjang", duration: "9 min" }
    ]
  }
];

// Generate academyCourses.ts
const courseFilePath = path.join(__dirname, '../src/data/academyCourses.ts');
let courseFileContent = `export type AcademyLesson = {
  slug: string;
  title: string;
  duration?: string;
};

export type AcademyCourse = {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  lessons: AcademyLesson[];
};

export const academyCourses: AcademyCourse[] = ${JSON.stringify(curriculum, null, 2)};

export function getCourseById(id: string): AcademyCourse | undefined {
  return academyCourses.find(c => c.id === id);
}

export function getLessonDetails(slug: string) {
  for (const course of academyCourses) {
    const lessonIndex = course.lessons.findIndex(l => l.slug === slug);
    if (lessonIndex !== -1) {
      return {
        course,
        lesson: course.lessons[lessonIndex],
        lessonIndex,
        totalLessons: course.lessons.length,
        nextLesson: lessonIndex < course.lessons.length - 1 ? course.lessons[lessonIndex + 1] : null,
        prevLesson: lessonIndex > 0 ? course.lessons[lessonIndex - 1] : null,
      };
    }
  }
  return null;
}
`;

fs.writeFileSync(courseFilePath, courseFileContent, 'utf8');
console.log('✅ Berjaya mencipta src/data/academyCourses.ts');

// Generate markdown files
const articlesDir = path.join(__dirname, '../content/articles');
if (!fs.existsSync(articlesDir)) {
  fs.mkdirSync(articlesDir, { recursive: true });
}

let generatedCount = 0;
curriculum.forEach((course) => {
  course.lessons.forEach((lesson) => {
    const mdPath = path.join(articlesDir, lesson.slug + '.md');
    
    // Only create if it doesn't exist to avoid overwriting existing good content
    if (!fs.existsSync(mdPath)) {
      const date = new Date().toISOString().split('T')[0];
      const content = `---
id: "${lesson.slug}"
slug: "${lesson.slug}"
date: "${date}"
title: "${lesson.title}"
category: "Edukasi"
author: "Admin ForexHub"
excerpt: "Ini adalah nota draf untuk ${lesson.title}. Kandungan akan dikemaskini dalam versi seterusnya."
---

# ${lesson.title}

> **Peringatan:** Halaman ini adalah rangka draf *(placeholder)* yang dijana secara automatik. Kandungan terperinci untuk silibus ini sedang dalam fasa penulisan oleh tenaga pengajar ForexHub Academy.

## Pengenalan Topik

${lesson.title} merupakan salah satu topik penting di bawah silibus **${course.title}**. Topik ini direka khas untuk tahap **${course.level}**.

Dalam bab ini, anda akan belajar mengenai:
- Konsep dan teori asas topik ini.
- Cara untuk mengaplikasikannya di dalam graf sebenar (MT4 / MT5).
- Pantang larang dan kesilapan lazim yang dilakukan oleh majoriti trader baru.

*Teruskan ke bab seterusnya untuk menyambung pembelajaran anda, atau kembali semula ke halaman ini apabila ia dikemaskini kelak!*
`;
      fs.writeFileSync(mdPath, content, 'utf8');
      generatedCount++;
    }
  });
});

console.log(`✅ Berjaya mencipta ${generatedCount} fail markdown baru!`);
console.log('🎉 Universiti Forex kini dilancarkan!');
