/* ===== SOZLAMALAR: shu yerdan o'zgartiring ===== */
const CONFIG={
  phone:"+998 97 756 56 52",
  telegram:"+998 97 756 56 52",   // buyurtmalar shu raqamdagi Telegram profilga boradi
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
  /* Telegram bot (ixtiyoriy, qo'shimcha xabar uchun): @BotFather'dan token, chatId = xabar keladigan chat.
     Diqqat: token sahifa kodida ochiq turadi. Asosiy buyurtmalar Firebase'ga (sotuv.html) tushadi.
     Firebase ham, bot ham sozlanmagan bo'lsa: matn nusxalanadi va Telegram ochiladi. */
  bot:{token:"",chatId:""},
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
/* ================================================ */

const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const money=n=>String(n).replace(/\B(?=(\d{3})+(?!\d))/g," ")+" so'm";
const digits=s=>s.replace(/\D/g,"");

/* ---- FIREBASE: buyurtmalar bazasi va xodimlar kirishi (firebase-config.js da sozlanadi) ---- */
let DB=null,AUTH=null;
if(window.firebase&&window.FIREBASE_CONFIG&&FIREBASE_CONFIG.apiKey){
  firebase.initializeApp(FIREBASE_CONFIG);
  DB=firebase.firestore();
  AUTH=firebase.auth?firebase.auth():null;
}

/* ---- LOGO: abstrakt aylanuvchi gul (daraxt) ---- */
const logo=s=>{
  const A=["#5b3df5","#ff5fa2","#14b8a6","#ffc933"],B=["#ffc933","#14b8a6","#ff5fa2","#5b3df5"];
  let L="",I="";
  for(let i=0;i<8;i++){
    L+=`<ellipse cx="32" cy="14" rx="4.6" ry="9.5" fill="${A[i%4]}" transform="rotate(${i*45} 32 25)"/>`;
    I+=`<ellipse cx="32" cy="19" rx="2.6" ry="4.5" fill="${B[i%4]}" transform="rotate(${i*45+22} 32 25)"/>`;
  }
  return `<svg width="${s}" height="${s}" viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="16" fill="#fff"/><path d="M32 60V34" stroke="#1b1630" stroke-width="4" stroke-linecap="round"/><path d="M22 60H42" stroke="#1b1630" stroke-width="3" stroke-linecap="round"/><g class="spin" style="transform-origin:32px 25px">${L}</g><g class="spin2" style="transform-origin:32px 25px">${I}</g><circle cx="32" cy="25" r="3" fill="#1b1630"/></svg>`;
};

/* ---- SHAKL: sarlavha, pastki qism, oyna va xabar hamma sahifada bir xil ---- */
const PG=document.body.dataset.page;
const NAV=[["index.html","Bosh sahifa","home"],["rasmlar.html","Rasmlar","rasmlar"],["dizayn.html","O'z dizaynim","dizayn"],["aloqa.html","Aloqa","aloqa"]];
document.querySelector("main").id="main";
document.body.insertAdjacentHTML("afterbegin",`<a class="skip" href="#main">Asosiy qismga o'tish</a><header><a class="brand" href="index.html"><span data-logo="44"></span><span class="brandname">Art Print</span></a><nav id="mainnav" aria-label="Menyu">${NAV.map(([h,t,k])=>`<a href="${h}"${k===PG?' class="on" aria-current="page"':""}>${t}</a>`).join("")}</nav><button class="burger" id="burger" aria-label="Menyu" aria-controls="mainnav" aria-expanded="false">☰</button><a class="cartbtn${PG==="savat"?" on":""}" href="savat.html">🛒 Savat <span class="badge" id="count">0</span></a></header>`);
document.body.insertAdjacentHTML("beforeend",`<footer><div class="wrap foot"><div class="brand" style="color:#fff"><span data-logo="38"></span><span class="brandname">Art Print</span></div><div><a href="tel:${CONFIG.phone.replace(/\s/g,"")}">${CONFIG.phone}</a></div><div>© ${CONFIG.year} Art Print. Barcha huquqlar himoyalangan. <a class="staff" href="sotuv.html">Xodimlar</a></div></div></footer>
<div class="overlay" id="overlay"></div><div class="modal" id="modal" role="dialog" aria-modal="true" aria-labelledby="mtitle"><div class="mbox" id="mbox"></div></div><div class="toast" id="toast" role="status"></div>`);
document.querySelectorAll("[data-logo]").forEach(e=>e.innerHTML=logo(+e.dataset.logo));
$("#burger").onclick=()=>{const o=$("header nav").classList.toggle("open"),bt=$("#burger");bt.setAttribute("aria-expanded",o);bt.textContent=o?"✕":"☰"};
/* Menyu: havola bosilganda, tashqariga bosilganda yoki ekran kattalashganda yopiladi */
(()=>{const nv=$("header nav"),bt=$("#burger");
const closeNav=()=>{nv.classList.remove("open");bt.setAttribute("aria-expanded","false");bt.textContent="☰"};
nv.addEventListener("click",e=>{if(e.target.closest("a"))closeNav()});
document.addEventListener("click",e=>{if(!e.target.closest("header"))closeNav()});
matchMedia("(min-width:901px)").addEventListener("change",e=>{if(e.matches)closeNav()});})();

/* oyna ochilganda fokus ichiga o'tadi, yopilganda oldingi joyiga qaytadi */
let modalBack=null;
function openModal(html,wide){
  if(!$("#modal").classList.contains("on"))modalBack=document.activeElement;
  $("#mbox").className="mbox"+(wide?" wide":"");
  $("#mbox").innerHTML='<button class="mx" aria-label="Oynani yopish">&times;</button>'+html;
  $("#modal").classList.add("on");$("#overlay").classList.add("on");document.body.classList.add("modal-open");
  $("#mbox .mx").focus();
}
function closeModal(){
  if(!$("#modal").classList.contains("on"))return;
  $("#modal").classList.remove("on");$("#overlay").classList.remove("on");document.body.classList.remove("modal-open");
  if(modalBack&&document.contains(modalBack))modalBack.focus();
  modalBack=null;
}
/* Tab tugmasi oynadan tashqariga chiqib ketmasin */
$("#modal").addEventListener("keydown",e=>{
  if(e.key!=="Tab")return;
  const f=[...$("#mbox").querySelectorAll("button,a[href],input,select,textarea")].filter(x=>!x.disabled&&x.offsetParent);
  if(!f.length)return;
  if(e.shiftKey&&document.activeElement===f[0]){e.preventDefault();f[f.length-1].focus()}
  else if(!e.shiftKey&&document.activeElement===f[f.length-1]){e.preventDefault();f[0].focus()}
});
$("#modal").addEventListener("click",e=>{if(e.target.id==="modal"||e.target.closest(".mx"))closeModal()});
$("#overlay").onclick=closeModal;
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove("on"),1800)}

