// Calculate and update the dynamic age
function updateDynamicAge() {
  const birthDate = new Date('1998-06-06'); // Replace with user's birthdate
  const now = new Date();

  const ageInSeconds = Math.floor((now - birthDate) / 1000);
  const years = Math.floor(ageInSeconds / (365 * 24 * 60 * 60));
  const months = Math.floor((ageInSeconds % (365 * 24 * 60 * 60)) / (30 * 24 * 60 * 60));
  const days = Math.floor((ageInSeconds % (30 * 24 * 60 * 60)) / (24 * 60 * 60));
  const hours = Math.floor((ageInSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((ageInSeconds % (60 * 60)) / 60);
  const seconds = ageInSeconds % 60;

  const ageText = `${years} years ${months} months ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
  document.getElementById('dynamic-age').textContent = ageText;
}

// Call the function initially and update every second
updateDynamicAge();
setInterval(updateDynamicAge, 1000);


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

// If no contribution data available, display the user message

const messageContainer = document.getElementById("messageContainer");
const closeButton = document.getElementById("closeButton");

if (contributionData.length === 0) {
  messageContainer.style.display = "block";

  closeButton.addEventListener("click", () => {
    messageContainer.style.display = "none";
  });
} else {
  // Loop through contribution data and create month containers
  // ... (rest of your existing code)
  for (const year in groupedData) {
    for (const month in groupedData[year]) {
      const monthContainer = document.createElement("div");
      monthContainer.className = "month-container";

      const monthName = new Date(year, month, 1).toLocaleString('default', { month: 'long' });
      const yearName = year;
      const monthWins = groupedData[year][month].filter(day => day.result === "win").length;
      const monthTotalDays = new Date(year, month + 1, 0).getDate();

      // Create the month name element and append it first
      const monthNameElement = document.createElement("div");
      monthNameElement.className = "month-name";
      monthNameElement.textContent = `${monthName} ${yearName} (${monthWins}/${monthTotalDays})`;
      monthContainer.appendChild(monthNameElement);

      // Append individual day cells
      groupedData[year][month].forEach(day => {
        const cell = document.createElement("div");
        cell.className = `day ${day.result}`;
        const dayNumber = new Date(day.date).getDate();
        cell.setAttribute("data-date", `${dayNumber}`);
        cell.setAttribute("data-score", `${day.score}`);
        cell.textContent = day.result === "win" ? "🏆" : "🥚";
        monthContainer.appendChild(cell);
      });

      contributionMonths.appendChild(monthContainer);
    }
  }
  // show total winning day and totla lost day
  // Calculate total winning and lost days
  let totalWinningDays = 0;
  let totalLostDays = 0;

  contributionData.forEach(day => {
    if (day.result === "win") {
      totalWinningDays++;
    } else if (day.result === "lose") {
      totalLostDays++;
    }
  });
  const totalDays = totalWinningDays + totalLostDays;
  const winningPercentage = (totalWinningDays / totalDays) * 100;
  // Get the last day of the month

  // Update the HTML elements with the calculated values
  document.getElementById("totalWinningDays").textContent = totalWinningDays;
  document.getElementById("totalLostDays").textContent = totalLostDays;
  document.getElementById("winningPercentage").textContent = winningPercentage.toFixed(2) + "%";
}

// Clock

