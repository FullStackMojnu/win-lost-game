// Check if the user has a valid token
const token = localStorage.getItem('token');
if (!token) {
  // Redirect to login or sign-up page
  window.location.href = './sign-up.html';
}
const decodedToken = jwt_decode(token);
const userId = decodedToken.userId;

document.addEventListener("DOMContentLoaded", function () {
  const dataTable = document.getElementById("dataTable");

  fetch(`http://localhost:3000/api/days/user-days?userId=${userId}`, {
    method: 'GET',
    headers: {
      'Authorization': token
    }
  })
    .then(response => response.json())
    .then(data => {
      // Create table rows with data
      data.forEach(data => {
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
});



  // Populate the table with data

