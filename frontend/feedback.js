const swapsToRate = [
  { id: 1, name: "Beta Tester", skill: "React" },
  { id: 2, name: "Jane Smith", skill: "Excel" }
];

const container = document.getElementById("feedbackList");

swapsToRate.forEach(swap => {
  const card = document.createElement("div");
  card.className = "user-card";
  card.innerHTML = `
    <h3>${swap.name}</h3>
    <p>Swap completed: ${swap.skill}</p>
    <div class="star-rating" data-id="${swap.id}">
      ${[1,2,3,4,5].map(n => `<span data-star="${n}">&#9733;</span>`).join("")}
    </div>
    <textarea placeholder="Leave feedback..." id="comment-${swap.id}"></textarea>
    <button onclick="submitFeedback(${swap.id})">Submit</button>
  `;
  container.appendChild(card);
});

document.querySelectorAll(".star-rating").forEach(stars => {
  stars.addEventListener("click", e => {
    if (!e.target.dataset.star) return;
    const rating = parseInt(e.target.dataset.star);
    stars.querySelectorAll("span").forEach(s => s.classList.remove("selected"));
    stars.querySelectorAll("span").forEach((s, i) => {
      if (i < rating) s.classList.add("selected");
    });
    stars.dataset.rating = rating;
  });
});

function submitFeedback(swapId) {
  const rating = document.querySelector(`.star-rating[data-id="${swapId}"]`).dataset.rating;
  const comment = document.getElementById(`comment-${swapId}`).value;

  if (!rating) return alert("Please select a star rating.");

  const payload = {
    userId: 1,        // current user
    targetId: swapId, // recipient of feedback
    rating: parseInt(rating),
    comment: comment
  };

  console.log("Submitting:", payload);

  // 🛠️ Replace with your backend:
  fetch("http://localhost:5000/api/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(data => alert(data.message || "Feedback sent"))
    .catch(() => alert("Error submitting feedback"));
}
