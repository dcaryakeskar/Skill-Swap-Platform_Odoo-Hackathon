document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const location = document.getElementById("location").value.trim();

  const res = await fetch("http://localhost:5000/api/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, location })
  });

  const data = await res.json();
  if (res.ok) {
    alert("Registration successful! Please log in.");
    window.location.href = "index.html";
  } else {
    alert(data.error || "Registration failed");
  }
});
