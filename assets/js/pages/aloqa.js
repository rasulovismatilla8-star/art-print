/* ================= 4-SAHIFA: ALOQA (egasi va ma'lumotlar) ================= */
function aloqa(){
  const o=CONFIG.owner,tel="tel:"+CONFIG.phone.replace(/\s/g,"");
  $("#ava").innerHTML=o.photo?`<img src="${esc(o.photo)}" alt="${esc(o.name)}">`:esc(o.name.charAt(0));
  $("#oq").textContent=o.quote?"“"+o.quote+"”":"";
  $("#oname").textContent=o.name;
  $("#orole").textContent=o.role;
  $("#ocall").href=tel;
  $("#cinfo").innerHTML=[["📞","Telefon",`<a href="${tel}">${CONFIG.phone}</a>`],["✈️","Telegram",`<a href="https://t.me/+${digits(CONFIG.telegram)}" target="_blank" rel="noopener">${esc(CONFIG.telegram)}</a>`],["✉️","Email",CONFIG.email?`<a href="mailto:${CONFIG.email}">${CONFIG.email}</a>`:""],["📍","Manzil",esc(CONFIG.address)],["🕘","Ish vaqti",esc(CONFIG.hours)]]
    .filter(r=>r[2]).map(([i,t,v])=>`<div class="feat"><div class="ico">${i}</div><h3>${t}</h3><p>${v}</p></div>`).join("");
}

catalogReady.then(aloqa);