/* ---- Rasmlar kodda chiziladi ---- */
function rng(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const PAL=[["#fde2c8","#f4845f","#2b2d42","#f9c74f","#43aa8b"],["#e0f2f1","#00897b","#263238","#ffb300","#ef5350"],["#fff3e0","#e64a19","#1a237e","#ffca28","#26a69a"],["#f3e5f5","#8e24aa","#311b92","#ffd54f","#ff7043"],["#e8f5e9","#2e7d32","#1b2a1f","#fbc02d","#8d6e63"],["#fce4ec","#d81b60","#4a148c","#ffb74d","#4db6ac"],["#e3f2fd","#1e88e5","#0d1b4c","#ffd166","#ef476f"],["#fffde7","#f57f17","#3e2723","#80cbc4","#c62828"],["#eceff1","#455a64","#111827","#ffb703","#fb8500"],["#fbe9e7","#bf360c","#004d40","#ffe082","#7986cb"]];
const bg=c=>`<rect width="300" height="400" fill="${c}"/>`;
const pk=(r,p)=>p[1+(r()*4|0)];
const STY={
circles:(r,p)=>{let s=bg(p[0]);for(let i=0,n=3+(r()*3|0);i<n;i++)s+=`<circle cx="${60+r()*180|0}" cy="${80+r()*240|0}" r="${30+r()*60|0}" fill="${pk(r,p)}" opacity=".88"/>`;return s},
rings:(r,p)=>{let s=bg(p[2]);const cx=100+r()*100|0,cy=150+r()*100|0,c=[0,1,3,4,0,1];for(let i=0;i<6;i++)s+=`<circle cx="${cx}" cy="${cy}" r="${20+i*26}" fill="none" stroke="${p[c[i]]}" stroke-width="${8+r()*10|0}"/>`;return s},
blobs:(r,p)=>{let s=bg(p[0]);for(let i=0;i<5;i++){const x=40+r()*220|0,y=60+r()*280|0;s+=`<ellipse cx="${x}" cy="${y}" rx="${40+r()*60|0}" ry="${25+r()*45|0}" fill="${pk(r,p)}" opacity=".78" transform="rotate(${r()*180|0} ${x} ${y})"/>`}return s},
stripes:(r,p)=>{let s=bg(p[0]),x=0;while(x<300){const w=20+r()*60|0;s+=`<rect x="${x}" width="${w}" height="400" fill="${pk(r,p)}"/>`;x+=w}return s+`<circle cx="150" cy="${150+r()*100|0}" r="44" fill="${p[0]}"/>`},
grid:(r,p)=>{let s="";for(let y=0;y<4;y++)for(let x=0;x<3;x++){s+=`<rect x="${x*100}" y="${y*100}" width="100" height="100" fill="${p[r()*5|0]}"/>`;if(r()>.5)s+=`<circle cx="${x*100+50}" cy="${y*100+50}" r="${20+r()*26|0}" fill="${p[r()*5|0]}"/>`}return s},
tri:(r,p)=>{let s=bg(p[0]);for(let i=0;i<4;i++)s+=`<polygon points="${r()*300|0},${r()*400|0} ${r()*300|0},${r()*400|0} ${r()*300|0},${r()*400|0}" fill="${pk(r,p)}" opacity=".9"/>`;return s},
arches:(r,p)=>bg(p[1])+`<g transform="translate(${r()*40-20|0} 0)"><path d="M40 400V220a110 110 0 0 1 220 0V400Z" fill="${p[3]}"/><path d="M85 400V235a65 65 0 0 1 130 0V400Z" fill="${p[0]}"/><path d="M125 400V245a25 25 0 0 1 50 0V400Z" fill="${p[2]}"/></g>`,
sun:(r,p)=>{const y=230+r()*60|0;return bg(p[0])+`<path d="M60 ${y}a90 90 0 0 1 180 0Z" fill="${p[1]}"/><rect x="40" y="${y+8}" width="220" height="6" fill="${p[2]}"/><rect x="70" y="${y+28}" width="160" height="6" fill="${p[2]}"/><rect x="100" y="${y+48}" width="100" height="6" fill="${p[2]}"/>`},
moon:(r,p)=>bg(p[2])+`<circle cx="${110+r()*80|0}" cy="${110+r()*60|0}" r="60" fill="${p[3]}"/><rect y="300" width="300" height="100" fill="${p[4]}"/><rect y="345" width="300" height="55" fill="${p[1]}"/>`,
waves:(r,p)=>{let s=bg(p[0]);for(let i=0;i<4;i++){const y=170+i*55,a=20+r()*25|0;s+=`<path d="M0 ${y}Q75 ${y-a} 150 ${y}T300 ${y}V400H0Z" fill="${p[1+i%4]}"/>`}return s},
mount:(r,p)=>bg(p[0])+`<circle cx="${50+r()*200|0}" cy="90" r="28" fill="${p[3]}"/><path d="M0 330L${70+r()*60|0} ${150+r()*60|0}L170 300L${210+r()*40|0} ${200+r()*40|0}L300 340V400H0Z" fill="${p[2]}"/><path d="M0 390L${100+r()*60|0} ${260+r()*40|0}L220 380L300 310V400H0Z" fill="${p[4]}"/>`,
leaf:(r,p)=>{let s=bg(p[0])+`<path d="M150 400V80" stroke="${p[2]}" stroke-width="5"/>`;for(let i=0;i<7;i++)for(const d of[-1,1]){const x=150+d*34,y=340-i*40;s+=`<ellipse cx="${x}" cy="${y}" rx="30" ry="12" fill="${p[1+(i+(d>0?1:0))%4]}" transform="rotate(${-d*30} ${x} ${y})"/>`}return s}
};
const artSVG=a=>`<svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Rasm">${STY[a.s](rng(a.seed),PAL[a.p])}</svg>`;

/* ---- 130+ rasm ---- */
const CATS=[
 ["Abstrakt",["circles","rings","blobs"],["Rangli","Sehrli","Yengil","Chuqur","Yorqin","Maftunkor","Erkin","Mayin"],["raqs","orzu","ohang","sado","nur","tuyg'u","sir","lahza"]],
 ["Geometrik",["stripes","grid","tri"],["Qizil","Ko'k","Sariq","Yashil","Qora","Oq","Pushti","Zangori"],["kvadrat","uchburchak","doira","chiziq","shakl","naqsh","kompozitsiya","panjara"]],
 ["Minimal",["arches","sun","moon"],["Yolg'iz","Yarim","Yumshoq","Tinch","Oddiy","Nozik","Sof","Bo'sh"],["doira","yoy","quyosh","oy","chiziq","nuqta","tepalik","soya"]],
 ["Manzara",["waves","mount"],["Sokin","Oltin","Ko'k","Uzoq","Yorqin","Jimjit","Bahorgi","Kumush"],["tog'","vodiy","dengiz","cho'l","daryo","sahar","shom","qirg'oq"]],
 ["Tabiat",["leaf","leaf","blobs"],["Yashil","Bahorgi","Yovvoyi","Yosh","Kechki","Tongi","Mayin","Sokin"],["barg","gul","daraxt","novda","bog'","meva","urug'","shabnam"]]
];
const PRODUCTS=[];
CATS.forEach(([c,st,ad,no],ci)=>{for(let i=0;i<24;i++){const seed=ci*100+i+1;
  PRODUCTS.push({id:PRODUCTS.length+1,title:ad[i%8]+" "+no[(i+3*(i>>3))%8],cat:c,price:90000+Math.floor(rng(seed*7)()*15)*10000,art:{s:st[i%st.length],p:(i*3+ci)%PAL.length,seed}})}});
const net=(seed,w=400,h=600)=>`https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;
[["Sokin lahza","quiet"],["Ochiq osmon","openair"],["Oltin soat","golden"],["Mayin fokus","soft"],["Olisda","faraway"],["Yangi kun","newday"],["Tong shabadasi","dawn"],["Shahar nuri","citylight"],["Yashil vodiy","valley"],["Kech sohil","shore"],["Qor cho'qqisi","peak"],["Bahor yomg'iri","rain"]]
.forEach(([t,k],i)=>PRODUCTS.push({id:PRODUCTS.length+1,title:t,cat:"Foto",price:140000+i*5000,url:net(k),art:{s:"mount",p:i%PAL.length,seed:900+i}}));
const BASE=PRODUCTS.length;

/* hajmlar: w = rasm kengligi (sm), d = qisqa yozuv */
const SIZES={
 S:{label:"Kichik 20×30 sm",d:"20×30 sm",m:1,w:20},
 M:{label:"O'rta 40×60 sm",d:"40×60 sm",m:1.6,w:40},
 L:{label:"Katta 60×90 sm",d:"60×90 sm",m:2.4,w:60},
 XL:{label:"Juda katta 80×120 sm",d:"80×120 sm",m:3.4,w:80}
};
const price=(base,s)=>Math.round(base*SIZES[s].m/1000)*1000;
const frameOf=id=>FRAMES.find(f=>f.id===id)||NOFRAME;
const frameName=f=>f.id==="none"?"ramkasiz":f.name+" ramka";
/* rel=true: ramka qalinligi foizda (xonadagi kichik rasm uchun), aks holda pikselda */
const frameHTML=(inner,f,rel,ratio)=>{const u=rel?v=>(v/2.2)+"%":v=>v+"px";return `<div class="fr" style="padding:${u(f.w)};background:${f.bg}${ratio?";aspect-ratio:"+ratio:""}"><div class="mat" style="padding:${u(f.mw)};background:${f.m}">${inner}</div></div>`};
const frameBtns=(sel,viz)=>FRAMES.map(f=>`<button class="sw" ${viz?`data-v="frame:${f.id}"`:`data-frame="${f.id}"`} style="background:${f.bg}" title="${f.name}${f.add?" (+"+money(f.add)+")":""}" aria-label="${f.name}" aria-pressed="${f.id===sel}"></button>`).join("");
const pic=p=>p.url?`<img src="${p.url}" data-fb="${p.id}" alt="${esc(p.title)}" loading="lazy">`:artSVG(p.art);
const thOf=p=>({art:p.art,url:p.url||""});
const thumb=t=>!t?"":t.img?`<img src="${esc(t.img)}" alt="">`:t.url?`<img src="${esc(t.url)}" alt="">`:artSVG(t.art);
document.addEventListener("error",e=>{
  const i=e.target;
  if(i.tagName==="IMG"&&i.dataset.fb){const p=PRODUCTS.find(x=>x.id==i.dataset.fb);if(p){const d=document.createElement("div");d.innerHTML=artSVG(p.art);i.replaceWith(d.firstChild)}}
},true);

/* ---- SAVAT: brauzerda saqlanadi, shuning uchun sahifalar orasida yo'qolmaydi ---- */
let cart=[];
try{cart=(JSON.parse(localStorage.getItem("ap_cart"))||[]).filter(c=>c&&c.key)}catch(e){}
const saveCart=()=>{try{localStorage.setItem("ap_cart",JSON.stringify(cart))}catch(e){}};
/* Firebase sozlanmaguncha buyurtmalar shu brauzerda saqlanadi (sotuv bo'limining demo rejimi uchun) */
const localOrders={
  load:()=>{try{return JSON.parse(localStorage.getItem("ap_orders"))||[]}catch(e){return[]}},
  save:a=>{try{localStorage.setItem("ap_orders",JSON.stringify(a))}catch(e){}}
};
const badge=()=>{const e=$("#count");if(e)e.textContent=cart.reduce((a,c)=>a+c.qty,0)};
function addToCart(item){
  const ex=cart.find(c=>c.key===item.key);
  if(ex)ex.qty++;else{item.sel=true;cart.push(item)}
  saveCart();badge();toast(item.title+" savatga qo'shildi");
}
/* o'z rasmingizdan kichik nusxa (savat uchun) */
function smallImg(src,cb){
  const i=new Image();
  i.onload=()=>{const c=document.createElement("canvas"),k=Math.min(1,160/i.width);c.width=i.width*k;c.height=i.height*k;c.getContext("2d").drawImage(i,0,0,c.width,c.height);let d="";try{d=c.toDataURL("image/jpeg",.7)}catch(e){}cb(d)};
  i.onerror=()=>cb("");i.src=src;
}

/* ---- internetdan rasm tanlash oynasi ---- */
function netModal(onPick){
  const show=k=>{$("#netgrid").innerHTML=[1,2,3,4,5,6].map(i=>`<button class="netpic" data-net="${net(k+i,600,900)}" aria-label="${i}-rasmni tanlash"><img src="${net(k+i,200,300)}" alt=""></button>`).join("")};
  openModal(`<h2 id="mtitle">Internetdan rasm tanlang</h2>
  <p class="meta">Istalgan so'zni yozing, yangi suratlar chiqadi. Yoqqanini bosing.</p>
  <div class="row"><input type="text" id="kw" placeholder="masalan: dengiz" aria-label="So'z"><button class="btn" id="kwgo">Ko'rsatish</button></div>
  <div class="netgrid" id="netgrid"></div>
  <label class="f" for="url">Yoki rasm havolasini qo'ying</label>
  <div class="row"><input type="text" id="url" placeholder="https://..."><button class="btn" id="urlgo">Ishlatish</button></div>
  <div class="err" id="neterr"></div>`,true);
  show("art");
  $("#kwgo").onclick=()=>show($("#kw").value.trim()||"art");
  $("#netgrid").onclick=e=>{const b=e.target.closest("[data-net]");if(b){closeModal();onPick(b.dataset.net)}};
  $("#urlgo").onclick=()=>{
    const u=$("#url").value.trim();
    if(!/^https:\/\//i.test(u)){$("#neterr").textContent="Havola https:// bilan boshlanishi kerak.";return}
    closeModal();onPick(u);
  };
}

/* ================= 1-SAHIFA: BOSH SAHIFA ================= */
function home(){
  $("#heroWall").innerHTML=[["w1","arches",1,"gold"],["w2","circles",6,"black"],["w3","leaf",4,"brown"]].map(([c,s,p,f],i)=>`<div class="wf ${c}">${frameHTML(artSVG({s,p,seed:i+11}),frameOf(f))}</div>`).join("");
}

/* ================= 2-SAHIFA: RASMLAR ================= */
function rasmlar(){
  const K={cat:"Hammasi",shown:24},CS={};
  const csz=id=>CS[id]||"M";
  const ccard=p=>{const s=csz(p.id);return `<article class="card"><button class="pic" data-open="${p.id}" aria-label="${esc(p.title)}"><div class="frame">${pic(p)}<span class="szb">${SIZES[s].d}</span></div></button>
  <h2>${p.title}</h2><div class="meta">${p.cat}</div>
  <div class="szs" role="group" aria-label="Hajmi">${Object.entries(SIZES).map(([k,v])=>`<button class="szc" data-csz="${p.id}:${k}" aria-pressed="${k===s}">${v.d}</button>`).join("")}</div>
  <div class="price">${money(price(p.price,s))}</div>
  <button class="btn" data-cadd="${p.id}">Savatga qo'shish</button>
  <div class="row2"><button class="btn alt" data-open="${p.id}">Ramka</button>${p.id<=BASE?`<a class="btn alt" href="dizayn.html?p=${p.id}">Xonada</a>`:""}</div></article>`};
  function render(){
    const l=PRODUCTS.filter(p=>K.cat==="Hammasi"||p.cat===K.cat).sort((a,b)=>(a.id*37%131)-(b.id*37%131));
    $("#cchips").innerHTML=["Hammasi",...new Set(PRODUCTS.map(p=>p.cat))].map(c=>`<button class="chip" data-ccat="${c}" aria-pressed="${c===K.cat}">${c}</button>`).join("");
    $("#cgrid").innerHTML=l.slice(0,K.shown).map(ccard).join("");
    $("#ccnt").textContent=Math.min(K.shown,l.length)+" / "+l.length+" rasm";
    $("#cmore").style.display=K.shown<l.length?"":"none";
  }
  function openDetail(id){
    const p=PRODUCTS.find(x=>x.id===id);let s=csz(id),f=FRAMES[0];
    openModal(`<div class="detail"><div id="dprev"></div><div>
      <h2 id="mtitle">${p.title}</h2><div class="meta">${p.cat}</div>
      <label class="f">Hajmi</label><div class="chips" id="dsz"></div>
      <label class="f">Ramka: <span id="dfname"></span></label><div class="swatches" id="dframes"></div>
      <div class="dtotal" id="dprice"></div>
      <button class="btn" id="dadd">Savatga qo'shish</button></div></div>`,true);
    const upd=()=>{
      $("#dprev").innerHTML=frameHTML(pic(p),f);
      $("#dsz").innerHTML=Object.entries(SIZES).map(([k,v])=>`<button class="chip" data-k="${k}" aria-pressed="${k===s}">${v.d}</button>`).join("");
      $("#dframes").innerHTML=frameBtns(f.id);
      $("#dfname").textContent=f.name;
      $("#dprice").textContent=money(price(p.price,s)+f.add);
    };
    upd();
    $("#dsz").onclick=e=>{const b=e.target.closest("[data-k]");if(b){s=b.dataset.k;upd()}};
    $("#dframes").onclick=e=>{const b=e.target.closest("[data-frame]");if(b){f=frameOf(b.dataset.frame);upd()}};
    $("#dadd").onclick=()=>{closeModal();addToCart({key:p.id+"-"+s+"-"+f.id,title:p.title,sub:SIZES[s].label+", "+frameName(f),price:price(p.price,s)+f.add,qty:1,th:thOf(p)})};
  }
  $("#cchips").onclick=e=>{const b=e.target.closest("[data-ccat]");if(b){K.cat=b.dataset.ccat;K.shown=24;render()}};
  $("#cgrid").onclick=e=>{
    let x;
    if(x=e.target.closest("[data-csz]")){const[i,s]=x.dataset.csz.split(":");CS[i]=s;x.closest(".card").outerHTML=ccard(PRODUCTS.find(z=>z.id==i));return}
    if(x=e.target.closest("[data-cadd]")){const p=PRODUCTS.find(z=>z.id==x.dataset.cadd),s=csz(p.id);return addToCart({key:p.id+"-"+s+"-none",title:p.title,sub:SIZES[s].label+", ramkasiz",price:price(p.price,s),qty:1,th:thOf(p)})}
    if(x=e.target.closest("[data-open]"))openDetail(+x.dataset.open);
  };
  $("#cmore").onclick=()=>{K.shown+=24;render()};
  let netN=0;
  $("#cnet").onclick=()=>{
    if(!navigator.onLine)return toast("Internet yo'q. Ulanishni tekshiring.");
    const w=["ocean","forest","desert","city","sky","flower","river","snow","sunset","field","island","garden"];
    for(let i=0;i<12;i++){netN++;PRODUCTS.push({id:PRODUCTS.length+1,title:"Yangi foto "+netN,cat:"Foto",price:140000+(netN%8)*5000,url:net(w[i]+netN),art:{s:"mount",p:netN%PAL.length,seed:2000+netN}})}
    K.cat="Foto";K.shown=24;render();toast("12 ta yangi rasm yuklandi");
  };
  render();
}

