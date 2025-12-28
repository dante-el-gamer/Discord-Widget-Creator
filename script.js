const serverId = document.getElementById("serverId");
const inviteUrl = document.getElementById("inviteUrl");
const titleInput = document.getElementById("titleInput");
const descInput = document.getElementById("descInput");
const colorInput = document.getElementById("colorInput");

const dcName = document.getElementById("dcName");
const dcCount = document.getElementById("dcCount");
const dcDesc = document.getElementById("dcDesc");
const joinBtn = document.getElementById("joinBtn");
const widget = document.getElementById("widget");

function updateWidget() {
  dcName.textContent = titleInput.value;
  dcDesc.textContent = descInput.value;
  joinBtn.href = inviteUrl.value || "#";
  widget.style.setProperty("--color", colorInput.value);
}

document.querySelectorAll("input, textarea").forEach(el =>
  el.addEventListener("input", updateWidget)
);

serverId.addEventListener("change", () => {
  fetch(`https://discord.com/api/guilds/${serverId.value}/widget.json`)
    .then(res => res.json())
    .then(data => {
      dcName.textContent = data.name;
      dcCount.textContent = `👤 ${data.presence_count} personas`;
    })
    .catch(() => {
      dcCount.textContent = "👤 No disponible";
    });
});

document.getElementById("copyBtn").addEventListener("click", () => {
  const code = `
<div class="discord-card">
  <a href="${inviteUrl.value}" target="_blank">
    ${dcName.textContent}
  </a>
</div>
  `.trim();

  navigator.clipboard.writeText(code);
  alert("Código copiado 😎");
});

updateWidget();
