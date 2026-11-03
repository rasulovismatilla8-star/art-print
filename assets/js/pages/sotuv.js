/* ================= 6-SAHIFA: SOTUV BO'LIMI (egasi va xodimlar) =================
   Kirish Google orqali. Kim nimani ko'ra olishini firestore.rules tekshiradi, bu yerdagi tekshiruv faqat ko'rinish uchun. */
function sotuv(){
  const app=$("#adminApp");
  if(!DB||!AUTH){app.innerHTML=`<div class="blk center"><div class="ico">⚠️</div><h2>Bazaga ulanib bo'lmadi</h2><p>Internetni tekshirib, sahifani yangilang.</p></div>`;return}
  const ST={yangi:"Yangi",tasdiqlandi:"Tasdiqlandi",yetkazildi:"Yetkazildi",bekor:"Bekor qilingan"};
  const NEXT={yangi:[["tasdiqlandi","Tasdiqlash",""],["bekor","Bekor qilish","alt"]],tasdiqlandi:[["yetkazildi","Yetkazildi",""],["bekor","Bekor qilish","alt"]],yetkazildi:[],bekor:[["yangi","Qayta ochish","alt"]]};
  const PAYN={click:"Click",payme:"Payme",uzum:"Uzum",cash:"Naqd pul"};
  const owner=String(window.OWNER_EMAIL||"").trim().toLowerCase();
  let user=null,access=null,isOwner=false,orders=[],staff=[],products=[],filter="yangi",period="oy",subs=[],err="",newEmail="";
  let seen=null,actx=null;const photos={},pedit={};
  const np={title:"",cat:"",img:"",prices:{},busy:false};      // yangi rasm formasi
  const stop=()=>{subs.forEach(f=>f());subs=[]};

  /* YANGI BUYURTMA SIGNALI: sahifa ochiq turganda ovoz, bildirishnoma va sarlavhada son */
  const soundOn=()=>!!actx&&actx.state==="running";
  function enableAlerts(){
    try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();actx.resume().then(render)}catch(e){}
    if(window.Notification&&Notification.permission==="default")Notification.requestPermission().then(render);
  }
  function ding(n){
    if(soundOn())[0,.25].forEach((t,i)=>{const o=actx.createOscillator(),g=actx.createGain(),at=actx.currentTime+t;
      o.frequency.value=i?1320:880;g.gain.setValueAtTime(.3,at);g.gain.exponentialRampToValueAtTime(.001,at+.22);
      o.connect(g).connect(actx.destination);o.start(at);o.stop(at+.23)});
    if(window.Notification&&Notification.permission==="granted")try{new Notification("Art Print: yangi buyurtma",{body:n+" ta yangi buyurtma keldi"})}catch(e){}
    toast("🔔 Yangi buyurtma keldi!");
  }

  /* MIJOZ SURATLARI: buyurtmada faqat havola, suratning o'zi uploads to'plamidan kerak bo'lganda olinadi */
  const photoHTML=(p,no,k)=>!p?"":p.startsWith("up:")
    ?`<div class="ophoto"><img data-up="${esc(p.slice(3))}" alt="Mijoz surati"><a class="btn soft" data-up="${esc(p.slice(3))}" download="${esc(no)}-${k}.jpg">⬇️ Suratni yuklab olish</a></div>`
    :`<div class="ophoto"><img src="${esc(p)}" alt="Mijoz surati"><a class="btn soft" href="${esc(p)}" target="_blank" rel="noopener">⬇️ Suratni ochish</a></div>`;
  function fillPhotos(){
    const put=id=>app.querySelectorAll(`[data-up="${CSS.escape(id)}"]`).forEach(e=>{if(photos[id])e[e.tagName==="IMG"?"src":"href"]=photos[id]});
    new Set([...app.querySelectorAll("[data-up]")].map(e=>e.dataset.up)).forEach(id=>{
      if(id in photos)return put(id);
      photos[id]=null;
      DB.collection("uploads").doc(id).get().then(d=>{const v=d.exists?String(d.data().img||""):"";photos[id]=v.startsWith("data:image/")?v:"";put(id)}).catch(()=>{delete photos[id]});
    });
  }

  /* KATALOG (faqat egasi): saytdagi rasmlar va har o'lcham narxi */
  const priceInputs=(vals,attr)=>`<div class="dims four">${Object.entries(SIZES).map(([k,v])=>`<div><label>${v.d}<input type="number" min="0" step="1000" ${attr(k)} value="${esc(vals[k]||"")}" placeholder="—"></label></div>`).join("")}</div>`;
  const catHTML=()=>`<div class="blk"><h2 class="bh">Rasmlar katalogi</h2>
    <p class="meta">Shu yerga qo'shilgan rasmlar saytning «Rasmlar» bo'limida chiqadi. Kamida bitta rasm qo'shilsa, namunaviy rasmlar o'rniga faqat shular ko'rinadi. Narxi bo'sh qolgan o'lcham sotilmaydi.</p>
    <div class="padd"><label class="drop" for="pfile">${np.img?`<img class="pprev" src="${np.img}" alt="Tanlangan rasm">`:`<span class="ico">🖼️</span><strong>Rasm faylini tanlang</strong><span>JPG, PNG, WEBP</span>`}</label><input class="vh" type="file" id="pfile" accept="image/*">
      <div><label class="f" for="ptitle">Nomi</label><input type="text" id="ptitle" data-np="title" maxlength="60" value="${esc(np.title)}">
        <label class="f" for="pcat">Kategoriya</label><input type="text" id="pcat" data-np="cat" maxlength="30" list="pcats" value="${esc(np.cat)}" placeholder="masalan: Tabiat"><datalist id="pcats">${[...new Set(products.map(p=>p.cat))].map(c=>`<option value="${esc(c)}">`).join("")}</datalist>
        <p class="lbl">Narxlar (so'm)</p>${priceInputs(np.prices,k=>`data-npp="${k}"`)}
        <button class="btn" data-padd ${np.busy?"disabled":""}>${np.busy?"Saqlanmoqda...":"Rasmni qo'shish"}</button></div></div>
    ${products.map(p=>`<div class="prow"><img src="${esc(p.img)}" alt=""><div><strong>${esc(p.title)}</strong><div class="meta">${esc(p.cat)}</div>
      ${priceInputs(pedit[p.id]||p.prices||{},k=>`data-pe="${esc(p.id)}:${k}"`)}
      <div class="oacts"><button class="btn soft" data-psave="${esc(p.id)}">Narxni saqlash</button><button class="rmb" data-pdel="${esc(p.id)}">O'chirish</button></div></div></div>`).join("")||`<p class="meta">Hali rasm qo'shilmagan, saytda namunaviy rasmlar ko'rinmoqda.</p>`}</div>`;
  const toPrices=o=>Object.fromEntries(Object.keys(SIZES).map(k=>[k,Math.max(0,Math.round(+o[k]||0))]));
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
    const profit=pct>0?money(Math.round(rev*(1-pct/100)/1000)*1000)+`<small>tannarx ${pct}% hisobida</small>`:`—<small>assets/js/config.js da costPct ni yozing</small>`;
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
    <ol class="oitems">${(Array.isArray(o.items)?o.items:[]).map((i,k)=>`<li>${esc(i.title)} (${esc(i.sub)}) ×${+i.qty} = ${money(+i.price*+i.qty)}${photoHTML(typeof i.photo==="string"?i.photo:"",o.no,k+1)}</li>`).join("")}</ol>
    ${o.disc?`<div class="sr disc"><span>Chegirma (${esc(o.promo)})</span><span>−${money(+o.disc)}</span></div>`:""}
    <div class="sr tot"><span>Jami</span><span>${money(+o.amount)}</span></div>
    ${o.handledBy?`<div class="meta">Oxirgi o'zgartirgan: ${esc(o.handledBy)}</div>`:""}
    <div class="oacts">${(NEXT[o.status]||[]).map(([s,t,c])=>`<button class="btn ${c}" data-st="${esc(o.id)}:${s}">${t}</button>`).join("")}</div></div>`;

  function render(){
    if(!user){
      app.innerHTML=`<div class="blk center"><div class="ico">🔐</div><h2>Sotuv bo'limiga kirish</h2><p>Faqat egasi qo'shgan xodimlar kira oladi.</p><button class="btn" data-login>Google bilan kirish</button><div class="err">${esc(err)}</div></div>`;
      return;
    }
    const alertsOn=soundOn()&&(!window.Notification||Notification.permission!=="default");
    const top=`<div class="ctools"><span>${esc(user.email)}${isOwner?" (egasi)":""}</span>${access?`<button class="btn ${alertsOn?"soft":""}" data-alerts>${alertsOn?"🔔 Signal yoniq":"🔕 Signalni yoqish"}</button>`:""}<button class="rm2" data-logout>Chiqish</button></div>`;
    if(access===null){app.innerHTML=top+`<div class="blk center"><p>Tekshirilmoqda...</p></div>`;return}
    if(!access){app.innerHTML=top+`<div class="blk center"><div class="ico">⛔</div><h2>Ruxsat yo'q</h2><p>Bu email xodimlar ro'yxatida yo'q. Egasidan sizni qo'shishini so'rang.</p></div>`;return}
    const cnt=s=>orders.filter(o=>o.status===s).length;
    const list=orders.filter(o=>filter==="hammasi"||o.status===filter);
    document.title=(cnt("yangi")?`(${cnt("yangi")}) `:"")+"Art Print | Sotuv bo'limi";
    app.innerHTML=top+statsHTML()+`<h2 class="bh">Buyurtmalar</h2><div class="chips" role="group" aria-label="Holat">${[["hammasi","Hammasi",orders.length],...Object.entries(ST).map(([k,v])=>[k,v,cnt(k)])].map(([k,v,n])=>`<button class="chip" data-f="${k}" aria-pressed="${k===filter}">${v} (${n})</button>`).join("")}</div>
      <div class="err">${esc(err)}</div>
      ${list.length?list.map(ordHTML).join(""):`<div class="blk center"><p>Bu bo'limda buyurtma yo'q.</p></div>`}
      ${isOwner?`<div class="blk"><h2 class="bh">Xodimlar</h2><p class="meta">Qo'shilgan Google email bilan kirgan odam buyurtmalarni ko'radi va tasdiqlaydi.</p>
        <div class="promo"><input type="email" id="semail" autocomplete="off" placeholder="email@gmail.com" value="${esc(newEmail)}" aria-label="Xodim emaili"><button class="btn soft" data-sadd>Qo'shish</button></div>
        ${staff.map(e=>`<div class="sr"><span>${esc(e)}</span><button class="rmb" data-sdel="${esc(e)}">O'chirish</button></div>`).join("")||`<p class="meta">Hali xodim qo'shilmagan.</p>`}</div>`+catHTML():""}`;
    fillPhotos();
  }
  function listen(){
    subs.push(DB.collection("orders").orderBy("createdAt","desc").limit(300).onSnapshot(s=>{
      const fresh=seen?s.docs.filter(d=>!seen.has(d.id)&&d.data().status==="yangi").length:0;
      seen=new Set(s.docs.map(d=>d.id));
      orders=s.docs.map(d=>({...d.data(),id:d.id}));err="";render();
      if(fresh)ding(fresh);
    },()=>{err="Buyurtmalarni yuklab bo'lmadi.";render()}));
    if(isOwner)subs.push(DB.collection("staff").onSnapshot(s=>{staff=s.docs.map(d=>d.id);render()},()=>{}));
    if(isOwner)subs.push(DB.collection("products").orderBy("createdAt").onSnapshot(s=>{products=s.docs.map(d=>({...d.data(),id:d.id}));render()},()=>{}));
  }
  app.innerHTML=`<div class="blk center"><p>Yuklanmoqda...</p></div>`;
  AUTH.onAuthStateChanged(u=>{
    stop();user=u;access=null;orders=[];staff=[];products=[];seen=null;render();
    if(!u)return;
    const em=(u.email||"").toLowerCase();
    isOwner=!!owner&&em===owner&&u.emailVerified;
    (isOwner?Promise.resolve(true):DB.collection("staff").doc(em).get().then(d=>d.exists)).catch(()=>false).then(ok=>{
      if(user!==u)return;
      access=ok;render();if(ok)listen();
    });
  });
  app.addEventListener("input",e=>{
    const t=e.target,d=t.dataset;
    if(t.id==="semail")newEmail=t.value;
    else if(d.np)np[d.np]=t.value;
    else if(d.npp)np.prices[d.npp]=t.value;
    else if(d.pe){const v=d.pe,i=v.lastIndexOf(":"),id=v.slice(0,i),p=products.find(z=>z.id===id);pedit[id]=pedit[id]||{...(p&&p.prices)};pedit[id][v.slice(i+1)]=t.value}
  });
  app.addEventListener("change",e=>{
    if(e.target.id!=="pfile")return;
    const f=e.target.files[0];if(!f)return;
    if(!f.type.startsWith("image/")){err="Rasm faylini tanlang (JPG, PNG, WEBP).";return render()}
    const u=URL.createObjectURL(f);
    squeeze(u,700,200000).then(d=>{np.img=d;err=""}).catch(()=>{err="Rasmni ochib bo'lmadi. Boshqa fayl tanlang."}).finally(()=>{URL.revokeObjectURL(u);render()});
  });
  app.addEventListener("click",e=>{
    const g=a=>e.target.closest(`[${a}]`);let x;
    if(g("data-alerts"))return enableAlerts();
    if(g("data-padd")){
      const prices=toPrices(np.prices);
      if(!np.img)err="Rasm faylini tanlang.";
      else if(!np.title.trim())err="Rasm nomini yozing.";
      else if(!np.cat.trim())err="Kategoriyani yozing.";
      else if(!Object.values(prices).some(v=>v>0))err="Kamida bitta o'lcham narxini yozing.";
      else err="";
      if(err)return render();
      np.busy=true;render();
      DB.collection("products").add({title:np.title.trim(),cat:np.cat.trim(),img:np.img,prices,createdAt:stamp()})
        .then(()=>{Object.assign(np,{title:"",img:"",prices:{}});toast("Rasm katalogga qo'shildi")})
        .catch(()=>{err="Rasmni saqlab bo'lmadi."}).finally(()=>{np.busy=false;render()});
      return;
    }
    if(x=g("data-psave")){
      const id=x.dataset.psave,p=products.find(z=>z.id===id),prices=toPrices(pedit[id]||p.prices||{});
      DB.collection("products").doc(id).update({prices}).then(()=>{delete pedit[id];toast("Narx saqlandi")}).catch(()=>{err="Narxni saqlab bo'lmadi.";render()});
      return;
    }
    if(x=g("data-pdel")){
      const id=x.dataset.pdel,p=products.find(z=>z.id===id);
      if(p&&confirm(`«${p.title}» katalogdan o'chirilsinmi?`))DB.collection("products").doc(id).delete().then(()=>toast("O'chirildi")).catch(()=>{err="O'chirib bo'lmadi.";render()});
      return;
    }
    if(g("data-login")){err="";AUTH.signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch(er=>{err=er.code==="auth/popup-closed-by-user"?"":"Kirib bo'lmadi: "+er.message;render()});return}
    if(g("data-logout"))return AUTH.signOut();
    if(x=g("data-f")){filter=x.dataset.f;return render()}
    if(x=g("data-per")){period=x.dataset.per;return render()}
    if(x=g("data-st")){
      const[id,s]=x.dataset.st.split(":");x.disabled=true;
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

catalogReady.then(sotuv);
