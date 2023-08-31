const dayTable = document.getElementById('dayTable').getElementsByTagName('tbody')[0];
// Check if the user has a valid token
const token = localStorage.getItem('token');
if (!token) {
    // Redirect to login or sign-up page
    window.location.href = './sign-up.html';
}
const decodedToken = jwt_decode(token);
const userId = decodedToken.userId;

// Fetch data from the API
fetch(`http://localhost:3000/api/days/user-days?userId=${userId}`, {
    method: 'GET',
    headers: {
        'Authorization': token
    }
})
    .then(response => response.json())
    .then(data => {
        // Create table rows with data
        data.forEach(day => {
            const row = document.createElement('tr');
            row.innerHTML = `
        <td>${day.date}</td>
        <td>${day.result}</td>
        <td>${day.score}</td>
        <td><button class="delete-button" data-id="${day._id}">Delete</button></td>
      `;
            dayTable.appendChild(row);
        });

        // Add click event handlers for edit and delete buttons
        const editButtons = document.querySelectorAll('.edit-button');
        const deleteButtons = document.querySelectorAll('.delete-button');

        editButtons.forEach(button => {
            button.addEventListener('click', () => {
                const dayId = button.getAttribute('data-id');
                // Redirect to the edit page or perform other actions
            });
        });

        deleteButtons.forEach(deleteButton => {
            deleteButton.addEventListener('click', function () {
                const dayId = this.getAttribute('data-id'); // Assuming data-id attribute holds the day's _id
                const row = this.closest('tr');
                // Confirm the deletion with the user
                if (confirm('Are you sure you want to delete this day?')) {
                    fetch(`http://localhost:3000/api/day/${dayId}`, {
                        method: 'DELETE'
                    })
                        .then(response => {
                            if (response.ok) {
                                row.remove();
                                // Optionally, update the UI or refresh the page
                                console.log('Day deleted successfully');
                                // Update UI or refresh page here
                            } else {
                                console.error('Error deleting day');
                            }
                        })
                        .catch(error => {
                            console.error('Error deleting day:', error);
                        });
                }
            });
        });

    });