/* ================= 3-SAHIFA: O'Z DIZAYNIM ================= */
/* Mebel (old tomondan ko'rinish). Haqiqiy o'lchami: divan 2.1×0.85 m, gul ~0.55×1.1 m, chiroq 0.38×1.65 m */
const SOFA=`<svg viewBox="0 0 300 120" aria-hidden="true"><defs><linearGradient id="sfB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7f8c9b"/><stop offset="1" stop-color="#5a6673"/></linearGradient><linearGradient id="sfS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8d9aa9"/><stop offset="1" stop-color="#55616e"/></linearGradient><linearGradient id="sfA" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5f6b78"/><stop offset=".5" stop-color="#76838f"/><stop offset="1" stop-color="#5f6b78"/></linearGradient></defs><rect x="22" y="6" width="256" height="64" rx="12" fill="url(#sfB)"/><rect x="34" y="14" width="114" height="50" rx="12" fill="#8794a3" stroke="rgba(0,0,0,.12)"/><rect x="152" y="14" width="114" height="50" rx="12" fill="#8794a3" stroke="rgba(0,0,0,.12)"/><rect x="40" y="38" width="46" height="34" rx="10" fill="#e0b058" transform="rotate(-8 63 55)"/><rect x="18" y="60" width="264" height="38" rx="10" fill="url(#sfS)"/><path d="M150 62v34" stroke="rgba(0,0,0,.18)" stroke-width="2"/><rect x="0" y="40" width="34" height="64" rx="12" fill="url(#sfA)"/><rect x="266" y="40" width="34" height="64" rx="12" fill="url(#sfA)"/><rect x="10" y="98" width="280" height="8" rx="3" fill="#414a54"/><rect x="24" y="104" width="8" height="15" fill="#3a2a1c"/><rect x="268" y="104" width="8" height="15" fill="#3a2a1c"/></svg>`;
const PLANT=`<svg viewBox="0 0 100 200" aria-hidden="true"><defs><linearGradient id="ptG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d9d2c6"/><stop offset=".45" stop-color="#f4f0e9"/><stop offset="1" stop-color="#bdb5a8"/></linearGradient></defs>${[[50,70,9,46,0,"#2f7d4f"],[34,88,8,40,-28,"#3d9a62"],[66,86,8,40,26,"#2a6b44"],[24,112,7,30,-55,"#35895a"],[76,110,7,30,52,"#3d9a62"],[44,60,6,34,-10,"#4aab70"],[58,64,6,32,14,"#2f7d4f"]].map(([x,y,rx,ry,r,c])=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${c}" transform="rotate(${r} ${x} ${y+ry*.8})"/>`).join("")}<path d="M26 138h48l-6 58H32z" fill="url(#ptG)"/><rect x="24" y="134" width="52" height="8" rx="2" fill="#e8e2d8"/></svg>`;
const LAMP=`<svg viewBox="0 0 60 260" aria-hidden="true"><defs><linearGradient id="lpG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbf1da"/><stop offset="1" stop-color="#ead2a0"/></linearGradient><radialGradient id="lpL"><stop offset="0" stop-color="rgba(255,230,170,.55)"/><stop offset="1" stop-color="rgba(255,230,170,0)"/></radialGradient></defs><ellipse cx="30" cy="62" rx="30" ry="22" fill="url(#lpL)"/><rect x="28.5" y="50" width="3" height="204" fill="#2b2b2b"/><path d="M8 54h44l-9-46H17z" fill="url(#lpG)"/><ellipse cx="30" cy="254" rx="16" ry="4" fill="#222"/></svg>`;

/* Namuna xona: perspektivada chiziladi. Orqa devor = R.w × R.h (haqiqiy masshtab), kamera devordan R.d+1 m uzoqda, ko'z 1.6 m balandda.
   pw, ph = rasm eni va balandligi (sm); R = xona o'lchami (m) */
function roomHTML(inner,f,pw,ph,R,w,st,fl){
  const u=560/R.w,WH=R.h*u,D=R.d+1,kE=500/280,zF=D*.7,Hw=R.w/2;
  const wy=h=>WH-h*u,yv=wy(Math.min(1.6,R.h*.6));
  const top=yv+(wy(R.h)-yv)*kE,H=yv+(wy(0)-yv)*kE-top;
  const P=(x,h,z)=>{const k=D/(D-z);return[500+x*u*k,yv+(wy(h)-yv)*k-top]};      // 3D nuqta (m) → ekran
  const pts=a=>a.map(p=>p[0].toFixed(1)+","+p[1].toFixed(1)).join(" ");
  const poly=(a,fill,ex="")=>`<polygon points="${pts(a)}" fill="${fill}"${ex}/>`;
  const line=(a,b,s,sw)=>`<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="${s}" stroke-width="${sw}"/>`;
  const [,fcol,kind]=FLOORS[fl],floor=[P(-Hw,0,0),P(Hw,0,0),P(Hw,0,zF),P(-Hw,0,zF)];
  let tex="";
  if(kind==="wood"){
    const s=.16,tint=["rgba(255,255,255,.07)","rgba(0,0,0,.05)","rgba(0,0,0,0)"];
    for(let x=-Hw,i=0;x<Hw-.001;x+=s,i++){
      tex+=poly([P(x,0,0),P(x+s,0,0),P(x+s,0,zF),P(x,0,zF)],tint[i%3])+line(P(x,0,0),P(x,0,zF),"rgba(70,40,15,.3)",1);
      for(let z=(i*.53)%1.1;z<zF;z+=1.1)tex+=line(P(x,0,z),P(x+s,0,z),"rgba(70,40,15,.28)",1);
    }
  }else{
    for(let x=-Hw;x<=Hw+.001;x+=.6)tex+=line(P(x,0,0),P(x,0,zF),"rgba(0,0,0,.16)",1.2);
    for(let z=.6;z<zF;z+=.6)tex+=line(P(-Hw,0,z),P(Hw,0,z),"rgba(0,0,0,.16)",1.2);
  }
  /* deraza chap devorda, undan polga yorug'lik tushadi */
  const z1=.45,z2=Math.min(1.75,zF*.8),h1=.9,h2=Math.min(2.3,R.h-.3),win=z2-z1>.4&&h2-h1>.6;
  const rw=Math.min(1.1,Hw*.75),sw=Math.min(2.1,R.w*.65);
  const shell=`<svg class="vshell" viewBox="0 0 1000 ${H.toFixed(1)}" preserveAspectRatio="none" aria-hidden="true"><defs>
    <clipPath id="vfc"><polygon points="${pts(floor)}"/></clipPath>
    <linearGradient id="vflg" gradientUnits="userSpaceOnUse" x1="0" y1="${P(0,0,0)[1].toFixed(1)}" x2="0" y2="${H.toFixed(1)}"><stop offset="0" stop-color="rgba(0,0,0,.25)"/><stop offset="1" stop-color="rgba(255,255,255,.06)"/></linearGradient>
    <linearGradient id="vceil" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbfaf7"/><stop offset="1" stop-color="#e4e0d8"/></linearGradient>
    <linearGradient id="vsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe0f7"/><stop offset="1" stop-color="#f4fbff"/></linearGradient>
    <filter id="vbl" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6"/></filter></defs>
    ${poly([P(-Hw,R.h,zF),P(Hw,R.h,zF),P(Hw,R.h,0),P(-Hw,R.h,0)],"url(#vceil)")}
    ${poly([P(-Hw,R.h,zF),P(-Hw,R.h,0),P(-Hw,0,0),P(-Hw,0,zF)],w)}${poly([P(-Hw,R.h,zF),P(-Hw,R.h,0),P(-Hw,0,0),P(-Hw,0,zF)],"rgba(0,0,0,.06)")}
    ${poly([P(Hw,R.h,zF),P(Hw,R.h,0),P(Hw,0,0),P(Hw,0,zF)],w)}${poly([P(Hw,R.h,zF),P(Hw,R.h,0),P(Hw,0,0),P(Hw,0,zF)],"rgba(0,0,0,.17)")}
    ${win?poly([P(-Hw,h1,z1),P(-Hw,h2,z1),P(-Hw,h2,z2),P(-Hw,h1,z2)],"#fbfaf6")+poly([P(-Hw,h1+.06,z1+.06),P(-Hw,h2-.06,z1+.06),P(-Hw,h2-.06,z2-.06),P(-Hw,h1+.06,z2-.06)],"url(#vsky)")+line(P(-Hw,h1,(z1+z2)/2),P(-Hw,h2,(z1+z2)/2),"#fbfaf6",5):""}
    ${poly(floor,fcol)}<g clip-path="url(#vfc)">${tex}
      ${win?poly([P(-Hw,0,z1),P(-Hw,0,z2),P(-Hw+1.4,0,z2+.6),P(-Hw+1.4,0,z1+.6)],"rgba(255,247,220,.22)",' filter="url(#vbl)"'):""}
      ${poly([P(-rw,0,.75),P(rw,0,.75),P(rw,0,2.3),P(-rw,0,2.3)],"#9a4a52")}${poly([P(-rw+.08,0,.83),P(rw-.08,0,.83),P(rw-.08,0,2.22),P(-rw+.08,0,2.22)],"none",' stroke="rgba(255,232,200,.55)" stroke-width="2"')}
      ${poly(floor,"url(#vflg)")}
      ${poly([P(-sw/2,0,.05),P(sw/2,0,.05),P(sw/2,0,.95),P(-sw/2,0,.95)],"rgba(0,0,0,.3)",' filter="url(#vbl)"')}
    </g>
    ${poly([P(-Hw,0,0),P(-Hw,.09,0),P(-Hw,.09,zF),P(-Hw,0,zF)],"#f1eee7")}${poly([P(Hw,0,0),P(Hw,.09,0),P(Hw,.09,zF),P(Hw,0,zF)],"#dcd8cf")}
    <g filter="url(#vbl)" opacity=".5">${line(P(-Hw,0,0),P(-Hw,R.h,0),"rgba(0,0,0,.35)",8)}${line(P(Hw,0,0),P(Hw,R.h,0),"rgba(0,0,0,.35)",8)}${line(P(-Hw,R.h,0),P(Hw,R.h,0),"rgba(0,0,0,.25)",8)}</g>
  </svg>`;
  /* orqa devor (rasm shu yerda), HTML qatlam: foizlar orqa devorga nisbatan */
  const pt=WPAT[st],wt=P(-Hw,R.h,0)[1],
        bm=Math.max(.15,Math.min(1.55-ph/200,R.h-ph/100-.1));   // rasm markazi taxminan 1.5 m balandlikda
  const wall=`<div class="vwall2" style="left:22%;width:56%;top:${wt/H*100}%;height:${WH/H*100}%;background-color:${w};background-image:${pt[0]},linear-gradient(90deg,rgba(255,246,220,.28),transparent 45%),linear-gradient(rgba(0,0,0,.07),transparent 30%,transparent 80%,rgba(0,0,0,.08));background-size:${pt[1]},auto,auto">
    ${st==="panel"?'<div class="pnl"></div>':""}<div class="vbase" style="height:${.09/R.h*100}%"></div>
    <div class="vp" style="width:${pw/(R.w*100)*100}%;bottom:${bm/R.h*100}%">${frameHTML(inner,f,true,pw+"/"+ph)}</div></div>`;
  const obj=(svg,x,z,wm)=>{const p=P(x,0,z),k=D/(D-z);return `<div class="vobj" style="left:${p[0]/10}%;bottom:${(H-p[1])/H*100}%;width:${wm*u*k/10}%">${svg}</div>`};
  return `<div class="vr" role="img" aria-label="Namuna xona ${R.w}×${R.h} m, devorda ${Math.round(pw)}×${Math.round(ph)} sm rasm" style="aspect-ratio:1000/${H.toFixed(1)}">${shell}${wall}
    ${obj(SOFA,0,.95,sw)}${obj(PLANT,Hw-.4,.4,.55)}${R.w>=2.5?obj(LAMP,-Hw+.35,.35,.38):""}<div class="vlight"></div></div>`;
}
/* O'z xonam: foydalanuvchi surati ustiga rasm qo'yiladi. wallW = suratda ko'rinadigan devor eni (m), pos = rasm markazi (0..1) */
function photoRoomHTML(inner,f,pw,ph,RP,wallW,pos){
  const wp=Math.min(95,pw/(wallW*100)*100);
  return `<div class="vr vphoto" style="aspect-ratio:${RP.w}/${RP.h}"><img class="vbg" src="${esc(RP.src)}" alt="Xonangiz surati">
    <div class="vp vdrag" style="left:${pos.x*100}%;top:${pos.y*100}%;width:${wp}%">${frameHTML(inner,f,true,pw+"/"+ph)}</div>
    <div class="vhint">✋ Rasmni suring</div></div>`;
}
function dizayn(){
  const V={src:"1",wall:WALLS[0],st:"plain",frame:"black",floor:"wood",mode:"sample"};
  let custom=null,RP=null;const pos={x:.5,y:.4};      // RP = xona surati {src,w,h}
  const qp=new URLSearchParams(location.search).get("p");
  if(qp&&PRODUCTS.some(x=>x.id==qp))V.src=String(+qp);
  $("#vsrc").innerHTML=`<option value="custom">📷 O'z suratim (yuklash)</option>`+[...new Set(PRODUCTS.map(p=>p.cat))].map(c=>`<optgroup label="${c}">${PRODUCTS.filter(p=>p.cat===c).map(p=>`<option value="${p.id}">${p.title}</option>`).join("")}</optgroup>`).join("");
  const chipB=(k,v,t,sel)=>`<button class="chip" data-v="${k}:${v}" aria-pressed="${sel===v}">${t}</button>`;
  const vProd=()=>V.src==="custom"?null:PRODUCTS.find(x=>x.id==V.src);
  const inner=()=>{const p=vProd();return p?pic(p):custom?`<img src="${esc(custom)}" alt="Rasmingiz">`:"<span>Rasmingiz shu yerda ko'rinadi</span>"};
  const nm=v=>Number(v.toFixed(2));
  const num=(id,min,max,def)=>{const v=parseFloat($(id).value);return isFinite(v)?Math.min(max,Math.max(min,v)):def};
  const dims=()=>({R:{w:num("#rw",1.5,12,3.5),h:num("#rh",2,5,3),d:num("#rd",1.5,12,4)},pw:num("#pw",10,400,40),ph:num("#ph",10,400,60)});
  /* NARX: rasm devor maydonining qancha qismini egallasa, xona hajmining shu qismi (m³) x 1 m³ narxi */
  const calcP=(R,pw,ph)=>{const vol=R.w*R.h*R.d,frac=Math.min(1,(pw/100)*(ph/100)/(R.w*R.h)),m3=frac*vol;return{vol,frac,m3,sum:Math.round(m3*CONFIG.pricePerM3/1000)*1000}};
  const PRESETS=["20x30","40x60","60x90","80x120","100x150"];
  function render(){
    const {R,pw,ph}=dims(),f=frameOf(V.frame),c=calcP(R,pw,ph),photo=V.mode==="photo",wallW=num("#phw",.5,20,3);
    const fit=photo?Math.min(1,wallW*95/pw):Math.min(1,R.w*95/pw,R.h*85/ph);
    $("#vroom").innerHTML=!photo?roomHTML(inner(),f,pw*fit,ph*fit,R,V.wall,V.st,V.floor)
      :RP?photoRoomHTML(inner(),f,pw*fit,ph*fit,RP,wallW,pos)
      :`<div class="vr vempty"><label for="rfile"><span class="ico">🏠</span><br>Xonangiz suratini yuklang</label></div>`;
    $("#vmode").innerHTML=chipB("mode","sample","Namuna xona",V.mode)+chipB("mode","photo","📷 O'z xonam",V.mode);
    $("#photoCtl").hidden=!photo;$("#sampleCtl").hidden=photo;
    $("#vcap").innerHTML=`<span>Xona: <b>${photo?"sizning suratingiz":nm(R.w)+"×"+nm(R.h)+"×"+nm(R.d)+" m"}</b></span><span>Rasm: <b>${nm(pw)}×${nm(ph)} sm</b></span><span>Ramka: <b>${f.name}</b></span>`;
    $("#vcalc").innerHTML=`<div class="sr"><span>Xona hajmi</span><span>${nm(R.w)} × ${nm(R.h)} × ${nm(R.d)} = ${nm(c.vol)} m³</span></div>
      <div class="sr"><span>Rasm devor maydonining</span><span>${(c.frac*100).toFixed(2)}%</span></div>
      <div class="sr"><span>Rasm hajmi ulushi</span><span>${nm(c.m3)} m³</span></div>
      <div class="sr"><span>Narx (1 m³ = ${money(CONFIG.pricePerM3)})</span><span>${money(c.sum)}</span></div>
      <div class="sr"><span>Ramka (${f.name})</span><span>+${money(f.add)}</span></div>
      ${fit<1?`<div class="warn">Rasm devorga sig'maydi, ko'rsatish uchun kichraytirildi. Narx haqiqiy o'lcham bo'yicha.</div>`:""}`;
    $("#vsrc").value=V.src;
    $("#vwalls").innerHTML=WALLS.map((w,i)=>`<button class="sw" data-v="wall:${w}" style="background:${w}" aria-label="${i+1}-rang" aria-pressed="${w===V.wall}"></button>`).join("");
    $("#vwc").value=/^#[0-9a-f]{6}$/i.test(V.wall)?V.wall:"#ffffff";
    $("#vstyle").innerHTML=Object.entries(STYLES).map(([k,v])=>chipB("st",k,v,V.st)).join("");
    $("#vfloor").innerHTML=Object.entries(FLOORS).map(([k,v])=>chipB("floor",k,v[0],V.floor)).join("");
    $("#vps").innerHTML=PRESETS.map(s=>`<button class="chip" data-ps="${s}" aria-pressed="${s===nm(pw)+"x"+nm(ph)}">${s.replace("x","×")} sm</button>`).join("");
    $("#vframes").innerHTML=frameBtns(V.frame,true)+`<div class="fname">${f.name} (+${money(f.add)})</div>`;
    $("#vtotal").textContent=money(c.sum+f.add);
    $("#vadd").disabled=!vProd()&&!custom;
  }
  $(".viz").addEventListener("click",e=>{const x=e.target.closest("[data-v]");if(!x)return;const s=x.dataset.v,i=s.indexOf(":");V[s.slice(0,i)]=s.slice(i+1);render()});
  $("#vps").onclick=e=>{const b=e.target.closest("[data-ps]");if(!b)return;const a=b.dataset.ps.split("x");$("#pw").value=a[0];$("#ph").value=a[1];render()};
  ["#rw","#rh","#rd","#pw","#ph","#phw"].forEach(s=>$(s).addEventListener("input",render));
  /* xona surati: brauzer ichida qoladi, hech qayerga yuborilmaydi */
  function takeRoom(f){
    $("#rErr").textContent="";
    if(!f)return;
    if(!f.type.startsWith("image/")){$("#rErr").textContent="Rasm faylini tanlang (JPG, PNG, WEBP).";return}
    if(f.size>25*1024*1024){$("#rErr").textContent="Fayl juda katta. Eng ko'pi bilan 25 MB.";return}
    const src=URL.createObjectURL(f),img=new Image();
    img.onload=()=>{if(RP)URL.revokeObjectURL(RP.src);RP={src,w:img.naturalWidth,h:img.naturalHeight};pos.x=.5;pos.y=.4;V.mode="photo";render()};
    img.onerror=()=>{URL.revokeObjectURL(src);$("#rErr").textContent="Suratni ochib bo'lmadi. Boshqa fayl tanlang."};
    img.src=src;
  }
  $("#rfile").addEventListener("change",e=>{takeRoom(e.target.files[0]);e.target.value=""});
  /* rasmni xona suratida sichqoncha yoki barmoq bilan surish */
  let drag=null;
  $("#vroom").addEventListener("pointerdown",e=>{
    const el=e.target.closest(".vdrag");if(!el)return;
    const r=el.parentElement.getBoundingClientRect();
    drag={el,r,dx:e.clientX-(r.left+pos.x*r.width),dy:e.clientY-(r.top+pos.y*r.height)};
    el.setPointerCapture(e.pointerId);e.preventDefault();
  });
  $("#vroom").addEventListener("pointermove",e=>{
    if(!drag)return;
    const {el,r,dx,dy}=drag;
    pos.x=Math.min(1,Math.max(0,(e.clientX-dx-r.left)/r.width));
    pos.y=Math.min(1,Math.max(0,(e.clientY-dy-r.top)/r.height));
    el.style.left=pos.x*100+"%";el.style.top=pos.y*100+"%";
  });
  ["pointerup","pointercancel"].forEach(ev=>$("#vroom").addEventListener(ev,()=>{drag=null}));
  $("#vsrc").onchange=e=>{V.src=e.target.value;render()};
  $("#vwc").oninput=e=>{V.wall=e.target.value;render()};
  function setCustom(src){
    const img=new Image();
    img.onload=()=>{custom=src;V.src="custom";$("#fileErr").textContent="";render()};
    img.onerror=()=>{$("#fileErr").textContent="Rasmni yuklab bo'lmadi. Havolani yoki internetni tekshiring."};
    img.src=src;
  }
  function takeFile(f){
    $("#fileErr").textContent="";
    if(!f)return;
    if(!f.type.startsWith("image/")){$("#fileErr").textContent="Rasm faylini tanlang (JPG, PNG, WEBP).";return}
    if(f.size>10*1024*1024){$("#fileErr").textContent="Fayl juda katta. Eng ko'pi bilan 10 MB.";return}
    const r=new FileReader();
    r.onload=()=>setCustom(r.result);
    r.onerror=()=>{$("#fileErr").textContent="Faylni o'qib bo'lmadi. Boshqa fayl tanlang."};
    r.readAsDataURL(f);
  }
  $("#file").addEventListener("change",e=>takeFile(e.target.files[0]));
  const dropZone=(dz,fn)=>{
    ["dragenter","dragover"].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.add("over")}));
    ["dragleave","drop"].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.remove("over")}));
    dz.addEventListener("drop",e=>fn(e.dataTransfer.files[0]));
  };
  dropZone($("#drop"),takeFile);
  dropZone($("#rdrop"),takeRoom);
  $("#netBtn").onclick=()=>netModal(setCustom);
  $("#vadd").onclick=()=>{
    const {R,pw,ph}=dims(),f=frameOf(V.frame),c=calcP(R,pw,ph),p=vProd(),total=c.sum+f.add;
    const sub=`Rasm ${nm(pw)}×${nm(ph)} sm, xona ${nm(R.w)}×${nm(R.h)}×${nm(R.d)} m, ${frameName(f)}`;
    if(p)return addToCart({key:"viz-"+p.id+"-"+nm(pw)+"x"+nm(ph)+"-"+nm(R.w)+"x"+nm(R.h)+"x"+nm(R.d)+"-"+f.id,title:p.title,sub,price:total,qty:1,th:thOf(p)});
    if(!custom)return;
    const title=$("#vtitle").value.trim()||"Mening rasmim",src=custom;
    smallImg(src,d=>addToCart({key:"custom-"+Date.now(),title,sub,price:total,qty:1,th:d?{img:d}:{url:src}}));
  };
  render();
}

