document.getElementById("dashboardForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    skillsOffered: document.getElementById("skillsOffered").value,
    skillsWanted: document.getElementById("skillsWanted").value,
    availability: document.getElementById("availability").value,
    isPublic: document.getElementById("isPublic").checked
  };

  console.log("Sending to backend:", data);

  // 🛠️ Backend Integration Placeholder
  try {
    const res = await fetch("http://localhost:5000/api/users/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    alert(result.message || "Saved successfully");
  } catch (err) {
    console.error("Update error:", err);
    alert("Could not save changes");
  }
});

const photoInput = document.getElementById("photoInput");
const previewImage = document.getElementById("previewImage");

photoInput.addEventListener("change", async () => {
  const file = photoInput.files[0];
  if (!file) return;

  // Preview
  previewImage.src = URL.createObjectURL(file);

  // Upload to backend
  const formData = new FormData();
  formData.append("photo", file);

  try {
    const res = await fetch("http://localhost:5000/api/users/photo", {
      method: "POST",
      body: formData
    });

    const result = await res.json();
    alert(result.message || "Photo uploaded");

    // Optional: preview backend image instead
    if (result.profilePhoto) {
      previewImage.src = "http://localhost:5000" + result.profilePhoto;
    }
  } catch (err) {
    console.error("Photo upload error:", err);
    alert("Upload failed");
  }
});
