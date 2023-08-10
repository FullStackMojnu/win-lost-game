document.addEventListener("DOMContentLoaded", function () {
  const dataTable = document.getElementById("dataTable");

  // Get data from localStorage
  const savedData = JSON.parse(localStorage.getItem("adminData")) || [];

  // Populate the table with data
  savedData.forEach(data => {
    const row = document.createElement("tr");

    const dateCell = document.createElement("td");
    dateCell.textContent = new Date(data.date).toLocaleDateString();
    row.appendChild(dateCell);

    const resultCell = document.createElement("td");
    resultCell.textContent = data.result === "win" ? "Win ✅" : "Lost ❌";
    if (data.result === "lose") {
        resultCell.style.backgroundColor = "lightcoral"; // Add "sad color" for lost rows
    }
    row.appendChild(resultCell);

    const importantWorkCell = document.createElement("td");
    importantWorkCell.textContent = data.importantWork;
    row.appendChild(importantWorkCell);

    const scoreCell = document.createElement("td");
    scoreCell.textContent = data.score;
    row.appendChild(scoreCell);

    const giftCell = document.createElement("td");
    giftCell.textContent = data.giftChoice;
    row.appendChild(giftCell);

    dataTable.appendChild(row);
  });
});
