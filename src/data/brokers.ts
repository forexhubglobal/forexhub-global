export type Broker = {
  id: string;
  slug: string;
  name: string;
  rating: number;
  overallScore: string;
  spread: string;
  deposit: string;
  withdrawal: string;
  platform: string;
  leverage: string;
  bonus: string;
  cashback: string;
  copyTrading: string;
  pamm: string;
  regulation: string;
  pros: string[];
  cons: string[];
  faq: { q: string; a: string }[];
  logo: string;
  color: string;
  description: string;
};

export const brokers: Broker[] = [
  {
    id: '1',
    slug: 'moneta-markets',
    name: 'Moneta Markets',
    rating: 4.9,
    overallScore: '9.4/10',
    spread: 'Bermula 0.0 pip',
    deposit: 'Min $50',
    withdrawal: 'Pantas (24 Jam)',
    platform: 'MT4, MT5, ProTrader',
    leverage: 'Maks 1:1000',
    bonus: '50% Deposit Bonus',
    cashback: 'Ada (Rebate 20%)',
    copyTrading: 'Ya',
    pamm: 'Ya',
    regulation: 'ASIC, FSCA, SVG',
    pros: ['Spread sangat rendah untuk Gold', 'Sokongan pelanggan pantas', 'Platform ProTrader eksklusif'],
    cons: ['Tiada akaun cent', 'Terhad untuk klien US'],
    faq: [
      { q: 'Berapa minimum deposit Moneta Markets?', a: 'Minimum deposit adalah $50 untuk akaun Direct.' },
      { q: 'Adakah Moneta Markets selamat?', a: 'Ya, dikawal selia oleh pelbagai badan seperti ASIC dan FSCA.' }
    ],
    logo: 'MM',
    color: 'from-blue-600 to-blue-800',
    description: 'Moneta Markets adalah broker yang pesat berkembang, memfokuskan kepada kelajuan pelaksanaan dan spread rendah.'
  },
  {
    id: '2',
    slug: 'exness',
    name: 'Exness',
    rating: 4.8,
    overallScore: '9.2/10',
    spread: 'Bermula 0.1 pip',
    deposit: 'Min $1',
    withdrawal: 'Segera (Instant)',
    platform: 'MT4, MT5, Exness Terminal',
    leverage: 'Unlimited (Tiada Had)',
    bonus: 'Tiada',
    cashback: 'Tiada',
    copyTrading: 'Ya (Social Trading)',
    pamm: 'Tiada',
    regulation: 'FCA, CySEC, FSA',
    pros: ['Pengeluaran segera (instant withdrawal)', 'Leverage tanpa had', 'Akaun Cent sesuai untuk pemula'],
    cons: ['Tiada tawaran bonus deposit', 'Spread mungkin melebar waktu berita'],
    faq: [
      { q: 'Bagaimana cara deposit di Exness?', a: 'Anda boleh menggunakan Online Banking tempatan, kad kredit, atau kripto.' },
    ],
    logo: 'EX',
    color: 'from-yellow-400 to-yellow-600',
    description: 'Exness adalah broker terkemuka di Malaysia dengan kelebihan pengeluaran wang automatik dan segera.'
  },
  {
    id: '3',
    slug: 'xm',
    name: 'XM Global',
    rating: 4.7,
    overallScore: '8.9/10',
    spread: 'Sederhana (1.0 pip)',
    deposit: 'Min $5',
    withdrawal: '1-2 Hari Bekerja',
    platform: 'MT4, MT5',
    leverage: 'Maks 1:1000',
    bonus: '100% + $30 No Deposit Bonus',
    cashback: 'XM Loyalty Points',
    copyTrading: 'Ya',
    pamm: 'Tiada',
    regulation: 'ASIC, CySEC, FSC',
    pros: ['Banyak promosi dan bonus', 'Akaun Micro dan Ultra Low', 'Sesuai untuk newbie'],
    cons: ['Spread sedikit tinggi berbanding pesaing ECN', 'Aplikasi mudah alih sedikit lapuk'],
    faq: [],
    logo: 'XM',
    color: 'from-red-600 to-red-800',
    description: 'XM dikenali ramai dengan bonus percuma $30 untuk pendaftaran baharu dan program kesetiaan berterusan.'
  },
  {
    id: '4',
    slug: 'hfm',
    name: 'HFM (HotForex)',
    rating: 4.7,
    overallScore: '9.0/10',
    spread: 'Bermula 0.1 pip',
    deposit: 'Min $5',
    withdrawal: 'Pantas (24 Jam)',
    platform: 'MT4, MT5, HFM App',
    leverage: 'Maks 1:2000',
    bonus: '100% Supercharged Bonus',
    cashback: '$2 per lot (Rebate)',
    copyTrading: 'HFcopy',
    pamm: 'PAMM V2',
    regulation: 'FCA, CySEC, FSCA',
    pros: ['Pelbagai jenis akaun dagangan', 'Program IB terbaik', 'Menyokong PAMM'],
    cons: ['Proses pendaftaran agak ketat', 'Leverage berubah mengikut jenis akaun'],
    faq: [],
    logo: 'HFM',
    color: 'from-green-600 to-green-800',
    description: 'HFM (dahulunya HotForex) menawarkan ekosistem pelaburan yang lengkap termasuk PAMM dan Copy Trading.'
  }
];

export function getBrokerBySlug(slug: string): Broker | undefined {
  return brokers.find(b => b.slug === slug);
}
