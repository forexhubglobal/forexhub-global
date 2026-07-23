export type Article = {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  image: string;
};

export const articles: Article[] = [
  {
    id: '1',
    slug: 'top-10-broker-forex-malaysia-2026',
    title: 'Top 10 Broker Forex Malaysia 2026 (Diulas Penuh)',
    category: 'Review',
    date: '10 July 2026',
    author: 'Admin',
    excerpt: 'Senarai penuh broker paling popular di Malaysia untuk tahun 2026, membandingkan spread, bonus dan kelajuan pengeluaran.',
    content: 'Kandungan penuh artikel... (Akan disambung dari CMS)',
    image: 'bg-blue-500'
  },
  {
    id: '2',
    slug: 'best-broker-for-gold-trading',
    title: 'Broker Terbaik Untuk Trade Gold (XAUUSD)',
    category: 'Panduan',
    date: '12 July 2026',
    author: 'Admin',
    excerpt: 'Trading Gold memerlukan spread yang sangat nipis dan pelaksanaan pantas. Kenali broker yang menawarkan akaun khas Gold.',
    content: 'Kandungan penuh artikel... (Akan disambung dari CMS)',
    image: 'bg-yellow-500'
  },
  {
    id: '3',
    slug: 'cara-pilih-broker-selamat',
    title: 'Cara Pilih Broker Yang Selamat & Tidak Scam',
    category: 'Edukasi',
    date: '15 July 2026',
    author: 'Admin',
    excerpt: 'Jangan tertipu dengan skim cepat kaya. Ketahui ciri-ciri broker yang dikawal selia (regulated) oleh badan berkuasa.',
    content: 'Kandungan penuh artikel... (Akan disambung dari CMS)',
    image: 'bg-green-500'
  }
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug);
}
