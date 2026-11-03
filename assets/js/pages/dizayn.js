/* ================= 3-SAHIFA: O'Z DIZAYNIM ================= */
/* Mebel (old tomondan ko'rinish). Haqiqiy o'lchami: divan 2.1×0.85 m, gul ~0.55×1.1 m, chiroq 0.38×1.65 m, stolcha 1.0×0.45 m */
const SOFA=`<svg viewBox="0 0 300 122" aria-hidden="true"><defs>
<linearGradient id="sfB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#97a1ab"/><stop offset="1" stop-color="#6b747e"/></linearGradient>
<linearGradient id="sfC" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#aab3bd"/><stop offset=".7" stop-color="#8a939d"/><stop offset="1" stop-color="#78818b"/></linearGradient>
<linearGradient id="sfT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b4bdc6"/><stop offset="1" stop-color="#959ea8"/></linearGradient>
<linearGradient id="sfF" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#858e98"/><stop offset="1" stop-color="#58606a"/></linearGradient>
<linearGradient id="sfA" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#626b74"/><stop offset=".55" stop-color="#8e97a1"/><stop offset="1" stop-color="#6c757f"/></linearGradient>
<linearGradient id="sfP" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e6b65e"/><stop offset="1" stop-color="#b5822c"/></linearGradient>
<linearGradient id="sfQ" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3efe8"/><stop offset="1" stop-color="#cbc3b6"/></linearGradient></defs>
<rect x="20" y="4" width="260" height="68" rx="16" fill="url(#sfB)"/>
<rect x="30" y="10" width="118" height="58" rx="15" fill="url(#sfC)"/><rect x="152" y="10" width="118" height="58" rx="15" fill="url(#sfC)"/>
<path d="M42 16q47-7 94 0M164 16q47-7 94 0" stroke="rgba(255,255,255,.28)" stroke-width="3" fill="none" stroke-linecap="round"/>
<rect x="24" y="63" width="128" height="19" rx="8" fill="url(#sfT)"/><rect x="148" y="63" width="128" height="19" rx="8" fill="url(#sfT)"/>
<rect x="38" y="35" width="48" height="36" rx="9" fill="url(#sfP)" transform="rotate(-9 62 53)"/><path d="M44 52q18 4 36-3" stroke="rgba(0,0,0,.12)" stroke-width="2" fill="none" transform="rotate(-9 62 53)"/>
<rect x="216" y="33" width="46" height="38" rx="10" fill="url(#sfQ)" transform="rotate(8 239 52)"/>
<rect x="20" y="76" width="260" height="26" rx="7" fill="url(#sfF)"/><path d="M150 79v21" stroke="rgba(0,0,0,.22)" stroke-width="2"/>
<rect x="0" y="40" width="36" height="64" rx="14" fill="url(#sfA)"/><rect x="264" y="40" width="36" height="64" rx="14" fill="url(#sfA)"/>
<path d="M7 45q11-5 22 0M271 45q11-5 22 0" stroke="rgba(255,255,255,.3)" stroke-width="3" fill="none" stroke-linecap="round"/>
<rect x="12" y="100" width="276" height="6" rx="3" fill="#3e454c"/><path d="M28 105h9l-2 16h-5zM263 105h9l-2 16h-5z" fill="#6b4a2e"/></svg>`;
const PLANT=(()=>{
  const r=rng(42),G=["#2f7a4c","#3b8f5b","#27663f","#4aa36b","#358552"],f=v=>v.toFixed(1);let L="";
  for(let i=0;i<17;i++){
    const a=-78+i*9.7+r()*8,n=34+r()*28,x=50+(r()-.5)*10,y=130-r()*6;
    L+=`<g transform="translate(${f(x)} ${f(y)}) rotate(${f(a)})"><path d="M0 0V${f(-n*.45)}" stroke="#3d6b3a" stroke-width="1.4"/><path d="M0 ${f(-n*.4)}C${f(n*.34)} ${f(-n*.55)} ${f(n*.22)} ${f(-n)} 0 ${f(-n*1.08)}C${f(-n*.22)} ${f(-n)} ${f(-n*.34)} ${f(-n*.55)} 0 ${f(-n*.4)}Z" fill="${G[i%5]}"/><path d="M0 ${f(-n*.45)}V${f(-n)}" stroke="rgba(255,255,255,.22)" stroke-width=".9"/></g>`;
  }
  return `<svg viewBox="0 0 100 200" aria-hidden="true"><defs><linearGradient id="ptG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#cfc6b8"/><stop offset=".4" stop-color="#f3eee6"/><stop offset="1" stop-color="#b3a999"/></linearGradient></defs>${L}<path d="M27 137h46l-5 60H32z" fill="url(#ptG)"/><rect x="25" y="132" width="50" height="8" rx="2" fill="#ece6db"/><ellipse cx="50" cy="134" rx="22" ry="2.4" fill="#4a3526"/></svg>`;
})();
const LAMP=`<svg viewBox="0 0 60 260" aria-hidden="true"><defs><linearGradient id="lpS" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e6d8bc"/><stop offset=".5" stop-color="#fbf4e4"/><stop offset="1" stop-color="#d5c4a3"/></linearGradient><radialGradient id="lpL"><stop offset="0" stop-color="rgba(255,226,160,.65)"/><stop offset="1" stop-color="rgba(255,226,160,0)"/></radialGradient></defs><ellipse cx="30" cy="60" rx="30" ry="28" fill="url(#lpL)"/><path d="M30 58L11 256M30 58L49 256M30 58V256" stroke="#8a6440" stroke-width="3" stroke-linecap="round"/><path d="M10 54h40l-6-42H16z" fill="url(#lpS)"/><ellipse cx="30" cy="54" rx="20" ry="3" fill="#f7d996"/></svg>`;
const TABLE=`<svg viewBox="0 0 200 90" aria-hidden="true"><defs><linearGradient id="tbT" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b48659"/><stop offset=".5" stop-color="#d4a679"/><stop offset="1" stop-color="#ab7c51"/></linearGradient></defs><path d="M30 30L22 88M170 30L178 88" stroke="#5e3f26" stroke-width="5" stroke-linecap="round"/><path d="M62 32L60 82M138 32L140 82" stroke="#4a311d" stroke-width="4" stroke-linecap="round"/><rect x="4" y="13" width="192" height="17" rx="8" fill="url(#tbT)"/><rect x="4" y="26" width="192" height="7" rx="3.5" fill="#86593a"/><rect x="38" y="7" width="42" height="6" rx="1" fill="#2f4858"/><rect x="42" y="2" width="35" height="5.5" rx="1" fill="#d6c6aa"/><path d="M127 14c-6-2-6-10 0-13h7c6 3 6 11 0 13z" fill="#ece8e0"/></svg>`;
/* mayda donador faktura (shtukaturka, gilam): kulrang shovqin, juda shaffof */
const NOISE=`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#n)" opacity=".09"/></svg>`)}`;

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
  const quad=(x1,x2,z1,z2,h=0)=>[P(x1,h,z1),P(x2,h,z1),P(x2,h,z2),P(x1,h,z2)];     // polda (yoki shiftda) to'rtburchak
  const disc=(x,h,z,rx,rz)=>Array.from({length:16},(_,i)=>P(x+rx*Math.cos(i*Math.PI/8),h,z+rz*Math.sin(i*Math.PI/8)));
  const [,fcol,kind]=FLOORS[fl],floor=quad(-Hw,Hw,0,zF),rnd=rng(7);
  const tone=v=>v<.5?`rgba(255,255,255,${(v*.18).toFixed(3)})`:`rgba(60,30,10,${((v-.5)*.2).toFixed(3)})`;
  let tex="";
  if(kind==="wood"){
    /* har bir taxta bo'lagi o'z tusida, tolalari va bo'g'inlari bilan */
    const s=.16;
    for(let x=-Hw,i=0;x<Hw-.001;x+=s,i++){
      for(let z=-((i*.53)%1.1);z<zF;z+=1.1){
        tex+=poly(quad(x,x+s,Math.max(0,z),Math.min(zF,z+1.1)),tone(rnd()));
        if(z>0)tex+=line(P(x,0,z),P(x+s,0,z),"rgba(70,40,15,.3)",1);
      }
      for(let g=0;g<2;g++){const gx=x+s*(.2+rnd()*.6);tex+=line(P(gx,0,0),P(gx,0,zF),"rgba(90,50,20,.07)",.8)}
      tex+=line(P(x,0,0),P(x,0,zF),"rgba(70,40,15,.3)",1);
    }
  }else{
    for(let x=-Hw;x<Hw-.001;x+=.6)for(let z=0;z<zF;z+=.6)tex+=poly(quad(x,Math.min(Hw,x+.6),z,Math.min(zF,z+.6)),tone(.25+rnd()*.5));
    for(let x=-Hw;x<=Hw+.001;x+=.6)tex+=line(P(x,0,0),P(x,0,zF),"rgba(0,0,0,.16)",1.2);
    for(let z=.6;z<zF;z+=.6)tex+=line(P(-Hw,0,z),P(Hw,0,z),"rgba(0,0,0,.16)",1.2);
  }
  /* deraza chap devorda: tokcha, ikki tomonida parda, polga quyosh nuri tushadi */
  const z1=.45,z2=Math.min(1.75,zF*.8),h1=.9,h2=Math.min(2.3,R.h-.3),win=z2-z1>.4&&h2-h1>.6;
  const rw=Math.min(1.1,Hw*.75),sw=Math.min(2.1,R.w*.65),tw=Math.min(1,R.w*.3),table=R.w>=2.5&&zF>2.2;
  const lx=-Hw+.35,cH=R.h-.12;
  const curtain=(za,zb)=>poly([P(-Hw+.03,cH,za),P(-Hw+.03,cH,zb),P(-Hw+.03,.04,zb+.04),P(-Hw+.03,.04,za-.04)],"url(#vcur)");
  const shadow=(x1,x2,za,zb,o)=>poly(quad(x1,x2,za,zb),`rgba(0,0,0,${o})`,' filter="url(#vbl)"');
  const shell=`<svg class="vshell" viewBox="0 0 1000 ${H.toFixed(1)}" preserveAspectRatio="none" aria-hidden="true"><defs>
    <clipPath id="vfc"><polygon points="${pts(floor)}"/></clipPath>
    <pattern id="vnz" width="180" height="180" patternUnits="userSpaceOnUse"><image href="${NOISE}" width="180" height="180"/></pattern>
    <linearGradient id="vflg" gradientUnits="userSpaceOnUse" x1="0" y1="${P(0,0,0)[1].toFixed(1)}" x2="0" y2="${H.toFixed(1)}"><stop offset="0" stop-color="rgba(0,0,0,.25)"/><stop offset="1" stop-color="rgba(255,255,255,.06)"/></linearGradient>
    <linearGradient id="vceil" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbfaf7"/><stop offset="1" stop-color="#e2ded6"/></linearGradient>
    <linearGradient id="vsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a9d3f2"/><stop offset=".75" stop-color="#e8f5fd"/><stop offset=".76" stop-color="#9fbf92"/><stop offset="1" stop-color="#7fa475"/></linearGradient>
    <linearGradient id="vlw" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="rgba(0,0,0,0)"/><stop offset="1" stop-color="rgba(0,0,0,.12)"/></linearGradient>
    <linearGradient id="vrw" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="rgba(0,0,0,.22)"/><stop offset="1" stop-color="rgba(255,248,230,.06)"/></linearGradient>
    <linearGradient id="vcur" x1="0" y1="0" x2=".14" y2="0" spreadMethod="reflect"><stop offset="0" stop-color="#efe8dc"/><stop offset=".6" stop-color="#e2d9ca"/><stop offset="1" stop-color="#c8bdab"/></linearGradient>
    <linearGradient id="vrug" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b9ab98"/><stop offset="1" stop-color="#d6cab8"/></linearGradient>
    <radialGradient id="vspot"><stop offset="0" stop-color="#fffef6"/><stop offset=".6" stop-color="#f5efe0"/><stop offset="1" stop-color="#cfc8ba"/></radialGradient>
    <filter id="vbl" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6"/></filter></defs>
    ${poly([P(-Hw,R.h,zF),P(Hw,R.h,zF),P(Hw,R.h,0),P(-Hw,R.h,0)],"url(#vceil)")}
    ${[-.25,.25].map(k=>poly(disc(k*R.w,R.h,zF*.45,.07,.07),"url(#vspot)",' stroke="rgba(0,0,0,.12)" stroke-width="1"')).join("")}
    ${[-1,1].map(s=>{const wl=[P(s*Hw,R.h,zF),P(s*Hw,R.h,0),P(s*Hw,0,0),P(s*Hw,0,zF)];return poly(wl,w)+poly(wl,"url(#vnz)")+poly(wl,s<0?"url(#vlw)":"url(#vrw)")}).join("")}
    ${win?poly([P(-Hw,h1,z1),P(-Hw,h2,z1),P(-Hw,h2,z2),P(-Hw,h1,z2)],"#fbfaf6")
      +poly([P(-Hw,h1+.06,z1+.06),P(-Hw,h2-.06,z1+.06),P(-Hw,h2-.06,z2-.06),P(-Hw,h1+.06,z2-.06)],"url(#vsky)")
      +line(P(-Hw,h1,(z1+z2)/2),P(-Hw,h2,(z1+z2)/2),"#fbfaf6",5)
      +poly([P(-Hw,h1,z1-.06),P(-Hw+.14,h1,z1-.06),P(-Hw+.14,h1,z2+.06),P(-Hw,h1,z2+.06)],"#f6f3ec")
      +poly([P(-Hw+.14,h1,z1-.06),P(-Hw+.14,h1-.04,z1-.06),P(-Hw+.14,h1-.04,z2+.06),P(-Hw+.14,h1,z2+.06)],"#d9d4ca")
      +curtain(z1-.42,z1-.08)+curtain(z2+.08,Math.min(zF-.05,z2+.42))
      +line(P(-Hw+.05,cH+.02,z1-.5),P(-Hw+.05,cH+.02,Math.min(zF-.02,z2+.5)),"#5b5248",3):""}
    ${poly(floor,fcol)}<g clip-path="url(#vfc)">${tex}${poly(floor,"url(#vnz)")}
      ${win?poly([P(-Hw,0,z1),P(-Hw,0,z2),P(-Hw+1.6,0,z2+.7),P(-Hw+1.6,0,z1+.7)],"rgba(255,247,220,.28)",' filter="url(#vbl)"'):""}
      ${shadow(-rw-.04,rw+.04,.73,2.34,.18)}
      ${poly(quad(-rw,rw,.75,2.3),"url(#vrug)")}${poly(quad(-rw,rw,.75,2.3),"url(#vnz)")}
      ${poly(quad(-rw+.1,rw-.1,.85,2.2),"none",' stroke="rgba(110,90,70,.55)" stroke-width="3"')}${poly(quad(-rw+.16,rw-.16,.91,2.14),"none",' stroke="rgba(110,90,70,.3)" stroke-width="1.5"')}
      ${Array.from({length:Math.floor(rw*2/.035)},(_,i)=>line(P(-rw+i*.035+.02,0,2.3),P(-rw+i*.035+.02,0,2.36),"rgba(240,232,218,.9)",1)).join("")}
      ${poly(floor,"url(#vflg)")}
      ${shadow(-sw/2,sw/2,.05,.95,.32)}
      ${table?shadow(-tw/2-.05,tw/2+.05,1.3,1.8,.12):""}${shadow(Hw-.62,Hw-.18,.18,.62,.3)}${R.w>=2.5?shadow(lx-.2,lx+.2,.15,.55,.18):""}
      <g filter="url(#vbl)">${line(P(-Hw,0,0),P(-Hw,0,zF),"rgba(0,0,0,.35)",10)}${line(P(Hw,0,0),P(Hw,0,zF),"rgba(0,0,0,.35)",10)}${line(P(-Hw,0,0),P(Hw,0,0),"rgba(0,0,0,.3)",8)}</g>
    </g>
    ${poly([P(-Hw,0,0),P(-Hw,.09,0),P(-Hw,.09,zF),P(-Hw,0,zF)],"#f1eee7")}${poly([P(Hw,0,0),P(Hw,.09,0),P(Hw,.09,zF),P(Hw,0,zF)],"#dcd8cf")}
    ${poly([P(-Hw,R.h,0),P(-Hw,R.h-.06,0),P(-Hw,R.h-.06,zF),P(-Hw,R.h,zF)],"#f7f5f0")}${poly([P(Hw,R.h,0),P(Hw,R.h-.06,0),P(Hw,R.h-.06,zF),P(Hw,R.h,zF)],"#e6e2da")}
    <g filter="url(#vbl)" opacity=".55">${line(P(-Hw,0,0),P(-Hw,R.h,0),"rgba(0,0,0,.35)",8)}${line(P(Hw,0,0),P(Hw,R.h,0),"rgba(0,0,0,.35)",8)}${line(P(-Hw,R.h,0),P(Hw,R.h,0),"rgba(0,0,0,.25)",8)}</g>
  </svg>`;
  /* orqa devor (rasm shu yerda), HTML qatlam: foizlar orqa devorga nisbatan */
  const pt=WPAT[st],wt=P(-Hw,R.h,0)[1],
        bm=Math.max(.15,Math.min(1.55-ph/200,R.h-ph/100-.1));   // rasm markazi taxminan 1.5 m balandlikda
  const glow=R.w>=2.5?`radial-gradient(circle at ${((lx+Hw)/R.w*100).toFixed(1)}% ${((R.h-1.55)/R.h*100).toFixed(1)}%,rgba(255,222,160,.38),transparent ${(55/R.w).toFixed(1)}%),`:"";
  const wall=`<div class="vwall2" style="left:22%;width:56%;top:${wt/H*100}%;height:${WH/H*100}%;background-color:${w};background-image:${pt[0]},${glow}url('${NOISE}'),linear-gradient(90deg,rgba(255,246,220,.3),transparent 45%,rgba(0,0,0,.05)),linear-gradient(rgba(0,0,0,.08),transparent 25%,transparent 80%,rgba(0,0,0,.1));background-size:${pt[1]},${glow?"auto,":""}180px 180px,auto,auto">
    ${st==="panel"?'<div class="pnl"></div>':""}<div class="vbase" style="height:${.09/R.h*100}%"></div>
    <div class="vp" style="width:${pw/(R.w*100)*100}%;bottom:${bm/R.h*100}%">${frameHTML(inner,f,true,pw+"/"+ph)}</div></div>`;
  const obj=(svg,x,z,wm)=>{const p=P(x,0,z),k=D/(D-z);return `<div class="vobj" style="left:${p[0]/10}%;bottom:${(H-p[1])/H*100}%;width:${wm*u*k/10}%">${svg}</div>`};
  return `<div class="vr" role="img" aria-label="Namuna xona ${R.w}×${R.h} m, devorda ${Math.round(pw)}×${Math.round(ph)} sm rasm" style="aspect-ratio:1000/${H.toFixed(1)}">${shell}${wall}
    ${R.w>=2.5?obj(LAMP,lx,.35,.38):""}${obj(PLANT,Hw-.4,.4,.55)}${obj(SOFA,0,.95,sw)}${table?obj(TABLE,0,1.75,tw):""}<div class="vlight"></div></div>`;
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
  let custom=null,cdim=null,RP=null;const pos={x:.5,y:.4};      // cdim = o'z suratining piksel o'lchami, RP = xona surati {src,w,h}
  const qp=new URLSearchParams(location.search).get("p");
  V.src=String((qp&&PRODUCTS.find(x=>String(x.id)===qp)||PRODUCTS[0]).id);
  $("#vsrc").innerHTML=`<option value="custom">📷 O'z suratim (yuklash)</option>`+[...new Set(PRODUCTS.map(p=>p.cat))].map(c=>`<optgroup label="${esc(c)}">${PRODUCTS.filter(p=>p.cat===c).map(p=>`<option value="${esc(p.id)}">${esc(p.title)}</option>`).join("")}</optgroup>`).join("");
  const chipB=(k,v,t,sel)=>`<button class="chip" data-v="${k}:${v}" aria-pressed="${sel===v}">${t}</button>`;
  const vProd=()=>V.src==="custom"?null:PRODUCTS.find(x=>String(x.id)===V.src);
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
      ${fit<1?`<div class="warn">Rasm devorga sig'maydi, ko'rsatish uchun kichraytirildi. Narx haqiqiy o'lcham bo'yicha.</div>`:""}
      ${!vProd()&&cdim&&dpi(pw,ph)<100?`<div class="warn">⚠️ Suratingiz ${cdim.w}×${cdim.h} piksel, ${nm(pw)}×${nm(ph)} sm uchun bu kam: bosma xira chiqishi mumkin. Kichikroq o'lcham tanlang yoki sifatliroq surat yuklang.</div>`:""}`;
    $("#vsrc").value=V.src;
    $("#vwalls").innerHTML=WALLS.map((w,i)=>`<button class="sw" data-v="wall:${w}" style="background:${w}" aria-label="${i+1}-rang" aria-pressed="${w===V.wall}"></button>`).join("");
    $("#vwc").value=/^#[0-9a-f]{6}$/i.test(V.wall)?V.wall:"#ffffff";
    $("#vstyle").innerHTML=Object.entries(STYLES).map(([k,v])=>chipB("st",k,v,V.st)).join("");
    $("#vfloor").innerHTML=Object.entries(FLOORS).map(([k,v])=>chipB("floor",k,v[0],V.floor)).join("");
    $("#vps").innerHTML=PRESETS.map(s=>`<button class="chip" data-ps="${s}" aria-pressed="${s===nm(pw)+"x"+nm(ph)}">${s.replace("x","×")} sm</button>`).join("");
    $("#vframes").innerHTML=frameBtns(V.frame,true)+`<div class="fname">${f.name} (+${money(f.add)})</div>`;
    $("#vtotal").textContent=money(c.sum+f.add);
    $("#vadd").disabled=!vProd()&&!(custom&&$("#vrights").checked);
    $("#rightsBox").hidden=!!vProd();
  }
  /* bosma sifati: 1 dyuymga (2.54 sm) necha piksel to'g'ri keladi; uzun tomon uzun tomonga solishtiriladi */
  const dpi=(pw,ph)=>Math.min(Math.max(cdim.w,cdim.h)/Math.max(pw,ph),Math.min(cdim.w,cdim.h)/Math.min(pw,ph))*2.54;
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
    img.onload=()=>{custom=src;cdim={w:img.naturalWidth,h:img.naturalHeight};V.src="custom";$("#fileErr").textContent="";render()};
    img.onerror=()=>{$("#fileErr").textContent="Suratni ochib bo'lmadi. Boshqa fayl tanlang."};
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
  $("#vrights").onchange=render;
  $("#vadd").onclick=()=>{
    const {R,pw,ph}=dims(),f=frameOf(V.frame),c=calcP(R,pw,ph),p=vProd(),total=c.sum+f.add;
    const sub=`Rasm ${nm(pw)}×${nm(ph)} sm, xona ${nm(R.w)}×${nm(R.h)}×${nm(R.d)} m, ${frameName(f)}`;
    if(p)return addToCart({key:"viz-"+p.id+"-"+nm(pw)+"x"+nm(ph)+"-"+nm(R.w)+"x"+nm(R.h)+"x"+nm(R.d)+"-"+f.id,title:p.title,sub,price:total,qty:1,th:thOf(p)});
    if(!custom||!$("#vrights").checked)return;
    const title=$("#vtitle").value.trim()||"Mening rasmim",src=custom,btn=$("#vadd");
    /* o'z surati xodim chop etishi uchun bazaga yuklanadi */
    if(!DB)return toast("Bazaga ulanib bo'lmadi. Sahifani yangilang.");
    btn.disabled=true;btn.textContent="Surat yuklanmoqda...";
    squeeze(src,2400,950000)
      .then(img=>withTimeout(DB.collection("uploads").add({img,createdAt:stamp()}),60000))
      .then(ref=>smallImg(src,d=>addToCart({key:"custom-"+ref.id,title,sub,price:total,qty:1,th:{img:d},photo:"up:"+ref.id})))
      .catch(()=>toast("Suratni yuklab bo'lmadi. Internetni tekshirib, qayta urining."))
      .finally(()=>{btn.textContent="Savatga qo'shish";render()});
  };
  render();
}

catalogReady.then(dizayn);
