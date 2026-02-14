document.addEventListener("DOMContentLoaded", () => {

  // ===== THEME TOGGLE =====
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    if (themeToggle) themeToggle.checked = true;
  }

  if (themeToggle) {
    themeToggle.addEventListener("change", () => {
      if (themeToggle.checked) {
        document.body.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    });
  }
  
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

  const player = document.getElementById("videoPlayer");
  const stageButtons = document.getElementById("stageButtons");
  const episodeButtons = document.getElementById("episodeButtons");
  const backBtn = document.getElementById("backBtn");

  // ===== Fitur Edukasi (cuma jalan kalau elemennya ada) =====
  if (player && stageButtons && episodeButtons && backBtn) {
    stageButtons.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => {
        const stage = btn.getAttribute("data-stage");
        showEpisodes(stage);
      });
    });

    function showEpisodes(stage) {
      stageButtons.style.display = "none";
      backBtn.style.display = "inline-block";
      episodeButtons.style.display = "flex";
      episodeButtons.innerHTML = "";

      const videos = videoData[stage] || [];
      videos.forEach((vid, index) => {
        const epBtn = document.createElement("button");
        epBtn.textContent = "Episode " + (index + 1);
        epBtn.addEventListener("click", () => {
          player.src = "https://www.youtube.com/embed/" + vid;
        });
        episodeButtons.appendChild(epBtn);
      });
    }

    backBtn.addEventListener("click", () => {
      episodeButtons.style.display = "none";
      backBtn.style.display = "none";
      stageButtons.style.display = "flex";
    });
  }

  // ===== Chart simulator =====
  const chartCanvas = document.getElementById("tradingChart");
  if (chartCanvas && window.Chart) {
    const ctx = chartCanvas.getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
        datasets: [{
          label: "Harga",
          data: [100, 120, 110, 130, 125, 140],
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  // ===== Simulasi trading =====
  let balance = 10000;
  let position = null;

  const balanceEl = document.getElementById("balance");
  const positionEl = document.getElementById("position");
  const buyBtn = document.getElementById("buyBtn");
  const sellBtn = document.getElementById("sellBtn");

  function updateUI() {
    if (balanceEl && positionEl) {
      balanceEl.textContent = `Saldo: $${balance}`;
      positionEl.textContent = `Posisi: ${position ? "Beli" : "Tidak ada"}`;
    }
  }

  updateUI();

  if (buyBtn && sellBtn) {
    buyBtn.addEventListener("click", () => {
      if (!position && balance >= 1000) {
        position = "buy";
        balance -= 1000;
        updateUI();
      }
    });

    sellBtn.addEventListener("click", () => {
      if (position === "buy") {
        position = null;
        balance += 1100;
        updateUI();
      }
    });
  }
});
