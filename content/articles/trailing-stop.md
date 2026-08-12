---
id: "trailing-stop"
slug: "trailing-stop"
date: "2026-08-12"
title: "Bab 6: Menggunakan Trailing Stop"
category: "Edukasi"
author: "Admin ForexHub"
excerpt: "Rahsia memaksimalkan keuntungan dan mengunci profit anda secara automatik menggunakan fungsi Trailing Stop di MT4/MT5."
---

# Bab 6: Menggunakan Trailing Stop

Pernahkah anda membuka satu *trade*, dan ia telah pun *floating profit* (biru) sebanyak $50. Anda berasa sangat gembira dan berharap ia akan terus naik ke $100 sebelum anda menutup *trade* tersebut. Anda tinggalkan telefon anda untuk pergi makan. Apabila anda kembali, harga pasaran telah berpusing arah secara mengejut dan keuntungan $50 tadi telah bertukar menjadi kerugian (merah) $20!

Perasaan ini sangat mengecewakan. Anda telah membiarkan duit yang sudah berada di atas meja, dirampas kembali oleh pasaran. Di sinilah wujudnya satu teknik pengurusan risiko tahap tinggi *(Advanced Risk Management)* yang dipanggil **Trailing Stop**.

---

## Apa Itu Trailing Stop?

*Trailing Stop* adalah sejenis *Stop Loss* (SL), tetapi ia tidak bersifat statik. Sebaliknya, ia bersifat dinamik—ia akan "mengejar" (trail) harga pasaran selagi harga bergerak mengikut arah keuntungan anda. 

Fungsi utama Trailing Stop adalah untuk **mengunci keuntungan (lock profit)**, sambil memberi ruang kepada *trade* anda untuk terus membuat keuntungan jika trend pasaran berterusan panjang.

**Senario Mudah:**
1. Anda `Buy` EUR/USD pada harga 1.1000.
2. Anda pasang *Trailing Stop* dengan jarak 20 pips.
3. Harga naik ke 1.1030 (Anda untung 30 pips).
4. Kerana anda pasang *Trailing Stop* 20 pips, SL anda akan bergerak secara **automatik** naik ke tahap 1.1010. 
5. Tiba-tiba harga menjunam. *Trade* anda akan automatik tertutup di tahap 1.1010.
6. Hasilnya? Anda masih untung 10 pips! Anda tidak rugi, malah masih membawa pulang duit ke dalam akaun anda.

---

## Dua Cara Melakukan Trailing Stop di MT4 / MT5

Terdapat dua cara untuk anda melaksanakan teknik ini.

### 1. Manual Trailing (Breakeven & Lock Profit)
Cara ini paling lazim digunakan oleh pengguna aplikasi MT4/MT5 di telefon pintar, memandangkan telefon pintar tidak menyokong *Auto Trailing Stop*.

- **Breakeven (BE):** Apabila *trade* anda sudah *running profit* (contohnya 20-30 pips), anda ubah (*modify*) garisan *Stop Loss* asal anda dan letakkan ia betul-betul di kawasan harga anda mula-mula masuk *(Entry Price)*. Jika pasaran patah balik, *trade* akan ditutup pada $0 untung dan $0 rugi (Risk Free Trade).
- **Manual Lock Profit:** Semakin harga naik membuat bukit baru (*Higher High*), anda terus memindahkan garisan *Stop Loss* anda ke bawah bukit yang terbentuk itu *(Higher Low)*. Anda pindahkan garisan SL secara manual sikit demi sikit.

### 2. Auto Trailing Stop (Khas di PC / Laptop)
Jika anda menggunakan MT4/MT5 versi PC desktop atau Laptop, sistem ini boleh menggerakkan SL secara automatik!

**Cara Mengaktifkannya:**
1. Di bahagian *Terminal* di bawah MT4 PC, klik kanan pada posisi *trade* anda yang sedang berjalan.
2. Pilih menu **Trailing Stop**.
3. Pilih jarak mata *(Points)* yang anda mahukan. Contohnya, jika anda pilih 150 points (persamaan 15 pips), SL anda akan sentiasa mengekori harga sejauh 15 pips di belakang selagi graf bergerak ke arah keuntungan.

> **PENTING:** Auto Trailing Stop di PC hanya akan berfungsi jika PC/Laptop anda **dibiarkan hidup (ON)** dan perisian MT4/MT5 anda terus terhubung ke internet. Jika anda tutup PC, Trailing Stop itu akan berhenti pada tahap terakhir ia ditinggalkan.

---

## Pantang Larang Menggunakan Trailing Stop

Walaupun teknik ini sangat berkuasa, ada beberapa kesilapan yang sering dilakukan oleh *trader*:

1. **Jarak Terlalu Ketat (Too Tight):** Jika anda menetapkan *Trailing Stop* terlalu rapat (contohnya cuma 5 pips), ia akan sangat mudah dilanggar oleh 'bunyi bising' *(market noise)* atau *pullback* kecil. Akibatnya, *trade* anda ditutup terlalu awal dengan keuntungan ciput sebelum trend sebenar meletup.
2. **Tidak Mengikut Sifat Pair Mata Wang:** Pasangan mata wang seperti GBP/JPY dan Emas (XAU/USD) sangat buas dan bergerak laju (volatile). Mereka memerlukan jarak *Trailing Stop* yang lebih besar (lebar) berbanding pasangan mata wang yang tenang seperti AUD/CAD.

## Kesimpulan

Warren Buffett pernah berkata, *"Peraturan #1: Jangan hilangkan duit. Peraturan #2: Jangan lupa Peraturan #1."*

Menggunakan Trailing Stop adalah teras kepada peraturan ini. Apabila *trade* anda sudah berada dalam keadaan positif, matlamat anda bukan lagi untuk bermimpi keuntungan jutaan ringgit, tetapi matlamat utama anda adalah untuk memastikan *trade* yang biru itu **TIDAK** bertukar menjadi merah. Biasakan diri anda mengunci keuntungan, dan biarkan trend yang bekerja untuk anda.