/* ================= 4-SAHIFA: ALOQA (egasi va ma'lumotlar) ================= */
function aloqa(){
  const o=CONFIG.owner,tel="tel:"+CONFIG.phone.replace(/\s/g,"");
  $("#ava").innerHTML=o.photo?`<img src="${esc(o.photo)}" alt="${esc(o.name)}">`:esc(o.name.charAt(0));
  $("#oq").textContent=o.quote?"“"+o.quote+"”":"";
  $("#oname").textContent=o.name;
  $("#orole").textContent=o.role;
  $("#ocall").href=tel;
  $("#cinfo").innerHTML=[["📞","Telefon",`<a href="${tel}">${CONFIG.phone}</a>`],["✈️","Telegram",esc(CONFIG.telegram)],["✉️","Email",CONFIG.email?`<a href="mailto:${CONFIG.email}">${CONFIG.email}</a>`:""],["📍","Manzil",esc(CONFIG.address)],["🕘","Ish vaqti",esc(CONFIG.hours)]]
    .filter(r=>r[2]).map(([i,t,v])=>`<div class="feat"><div class="ico">${i}</div><h3>${t}</h3><p>${v}</p></div>`).join("");
}

/* ================= 5-SAHIFA: SAVAT ================= */
function savat(){
  let promo=null,pmsg="",view="cart",order=null,msg="";
  const co={delivery:"home",pay:"click",name:"",phone:"+998 ",addr:""};
  const app=$("#cartApp");
  const PAYS=[["click","Click","Click ilovasi yoki karta orqali"],["payme","Payme","Payme ilovasi yoki karta orqali"],["uzum","Uzum","Uzum Bank orqali"],["cash","Naqd pul","Yetkazilganda to'lanadi"]];
  const calc=()=>{const s=cart.filter(c=>c.sel),sub=s.reduce((a,c)=>a+c.qty*c.price,0),disc=promo?Math.round(sub*promo.pct/100):0;return{sub,disc,n:s.reduce((a,c)=>a+c.qty,0),tot:sub-disc}};
  const feeOf=t=>co.delivery==="pickup"?0:(t.tot>=CONFIG.freeFrom?0:CONFIG.deliveryFee);
  const save=()=>{saveCart();badge()};
  const sumRows=(t,fee)=>`<div class="sr"><span>Mahsulotlar (${t.n})</span><span>${money(t.sub)}</span></div>
    ${t.disc?`<div class="sr disc"><span>Chegirma (${promo.code})</span><span>−${money(t.disc)}</span></div>`:""}
    ${fee===null?"":`<div class="sr"><span>Yetkazish</span><span>${fee?money(fee):"Bepul"}</span></div>`}
    <div class="sr tot"><span>Jami</span><span>${money(t.tot+(fee||0))}</span></div>`;
  const optB=(k,v,t,s,extra="")=>`<button class="opt" data-opt="${k}:${v}" aria-pressed="${co[k]===v}">${extra}<b>${t}</b><span>${s}</span></button>`;

  function render(){
    const t=calc(),fee=feeOf(t);
    if(view==="sending"){
      app.innerHTML=`<div class="blk center"><div class="ico">⏳</div><h2>Buyurtma yuborilmoqda...</h2><p>Sahifani yopmang.</p></div>`;
      return;
    }
    if(view==="done"){
      app.innerHTML=`<div class="blk center"><div class="ico">🎉</div><h2>Rahmat, ${esc(order.name)}!</h2><p>Buyurtma <strong>${order.no}</strong> qabul qilindi. Jami: <strong>${money(order.amount)}</strong>.</p><p>${order.cash?"To'lov buyurtma yetkazilganda amalga oshiriladi.":"To'lov muvaffaqiyatli o'tdi (demo)."} Sotuvchi buyurtmani tasdiqlagach, ${esc(co.phone)} raqamiga qo'ng'iroq qilamiz.</p>${order.manual?`<p class="ok">Buyurtma matni nusxalandi. Ochilgan Telegram chatiga joylab yuboring.</p>`:""}${order.failed?`<p class="err">Buyurtmani yuborib bo'lmadi. Iltimos, ${esc(CONFIG.phone)} raqamiga qo'ng'iroq qiling.</p>`:""}<a class="btn" href="rasmlar.html">Xaridni davom ettirish</a></div>`;
      return;
    }
    if(view==="pay"){
      const p=PAYS.find(x=>x[0]===co.pay);
      app.innerHTML=`<div class="blk center"><span class="pb ${p[0]}">${p[1]}</span><h2>${p[1]} orqali to'lash</h2><p>Buyurtma <strong>${order.no}</strong></p><div class="dtotal">${money(order.amount)}</div><p class="meta">Demo rejim: haqiqiy pul yechilmaydi. Haqiqiy to'lov uchun ${p[1]} bilan shartnoma va sozlamalar kerak.</p><button class="btn" data-payok>To'lovni tasdiqlash (demo)</button> <button class="btn alt" data-tocheck>Bekor qilish</button></div>`;
      return;
    }
    if(!cart.length){
      app.innerHTML=`<div class="blk center"><div class="ico">🛒</div><h2>Savatingiz bo'sh</h2><p>Yoqqan rasmni tanlang va savatga qo'shing.</p><a class="btn" href="rasmlar.html">Rasmlarni ko'rish</a></div>`;
      return;
    }
    if(view==="check"){
      app.innerHTML=`<button class="rm2 back" data-tocart>← Savatga qaytish</button><div class="cartv"><div>
      <div class="blk"><h2 class="bh">Qabul qiluvchi</h2>
        <label class="f" for="fn">Ism va familiya</label><input type="text" id="fn" data-co="name" value="${esc(co.name)}" autocomplete="name" required>
        <label class="f" for="fp">Telefon raqami</label><input type="tel" id="fp" data-co="phone" value="${esc(co.phone)}" autocomplete="tel" inputmode="tel" required></div>
      <div class="blk"><h2 class="bh">Olish usuli</h2><div class="opts">${optB("delivery","home","🚚 Yetkazib berish","Manzilingizga, 3–5 kun")}${optB("delivery","pickup","🏬 Do'kondan olib ketish","Bepul")}</div>
        ${co.delivery==="home"?`<label class="f" for="fa">Yetkazish manzili</label><input type="text" id="fa" data-co="addr" value="${esc(co.addr)}" autocomplete="street-address" required>`:`<p class="meta" style="margin-top:12px">Manzil: ${esc(CONFIG.address)}</p>`}</div>
      <div class="blk"><h2 class="bh">To'lov usuli</h2><div class="opts">${PAYS.map(([id,n,s])=>optB("pay",id,n,s,`<span class="pb ${id}">${n}</span>`)).join("")}</div></div>
      </div><section class="sumbox" aria-label="Buyurtma xulosasi"><h2 class="bh">Buyurtmangiz</h2>${sumRows(t,fee)}<div class="err">${msg}</div>
      <button class="btn big" data-confirm ${t.n?"":"disabled"}>Buyurtmani tasdiqlash</button></section></div>`;
      return;
    }
    app.innerHTML=`<div class="cartv"><div>
      <div class="ctools"><label class="chkl"><input type="checkbox" data-call ${cart.every(c=>c.sel)?"checked":""}> Hammasini tanlash</label><button class="rm2" data-cdel>Tanlanganlarni o'chirish</button></div>
      <ul class="clist" aria-label="Savatdagi mahsulotlar">${cart.map((c,i)=>`<li class="citem"><input type="checkbox" data-csel="${i}" ${c.sel?"checked":""} aria-label="${esc(c.title)}: tanlash"><div class="th">${thumb(c.th)}</div>
        <div class="ci"><strong>${esc(c.title)}</strong><div class="meta">${esc(c.sub)}</div><button class="rmb" data-crm="${i}">O'chirish</button></div>
        <div class="cr"><div class="step2"><button data-cdec="${i}" aria-label="${esc(c.title)}: kamaytirish">−</button><span aria-label="Soni">${c.qty}</span><button data-cinc="${i}" aria-label="${esc(c.title)}: ko'paytirish">+</button></div><strong>${money(c.price*c.qty)}</strong></div></li>`).join("")}</ul>
      </div><section class="sumbox" aria-label="Buyurtma xulosasi"><h2 class="bh">Buyurtmangiz</h2>${sumRows(t,null)}
      <div class="promo"><input type="text" id="pcode" placeholder="Promokod" value="${promo?promo.code:""}" aria-label="Promokod"><button class="btn soft" data-papply>Qo'llash</button></div>
      <div class="${promo?"ok":"err"}">${pmsg}</div>
      <button class="btn big" data-tocheck ${t.n?"":"disabled"}>Rasmiylashtirishga o'tish</button>
      <div class="note">${money(CONFIG.freeFrom)} dan yuqori buyurtmada yetkazish bepul. Promokodlar: ${Object.keys(CONFIG.promos).join(", ")}</div></section></div>`;
  }

  function payLink(m,o){
    const P=CONFIG.pay;
    if(m==="payme"&&P.payme.merchant)return"https://checkout.paycom.uz/"+btoa(`m=${P.payme.merchant};ac.order_id=${o.no};a=${o.amount*100}`);
    if(m==="click"&&P.click.service&&P.click.merchant)return`https://my.click.uz/services/pay?service_id=${P.click.service}&merchant_id=${P.click.merchant}&amount=${o.amount}&transaction_param=${o.no}`;
    if(m==="uzum"&&P.uzum.url)return P.uzum.url+(P.uzum.url.includes("?")?"&":"?")+`order=${o.no}&amount=${o.amount}`;
    return"";
  }
  /* buyurtma matni tasdiqlash paytida tuziladi, chunki keyin savat tozalanadi */
  function orderText(o,t){
    const items=cart.filter(c=>c.sel).map((c,i)=>`${i+1}. ${c.title} (${c.sub}) x${c.qty} = ${money(c.price*c.qty)}`).join("\n");
    const payName=(PAYS.find(p=>p[0]===co.pay)||[,co.pay])[1];
    return `🛒 Yangi buyurtma ${o.no}\n\n👤 ${o.name}\n📞 ${co.phone}\n`+
      (co.delivery==="home"?`🚚 Yetkazib berish: ${co.addr.trim()}\n`:`🏬 Do'kondan olib ketish\n`)+
      `💳 To'lov: ${payName}\n\n${items}\n\n`+
      (t.disc?`Chegirma (${promo.code}): -${money(t.disc)}\n`:"")+
      `Jami: ${money(o.amount)}`;
  }
  /* Firebase'ga (sotuv bo'limi) va/yoki botga yuboriladi; ikkalasi ham bo'lmasa matn nusxalanib Telegram ochiladi.
     15 soniyada javob bo'lmasa yuborilmadi deb hisoblanadi. */
  function notify(o,status){
    const text=`${o.text}\n\n📌 Holat: ${status}`,B=CONFIG.bot,jobs=[];
    if(!DB)localOrders.save([{...o.data,payNote:status,status:"yangi",createdAt:Date.now(),id:"L"+Date.now()},...localOrders.load()]);
    if(DB)jobs.push(DB.collection("orders").add({...o.data,payNote:status,status:"yangi",createdAt:firebase.firestore.FieldValue.serverTimestamp()}));
    if(B.token&&B.chatId)jobs.push(fetch(`https://api.telegram.org/bot${B.token}/sendMessage`,{method:"POST",body:new URLSearchParams({chat_id:B.chatId,text}),keepalive:true}).then(r=>{if(!r.ok)throw r.status}));
    if(!jobs.length){
      o.manual=true;
      try{navigator.clipboard.writeText(text).catch(()=>{})}catch(e){}
      window.open(`https://t.me/+${digits(CONFIG.telegram)}`,"_blank");
      return Promise.resolve();
    }
    const late=new Promise((_,no)=>setTimeout(no,15000));
    return Promise.race([Promise.all(jobs),late]).catch(()=>{o.failed=true});
  }
  function finish(status){
    view="sending";render();
    notify(order,status).then(()=>{
      if(!order.failed){cart=cart.filter(c=>!c.sel);promo=null;pmsg="";save()}
      view="done";render();
    });
  }
  function confirmOrder(){
    const t=calc(),ph=digits(co.phone);
    if(!co.name.trim())msg="Ism va familiyangizni kiriting.";
    else if(ph.length<12)msg="Telefon raqamini to'liq kiriting, masalan +998 90 123 45 67.";
    else if(co.delivery==="home"&&!co.addr.trim())msg="Yetkazish manzilini kiriting.";
    else if(!navigator.onLine)msg="Internet yo'q. Ulanishni tekshiring.";
    else msg="";
    if(msg)return render();
    order={no:"AP-"+Math.floor(10000+Math.random()*90000),amount:t.tot+feeOf(t),name:co.name.trim(),cash:co.pay==="cash"};
    order.text=orderText(order,t);
    order.data={no:order.no,name:order.name,phone:co.phone.trim(),delivery:co.delivery,addr:co.delivery==="home"?co.addr.trim():"",pay:co.pay,
      items:cart.filter(c=>c.sel).map(c=>({title:c.title,sub:c.sub,qty:c.qty,price:c.price})),disc:t.disc,promo:promo?promo.code:"",amount:order.amount};
    if(order.cash)return finish("Naqd, yetkazilganda to'lanadi");
    const link=payLink(co.pay,order);
    if(link){view="sending";render();notify(order,"To'lov sahifasiga o'tdi, to'lovni tekshiring").then(()=>{location.href=link});return}
    view="pay";render();
  }

  app.addEventListener("click",e=>{
    const g=a=>e.target.closest(`[${a}]`);let x;
    if(x=g("data-cinc")){cart[x.dataset.cinc].qty++;save();return render()}
    if(x=g("data-cdec")){const c=cart[x.dataset.cdec];if(--c.qty<1)cart.splice(x.dataset.cdec,1);save();return render()}
    if(x=g("data-crm")){cart.splice(x.dataset.crm,1);save();return render()}
    if(g("data-cdel")){cart=cart.filter(c=>!c.sel);save();return render()}
    if(g("data-papply")){
      const c=$("#pcode").value.trim().toUpperCase();
      promo=c&&CONFIG.promos[c]?{code:c,pct:CONFIG.promos[c]}:null;
      pmsg=c?(promo?"Promokod qo'llandi!":"Bunday promokod topilmadi."):"";
      return render();
    }
    if(g("data-tocheck")){view="check";msg="";return render()}
    if(g("data-tocart")){view="cart";return render()}
    if(x=g("data-opt")){const[k,v]=x.dataset.opt.split(":");co[k]=v;return render()}
    if(g("data-confirm"))return confirmOrder();
    if(g("data-payok"))return finish("To'landi (demo)");
  });
  app.addEventListener("change",e=>{
    const t=e.target;
    if(t.dataset.csel!==undefined){cart[t.dataset.csel].sel=t.checked;save();render()}
    else if(t.dataset.call!==undefined){cart.forEach(c=>c.sel=t.checked);save();render()}
  });
  app.addEventListener("input",e=>{const k=e.target.dataset.co;if(k)co[k]=e.target.value});
  render();
}

