// js/data.js
// =============================================
// TÜM İÇERİK BURADAN YÖNETİLİYOR
// =============================================
//
// HABER EKLEMEK:
//   haberlerData dizisine yeni obje ekleyin
//   id: bir öncekinin devamı olsun
//   tarih: bugünün tarihi → en üste çıkar
//
// SLIDER EKLEMEK:
//   heroSliderData dizisine yeni obje ekleyin
//   "Devamını Oku" butonu modal açar, kendi içeriği var
//
// ÖNERİLER EKLEMEK:
//   oneriData dizisine yeni obje ekleyin
//   tamamen bağımsız, haberlerle ilgisi yok
//
// =============================================

const haberlerData = [
    {
        id: 1,
        baslik: "Jujutsu Kaisen 3. Sezon Onaylandı!",
        ozet: "Culling Game arc'ı animasyon olarak izleyeceğiz. MAPPA stüdyosu prodüksiyonu üstleniyor.",
        icerik: `Jujutsu Kaisen hayranları için müthiş bir haber! MAPPA stüdyosu, serinin üçüncü sezonunu resmi olarak duyurdu. Culling Game arc'ını kapsayacak yeni sezon, 2026 yılının sonbahar döneminde yayınlanacak.

Yönetmen koltuğunda yine Sunghoo Park oturacak. Karakter tasarımları ve animasyon kalitesi konusunda stüdyo, önceki sezonların standartlarını koruyacaklarını belirtti.

Manga okuyucuları için en heyecan verici kısım, Sukuna ve Gojo'nun destansı karşılaşmasının nasıl animate edileceği. MAPPA, bu sahneler için özel bir ekip kurduğunu açıkladı.`,
        gorsel: "https://fanzade.com/wp-content/uploads/2026/03/HCjbFFBawAEpPpb.jpeg",
        tarih: "2026-04-23",
        kategori: "Duyuru"
    },
  {
    id: 2,
    baslik: "Blue Box İkinci Cour ile Gündemde",
    ozet: "Romantizm ve sporun buluştuğu Blue Box, Nisan ayında anime topluluğunun favorilerinden biri oldu.",
    icerik: `Blue Box son haftalarda özellikle romantik anime sevenler arasında büyük ilgi topladı. Taiki ve Chinatsu arasındaki yavaş gelişen ilişki, izleyiciler tarafından modern romance anime örnekleri arasında gösteriliyor.

Yeni bölümlerde hem badminton turnuvaları hem duygusal yakınlaşmalar dikkat çekiyor. Özellikle sosyal medyada serinin 'sessiz ama etkili' ilerleyişi çok konuşuluyor.

2026 bahar sezonunun sürpriz hitlerinden biri olarak gösterilen Blue Box, romantizm severler için öne çıkan yapımlardan.`,
    gorsel: "https://anitrendz.net/news/wp-content/uploads/2024/12/blue-box-cour-2-new-key-visual-e1734909228574.jpg",
    tarih: "2026-04-24",
    kategori: "Romantizm"
},

{
    id: 3,
    baslik: "Frieren Hâlâ Zirvede Konuşuluyor",
    ozet: "Sezon bitse de Frieren'in etkisi sürüyor, yeni proje beklentisi yükseldi.",
    icerik: `Frieren: Beyond Journey's End yalnızca bir fantasy anime değil, son dönemin en çok övgü alan yapımlarından biri olmayı sürdürüyor.

Özellikle Nisan ayında ikinci sezon ihtimali ve devam söylentileri yeniden gündeme taşındı. Frieren'in yolculuk temasını işleyişi ve duygusal atmosferi anime topluluğunda hâlâ yoğun biçimde konuşuluyor.

Eleştirmenler tarafından son yılların en kaliteli fantastik serilerinden biri olarak gösteriliyor.`,
    gorsel: "https://static0.polygonimages.com/wordpress/wp-content/uploads/chorus/uploads/chorus_asset/file/25125210/frieren_beyond_journeys_end_gallery_sekw.jpg?w=1600&h=900&fit=crop",
    tarih: "2026-04-22",
    kategori: "Gündem"
},

{
    id: 4,
    baslik: "The Dangers in My Heart Popülerliğini Katladı",
    ozet: "Romantik komedi türünün son dönemdeki en güçlü isimlerinden biri olmaya devam ediyor.",
    icerik: `Kyotaro ve Anna ikilisi anime topluluğunda yeniden viral oldu. Özellikle Nisan ayında romantik anime önerilerinde seri sürekli üst sıralarda yer aldı.

Başta sıradan okul romantizmi gibi görünen hikâye, karakter gelişimiyle izleyicileri şaşırtmaya devam ediyor. Pek çok hayran seriyi yeni nesil rom-com klasiği olarak görüyor.

Yeni proje ya da devam sezonu ihtimali üzerine söylentiler de heyecan yaratmış durumda.`,
    gorsel: "https://a.storyblok.com/f/178900/920x518/61f772a7ee/the-dangers-in-my-heart.jpg",
    tarih: "2026-04-21",
    kategori: "Romantizm"
},

{
    id: 5,
    baslik: "Witch Hat Atelier Uyarlaması Büyük Beklenti Yarattı",
    ozet: "Fantastik manga uyarlaması daha yayınlanmadan yılın en merak edilenlerinden oldu.",
    icerik: `Witch Hat Atelier anime uyarlaması, görsel kalitesi ve büyü dünyasıyla şimdiden büyük hype yaratmış durumda.

Nisan boyunca paylaşılan tanıtımlar sonrası sosyal medyada seri 'yeni Frieren olabilir' yorumlarıyla konuşuldu. Özellikle sanat tarzı ve dünya tasarımı övgü topluyor.

Fantasy sevenler arasında 2026'nın en dikkat çekici yeni animelerinden biri olarak görülüyor.`,
    gorsel: "https://i.ytimg.com/vi/hMmBSCQs1H4/maxresdefault.jpg",
    tarih: "2026-04-20",
    kategori: "Duyuru"
},

{
    id: 6,
    baslik: "Kaoru Hana wa Rin to Saku Uyarlaması Romance Fanlarını Heyecanlandırdı",
    ozet: "Çok sevilen romantik manga animeye uyarlanıyor, beklenti şimdiden yüksek.",
    icerik: `Romantik anime topluluğunda son haftalarda en çok konuşulan uyarlamalardan biri Kaoru Hana wa Rin to Saku oldu.

Tatlı ama olgun ilişki dinamikleri, güçlü karakter yazımı ve duygusal atmosferi nedeniyle seri şimdiden büyük beklenti yarattı. Pek çok izleyici yeni neslin Horimiya'sı olabilir yorumları yapıyor.

Romance türünde son dönemin en dikkat çekici projelerinden biri olarak görülüyor.`,
    gorsel: "https://animeizleyenadam.com/wp-content/uploads/2025/07/Kaoru-Hana-wa-Rin-to-Saku-Kapak.webp",
    tarih: "2026-04-19",
    kategori: "Yeni Anime"
},

       
];

