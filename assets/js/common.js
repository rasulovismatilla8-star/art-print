/* Hamma sahifalar uchun umumiy kod. Tartib: config.js → (firebase) → common.js → pages/<sahifa>.js */
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const money=n=>String(n).replace(/\B(?=(\d{3})+(?!\d))/g," ")+" so'm";
const digits=s=>s.replace(/\D/g,"");

/* ---- FIREBASE: buyurtmalar bazasi va xodimlar kirishi (assets/js/firebase-config.js da sozlanadi) ---- */
let DB=null,AUTH=null;
if(window.firebase&&window.FIREBASE_CONFIG&&FIREBASE_CONFIG.apiKey){
  firebase.initializeApp(FIREBASE_CONFIG);
  DB=firebase.firestore();
  AUTH=firebase.auth?firebase.auth():null;
}
/* Firebase javob bermasa (internet yo'q) cheksiz kutib qolmaslik uchun */
const withTimeout=(p,ms)=>Promise.race([p,new Promise((_,no)=>setTimeout(()=>no(new Error("timeout")),ms))]);
const stamp=()=>firebase.firestore.FieldValue.serverTimestamp();

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
document.body.insertAdjacentHTML("beforeend",`<footer><div class="wrap foot"><div class="brand" style="color:#fff"><span data-logo="38"></span><span class="brandname">Art Print</span></div><div><a href="tel:${CONFIG.phone.replace(/\s/g,"")}">${CONFIG.phone}</a></div><div>© ${CONFIG.year}–${new Date().getFullYear()} Art Print. Barcha huquqlar himoyalangan. <a class="staff" href="sotuv.html">Xodimlar</a></div></div></footer>
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
PRODUCTS.forEach(p=>p.n=p.id);
/* Egasi sotuv bo'limida rasm qo'shgan bo'lsa, katalog bazadan olinadi; bo'sh bo'lsa yuqoridagi namunalar qoladi */
const catalogReady=DB&&(PG==="rasmlar"||PG==="dizayn")
  ?withTimeout(DB.collection("products").orderBy("createdAt").get(),10000).then(s=>{
      if(s.empty)return;
      PRODUCTS.length=0;
      s.docs.forEach((d,i)=>{const x=d.data();PRODUCTS.push({id:d.id,n:i+1,title:x.title,cat:x.cat,prices:x.prices,url:x.img})});
    }).catch(()=>{})
  :Promise.resolve();

/* hajmlar: w = rasm kengligi (sm), d = qisqa yozuv */
const SIZES={
 S:{label:"Kichik 20×30 sm",d:"20×30 sm",m:1,w:20},
 M:{label:"O'rta 40×60 sm",d:"40×60 sm",m:1.6,w:40},
 L:{label:"Katta 60×90 sm",d:"60×90 sm",m:2.4,w:60},
 XL:{label:"Juda katta 80×120 sm",d:"80×120 sm",m:3.4,w:80}
};
const price=(base,s)=>Math.round(base*SIZES[s].m/1000)*1000;
/* bazadagi rasmda har o'lcham narxi alohida yoziladi; narxi yo'q o'lcham sotilmaydi */
const priceOf=(p,s)=>p.prices?+p.prices[s]||0:price(p.price,s);
const sizesOf=p=>Object.keys(SIZES).filter(k=>priceOf(p,k)>0);
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
  if(i.tagName==="IMG"&&i.dataset.fb){const p=PRODUCTS.find(x=>x.id==i.dataset.fb);if(p&&p.art){const d=document.createElement("div");d.innerHTML=artSVG(p.art);i.replaceWith(d.firstChild)}}
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
/* rasmni JPEG qilib siqadi: eng uzun tomoni max px, hajmi limit belgidan oshsa sifat, keyin o'lcham pasaytiriladi */
function squeeze(src,max,limit){
  return new Promise((ok,no)=>{
    const i=new Image();
    i.onload=()=>{
      const c=document.createElement("canvas");let k=Math.min(1,max/Math.max(i.width,i.height)),q=.9;
      for(let t=0;t<10;t++){
        c.width=Math.round(i.width*k);c.height=Math.round(i.height*k);
        const g=c.getContext("2d");g.fillStyle="#fff";g.fillRect(0,0,c.width,c.height);g.drawImage(i,0,0,c.width,c.height);
        let d="";try{d=c.toDataURL("image/jpeg",q)}catch(e){return no(e)}
        if(d.length<=limit)return ok(d);
        if(q>.65)q-=.1;else k*=.8;
      }
      no(new Error("too big"));
    };
    i.onerror=no;i.src=src;
  });
}

badge();
