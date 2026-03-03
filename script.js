// DOM elements
const userList = document.getElementById("userList");
const detailsDiv = document.getElementById("details");
const messageDiv = document.getElementById("message");
const searchInput = document.getElementById("searchInput");
const reloadBtn = document.getElementById("reloadBtn");

// Store all users for filtering
let allUsers = [];

// Task 3: Show loading message
function showLoading() {
  messageDiv.textContent = "Loading...";
  messageDiv.className = "message loading";
}

// Task 4: Show error message
function showError() {
  messageDiv.textContent = "Failed to fetch data";
  messageDiv.className = "message error";
}

// Clear message
function clearMessage() {
  messageDiv.textContent = "";
  messageDiv.className = "message";
}

// Task 2: Display user details
function displayUserDetails(user) {
  detailsDiv.innerHTML = `
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
        <p><strong>Website:</strong> ${user.website}</p>
    `;
}

// Render user list based on filtered array
function renderUsers(users) {
  userList.innerHTML = ""; // Clear existing
  users.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = user.name;
    li.addEventListener("click", () => displayUserDetails(user));
    userList.appendChild(li);
  });
}

// Task 5: Filter users by search input
function filterUsers() {
  const searchTerm = searchInput.value.toLowerCase();
  const filtered = allUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm),
  );
  renderUsers(filtered);
}

// Task 1 & 6: Fetch users from API
function fetchUsers() {
  showLoading();
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((users) => {
      allUsers = users;
      renderUsers(users);
      clearMessage();
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      showError();
      userList.innerHTML = ""; // Clear list on error
    });
}

// Event listeners
searchInput.addEventListener("input", filterUsers);
reloadBtn.addEventListener("click", fetchUsers);

// Initial fetch on page load
document.addEventListener("DOMContentLoaded", fetchUsers);
