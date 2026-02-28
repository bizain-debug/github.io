document.addEventListener("DOMContentLoaded", function() {

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

  // ===== JOURNAL SYSTEM =====
  const form = document.getElementById("journalForm");
  const journalList = document.getElementById("journalList");

  if (!form || !journalList) return;

  let trades = JSON.parse(localStorage.getItem("trades")) || [];

  function renderTrades() {
    journalList.innerHTML = "";

    trades.forEach((trade) => {
      const div = document.createElement("div");
      div.classList.add("article-card");
      div.innerHTML = `
        <h3>${trade.pair}</h3>
        <p>Risk: ${trade.risk}%</p>
        <p>Result: ${trade.result}</p>
        <p>Note: ${trade.note}</p>
      `;
      journalList.appendChild(div);
    });
  }

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const newTrade = {
      pair: document.getElementById("pair").value,
      risk: document.getElementById("risk").value,
      result: document.getElementById("result").value,
      note: document.getElementById("note").value
    };

    trades.push(newTrade);
    localStorage.setItem("trades", JSON.stringify(trades));

    form.reset();
    renderTrades();
  });

  renderTrades();
});
