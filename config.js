/* ===== EDIT BAGIAN INI ===== */
var C={
  nama:"Sayang", pengirim:"Vinza",
  pin:"2410", petunjuk:"Hint: hari ini (ddmm)",
  chatJudul:"Vinza Keren",
  chat:[
    "sayyannngg",
    "sibuk tidak",
    ["kenapa?","sibuk terus"],
    "today is your special day",
    ["kenapa?","hari apa memangnya?"],
    "karena hari ini kamu lahir",
    "bukan cuma bertambahnya usia",
    "tapi juga bersyukurnya aku kenal kamu",
    ["awwww lanjut"]
  ],
  foto:[
    ["images/1.jpeg","first photo of you"],
    ["images/2.jpeg","ini jujjur fav sekalee"],
    ["images/3.jpeg","CANTIKKKK"],
    ["images/4.jpeg","CANTIK lagi"]
  ],
  /* Kolase: t:"f" = foto (isi src dengan nama file/URL foto, atau biarkan "" untuk emoji), t:"t" = tulisan, w:1 = lebar penuh.
     Susunan foto & teks dibuat berselang-seling seperti poster. */
  kolase:[
    {t:"f",src:"images/5.jpeg",e:"🌸"},{t:"t",x:"You are my favorite hello"},
    {t:"t",x:"and my hardest goodbye to say"},{t:"f",src:"images/6.jpeg",e:"🍜"},
    {t:"f",src:"images/8.jpeg",e:"🎬"},{t:"t",x:"Home is wherever you are"},
    {t:"t",w:1,x:"Love u everday ♡"},
    {t:"f",src:"images/7.jpeg",e:"✨"},{t:"t",x:"Forever starts with us"}
  ],
  /* Soundtrack: src = file lagu milikmu (mis. "lagu1.mp3"), lirik = tulis sendiri / kosongkan */

lagu: [
  {
    j: "Jatuh Suka",
    a: "Tulus",
    src: "music/Tulus - Jatuh Suka (SPOTISAVER).mp3",
    cerita: "This is kasmaran era ♡"
  },
  {
    j: "DNA",
    a: "LANY",
    src: "music/LANY - dna (SPOTISAVER).mp3",
    cerita: "Lagu bagus"
  },
  {
    j: "ILYSB",
    a: "LANY",
    src: "music/LANY - ILYSB (SPOTISAVER).mp3",
    cerita: "to kamu."
  }
],

  lilin:3,
  harapan:"Semoga semua yang kamu harapkan bisa terkabul di usiamu yang sekarang, dan semoga hal-hal baik selalu datang ke kamu",
  /* Alasan: jumlah kartu = jumlah baris (bawaan 24) */
  alasan:[
    "Pretty","lucu","gemassshhh","ngambekan (walaupun sekarang jarang)",
    "panutan bosku","gengsi","moody","My chicago",
    "Bebeb","bandel","Sunshine","Inspiring",
    "sayangku","cintaku","belahan jiwaku","favorite notification",  
    "mager","clingy","cuek kalau di chat","MyMoon",
    "SMART","Gentle","Strong","Gorgeous"
  ],
  alasanAkhir:"Dan masih ada seribu alasan lain",
  /* Bintang: 10 buah. k = jenis, p = pesan rahasia */
  bintang: [
    { p: "Semoga kamu selalu bahagia" },
    { p: "Semoga semua impianmu tercapai" },
    { p: "Semoga kamu selalu sehat" },
    { p: "Semoga kamu selalu dikelilingi cinta" },
    { p: "Semoga hatimu selalu tenang" },
    { p: "Semoga kamu selalu merasa dicintai" },
    { p: "Semoga kamu selalu kuat menghadapi apa pun" },
    { p: "Semoga semua harapanmu menjadi nyata" },
    { p: "Semoga hal-hal baik selalu bersamamu" },
    { p: "Semoga hatimu selalu damai" }
],

fotoFav: { src: "", e: "💞" },
judulAkhir: "Selamat ulang tahun, {nama}!",
fotoSurat: { src: "images/bunga.jpeg", e: "🎂" },
judulPenutup: "Satu hal lagi…",

penutup: `Terima kasih sudah ada.
Aku sayang kamu, hari ini dan seterusnya. ♡
— {pengirim}`,

surat: `aku tidak tau mulai darimana.........
honestly kemarin aku sempat pressured waktu kamu minta birthday letter dari aku, bukan aku tidak mau ya taoi aku bingung gimana nyusunnya hehehehehe
intinya...
selmat ulang tahun sayangkuuu ya
semoga diumur yang bertambah ini banyak hal baik datang ke kamu, kamu bisa lebih sayang ke diri kamu sediri, kamu tidak keras ke diri kamu dan semoga kamu selalu punya alasan buat Bahagia(aku contohnya)..
i'm proud of you sayang... sama semua hal yang kamu lewati sampai di umur kamu yang skarang, sama diri kamu yang tetap tegar walapun semuanya tidak mudah, kadang aku merasa aku tidak akan sanggup dipoisi kamu, i hope you know that you’re doing better than you think and you deserve to be proud of yourself too.......
aku juga berharap kedepannya kamu bisa terbuka sama aku tentang apapun, aku cuma pengen kamu ngerasa kamu punya aku sekarang sayang, tidak harus nunggu ada masalah dulu baru cerita, hal hal random pun akan aku dengerin, karena aku juga pengen tahu lebih banyak tentang kamu dan apa yang kamu rasain...
aku mungkin tidak selalu tahu harus ngomong apa atau bisa kasih solusi buat semuanya tapi aku mau berusaha buat ngertiin kamu. 
makasih ya sayang sudah hadir di hidupku i'm really glad you're here, and i'm even happier to be a part of your life. sometimes i still can't believe that someone who lives so far away can feel this close to me. lucu kadang, kita nggak bisa ketemu kapan tapi kamu tetap jadi seseorang yang berarti banget buat aku, aku suka punya kamu, suka bagaimana hubungan ini mengajarkan aku tentang banyak hal satu sana lain.
semoga kita tetap bisa bareng-bareng, tumbuh bersama, dan melewati lebih banyak ulang tahun bersama ya sayang. i know we still have a long way to go, but i'm happy that i get to walk through it with you.

maaf ya sayang, kali ini aku belum bisa merayakan hari spesial kamu langsung di hadapanmu. but if i could wish for one more thing, it would be to see your smile today and give you the biggest hug. until that day comes, please know that all my love is reaching you from here. 

selamat bertambah usia cintaku ♡

aku kesel karena aku gagal dapetin alamat kamu huh 
-v`,
};
/* ===== SELESAI ===== */
