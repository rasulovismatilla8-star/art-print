/* ================= 1-SAHIFA: BOSH SAHIFA ================= */
function home(){
  $("#heroWall").innerHTML=[["w1","arches",1,"gold"],["w2","circles",6,"black"],["w3","leaf",4,"brown"]].map(([c,s,p,f],i)=>`<div class="wf ${c}">${frameHTML(artSVG({s,p,seed:i+11}),frameOf(f))}</div>`).join("");
}

catalogReady.then(home);