/* ================= 6-SAHIFA: SOTUV BO'LIMI (egasi va xodimlar) =================
   Kirish Google orqali. Kim nimani ko'ra olishini firestore.rules tekshiradi, bu yerdagi tekshiruv faqat ko'rinish uchun. */
function sotuv(){
  const app=$("#adminApp"),LOCAL=!DB||!AUTH;
  const ST={yangi:"Yangi",tasdiqlandi:"Tasdiqlandi",yetkazildi:"Yetkazildi",bekor:"Bekor qilingan"};
  const NEXT={yangi:[["tasdiqlandi","Tasdiqlash",""],["bekor","Bekor qilish","alt"]],tasdiqlandi:[["yetkazildi","Yetkazildi",""],["bekor","Bekor qilish","alt"]],yetkazildi:[],bekor:[["yangi","Qayta ochish","alt"]]};
  const PAYN={click:"Click",payme:"Payme",uzum:"Uzum",cash:"Naqd pul"};
  const owner=String(window.OWNER_EMAIL||"").trim().toLowerCase();
  let user=null,access=null,isOwner=false,orders=[],staff=[],filter="yangi",period="oy",subs=[],err="",newEmail="";
  const stop=()=>{subs.forEach(f=>f());subs=[]};
  const tsOf=d=>d&&d.toDate?d.toDate().getTime():typeof d==="number"?d:0;
  const when=d=>tsOf(d)?new Date(tsOf(d)).toLocaleString("ru-RU"):"";

  /* STATISTIKA: faqat tasdiqlangan va yetkazilgan buyurtmalar sotilgan hisoblanadi */
  const PER={kun:"Bugun",oy:"Shu oy",hammasi:"Hammasi"};
  function statsHTML(){
    const now=new Date(),from=period==="kun"?new Date(now).setHours(0,0,0,0):period==="oy"?new Date(now.getFullYear(),now.getMonth(),1).getTime():0;
    const sold=orders.filter(o=>(o.status==="tasdiqlandi"||o.status==="yetkazildi")&&tsOf(o.createdAt)>=from);
    let pcs=0,rev=0;const byT={},byS={};
    sold.forEach(o=>{rev+=+o.amount||0;(Array.isArray(o.items)?o.items:[]).forEach(i=>{
      const q=+i.qty||0,m=/(\d+)×(\d+)\s*sm/.exec(i.sub||"");pcs+=q;
      byT[i.title]=(byT[i.title]||0)+q;
      if(m){const k=m[1]+"×"+m[2]+" sm";byS[k]=(byS[k]||0)+q}
    })});
    const top=o=>Object.entries(o).sort((a,b)=>b[1]-a[1]).slice(0,5);
    const topList=o=>top(o).map(([k,n],i)=>`<div class="sr"><span>${i+1}. ${esc(k)}</span><span>${n} dona</span></div>`).join("")||`<p class="meta">Hali sotuv yo'q.</p>`;
    const best=o=>{const t=top(o)[0];return t?`${esc(t[0])}<small>${t[1]} dona</small>`:"—"};
    const pct=+CONFIG.costPct;
    const profit=pct>0?money(Math.round(rev*(1-pct/100)/1000)*1000)+`<small>tannarx ${pct}% hisobida</small>`:`—<small>script.js da CONFIG.costPct ni yozing</small>`;
    return `<div class="blk"><div class="ordh"><h2 class="bh">Sotuvlar</h2><div class="chips" role="group" aria-label="Davr" style="margin:0 0 0 auto">${Object.entries(PER).map(([k,v])=>`<button class="chip" data-per="${k}" aria-pressed="${k===period}">${v}</button>`).join("")}</div></div>
      <div class="kpis">
        <div class="kpi"><span>Sotilgan rasmlar</span><b>${pcs} dona</b><small>${sold.length} ta buyurtma</small></div>
        <div class="kpi"><span>Tushum</span><b>${money(rev)}</b><small>yetkazish va chegirma bilan</small></div>
        <div class="kpi"><span>Foyda</span><b>${profit}</b></div>
        <div class="kpi"><span>Eng ko'p sotilgan rasm</span><b>${best(byT)}</b></div>
        <div class="kpi"><span>Eng ko'p sotilgan razmer</span><b>${best(byS)}</b></div>
      </div>
      <div class="tops"><div><h3 class="bh">Top rasmlar</h3>${topList(byT)}</div><div><h3 class="bh">Top razmerlar</h3>${topList(byS)}</div></div></div>`;
  }
  const isEmail=s=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

  const ordHTML=o=>`<div class="blk ord"><div class="ordh"><strong>${esc(o.no)}</strong><span class="st st-${esc(o.status)}">${esc(ST[o.status]||o.status)}</span><span class="meta">${when(o.createdAt)}</span></div>
    <div>👤 ${esc(o.name)} · <a href="tel:+${digits(String(o.phone||""))}">${esc(o.phone)}</a></div>
    <div>${o.delivery==="home"?"🚚 "+esc(o.addr):"🏬 Do'kondan olib ketish"}</div>
    <div>💳 ${esc(PAYN[o.pay]||o.pay)}: ${esc(o.payNote||"")}</div>
    <ol class="oitems">${(Array.isArray(o.items)?o.items:[]).map(i=>`<li>${esc(i.title)} (${esc(i.sub)}) ×${+i.qty} = ${money(+i.price*+i.qty)}</li>`).join("")}</ol>
    ${o.disc?`<div class="sr disc"><span>Chegirma (${esc(o.promo)})</span><span>−${money(+o.disc)}</span></div>`:""}
    <div class="sr tot"><span>Jami</span><span>${money(+o.amount)}</span></div>
    ${o.handledBy?`<div class="meta">Oxirgi o'zgartirgan: ${esc(o.handledBy)}</div>`:""}
    <div class="oacts">${(NEXT[o.status]||[]).map(([s,t,c])=>`<button class="btn ${c}" data-st="${esc(o.id)}:${s}">${t}</button>`).join("")}</div></div>`;

  function render(){
    if(!user){
      app.innerHTML=`<div class="blk center"><div class="ico">🔐</div><h2>Sotuv bo'limiga kirish</h2><p>Faqat egasi qo'shgan xodimlar kira oladi.</p><button class="btn" data-login>Google bilan kirish</button><div class="err">${esc(err)}</div></div>`;
      return;
    }
    const top=LOCAL?`<div class="warn blk">Demo rejim: Firebase sozlanmagan, shuning uchun faqat shu brauzerda berilgan buyurtmalar ko'rinadi. Xodim qo'shish Firebase sozlangach ishlaydi.</div>`
      :`<div class="ctools"><span>${esc(user.email)}${isOwner?" (egasi)":""}</span><button class="rm2" data-logout>Chiqish</button></div>`;
    if(access===null){app.innerHTML=top+`<div class="blk center"><p>Tekshirilmoqda...</p></div>`;return}
    if(!access){app.innerHTML=top+`<div class="blk center"><div class="ico">⛔</div><h2>Ruxsat yo'q</h2><p>Bu email xodimlar ro'yxatida yo'q. Egasidan sizni qo'shishini so'rang.</p></div>`;return}
    const cnt=s=>orders.filter(o=>o.status===s).length;
    const list=orders.filter(o=>filter==="hammasi"||o.status===filter);
    app.innerHTML=top+statsHTML()+`<h2 class="bh">Buyurtmalar</h2><div class="chips" role="group" aria-label="Holat">${[["hammasi","Hammasi",orders.length],...Object.entries(ST).map(([k,v])=>[k,v,cnt(k)])].map(([k,v,n])=>`<button class="chip" data-f="${k}" aria-pressed="${k===filter}">${v} (${n})</button>`).join("")}</div>
      <div class="err">${esc(err)}</div>
      ${list.length?list.map(ordHTML).join(""):`<div class="blk center"><p>Bu bo'limda buyurtma yo'q.</p></div>`}
      ${isOwner?`<div class="blk"><h2 class="bh">Xodimlar</h2><p class="meta">Qo'shilgan Google email bilan kirgan odam buyurtmalarni ko'radi va tasdiqlaydi.</p>
        <div class="promo"><input type="email" id="semail" autocomplete="off" placeholder="email@gmail.com" value="${esc(newEmail)}" aria-label="Xodim emaili"><button class="btn soft" data-sadd>Qo'shish</button></div>
        ${staff.map(e=>`<div class="sr"><span>${esc(e)}</span><button class="rmb" data-sdel="${esc(e)}">O'chirish</button></div>`).join("")||`<p class="meta">Hali xodim qo'shilmagan.</p>`}</div>`:""}`;
  }
  function listen(){
    subs.push(DB.collection("orders").orderBy("createdAt","desc").limit(300).onSnapshot(s=>{orders=s.docs.map(d=>({...d.data(),id:d.id}));err="";render()},()=>{err="Buyurtmalarni yuklab bo'lmadi.";render()}));
    if(isOwner)subs.push(DB.collection("staff").onSnapshot(s=>{staff=s.docs.map(d=>d.id);render()},()=>{}));
  }
  if(LOCAL){
    const reload=()=>{orders=localOrders.load().sort((a,b)=>tsOf(b.createdAt)-tsOf(a.createdAt));render()};
    user={email:""};access=true;reload();
    addEventListener("storage",e=>{if(e.key==="ap_orders")reload()});
  }
  else app.innerHTML=`<div class="blk center"><p>Yuklanmoqda...</p></div>`;
  if(!LOCAL)AUTH.onAuthStateChanged(u=>{
    stop();user=u;access=null;orders=[];staff=[];render();
    if(!u)return;
    const em=(u.email||"").toLowerCase();
    isOwner=!!owner&&em===owner&&u.emailVerified;
    (isOwner?Promise.resolve(true):DB.collection("staff").doc(em).get().then(d=>d.exists)).catch(()=>false).then(ok=>{
      if(user!==u)return;
      access=ok;render();if(ok)listen();
    });
  });
  app.addEventListener("input",e=>{if(e.target.id==="semail")newEmail=e.target.value});
  app.addEventListener("click",e=>{
    const g=a=>e.target.closest(`[${a}]`);let x;
    if(g("data-login")){err="";AUTH.signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch(er=>{err=er.code==="auth/popup-closed-by-user"?"":"Kirib bo'lmadi: "+er.message;render()});return}
    if(g("data-logout"))return AUTH.signOut();
    if(x=g("data-f")){filter=x.dataset.f;return render()}
    if(x=g("data-per")){period=x.dataset.per;return render()}
    if(x=g("data-st")){
      const[id,s]=x.dataset.st.split(":");x.disabled=true;
      if(LOCAL){
        const a=localOrders.load(),o=a.find(z=>z.id===id);
        if(o){o.status=s;o.handledBy="demo";localOrders.save(a)}
        orders=a.sort((p,q)=>tsOf(q.createdAt)-tsOf(p.createdAt));render();toast(ST[s]+": saqlandi");
        return;
      }
      DB.collection("orders").doc(id).update({status:s,handledBy:user.email,updatedAt:firebase.firestore.FieldValue.serverTimestamp()})
        .then(()=>toast(ST[s]+": saqlandi")).catch(()=>{err="Saqlab bo'lmadi. Ruxsatingizni tekshiring.";render()});
      return;
    }
    if(g("data-sadd")){
      const em=newEmail.trim().toLowerCase();
      if(!isEmail(em)){err="To'g'ri email kiriting.";return render()}
      DB.collection("staff").doc(em).set({addedBy:user.email,addedAt:firebase.firestore.FieldValue.serverTimestamp()})
        .then(()=>{newEmail="";err="";toast(em+" qo'shildi")}).catch(()=>{err="Qo'shib bo'lmadi.";render()});
      return;
    }
    if(x=g("data-sdel")){const em=x.dataset.sdel;DB.collection("staff").doc(em).delete().then(()=>toast(em+" o'chirildi")).catch(()=>{err="O'chirib bo'lmadi.";render()})}
  });
}

/* ---- tegishli sahifani ishga tushirish ---- */
badge();
({home,rasmlar,dizayn,aloqa,savat,sotuv})[PG]();