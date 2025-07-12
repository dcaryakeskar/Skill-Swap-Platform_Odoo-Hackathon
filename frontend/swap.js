const users = [
  { id: 2, name: "Beta Tester", skillsOffered: "React", skillsWanted: "Photoshop" },
  { id: 3, name: "Arya Keskar", skillsOffered: "Excel", skillsWanted: "Video Editing" },
];

const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");

searchInput.addEventListener("input", () => {
  const term = searchInput.value.toLowerCase();
  const filtered = users.filter(
    user =>
      user.skillsOffered.toLowerCase().includes(term) ||
      user.skillsWanted.toLowerCase().includes(term)
  );
  renderResults(filtered);
});

function renderResults(data) {
  resultsDiv.innerHTML = "";
  data.forEach(user => {
    const card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>Offers:</strong> ${user.skillsOffered}</p>
      <p><strong>Wants:</strong> ${user.skillsWanted}</p>
      <button onclick="requestSwap(${user.id})">Request Swap</button>
    `;
    resultsDiv.appendChild(card);
  });
}

function requestSwap(recipientId) {
  const swap = {
    requesterId: 1, // Normally from logged-in session
    recipientId,
    offeredSkill: "Photoshop",
    requestedSkill: "React"
  };

  console.log("Sending swap request:", swap);

  // 🛠️ Placeholder for backend call:
  fetch("http://localhost:5000/api/swaps/request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(swap)
  })
    .then(res => res.json())
    .then(data => alert(data.message || "Swap requested"))
    .catch(err => alert("Failed to request swap"));
}

// Initial render
renderResults(users);
