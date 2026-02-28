document.addEventListener("DOMContentLoaded", () => {

  // ====== DARK MODE ======
  const themeToggle = document.getElementById("themeToggle");
  if(themeToggle && localStorage.getItem("theme")==="dark"){
    document.body.classList.add("dark");
    themeToggle.checked = true;
  }
  if(themeToggle){
    themeToggle.addEventListener("change", ()=>{
      document.body.classList.toggle("dark");
      localStorage.setItem("theme", document.body.classList.contains("dark")?"dark":"light");
    });
  }

  // ====== VIDEO EDUKASI ======
  const player = document.getElementById("videoPlayer");
  const stageButtons = document.getElementById("stageButtons");
  const episodeButtons = document.getElementById("episodeButtons");
  const backBtn = document.getElementById("backBtn");

  // ===== DATA VIDEO PER TAHAP =====
  const videoData = {
    1: ["pOPd5nfcAVU","_QTjtFEROwE","TTkPkEiebjg","rmbZaDg0tSQ","IZ40XHwez_k","5oMM2bTc-lo","seC1xC5arDk","QWawzxSNhGc","O374Cwd89O8"],
    2: ["UMoIsdA2tKU","H-I0S3LPXPk","iVU6JiYTNrQ","1vQ26sHPw7k","Cw2Jv6oDVxk","u-vs5latlfE","SO1dxi0-BcI","UPavltwt9jY","TxhhbOAgl5U","nhG4bAMDmIg","xJSrSeyUuR8","HjGp0cNx2Xc","Zf0gof8tNKw","zrDLWqkkri8","Mj9yOm7cHs0"],
    3: ["n1wiBtGaEV0","AsE6VcINcXk","H0aA_MerucY","5QaTHj79gdM","6OxTVUVUmPI","okmyKlkxkIc","z8NAN_fM2-o","n6NRJ_gYuLs","nHpfYwKaHcY","-S9BooG-Gco","VJIprYjQgYU","diewyK14tpA","v3ATFpWsrH4","xFPKy6PU4w0"],
    4: ["PpWspsbxu9Q","OeKfaLCc8u4","hQUyY-5c5xs","pRNuTvUPXzY","RFBH36HpOuM","4jL70zosnQI","RtkEX-KV5ps"],
    5: ["WFTuWS8zuWE","TbYZ9WZjt_0","CJQ_TYMEnQc","M_jvLwFKD4o","VlFy2EG3bOo","Y0OJejG_iuk","OFisLSpu_eo","gvhRvgTSqdM","be4RzySDAys","ealHC1iVrzk","0TOIETvM2Oo","X63Hivy2v3E","fGz-8RBtM_o"],
    6: ["2a7dXVUIyRE","km_gayxRyTE","h2FkS6xApik","T8gp0fKbIUA","y4VYFuLpBmg","j7JhwMtbI0Q","9KJwNWvfy4I","pscR_dxAKr0","GJlRH8qGj7E","BRoUsXzjzfQ","QRG4vRv13nQ","dJK2tShwW1o","ttfUNmbLeYw","Mbrhx3dZ9c8","0s-frvLyyMU","I96SONSjF3w","SsrkbcY08SY"],
    7: ["wHGGIUwiswA","H9GUObZ-JYc","oMdUSvqubCg","17cinavkKPY","I1FsP6sulUI","7GojbEtn8os","SLZoi6tHzpw","C8La8RjZ8zQ","easO_fzFf-c","Q2wKEy4Amwo","xANGc19Plc8"],
    8: ["CP_h9xs5miY","O0LFVSgAUWg","AI5z2XkeM8A","4G3NuRIeYL0","uCdZEjVAO1g","8HWvuOWtnb0","TCi_7nrDH-A","vquwTkBGKJ8","4OAk3EBB1Ro","boJM0AdJoag","yYGsOCN-0X0","_B9QGB8s8Co","B0EIbNLkKak"]
  };

  if(player && stageButtons && episodeButtons && backBtn){
    stageButtons.querySelectorAll("button").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        showEpisodes(btn.dataset.stage);
      });
    });

    function showEpisodes(stage){
      stageButtons.style.display="none";
      backBtn.style.display="inline-block";
      episodeButtons.style.display="flex";
      episodeButtons.innerHTML="";
      (videoData[stage]||[]).forEach((vid,i)=>{
        const epBtn = document.createElement("button");
        epBtn.textContent = `Episode ${i+1}`;
        epBtn.addEventListener("click", ()=>player.src = `https://www.youtube.com/embed/${vid}`);
        episodeButtons.appendChild(epBtn);
      });
    }

    backBtn.addEventListener("click", ()=>{
      episodeButtons.style.display="none";
      backBtn.style.display="none";
      stageButtons.style.display="flex";
    });
  }

  // ====== SIMULATOR TRADING ======
  const chartCanvas = document.getElementById("tradingChart");
  const buyBtn = document.getElementById("buyBtn");
  const sellBtn = document.getElementById("sellBtn");
  const balanceBox = document.getElementById("balanceBox");
  const tradeHistoryBox = document.getElementById("tradeHistoryBox");

  if(!chartCanvas || !balanceBox || !tradeHistoryBox) return; // anti crash halaman lain

  let positions = [];
  let balance = 10000;
  const positionSize = 1000;

  // ===== CHART =====
  const ctx = chartCanvas.getContext("2d");
  const data = [100,102,101,103,105,104];
  const labels = ["Jan","Feb","Mar","Apr","Mei","Jun"];
  const tradingChart = new Chart(ctx,{
    type:"line",
    data:{labels,datasets:[{
      label:"Harga",
      data,
      fill:true,
      borderColor:"#4f46e5",
      backgroundColor:"rgba(79,70,229,0.2)",
      tension:0.4,
      pointRadius:5,
      pointBackgroundColor:new Array(data.length).fill("#4f46e5")
    }]},
    options:{
      responsive:true,
      maintainAspectRatio:false,
      animation:{duration:800, easing:'easeInOutQuad'},
      scales:{y:{beginAtZero:false}}
    }
  });

  // ===== UI UPDATE =====
  function updateUI(){
    const lastPrice = tradingChart.data.datasets[0].data.slice(-1)[0];

    // balance & floating P/L
    let totalPL = positions.reduce((acc,pos)=>{
      return acc + (pos.type==="buy"? (lastPrice-pos.price)*pos.size : (pos.price-lastPrice)*pos.size);
    },0);
    balanceBox.textContent = `Saldo: $${balance.toFixed(2)} | Floating P/L: $${totalPL.toFixed(2)}`;
    balanceBox.style.color = totalPL>=0?"green":"red";

    // trade history
    tradeHistoryBox.innerHTML = "";
    if(positions.length>0){
      const closeAllBtn = document.createElement("button");
      closeAllBtn.textContent = "Close All";
      closeAllBtn.classList.add("close-all-btn");
      closeAllBtn.onclick = ()=>{ while(positions.length) closePosition(0); };
      tradeHistoryBox.appendChild(closeAllBtn);

      positions.forEach((pos,index)=>{
        const profit = pos.type==="buy"? (lastPrice-pos.price)*pos.size : (pos.price-lastPrice)*pos.size;
        const div = document.createElement("div");
        div.className="position-item";
        div.style.background = profit>=0?"rgba(34,197,94,0.2)":"rgba(239,68,68,0.2)";
        div.innerHTML = `<span>${pos.type.toUpperCase()} @ ${pos.price.toFixed(2)} | Size: ${pos.size} | P/L: ${profit.toFixed(2)}</span>
                         <button class="close-btn" data-index="${index}">Close</button>`;
        div.querySelector(".close-btn").onclick = ()=>closePosition(index);
        tradeHistoryBox.appendChild(div);
      });
    }
  }

  function closePosition(idx){
    const lastPrice = tradingChart.data.datasets[0].data.slice(-1)[0];
    const pos = positions[idx];
    const profit = pos.type==="buy"? (lastPrice-pos.price)*pos.size : (pos.price-lastPrice)*pos.size;
    balance += positionSize + profit;
    positions.splice(idx,1);
    updateUI();
  }

  // ===== PRICE SIMULATION SMOOTH =====
  setInterval(()=>{
    const dataset = tradingChart.data.datasets[0].data;
    const lastPrice = dataset[dataset.length-1];
    const change = lastPrice*(Math.random()*0.03-0.015);
    dataset.shift();
    dataset.push(parseFloat(Math.max(lastPrice+change,1).toFixed(2)));
    tradingChart.data.datasets[0].pointBackgroundColor = dataset.map(()=>"#4f46e5");
    tradingChart.update();
    updateUI();
  },2000);

  // ===== BUY / SELL =====
  if(buyBtn) buyBtn.onclick = ()=>{
    const lastPrice = tradingChart.data.datasets[0].data.slice(-1)[0];
    if(balance>=positionSize){ positions.push({type:"buy",price:lastPrice,size:positionSize/100}); balance-=positionSize; updateUI(); }
  };
  if(sellBtn) sellBtn.onclick = ()=>{
    const lastPrice = tradingChart.data.datasets[0].data.slice(-1)[0];
    if(balance>=positionSize){ positions.push({type:"sell",price:lastPrice,size:positionSize/100}); balance-=positionSize; updateUI(); }
  };

  updateUI();
});
