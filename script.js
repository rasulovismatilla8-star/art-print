/* ===== SOZLAMALAR: shu yerdan o'zgartiring ===== */
const CONFIG={
  phone:"+998 90 989 00 99",
  telegram:"",
  email:"",
  address:"Oriqzor bozori, 2064-do'kon",
  hours:"Har kuni 09:00 – 20:00",
  year:2016,
  pricePerM3:200000,         // xona vizualizatsiyasi: 1 m³ narxi (so'm)
  freeFrom:500000,          // shu summadan yuqori buyurtmada yetkazish bepul
  deliveryFee:30000,
  promos:{ART10:10,YANGI:15,SOVGA:20},   // promokod: chegirma foizi
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
const FLOORS={wood:["Parket","linear-gradient(#d2a874,#b98d5b)"],grey:["Kulrang","linear-gradient(#b9bcc4,#9a9ea8)"],white:["Oq","linear-gradient(#f1f1f1,#d9d9d9)"]};
const WPAT={plain:["none","auto"],stripe:["repeating-linear-gradient(90deg,rgba(0,0,0,.09) 0 14px,transparent 14px 28px)","auto"],dots:["radial-gradient(rgba(0,0,0,.14) 2px,transparent 2.5px)","22px 22px"],panel:["none","auto"],tile:["linear-gradient(rgba(0,0,0,.1) 2px,transparent 2px),linear-gradient(90deg,rgba(0,0,0,.1) 2px,transparent 2px)","60px 30px"]};
/* ================================================ */

const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const money=n=>String(n).replace(/\B(?=(\d{3})+(?!\d))/g," ")+" so'm";
const digits=s=>s.replace(/\D/g,"");

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
document.body.insertAdjacentHTML("afterbegin",`<header><a class="brand" href="index.html"><span data-logo="44"></span><span class="brandname">Art Print</span></a><nav aria-label="Menyu">${NAV.map(([h,t,k])=>`<a href="${h}"${k===PG?' class="on"':""}>${t}</a>`).join("")}</nav><button class="burger" id="burger" aria-label="Menyu" aria-expanded="false">☰</button><a class="cartbtn${PG==="savat"?" on":""}" href="savat.html">🛒 Savat <span class="badge" id="count">0</span></a></header>`);
document.body.insertAdjacentHTML("beforeend",`<footer><div class="wrap foot"><div class="brand" style="color:#fff"><span data-logo="38"></span><span class="brandname">Art Print</span></div><div><a href="tel:${CONFIG.phone.replace(/\s/g,"")}">${CONFIG.phone}</a></div><div>© ${CONFIG.year} Art Print. Barcha huquqlar himoyalangan.</div></div></footer>
<div class="overlay" id="overlay"></div><div class="modal" id="modal" role="dialog" aria-modal="true" aria-labelledby="mtitle"><div class="mbox" id="mbox"></div></div><div class="toast" id="toast" role="status"></div>`);
document.querySelectorAll("[data-logo]").forEach(e=>e.innerHTML=logo(+e.dataset.logo));
$("#burger").onclick=()=>{const o=$("header nav").classList.toggle("open"),bt=$("#burger");bt.setAttribute("aria-expanded",o);bt.textContent=o?"✕":"☰"};

function openModal(html,wide){
  $("#mbox").className="mbox"+(wide?" wide":"");
  $("#mbox").innerHTML='<button class="mx" aria-label="Oynani yopish">&times;</button>'+html;
  $("#modal").classList.add("on");$("#overlay").classList.add("on");
}
function closeModal(){$("#modal").classList.remove("on");$("#overlay").classList.remove("on")}
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
const thumb=t=>!t?"":t.img?`<img src="${t.img}" alt="">`:t.url?`<img src="${t.url}" alt="">`:artSVG(t.art);
document.addEventListener("error",e=>{
  const i=e.target;
  if(i.tagName==="IMG"&&i.dataset.fb){const p=PRODUCTS.find(x=>x.id==i.dataset.fb);if(p){const d=document.createElement("div");d.innerHTML=artSVG(p.art);i.replaceWith(d.firstChild)}}
},true);

/* ---- SAVAT: brauzerda saqlanadi, shuning uchun sahifalar orasida yo'qolmaydi ---- */
let cart=[];
try{cart=(JSON.parse(localStorage.getItem("ap_cart"))||[]).filter(c=>c&&c.key)}catch(e){}
const saveCart=()=>{try{localStorage.setItem("ap_cart",JSON.stringify(cart))}catch(e){}};
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
    if(!/^https?:\/\//i.test(u)){$("#neterr").textContent="Havola http:// yoki https:// bilan boshlanishi kerak.";return}
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
  <h3>${p.title}</h3><div class="meta">${p.cat}</div>
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
const SOFA=`<svg class="sofa" viewBox="0 0 300 110" aria-hidden="true"><rect x="45" y="8" width="210" height="48" rx="16" fill="#8a76ff"/><rect x="14" y="34" width="272" height="52" rx="16" fill="#5b3df5"/><rect x="0" y="30" width="40" height="62" rx="14" fill="#4a30d0"/><rect x="260" y="30" width="40" height="62" rx="14" fill="#4a30d0"/><rect x="34" y="92" width="10" height="14" fill="#1b1630"/><rect x="256" y="92" width="10" height="14" fill="#1b1630"/></svg>`;
const PLANT=`<svg class="plant" viewBox="0 0 60 130" aria-hidden="true"><ellipse cx="30" cy="40" rx="11" ry="34" fill="#14b8a6"/><ellipse cx="16" cy="56" rx="9" ry="28" fill="#0e9a8b" transform="rotate(-28 16 56)"/><ellipse cx="44" cy="56" rx="9" ry="28" fill="#0e9a8b" transform="rotate(28 44 56)"/><path d="M12 92H48L43 128H17Z" fill="#ff7a3d"/></svg>`;
function roomHTML(inner,f,pw,ph,R,w,st,fl){
  /* pw, ph = rasm eni va balandligi (sm); R = xona o'lchami (m) */
  const pt=WPAT[st],wp=pw/(R.w*100)*100,
        bottom=10+Math.max(0,1.5-ph/200)/R.h*90,      // rasm markazi taxminan 1.5 m balandlikda
        sw=Math.min(2,R.w*.7)/R.w*100;
  return `<div class="vr" style="aspect-ratio:${R.w*.9}/${R.h}">
  <div class="vwall" style="background-color:${w};background-image:${pt[0]};background-size:${pt[1]}">${st==="panel"?'<div class="pnl"></div>':""}</div>
  <div class="vfl" style="background:${FLOORS[fl][1]}"></div>
  <div class="vp" style="width:${wp}%;bottom:${bottom}%">${frameHTML(inner,f,true,pw+"/"+ph)}</div>
  ${SOFA.replace("<svg ",`<svg style="width:${sw}%;left:50%;bottom:7%" `)}
  ${PLANT.replace("<svg ",`<svg style="width:${.5/R.w*100}%;right:3%;bottom:7%" `)}</div>`;
}
function dizayn(){
  const V={src:"1",wall:WALLS[0],st:"plain",frame:"black",floor:"wood"};
  let custom=null;
  const qp=new URLSearchParams(location.search).get("p");
  if(qp&&PRODUCTS.some(x=>x.id==qp))V.src=qp;
  $("#vsrc").innerHTML=`<option value="custom">📷 O'z suratim (yuklash)</option>`+[...new Set(PRODUCTS.map(p=>p.cat))].map(c=>`<optgroup label="${c}">${PRODUCTS.filter(p=>p.cat===c).map(p=>`<option value="${p.id}">${p.title}</option>`).join("")}</optgroup>`).join("");
  const chipB=(k,v,t,sel)=>`<button class="chip" data-v="${k}:${v}" aria-pressed="${sel===v}">${t}</button>`;
  const vProd=()=>V.src==="custom"?null:PRODUCTS.find(x=>x.id==V.src);
  const inner=()=>{const p=vProd();return p?pic(p):custom?`<img src="${custom}" alt="Rasmingiz">`:"<span>Rasmingiz shu yerda ko'rinadi</span>"};
  const nm=v=>Number(v.toFixed(2));
  const num=(id,min,max,def)=>{const v=parseFloat($(id).value);return isFinite(v)?Math.min(max,Math.max(min,v)):def};
  const dims=()=>({R:{w:num("#rw",1.5,12,3.5),h:num("#rh",2,5,3),d:num("#rd",1.5,12,4)},pw:num("#pw",10,400,40),ph:num("#ph",10,400,60)});
  /* NARX: rasm devor maydonining qancha qismini egallasa, xona hajmining shu qismi (m³) x 1 m³ narxi */
  const calcP=(R,pw,ph)=>{const vol=R.w*R.h*R.d,frac=Math.min(1,(pw/100)*(ph/100)/(R.w*R.h)),m3=frac*vol;return{vol,frac,m3,sum:Math.round(m3*CONFIG.pricePerM3/1000)*1000}};
  const PRESETS=["20x30","40x60","60x90","80x120","100x150"];
  function render(){
    const {R,pw,ph}=dims(),f=frameOf(V.frame),c=calcP(R,pw,ph),fit=Math.min(1,R.w*95/pw,R.h*85/ph);
    $("#vroom").innerHTML=roomHTML(inner(),f,pw*fit,ph*fit,R,V.wall,V.st,V.floor);
    $("#vcap").innerHTML=`<span>Xona: <b>${nm(R.w)}×${nm(R.h)}×${nm(R.d)} m</b></span><span>Rasm: <b>${nm(pw)}×${nm(ph)} sm</b></span><span>Ramka: <b>${f.name}</b></span>`;
    $("#vcalc").innerHTML=`<div class="sr"><span>Xona hajmi</span><span>${nm(R.w)} × ${nm(R.h)} × ${nm(R.d)} = ${nm(c.vol)} m³</span></div>
      <div class="sr"><span>Rasm devor maydonining</span><span>${(c.frac*100).toFixed(2)}%</span></div>
      <div class="sr"><span>Rasm hajmi ulushi</span><span>${nm(c.m3)} m³</span></div>
      <div class="sr"><span>Narx (1 m³ = ${money(CONFIG.pricePerM3)})</span><span>${money(c.sum)}</span></div>
      <div class="sr"><span>Ramka (${f.name})</span><span>+${money(f.add)}</span></div>
      ${fit<1?`<div class="warn">Rasm devorga sig'maydi, ko'rsatish uchun kichraytirildi. Narx haqiqiy o'lcham bo'yicha.</div>`:""}`;
    $("#vsrc").value=V.src;
    $("#vwalls").innerHTML=WALLS.map(w=>`<button class="sw" data-v="wall:${w}" style="background:${w}" aria-label="Devor rangi" aria-pressed="${w===V.wall}"></button>`).join("");
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
  ["#rw","#rh","#rd","#pw","#ph"].forEach(s=>$(s).addEventListener("input",render));
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
  const dz=$("#drop");
  ["dragenter","dragover"].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.add("over")}));
  ["dragleave","drop"].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.remove("over")}));
  dz.addEventListener("drop",e=>takeFile(e.dataTransfer.files[0]));
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
    if(view==="done"){
      app.innerHTML=`<div class="blk center"><div class="ico">🎉</div><h2>Rahmat, ${esc(order.name)}!</h2><p>Buyurtma <strong>${order.no}</strong> qabul qilindi. Jami: <strong>${money(order.amount)}</strong>.</p><p>${order.cash?"To'lov buyurtma yetkazilganda amalga oshiriladi.":"To'lov muvaffaqiyatli o'tdi (demo)."} Tez orada ${esc(co.phone)} raqamiga qo'ng'iroq qilamiz.</p><a class="btn" href="rasmlar.html">Xaridni davom ettirish</a></div>`;
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
      <div class="blk"><h3>Qabul qiluvchi</h3>
        <label class="f" for="fn">Ism va familiya</label><input type="text" id="fn" data-co="name" value="${esc(co.name)}" autocomplete="off">
        <label class="f" for="fp">Telefon raqami</label><input type="tel" id="fp" data-co="phone" value="${esc(co.phone)}" autocomplete="off"></div>
      <div class="blk"><h3>Olish usuli</h3><div class="opts">${optB("delivery","home","🚚 Yetkazib berish","Manzilingizga, 3–5 kun")}${optB("delivery","pickup","🏬 Do'kondan olib ketish","Bepul")}</div>
        ${co.delivery==="home"?`<label class="f" for="fa">Yetkazish manzili</label><input type="text" id="fa" data-co="addr" value="${esc(co.addr)}" autocomplete="off">`:`<p class="meta" style="margin-top:12px">Manzil: ${esc(CONFIG.address)}</p>`}</div>
      <div class="blk"><h3>To'lov usuli</h3><div class="opts">${PAYS.map(([id,n,s])=>optB("pay",id,n,s,`<span class="pb ${id}">${n}</span>`)).join("")}</div></div>
      </div><aside class="sumbox"><h3>Buyurtmangiz</h3>${sumRows(t,fee)}<div class="err">${msg}</div>
      <button class="btn big" data-confirm ${t.n?"":"disabled"}>Buyurtmani tasdiqlash</button></aside></div>`;
      return;
    }
    app.innerHTML=`<div class="cartv"><div>
      <div class="ctools"><label class="chkl"><input type="checkbox" data-call ${cart.every(c=>c.sel)?"checked":""}> Hammasini tanlash</label><button class="rm2" data-cdel>Tanlanganlarni o'chirish</button></div>
      ${cart.map((c,i)=>`<div class="citem"><input type="checkbox" data-csel="${i}" ${c.sel?"checked":""} aria-label="Tanlash"><div class="th">${thumb(c.th)}</div>
        <div class="ci"><strong>${esc(c.title)}</strong><div class="meta">${esc(c.sub)}</div><button class="rmb" data-crm="${i}">O'chirish</button></div>
        <div class="cr"><div class="step2"><button data-cdec="${i}" aria-label="Kamaytirish">−</button><span>${c.qty}</span><button data-cinc="${i}" aria-label="Ko'paytirish">+</button></div><strong>${money(c.price*c.qty)}</strong></div></div>`).join("")}
      </div><aside class="sumbox"><h3>Buyurtmangiz</h3>${sumRows(t,null)}
      <div class="promo"><input type="text" id="pcode" placeholder="Promokod" value="${promo?promo.code:""}" aria-label="Promokod"><button class="btn soft" data-papply>Qo'llash</button></div>
      <div class="${promo?"ok":"err"}">${pmsg}</div>
      <button class="btn big" data-tocheck ${t.n?"":"disabled"}>Rasmiylashtirishga o'tish</button>
      <div class="note">${money(CONFIG.freeFrom)} dan yuqori buyurtmada yetkazish bepul. Promokodlar: ${Object.keys(CONFIG.promos).join(", ")}</div></aside></div>`;
  }

  function payLink(m,o){
    const P=CONFIG.pay;
    if(m==="payme"&&P.payme.merchant)return"https://checkout.paycom.uz/"+btoa(`m=${P.payme.merchant};ac.order_id=${o.no};a=${o.amount*100}`);
    if(m==="click"&&P.click.service&&P.click.merchant)return`https://my.click.uz/services/pay?service_id=${P.click.service}&merchant_id=${P.click.merchant}&amount=${o.amount}&transaction_param=${o.no}`;
    if(m==="uzum"&&P.uzum.url)return P.uzum.url+(P.uzum.url.includes("?")?"&":"?")+`order=${o.no}&amount=${o.amount}`;
    return"";
  }
  function finish(){
    cart=cart.filter(c=>!c.sel);promo=null;pmsg="";save();view="done";render();
  }
  function confirmOrder(){
    const t=calc(),ph=digits(co.phone);
    if(!co.name.trim())msg="Ism va familiyangizni kiriting.";
    else if(ph.length<12)msg="Telefon raqamini to'liq kiriting, masalan +998 90 123 45 67.";
    else if(co.delivery==="home"&&!co.addr.trim())msg="Yetkazish manzilini kiriting.";
    else msg="";
    if(msg)return render();
    order={no:"AP-"+Math.floor(10000+Math.random()*90000),amount:t.tot+feeOf(t),name:co.name.trim(),cash:co.pay==="cash"};
    if(order.cash)return finish();
    const link=payLink(co.pay,order);
    if(link){location.href=link;return}
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
    if(g("data-payok"))return finish();
  });
  app.addEventListener("change",e=>{
    const t=e.target;
    if(t.dataset.csel!==undefined){cart[t.dataset.csel].sel=t.checked;save();render()}
    else if(t.dataset.call!==undefined){cart.forEach(c=>c.sel=t.checked);save();render()}
  });
  app.addEventListener("input",e=>{const k=e.target.dataset.co;if(k)co[k]=e.target.value});
  render();
}

/* ---- tegishli sahifani ishga tushirish ---- */
badge();
({home,rasmlar,dizayn,aloqa,savat})[PG]();