// =============================================
// SLIDER
// "Devamını Oku" modal açar, kendi içeriği var
// =============================================
const heroSliderData = [
    {
        baslik: "Haber",
        altBaslik: "Jujutsu Kaisen Season 3",
        aciklama: "Culling Game arc'ı başlıyor! En heyecanlı savaşlar bu sezonda.",
        gorsel: "https://fanzade.com/wp-content/uploads/2026/03/HCjbFFBawAEpPpb.jpeg",
        modalIcerik: `Jujutsu Kaisen'in üçüncü sezonu için geri sayım başladı! MAPPA stüdyosu bu sezon için özel bir ekip kurduğunu açıkladı.

Culling Game arc'ı, serinin en karmaşık ve aksiyon dolu bölümlerinden birini oluşturuyor. Sukuna'nın tam gücü ve Gojo'nun dönüşü bu sezonda ekranlara gelecek.

Sonbahar 2026'da başlaması beklenen sezon için sabırsızlıkla bekliyoruz!`
    },
    {
        baslik: "Haber",
        altBaslik: "Chainsaw Man Part 2",
        aciklama: "Asa Mitaka ve War Devil ile tanışın. Karanlık macera devam ediyor.",
        gorsel: "https://twinfinite.net/wp-content/uploads/2024/05/chainsaw-man-asa-denji-part-2-slow.jpg?fit=1200%2C675",
        modalIcerik: `Chainsaw Man'in ikinci sezonu Asa Mitaka'yı merkeze alıyor. War Devil ile paylaştığı beden, seriye çok katmanlı bir dinamik katıyor.

Denji ise yeni bir hayat kurmaya çalışırken geçmişinin gölgesinden kaçamıyor. MAPPA'nın görsel şölenine hazır olun.

Fragman yayınlandı, hype dorukta!`
    },
{
    baslik: "Editörün Seçimi",
    altBaslik: "Nisekoi",
    aciklama: "Romantik komedi türünün kült yapımı. Gizem, aşk ve komedi bir arada.",
    gorsel: "https://e1.pxfuel.com/desktop-wallpaper/23/26/desktop-wallpaper-nisekoi-female-anime-character-anime-nisekoi-kirisaki-chitoge-tachibana-marika.jpg",
    modalIcerik: `Nisekoi, sahte bir ilişkinin zamanla gerçek duygulara dönüşmesini anlatan en sevilen romantik komedi animelerinden biri. Raku Ichijou ve Chitoge Kirisaki'nin sürekli atışmaları seriye eğlenceli bir hava katıyor.

Çocuklukta verilen gizemli söz, kilitli kolye ve 'gerçek kız kim?' sorusu hikâyeyi sıradan bir rom-com olmaktan çıkarıyor. Hem komik hem duygusal anlarıyla anime severler için özel bir seri.

İki sezonuyla büyük beğeni toplayan yapım, mangada finaline ulaşıyor ve romantik anime sevenler için mutlaka izlenmesi gereken klasiklerden biri.`
}
];

