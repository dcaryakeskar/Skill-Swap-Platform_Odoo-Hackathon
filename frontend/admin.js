// Dummy users
const users = [
  { id: 1, name: "Arya", email: "arya@example.com", isBanned: false },
  { id: 2, name: "Beta Tester", email: "beta@example.com", isBanned: false }
];

// Load user list
const userList = document.getElementById("userList");

function renderUsers() {
  userList.innerHTML = "";
  users.forEach(user => {
    const card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
      <h3>${user.name}</h3>
      <p>${user.email}</p>
      <button class="ban-btn" onclick="toggleBan(${user.id})">
        ${user.isBanned ? "Unban" : "Ban"}
      </button>
    `;
    userList.appendChild(card);
  });
}

function toggleBan(userId) {
  const user = users.find(u => u.id === userId);
  if (!user) return;

  user.isBanned = !user.isBanned;

  // 🛠️ Backend call placeholder
  fetch(`http://localhost:5000/api/admin/ban/${userId}`, {
    method: "PUT"
  })
    .then(res => res.json())
    .then(data => alert(data.message || (user.isBanned ? "User banned" : "User unbanned")))
    .catch(err => alert("Error updating user"));

  renderUsers();
}

// Send platform-wide message
function sendMessage() {
  const msg = document.getElementById("adminMessage").value.trim();
  if (!msg) return alert("Message cannot be empty.");

  // 🛠️ Backend POST /api/admin/message
  fetch("http://localhost:5000/api/admin/message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: msg })
  })
    .then(res => res.json())
    .then(data => alert(data.message || "Message sent"))
    .catch(() => alert("Failed to send message"));
}

// Download reports
function downloadReport(type) {
  window.location.href = `http://localhost:5000/api/admin/report/${type}`;
}

renderUsers();
