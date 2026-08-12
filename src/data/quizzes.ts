export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface QuizCourse {
  courseSlug: string;
  title: string;
  questions: QuizQuestion[];
}

export const academyQuizzes: QuizCourse[] = [
  {
    courseSlug: 'tadika-forex',
    title: 'Tadika Forex (Asas Forex)',
    questions: [
      {
        id: 'tf-1',
        question: 'Apakah maksud Forex?',
        options: ['Pertukaran mata wang asing (Foreign Exchange)', 'Pasaran Saham', 'Kriptowang', 'Perdagangan Komoditi'],
        correctAnswerIndex: 0,
        explanation: 'Forex bermaksud Foreign Exchange, iaitu pasaran global untuk menukar satu mata wang kepada mata wang yang lain.'
      },
      {
        id: 'tf-2',
        question: 'Apakah pasangan mata wang yang didagangkan dalam EUR/USD?',
        options: ['Euro dan Pound Sterling', 'Euro dan Dolar AS', 'Dolar AS dan Yen Jepun', 'Pound Sterling dan Dolar AS'],
        correctAnswerIndex: 1,
        explanation: 'EUR mewakili Euro, dan USD mewakili Dolar Amerika Syarikat.'
      },
      {
        id: 'tf-3',
        question: 'Siapakah peserta terbesar dalam pasaran Forex?',
        options: ['Pedagang runcit (Retail traders)', 'Syarikat multinasional', 'Bank pusat dan bank komersial', 'Pelabur individu'],
        correctAnswerIndex: 2,
        explanation: 'Bank pusat dan bank komersial besar (seperti Interbank) adalah penyumbang utama kecairan dalam pasaran Forex.'
      },
      {
        id: 'tf-4',
        question: 'Bilakah pasaran Forex dibuka?',
        options: ['Waktu pejabat sahaja', '24 jam sehari, 7 hari seminggu', '24 jam sehari, 5 hari seminggu', 'Hanya pada waktu malam'],
        correctAnswerIndex: 2,
        explanation: 'Pasaran Forex beroperasi 24 jam sehari, 5 hari seminggu, dari Isnin hingga Jumaat merentas zon masa global.'
      },
      {
        id: 'tf-5',
        question: 'Apakah itu \'Pip\' dalam Forex?',
        options: ['Keuntungan besar', 'Unit ukuran terkecil dalam pergerakan harga', 'Jenis mata wang', 'Baki akaun dagangan'],
        correctAnswerIndex: 1,
        explanation: 'Pip (Percentage in Point) merupakan unit piawai untuk mengukur perubahan harga dalam pertukaran mata wang.'
      }
    ]
  },
  {
    courseSlug: 'pra-sekolah-analisis',
    title: 'Pra-Sekolah Analisis (Pengenalan Analisis)',
    questions: [
      {
        id: 'psa-1',
        question: 'Terdapat tiga jenis analisis utama dalam Forex. Apakah ia?',
        options: ['Teknikal, Fundamental, dan Sentimen', 'Grafik, Berita, dan Intuisi', 'Ekonomi, Politik, dan Sosial', 'Jangka pendek, Jangka panjang, dan Sederhana'],
        correctAnswerIndex: 0,
        explanation: 'Pedagang Forex biasanya menggunakan Analisis Teknikal, Fundamental, dan Sentimen untuk membuat keputusan pasaran.'
      },
      {
        id: 'psa-2',
        question: 'Apakah yang difokuskan oleh Analisis Teknikal?',
        options: ['Kenyataan bank pusat', 'Pergerakan harga dan carta masa lalu', 'Sentimen orang ramai', 'Kadar pengangguran'],
        correctAnswerIndex: 1,
        explanation: 'Analisis Teknikal mengkaji sejarah pergerakan harga dan corak carta untuk meramalkan harga pada masa hadapan.'
      },
      {
        id: 'psa-3',
        question: 'Apakah yang difokuskan oleh Analisis Fundamental?',
        options: ['Kajian pergerakan corak candlestick', 'Berita ekonomi, geopolitik, dan data makroekonomi', 'Mengkaji garis trend', 'Menggunakan indikator osilator'],
        correctAnswerIndex: 1,
        explanation: 'Analisis Fundamental melihat kepada kesihatan ekonomi sesebuah negara seperti KDNK (GDP), inflasi, dan kadar faedah.'
      },
      {
        id: 'psa-4',
        question: 'Mengapakah analisis pasaran penting?',
        options: ['Untuk meramal pergerakan harga masa hadapan dan mengurangkan risiko', 'Untuk memastikan keuntungan 100%', 'Untuk menipu broker', 'Sebagai hobi semata-mata'],
        correctAnswerIndex: 0,
        explanation: 'Analisis pasaran membolehkan pedagang membuat keputusan berdasarkan kebarangkalian dan data, bukan tekaan membuta tuli.'
      },
      {
        id: 'psa-5',
        question: 'Jenis carta manakah yang paling popular digunakan oleh pedagang Forex?',
        options: ['Carta Bar (Bar Chart)', 'Carta Garis (Line Chart)', 'Carta Candlestick (Candlestick Chart)', 'Carta Titik (Dot Chart)'],
        correctAnswerIndex: 2,
        explanation: 'Carta Candlestick sangat popular kerana ia memberikan maklumat harga yang padat termasuk harga buka, tinggi, rendah, dan tutup (OHLC).'
      }
    ]
  },
  {
    courseSlug: 'sekolah-rendah-teknikal',
    title: 'Sekolah Rendah Teknikal',
    questions: [
      {
        id: 'srt-1',
        question: 'Apakah maksud \'Support\' (Sokongan) dalam carta?',
        options: ['Paras harga di mana harga cenderung untuk berhenti turun dan melantun', 'Paras harga di mana harga cenderung untuk berhenti naik dan jatuh', 'Pergerakan mendatar sahaja', 'Bantuan kewangan dari broker'],
        correctAnswerIndex: 0,
        explanation: 'Sokongan (Support) adalah tahap di bawah harga semasa di mana minat membeli adalah cukup kuat untuk mengatasi tekanan menjual.'
      },
      {
        id: 'srt-2',
        question: 'Apakah maksud \'Resistance\' (Rintangan) dalam carta?',
        options: ['Paras harga terendah dalam carta', 'Paras harga di mana harga cenderung untuk berhenti naik dan jatuh semula', 'Indikator pergerakan harga pantas', 'Garis lurus ke atas'],
        correctAnswerIndex: 1,
        explanation: 'Rintangan (Resistance) adalah tahap di atas harga semasa di mana tekanan menjual mengalahkan minat membeli.'
      },
      {
        id: 'srt-3',
        question: 'Apakah fungsi utama \'Trendline\' (Garis Trend)?',
        options: ['Mengira jumlah keuntungan', 'Garis yang menyambungkan paras harga untuk mengenal pasti arah aliran pasaran', 'Menyekat perdagangan', 'Menggantikan carta candlestick'],
        correctAnswerIndex: 1,
        explanation: 'Garis trend digunakan untuk melihat sama ada pasaran sedang dalam keadaan Uptrend (menaik) atau Downtrend (menurun).'
      },
      {
        id: 'srt-4',
        question: 'Apakah kegunaan indikator Moving Average?',
        options: ['Melicinkan data harga untuk mengenal pasti trend pasaran', 'Menunjukkan harga masa depan dengan tepat', 'Mengenal pasti sentimen pelabur', 'Membuka pesanan secara automatik'],
        correctAnswerIndex: 0,
        explanation: 'Moving Average mengira purata harga masa lalu untuk melicinkan carta dan membantu mengesahkan arah trend.'
      },
      {
        id: 'srt-5',
        question: 'Corak \'Double Top\' biasanya menunjukkan apa?',
        options: ['Penerusan arah aliran menaik (Uptrend)', 'Pembalikan arah aliran dari menaik ke menurun (Reversal Downtrend)', 'Pasaran mendatar (Sideway)', 'Kejatuhan pasaran saham'],
        correctAnswerIndex: 1,
        explanation: 'Double Top adalah corak pembalikan yang terbentuk selepas pergerakan menaik, menunjukkan potensi pertukaran trend ke arah bawah.'
      }
    ]
  },
  {
    courseSlug: 'sekolah-rendah-fundamental',
    title: 'Sekolah Rendah Fundamental',
    questions: [
      {
        id: 'srf-1',
        question: 'Apakah itu data Non-Farm Payroll (NFP)?',
        options: ['Laporan keuntungan bank', 'Laporan pekerjaan dan guna tenaga bulanan di Amerika Syarikat (kecuali sektor pertanian)', 'Harga komoditi dunia', 'Kadar inflasi bulanan'],
        correctAnswerIndex: 1,
        explanation: 'NFP adalah salah satu petunjuk ekonomi terpenting yang dikeluarkan oleh AS yang sentiasa menyebabkan pergerakan besar dalam USD.'
      },
      {
        id: 'srf-2',
        question: 'Bagaimanakah kadar faedah (interest rates) yang lebih tinggi mempengaruhi mata wang sesebuah negara?',
        options: ['Menyusutkan nilai mata wang', 'Tidak memberi kesan', 'Cenderung untuk meningkatkan nilai dan permintaan mata wang tersebut', 'Membuatkan mata wang tersebut dikeluarkan dari pasaran'],
        correctAnswerIndex: 2,
        explanation: 'Kadar faedah yang lebih tinggi menarik pelaburan asing, meningkatkan permintaan terhadap mata wang tempatan.'
      },
      {
        id: 'srf-3',
        question: 'Apakah peranan utama Bank Pusat (Central Bank)?',
        options: ['Menyediakan platform untuk berdagang Forex', 'Mengawal dasar kewangan, kadar faedah, dan kestabilan ekonomi', 'Membeli saham syarikat tempatan', 'Meminjamkan wang kepada pedagang runcit'],
        correctAnswerIndex: 1,
        explanation: 'Bank Pusat seperti Federal Reserve (AS) bertanggungjawab terhadap kestabilan ekonomi dan inflasi sesebuah negara.'
      },
      {
        id: 'srf-4',
        question: 'Apakah yang berlaku kepada kuasa beli mata wang jika kadar inflasi terlalu tinggi?',
        options: ['Kuasa beli meningkat', 'Kuasa beli tidak berubah', 'Kuasa beli berkurang dan mata wang mungkin menyusut nilainya', 'Harga barang menjadi lebih murah'],
        correctAnswerIndex: 2,
        explanation: 'Inflasi bermaksud kenaikan harga barang, yang membawa maksud nilai (kuasa beli) wang tersebut semakin jatuh.'
      },
      {
        id: 'srf-5',
        question: 'Laporan Keluaran Dalam Negara Kasar (GDP) mengukur apa?',
        options: ['Nilai keseluruhan barangan dan perkhidmatan yang dihasilkan oleh sesebuah negara dalam satu tempoh masa', 'Jumlah pendapatan pedagang Forex', 'Jumlah hutang negara', 'Pertukaran mata wang di bank'],
        correctAnswerIndex: 0,
        explanation: 'GDP digunakan untuk mengukur kesihatan dan pertumbuhan ekonomi sesebuah negara secara keseluruhan.'
      }
    ]
  },
  {
    courseSlug: 'sekolah-rendah-sentimen',
    title: 'Sekolah Rendah Sentimen',
    questions: [
      {
        id: 'srs-1',
        question: 'Apakah yang dimaksudkan dengan sentimen pasaran?',
        options: ['Analisis teknikal yang sangat terperinci', 'Perasaan, pandangan, atau nada keseluruhan pelabur terhadap sesuatu pasaran kewangan', 'Cara mengira pergerakan pip', 'Laporan bank pusat'],
        correctAnswerIndex: 1,
        explanation: 'Sentimen adalah emosi kumulatif pedagang yang boleh merangsang pergerakan pasaran, sama ada positif (optimis) atau negatif (pesimis).'
      },
      {
        id: 'srs-2',
        question: 'Apakah alat atau laporan yang sering digunakan untuk mengkaji sentimen di pasaran komoditi dan Forex?',
        options: ['Relative Strength Index (RSI)', 'Laporan Commitment of Traders (COT)', 'Moving Average (MA)', 'Keluaran Dalam Negara Kasar (GDP)'],
        correctAnswerIndex: 1,
        explanation: 'Laporan COT menunjukkan posisi pegangan pasaran oleh pedagang besar, pedagang komersial, dan pelabur kecil.'
      },
      {
        id: 'srs-3',
        question: 'Apakah itu pasaran \'Bullish\' (Lembu)?',
        options: ['Keadaan di mana pelabur menjangkakan harga pasaran akan turun', 'Keadaan di mana pelabur menjangkakan harga pasaran akan naik', 'Pasaran yang tidak bergerak', 'Pasaran yang ditutup'],
        correctAnswerIndex: 1,
        explanation: 'Bullish adalah terma yang digunakan apabila sentimen pasaran positif dan arah aliran harga sedang menaik.'
      },
      {
        id: 'srs-4',
        question: 'Apakah itu pasaran \'Bearish\' (Beruang)?',
        options: ['Keadaan di mana pelabur menjangkakan harga akan turun', 'Keadaan di mana harga melonjak dengan mendadak', 'Pasaran pada hujung minggu', 'Pembelian besar-besaran'],
        correctAnswerIndex: 0,
        explanation: 'Bearish merujuk kepada sentimen negatif di mana harga dijangka atau sedang jatuh berterusan.'
      },
      {
        id: 'srs-5',
        question: 'Jika majoriti (80%) pedagang runcit membeli (long) pasangan mata wang EUR/USD, pedagang institusi mungkin mengambil posisi apa secara sentimen kontrarian?',
        options: ['Membeli dengan lebih banyak', 'Menjual (short) untuk berdagang bertentangan dengan orang ramai', 'Berhenti berdagang', 'Menunggu pasaran ditutup'],
        correctAnswerIndex: 1,
        explanation: 'Dalam analisis sentimen, pergerakan orang ramai (runcit) yang terlalu ekstrim selalunya dijadikan penunjuk pembalikan arah oleh pedagang profesional (kontrarian).'
      }
    ]
  },
  {
    courseSlug: 'sekolah-menengah-awal',
    title: 'Sekolah Menengah Awal',
    questions: [
      {
        id: 'sma-1',
        question: 'Apakah maksud \'Leverage\' dalam perdagangan Forex?',
        options: ['Cukai ke atas keuntungan', 'Satu bentuk komisen broker', 'Menggunakan modal yang dipinjam dari broker untuk mengawal posisi dagangan yang jauh lebih besar', 'Alat melukis carta'],
        correctAnswerIndex: 2,
        explanation: 'Leverage membolehkan pedagang dengan modal kecil untuk membuka pesanan/kontrak yang bernilai puluhan atau ratusan kali ganda ganda lebih besar.'
      },
      {
        id: 'sma-2',
        question: 'Apakah risiko terbesar jika menggunakan leverage yang sangat tinggi?',
        options: ['Menjana keuntungan dengan lebih perlahan', 'Broker akan menyekat akaun', 'Potensi kerugian menjadi jauh lebih besar dan boleh menyebabkan kerugian keseluruhan modal dengan pantas', 'Akaun akan bertukar menjadi akaun syariah'],
        correctAnswerIndex: 2,
        explanation: 'Leverage adalah pedang bermata dua; ia memperbesar keuntungan dan juga memperbesar kerugian dengan sangat pantas.'
      },
      {
        id: 'sma-3',
        question: 'Apakah itu \'Margin Call\'?',
        options: ['Panggilan telefon daripada rakan pedagang', 'Amaran daripada broker apabila baki margin bebas (free margin) hampir habis akibat kerugian terapung', 'Promosi dari broker', 'Istilah untuk keuntungan maksimum'],
        correctAnswerIndex: 1,
        explanation: 'Margin Call ialah sistem amaran automatik. Jika kerugian berterusan, posisi dagangan boleh ditutup secara paksa (Stop Out).'
      },
      {
        id: 'sma-4',
        question: 'Apakah perbezaan utama antara \'Pending Order\' dan \'Market Execution\'?',
        options: ['Market Execution lebih mahal', 'Pending Order dilaksanakan pada harga tertentu pada masa hadapan, manakala Market Execution dibuka serta-merta pada harga pasaran semasa', 'Tiada perbezaan', 'Pending order hanya untuk akaun besar'],
        correctAnswerIndex: 1,
        explanation: 'Pending Order (seperti Buy Limit / Sell Stop) digunakan jika pedagang ingin pasaran mencapai suatu harga yang ditetapkan terlebih dahulu sebelum posisi dibuka.'
      },
      {
        id: 'sma-5',
        question: 'Apakah fungsi utama \'Stop Loss\' (Renti Rugi)?',
        options: ['Untuk menggandakan keuntungan', 'Arahan untuk menutup posisi dagangan secara automatik bagi mengehadkan jumlah kerugian sekiranya harga berlawanan dengan arah ramalan', 'Untuk menjamin tiada langsung kerugian', 'Untuk membuka posisi baru'],
        correctAnswerIndex: 1,
        explanation: 'Stop Loss adalah alat pengurusan risiko terpenting untuk memelihara modal daripada hangus secara drastik.'
      }
    ]
  },
  {
    courseSlug: 'sekolah-menengah-atas',
    title: 'Sekolah Menengah Atas',
    questions: [
      {
        id: 'sma2-1',
        question: 'Apakah itu alat Fibonacci Retracement?',
        options: ['Alat matematik untuk mengira spread broker', 'Alat teknikal untuk mengukur potensi paras sokongan (pullback) dan rintangan berdasarkan jujukan dan nisbah nombor emas', 'Sistem perdagangan automatik', 'Robot trading (EA)'],
        correctAnswerIndex: 1,
        explanation: 'Fibonacci Retracement membantu mengukur sejauh mana harga berundur (retracement) sebelum meneruskan arah aliran (trend) asal.'
      },
      {
        id: 'sma2-2',
        question: 'Antara berikut, yang manakah nisbah Fibonacci (Golden Ratio) yang paling diperhatikan oleh pedagang?',
        options: ['10% dan 20%', '38.2% dan 61.8%', '50% dan 100%', '15% dan 25%'],
        correctAnswerIndex: 1,
        explanation: 'Paras 61.8% dan 38.2% (termasuk 50%) adalah zon paling kerap diperhatikan oleh penganalisa teknikal untuk pembalikan sementara (pullback).'
      },
      {
        id: 'sma2-3',
        question: 'Apakah yang dimaksudkan dengan \'Divergence\' (Pencapahan) dalam analisis teknikal?',
        options: ['Apabila pedagang tidak bersetuju dengan rakan', 'Keadaan di mana pergerakan harga pada carta berbeza arah dengan pergerakan indikator osilator (seperti RSI atau MACD)', 'Apabila harga tidak bergerak', 'Pembukaan harga yang terlalu laju'],
        correctAnswerIndex: 1,
        explanation: 'Divergence selalunya menandakan bahawa momentum harga semasa kian melemah dan berpotensi untuk berlakunya pertukaran arah trend.'
      },
      {
        id: 'sma2-4',
        question: 'Apakah bentuk corak \'Head and Shoulders\' (Kepala dan Bahu)?',
        options: ['Corak penerusan aliran (Continuation)', 'Corak pembalikan arah aliran (Reversal) yang mempunyai tiga puncak (puncak tengah paling tinggi)', 'Lilin Marubozu', 'Graf dengan banyak jurang (gap)'],
        correctAnswerIndex: 1,
        explanation: 'Corak ini menunjukkan potensi peralihan dari arah aliran menaik (Uptrend) menjadi arah aliran menurun (Downtrend).'
      },
      {
        id: 'sma2-5',
        question: 'Mengapakah analisis pelbagai rangka masa (Multi-Timeframe Analysis) penting?',
        options: ['Untuk mendapatkan rebat yang lebih tinggi', 'Hanya untuk melihat harga lampau', 'Untuk mendapatkan gambaran struktur pasaran yang lebih jelas (gambaran besar) sebelum mencari penyertaan terperinci di rangka masa lebih kecil', 'Untuk memeningkan kepala pedagang'],
        correctAnswerIndex: 2,
        explanation: 'Menganalisa Timeframe Besar (D1/H4) membantu memahami arah major, manakala Timeframe Kecil (M15/M5) memberi penyertaan berisiko rendah.'
      }
    ]
  },
  {
    courseSlug: 'pra-universiti',
    title: 'Pra-Universiti (Psikologi & Pengurusan Risiko)',
    questions: [
      {
        id: 'pru-1',
        question: 'Mengapakah pengurusan risiko (Risk Management) sangat penting dalam Forex?',
        options: ['Untuk menjamin keuntungan tanpa kalah', 'Untuk melindungi modal dalam jangka masa panjang agar pedagang dapat bertahan menghadapi kerugian yang tidak dapat dielakkan', 'Sebab ia disyaratkan oleh undang-undang kerajaan', 'Untuk menggembirakan pihak broker'],
        correctAnswerIndex: 1,
        explanation: 'Tanpa pengurusan risiko yang kukuh, satu atau dua dagangan yang rugi besar boleh menghancurkan kesemua keuntungan yang telah dibina.'
      },
      {
        id: 'pru-2',
        question: 'Apakah yang dimaksudkan dengan \'Risk/Reward Ratio\' (Nisbah Risiko/Ganjaran)?',
        options: ['Bayaran kepada broker', 'Perbandingan di antara jumlah modal yang sanggup dirugikan (Stop Loss) berbanding dengan jumlah keuntungan yang disasarkan (Take Profit)', 'Cara menghitung inflasi', 'Masa yang dihabiskan untuk berdagang'],
        correctAnswerIndex: 1,
        explanation: 'Dagangan berkualiti selalunya mempunyai Risk:Reward sekurang-kurangnya 1:2. Maksudnya sanggup rugi $10 untuk potensi untung $20.'
      },
      {
        id: 'pru-3',
        question: 'Berapakah peratusan risiko maksimum yang disarankan oleh pakar bagi setiap satu posisi dagangan?',
        options: ['1% hingga 2% daripada baki modal akaun', '50% daripada modal', '100% (All in)', '10% ke atas'],
        correctAnswerIndex: 0,
        explanation: 'Risiko 1% hingga 2% memastikan pedagang dapat bertahan walaupun menghadapi rentetan kerugian yang panjang (losing streak).'
      },
      {
        id: 'pru-4',
        question: 'Apakah dua emosi (musuh psikologi) yang paling banyak merosakkan kerjaya seorang pedagang?',
        options: ['Gembira dan Sedih', 'Tamak (Greed) dan Takut (Fear)', 'Mengantuk dan Lapar', 'Sabar dan Disiplin'],
        correctAnswerIndex: 1,
        explanation: 'Perasaan tamak menyebabkan pedagang mengambil risiko melampau, manakala rasa takut (fear of missing out/loss) menyebabkan panik.'
      },
      {
        id: 'pru-5',
        question: 'Apakah itu \'Revenge Trading\' (Dagangan Balas Dendam)?',
        options: ['Berdagang bersama kawan-kawan', 'Berdagang secara emosi dan gopoh terus selepas mengalami kerugian, dengan niat untuk mendapatkan semula wang dengan cepat', 'Membuka kelas mengajar forex', 'Menunggu peluang yang tepat bersabar'],
        correctAnswerIndex: 1,
        explanation: 'Revenge Trading hampir pasti akan menyebabkan kerugian yang lebih teruk kerana pedagang tidak lagi rasional dan hanya dikawal oleh kemarahan/kekecewaan.'
      }
    ]
  },
  {
    courseSlug: 'universiti',
    title: 'Universiti (Strategi Profesional)',
    questions: [
      {
        id: 'uni-1',
        question: 'Apakah itu gaya perdagangan \'Scalping\'?',
        options: ['Membeli aset dan memegangnya selama bertahun-tahun', 'Gaya berdagang yang pantas, membuka dan menutup banyak posisi dalam masa yang sangat singkat (minit/saat) untuk mengutip keuntungan pips yang kecil', 'Mengkaji asas ekonomi dunia sahaja', 'Berdagang berdasarkan nasib'],
        correctAnswerIndex: 1,
        explanation: 'Scalping memerlukan fokus yang sangat tinggi dan disiplin cut-loss yang ketat, sesuai bagi pedagang yang tidak suka membiarkan posisi tergantung semalaman.'
      },
      {
        id: 'uni-2',
        question: 'Apakah perbezaan ketara di antara Day Trading dan Swing Trading?',
        options: ['Swing trading dibuat di siang hari, Day trading pada waktu malam', 'Day trader akan memastikan semua posisinya ditutup pada hari yang sama, manakala Swing trader akan menahan posisi (hold) untuk beberapa hari atau minggu', 'Tiada beza', 'Day trading tidak menggunakan carta'],
        correctAnswerIndex: 1,
        explanation: 'Day trader mengelakkan risiko jurang harga (gap) harian dan faedah (swap) semalaman (overnight).'
      },
      {
        id: 'uni-3',
        question: 'Apakah yang dimaksudkan dengan strategi \'Carry Trade\'?',
        options: ['Membawa komputer riba ke kedai kopi', 'Meminjam mata wang dengan kadar faedah yang sangat rendah untuk membeli atau melabur dalam mata wang dengan kadar faedah yang jauh lebih tinggi', 'Berdagang emas sahaja', 'Membeli mata wang tanpa henti'],
        correctAnswerIndex: 1,
        explanation: 'Carry Trade bukan sekadar mencari untung perbezaan harga mata wang, tetapi juga mengambil keuntungan dari kadar faedah (interest differential/rollover/swap positif).'
      },
      {
        id: 'uni-4',
        question: 'Bagaimanakah cara yang betul untuk menguji keberkesanan sesuatu strategi sebelum menggunakan wang sebenar (Backtesting)?',
        options: ['Berdagang terus menggunakan akaun real dengan lot besar', 'Menggunakan perisian/data sejarah lampau atau akaun demo untuk menilai dan merekod ketepatan serta kelemahan strategi tersebut terlebih dahulu', 'Membaca tentangnya di internet sahaja', 'Meneka nasib'],
        correctAnswerIndex: 1,
        explanation: 'Backtesting memberikan keyakinan statistik dan data peratusan kemenangan (win rate) bagi sesuatu sistem dagangan tanpa mempertaruhkan modal.'
      },
      {
        id: 'uni-5',
        question: 'Apakah ciri paling menonjol bagi seorang pedagang tahap profesional yang berjaya secara konsisten?',
        options: ['Mempunyai monitor yang sangat banyak', 'Mempunyai Pelan Perdagangan (Trading Plan) yang sistematik, pengurusan kewangan yang ketat, dan disiplin tinggi untuk mematuhi pelan tanpa gangguan emosi', 'Tahu hala tuju pasaran masa hadapan 100% dengan tepat', 'Tidak pernah rugi langsung dalam sejarah dagangannya'],
        correctAnswerIndex: 1,
        explanation: 'Pedagang profesional memahami bahawa dagangan adalah tentang kebarangkalian dan proses, bukan mengejar kekayaan segera tanpa sistem.'
      }
    ]
  }
];