// =============================================
// ÖNERİLER
// haberlerData ile HİÇ ilgisi yok
// istediğiniz anime/içeriği buraya ekleyin
// =============================================
const oneriData = [
  {
    tip: "Editörün Seçimi",
    baslik: "Nisekoi",
    aciklama: "Sahte bir sevgili rolüyle başlayan ama zamanla gerçek duygulara dönüşen romantik-komedi klasiği. Yakuza liderinin oğlu Raku Ichijou ile mafya patronunun kızı Chitoge Kirisaki, aileler arası savaşı durdurmak için sevgili gibi davranmak zorunda kalır. Ancak Raku’nun çocukluğundan kalan gizemli kolye ve verdiği söz, hikâyeyi büyük bir aşk bilmecesine dönüştürür. Tsundere-atışmaları, komedi, harem dinamikleri ve duygusal gelişimiyle Nisekoi, romantik anime sevenler için unutulmaz bir seri.",
    gorsel: "https://e1.pxfuel.com/desktop-wallpaper/23/26/desktop-wallpaper-nisekoi-female-anime-character-anime-nisekoi-kirisaki-chitoge-tachibana-marika.jpg",
    zaman: "24 Nisan 2026"
},
   {
    tip: "Haftanın Anime'si",
    baslik: "Solo Leveling",
    aciklama: "Son haftanın en popüler ve en çok konuşulan animesi Solo Leveling. Muhteşem savaş sahneleri, Jin-Woo'nun güçlenme hikayesi ve yüksek prodüksiyon kalitesiyle anime topluluğunda büyük hype yarattı. Aksiyon, aura ve epik sahneler sevenler için bu haftanın zirvesindeki seri. Türkiye'de de sosyal medyada en çok öne çıkan yapımlardan biri.",
    gorsel: "https://www.bilimkurgukulubu.com/wp-content/uploads/2025/04/Solo-Leveling.jpg",
    zaman: "24 Nisan 2026"
},
    {
        tip: "Popüler Anime",
        baslik: "Oshi no Ko",
        aciklama: "Eğlence dünyasının karanlık yüzü ve yıldızların gizli hayatları. İkinci sezon çok konuşuldu.",
        gorsel: "https://i.redd.it/fh1vjut53et91.jpg",
        zaman: "24 Nisan 2026"
    }
];

// =============================================
// TARİH FORMATLAMA — dokunmayın
// =============================================
function formatTarih(tarihStr) {
    const tarih = new Date(tarihStr);
    const simdi = new Date();
    const fark  = simdi - tarih;

    const dakika = Math.floor(fark / 60000);
    const saat   = Math.floor(fark / 3600000);
    const gun    = Math.floor(fark / 86400000);
    const ay     = Math.floor(gun / 30);
    const yil    = Math.floor(gun / 365);

    if (dakika < 60) return `${dakika} dakika önce`;
    if (saat   < 24) return `${saat} saat önce`;
    if (gun    < 30) return `${gun} gün önce`;
    if (ay     < 12) return `${ay} ay önce`;
    return `${yil} yıl önce`;
}