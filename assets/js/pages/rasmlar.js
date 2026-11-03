/* ================= 2-SAHIFA: RASMLAR ================= */
function rasmlar(){
  const K={cat:"Hammasi",shown:24},CS={};
  const byId=id=>PRODUCTS.find(z=>String(z.id)===String(id));
  const csz=p=>{const a=sizesOf(p);return a.includes(CS[p.id])?CS[p.id]:a.includes("M")?"M":a[0]};
  const ccard=p=>{const s=csz(p);return `<article class="card"><button class="pic" data-open="${esc(p.id)}" aria-label="${esc(p.title)}"><div class="frame">${pic(p)}<span class="szb">${SIZES[s].d}</span></div></button>
  <h2>${esc(p.title)}</h2><div class="meta">${esc(p.cat)}</div>
  <div class="szs" role="group" aria-label="Hajmi">${sizesOf(p).map(k=>`<button class="szc" data-csz="${esc(p.id)}:${k}" aria-pressed="${k===s}">${SIZES[k].d}</button>`).join("")}</div>
  <div class="price">${money(priceOf(p,s))}</div>
  <button class="btn" data-cadd="${esc(p.id)}">Savatga qo'shish</button>
  <div class="row2"><button class="btn alt" data-open="${esc(p.id)}">Ramka</button><a class="btn alt" href="dizayn.html?p=${encodeURIComponent(p.id)}">Xonada</a></div></article>`};
  function render(){
    const l=PRODUCTS.filter(p=>(K.cat==="Hammasi"||p.cat===K.cat)&&sizesOf(p).length).sort((a,b)=>(a.n*37%131)-(b.n*37%131));
    $("#cchips").innerHTML=["Hammasi",...new Set(PRODUCTS.map(p=>p.cat))].map(c=>`<button class="chip" data-ccat="${esc(c)}" aria-pressed="${c===K.cat}">${esc(c)}</button>`).join("");
    $("#cgrid").innerHTML=l.slice(0,K.shown).map(ccard).join("");
    $("#ccnt").textContent=Math.min(K.shown,l.length)+" / "+l.length+" rasm";
    $("#cmore").style.display=K.shown<l.length?"":"none";
  }
  function openDetail(id){
    const p=byId(id);let s=csz(p),f=FRAMES[0];
    openModal(`<div class="detail"><div id="dprev"></div><div>
      <h2 id="mtitle">${esc(p.title)}</h2><div class="meta">${esc(p.cat)}</div>
      <label class="f">Hajmi</label><div class="chips" id="dsz"></div>
      <label class="f">Ramka: <span id="dfname"></span></label><div class="swatches" id="dframes"></div>
      <div class="dtotal" id="dprice"></div>
      <button class="btn" id="dadd">Savatga qo'shish</button></div></div>`,true);
    const upd=()=>{
      $("#dprev").innerHTML=frameHTML(pic(p),f);
      $("#dsz").innerHTML=sizesOf(p).map(k=>`<button class="chip" data-k="${k}" aria-pressed="${k===s}">${SIZES[k].d}</button>`).join("");
      $("#dframes").innerHTML=frameBtns(f.id);
      $("#dfname").textContent=f.name;
      $("#dprice").textContent=money(priceOf(p,s)+f.add);
    };
    upd();
    $("#dsz").onclick=e=>{const b=e.target.closest("[data-k]");if(b){s=b.dataset.k;upd()}};
    $("#dframes").onclick=e=>{const b=e.target.closest("[data-frame]");if(b){f=frameOf(b.dataset.frame);upd()}};
    $("#dadd").onclick=()=>{closeModal();addToCart({key:p.id+"-"+s+"-"+f.id,title:p.title,sub:SIZES[s].label+", "+frameName(f),price:priceOf(p,s)+f.add,qty:1,th:thOf(p)})};
  }
  $("#cchips").onclick=e=>{const b=e.target.closest("[data-ccat]");if(b){K.cat=b.dataset.ccat;K.shown=24;render()}};
  $("#cgrid").onclick=e=>{
    let x;
    if(x=e.target.closest("[data-csz]")){const v=x.dataset.csz,i=v.lastIndexOf(":");CS[v.slice(0,i)]=v.slice(i+1);x.closest(".card").outerHTML=ccard(byId(v.slice(0,i)));return}
    if(x=e.target.closest("[data-cadd]")){const p=byId(x.dataset.cadd),s=csz(p);return addToCart({key:p.id+"-"+s+"-none",title:p.title,sub:SIZES[s].label+", ramkasiz",price:priceOf(p,s),qty:1,th:thOf(p)})}
    if(x=e.target.closest("[data-open]"))openDetail(x.dataset.open);
  };
  $("#cmore").onclick=()=>{K.shown+=24;render()};
  render();
}

catalogReady.then(rasmlar);
