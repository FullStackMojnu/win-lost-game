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

const contributionMonths = document.getElementById("contributionMonths");

// Get contribution data from localStorage
const contributionData = JSON.parse(localStorage.getItem("adminData")) || [];

// Group data by year and month
const groupedData = {};
contributionData.forEach(day => {
  const date = new Date(day.date);
  const year = date.getFullYear();
  const month = date.getMonth();
  
  if (!groupedData[year]) {
    groupedData[year] = {};
  }
  
  if (!groupedData[year][month]) {
    groupedData[year][month] = [];
  }
  
  groupedData[year][month].push(day);
});

// Create month containers with contribution data
for (const year in groupedData) {
  for (const month in groupedData[year]) {
    const monthContainer = document.createElement("div");
    monthContainer.className = "month-container";
    
    const monthName = new Date(year, month, 1).toLocaleString('default', { month: 'long' });
    const yearName = year;

    // Create the month name element and append it first
    const monthNameElement = document.createElement("div");
    monthNameElement.className = "month-name";
    monthNameElement.textContent = `${monthName} ${yearName}`;
    monthContainer.appendChild(monthNameElement);

    // Append individual day cells
    groupedData[year][month].forEach(day => {
      const cell = document.createElement("div");
      cell.className = `day ${day.result}`;
      cell.setAttribute("data-date", day.date);
      cell.textContent = day.result === "win" ? "🏆" : "❌";
      monthContainer.appendChild(cell);
    });

    contributionMonths.appendChild(monthContainer);
  }
}
