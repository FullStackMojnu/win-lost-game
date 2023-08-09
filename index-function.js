const textsToType = [
  "Pore korbo - ei ekta kotha tomar jiboner mulloban 9 ti bossor kere niyece.",
  "Win or Lost: Try to win every single day!",
  "You will never make any money"
];

let textIndex = 0;
let charIndex = 0;
const typingSpeed = 120; // Adjust typing speed in milliseconds

function typeText() {
  const typedTextElement = document.querySelector("#typedText");

  if (charIndex < textsToType[textIndex].length) {
    typedTextElement.textContent += textsToType[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeText, typingSpeed);
  } else {
    // Move to the next text in the array
    textIndex = (textIndex + 1) % textsToType.length;
    charIndex = 0;
    typedTextElement.textContent = "";
    setTimeout(typeText, typingSpeed);
  }
}

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


typeText();

