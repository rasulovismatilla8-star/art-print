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
      app.innerHTML=`<div class="blk center"><div class="ico">🎉</div><h2>Rahmat, ${esc(order.name)}!</h2><p>Buyurtma <strong>${order.no}</strong> qabul qilindi. Jami: <strong>${money(order.amount)}</strong>.</p><p>${order.cash?"To'lov buyurtma yetkazilganda amalga oshiriladi.":"To'lov muvaffaqiyatli o'tdi (demo)."} Sotuvchi buyurtmani tasdiqlagach, ${esc(co.phone)} raqamiga qo'ng'iroq qilamiz.</p>${order.failed?`<p class="err">Buyurtmani yuborib bo'lmadi. Iltimos, ${esc(CONFIG.phone)} raqamiga qo'ng'iroq qiling.</p>`:""}<a class="btn" href="rasmlar.html">Xaridni davom ettirish</a></div>`;
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
      <div class="note">${money(CONFIG.freeFrom)} dan yuqori buyurtmada yetkazish bepul.</div></section></div>`;
  }

  function payLink(m,o){
    const P=CONFIG.pay;
    if(m==="payme"&&P.payme.merchant)return"https://checkout.paycom.uz/"+btoa(`m=${P.payme.merchant};ac.order_id=${o.no};a=${o.amount*100}`);
    if(m==="click"&&P.click.service&&P.click.merchant)return`https://my.click.uz/services/pay?service_id=${P.click.service}&merchant_id=${P.click.merchant}&amount=${o.amount}&transaction_param=${o.no}`;
    if(m==="uzum"&&P.uzum.url)return P.uzum.url+(P.uzum.url.includes("?")?"&":"?")+`order=${o.no}&amount=${o.amount}`;
    return"";
  }
  /* Buyurtma faqat Firebase'ga yoziladi va sotuv bo'limida (sotuv.html) xodimlarga chiqadi.
     15 soniyada javob bo'lmasa yuborilmadi deb hisoblanadi. */
  function notify(o,status){
    if(!DB){o.failed=true;return Promise.resolve()}
    return withTimeout(DB.collection("orders").add({...o.data,payNote:status,status:"yangi",createdAt:stamp()}),15000).catch(()=>{o.failed=true});
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
    order.data={no:order.no,name:order.name,phone:co.phone.trim(),delivery:co.delivery,addr:co.delivery==="home"?co.addr.trim():"",pay:co.pay,
      items:cart.filter(c=>c.sel).map(c=>({title:c.title,sub:c.sub,qty:c.qty,price:c.price,...(c.photo?{photo:c.photo}:{})})),disc:t.disc,promo:promo?promo.code:"",amount:order.amount};
    if(order.cash)return finish("Naqd, yetkazilganda to'lanadi");
    const link=payLink(co.pay,order);
    if(link){view="sending";render();notify(order,"To'lov sahifasiga o'tdi, to'lovni tekshiring").then(()=>{if(order.failed){view="done";render()}else location.href=link});return}
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

catalogReady.then(savat);
