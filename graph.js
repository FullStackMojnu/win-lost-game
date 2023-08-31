const token = localStorage.getItem('token');
if (!token) {
    // Redirect to login or sign-up page
    window.location.href = './sign-up.html';
}
const decodedToken = jwt_decode(token);
const userId = decodedToken.userId;

// Fetch data from the API
let userDays = [];
fetch(`http://localhost:3000/api/days/user-days?userId=${userId}`, {
    method: 'GET',
    headers: {
        'Authorization': token
    }
})
    .then(response => response.json())
    .then(data => {
        userDays = data;
    });

// Prepare data for the graph
const dates = userDays.map(day => day.date);
const scores = userDays.map(day => parseFloat(day.score));

// Get the canvas element
const canvas = document.getElementById('progressGraph');

// Create a new chart
new Chart(canvas, {
    type: 'line',
    data: {
        labels: dates,
        datasets: [{
            label: 'Progress',
            data: scores,
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Set desired color
            borderColor: 'rgba(75, 192, 192, 1)', // Set desired color
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
