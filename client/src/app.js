const form = document.getElementById("guestbook-form");
const messagesContainer = document.getElementById("messages-container");
const API_URL = "aws-1-eu-west-2.pooler.supabase.com";

async function loadMessages() {
  try {
    const response = await fetch(API_URL);
    const entries = await response.json();
    messagesContainer.innerHTML = "";
    entries.forEach((entry) => {
      const entryDiv = document.createElement("div");
      entryDiv.classList.add("message-entry");
      entryDiv.innerHTML = `
                <p><strong>${entry.name}</strong> says:</p>
                <p>${entry.message}</p>
                <span>${new Date(entry.createdAt).toLocaleDateString()}</span>
            `;
      messagesContainer.appendChild(entryDiv);
    });
  } catch (error) {
    console.error("Error loading messages:", error);
    messagesContainer.innerHTML = "<p>Failed to load messages.</p>";
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, message }),
    });

    form.reset();
    loadMessages();
  } catch (error) {
    console.error("Error submitting message:", error);
    alert("Failed to submit message.");
  }
});

loadMessages();
