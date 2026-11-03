/* ===== SOZLAMALAR: shu yerdan o'zgartiring ===== */
const CONFIG={
  phone:"+998 97 756 56 52",
  telegram:"+998 97 756 56 52",   // Aloqa sahifasida ko'rsatiladi. Buyurtmalar faqat sotuv bo'limiga (sotuv.html) tushadi
  email:"",
  address:"Oriqzor bozori, 2064-do'kon",
  hours:"Har kuni 09:00 – 20:00",
  year:2016,
  pricePerM3:200000,         // xona vizualizatsiyasi: 1 m³ narxi (so'm)
  freeFrom:500000,          // shu summadan yuqori buyurtmada yetkazish bepul
  deliveryFee:30000,
  promos:{ART10:10,YANGI:15,SOVGA:20},   // promokod: chegirma foizi
  costPct:0,                // tannarx: sotuv narxining necha foizi (masalan 40). Sotuv bo'limida foyda shundan hisoblanadi
  owner:{
    name:"Bahrom Shermuhamedov",
    role:"Art Print egasi",
    quote:"",
    photo:""                // surat havolasi, masalan "owner.jpg". Bo'sh bo'lsa ism harfi chiqadi
  },
  /* To'lov: provayder bilan shartnoma tuzgach, raqamlarni yozing. Bo'sh bo'lsa DEMO rejim. */
  pay:{payme:{merchant:""},click:{service:"",merchant:""},uzum:{url:""}}
};
/* Yangi ramka: ro'yxatga bitta qator qo'shing.
   bg = rang/gradient, w = ramka qalinligi, m = ichki qog'oz rangi, mw = ichki qog'oz qalinligi, add = qo'shimcha narx (so'm) */
const FRAMES=[
 {id:"black", name:"Qora",      bg:"#141414", w:12, m:"#fff",    mw:10, add:60000},
 {id:"brown", name:"Jigarrang", bg:"linear-gradient(135deg,#8a5a34,#4a2b14 50%,#8a5a34)", w:14, m:"#f3ead8", mw:8,  add:100000},
 {id:"gold",  name:"Oltin",     bg:"linear-gradient(135deg,#f7e08a,#c9971c 45%,#f7e08a 70%,#a87a10)", w:14, m:"#fbf7ea", mw:12, add:130000}
];
const NOFRAME={id:"none",name:"Ramkasiz",bg:"#ffffff",w:0,m:"#fff",mw:0,add:0};   // katalogdan ramkasiz qo'shish uchun
const WALLS=["#f6efe3","#e6e0f7","#f9d9e3","#d9efe9","#fdeab8","#d6e6f7","#3d3a5c","#cfe0c8"];
const STYLES={plain:"Silliq",stripe:"Chiziqli",dots:"Nuqtali",panel:"Panelli",tile:"Plitkali"};
const FLOORS={wood:["Parket","#c39364","wood"],grey:["Kulrang plitka","#a9adb5","tile"],white:["Oq plitka","#e6e4df","tile"]};   // [nomi, rangi, turi]
const WPAT={plain:["none","auto"],stripe:["repeating-linear-gradient(90deg,rgba(0,0,0,.09) 0 14px,transparent 14px 28px)","auto"],dots:["radial-gradient(rgba(0,0,0,.14) 2px,transparent 2.5px)","22px 22px"],panel:["none","auto"],tile:["linear-gradient(rgba(0,0,0,.1) 2px,transparent 2px),linear-gradient(90deg,rgba(0,0,0,.1) 2px,transparent 2px)","60px 30px"]};
