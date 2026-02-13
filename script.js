document.addEventListener("DOMContentLoaded", () => {
  // Dark mode
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
    });
  }

  // Ganti video per tahap
  const player = document.getElementById("videoPlayer");
  const videoButtons = document.querySelectorAll(".video-buttons button");

  if (player && videoButtons.length > 0) {
    videoButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-video");
        player.src = "https://www.youtube.com/embed/" + id;
      });
    });
  }

  // Chart simulator
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
          borderColor: "#4f46e5",
          backgroundColor: "rgba(79,70,229,0.2)",
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  // Simulasi trading simpel
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

  // update tampilan pas pertama load
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
