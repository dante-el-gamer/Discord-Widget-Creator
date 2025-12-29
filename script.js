const elements = {
  serverId: document.getElementById("serverId"),
  inviteUrl: document.getElementById("inviteUrl"),
  titleInput: document.getElementById("titleInput"),
  descInput: document.getElementById("descInput"),
  iconInput: document.getElementById("iconInput"),
  colorInput: document.getElementById("colorInput"),
  showCount: document.getElementById("showCount"),

  // Preview Elements
  dcName: document.getElementById("dcName"),
  dcCount: document.getElementById("dcCount"),
  dcDesc: document.getElementById("dcDesc"),
  joinBtn: document.getElementById("joinBtn"),
  icon: document.getElementById("icon"),
  widget: document.getElementById("widget"),
  copyBtn: document.getElementById("copyBtn"),
  codePreview: document.getElementById("codePreview")
};

let serverData = {
  name: "Server Name",
  presence_count: 0,
  icon: null
};

// --- HANDLERS ---

function updatePreview() {
  // Title: Override or Server Name
  const nameText = elements.titleInput.value.trim() || serverData.name;
  elements.dcName.textContent = nameText;

  // Description
  const descText = elements.descInput.value.trim() || "Join our community!";
  elements.dcDesc.textContent = descText;
  elements.dcDesc.style.display = descText ? "block" : "none";

  // Invite Link
  const url = elements.inviteUrl.value.trim() || "#";
  elements.joinBtn.href = url;

  // Online Count
  if (elements.showCount.checked) {
    elements.dcCount.textContent = `🟢 ${serverData.presence_count} Online`;
    elements.dcCount.style.display = "block";
  } else {
    elements.dcCount.style.display = "none";
  }

  // Accent Color (CSS Variable)
  // Icon
  const iconUrl = elements.iconInput.value.trim() || serverData.icon;
  if (iconUrl) {
    elements.icon.innerHTML = `<img src="${iconUrl}" alt="Icon" style="width: 100%; height: 100%; border-radius: 14px; object-fit: cover;">`;
    elements.icon.style.backgroundColor = "transparent";
  } else {
    elements.icon.innerHTML = '<span class="online-dot"></span>';
    elements.icon.style.backgroundColor = elements.colorInput.value;
  }

  // Apply accent color to Join button only and adjust valid text color
  elements.joinBtn.style.backgroundColor = elements.colorInput.value;
  elements.joinBtn.style.color = getContrastColor(elements.colorInput.value);

  // Update Code Preview
  elements.codePreview.value = generateCode();
}

// Ensure hex color is valid (6 digits) or provide fallback
function getContrastColor(hex) {
  if (!hex || hex.length !== 7) return "#ffffff";

  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);

  // YIQ equation
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? "#000000" : "#ffffff";
}

async function fetchServerInfo() {
  const id = elements.serverId.value.trim();
  if (!id || id.length < 15) return; // Simple validation

  try {
    const res = await fetch(`https://discord.com/api/guilds/${id}/widget.json`);
    if (!res.ok) throw new Error("Server not found or widget disabled");

    const data = await res.json();
    serverData.name = data.name;
    serverData.presence_count = data.presence_count;

    // Reset warnings
    elements.dcCount.style.color = "";

    // Auto-fill invite if empty
    if (!elements.inviteUrl.value && data.instant_invite) {
      elements.inviteUrl.value = data.instant_invite;
      await fetchIconInfo(data.instant_invite);
    } else if (elements.inviteUrl.value) {
      await fetchIconInfo(elements.inviteUrl.value);
    } else {
      // Warning if no invite link found
      // We'll update a small warning text or placeholder
      elements.inviteUrl.placeholder = "⚠ No invite found. Please paste one.";
      elements.iconInput.placeholder = "⚠ No invite found. Paste Icon URL.";
    }

    updatePreview();
  } catch (err) {
    console.error(err);
    elements.dcCount.textContent = "⚠ Widget disabled or invalid ID";
  }
}

function getInviteCode(url) {
  const match = url.match(/(?:discord\.gg|discord\.com\/invite)\/([a-zA-Z0-9-]+)/);
  return match ? match[1] : null;
}

async function fetchIconInfo(inviteUrl) {
  const code = getInviteCode(inviteUrl);
  if (!code) return;

  try {
    const res = await fetch(`https://discord.com/api/v9/invites/${code}`);
    if (!res.ok) return;
    const data = await res.json();

    if (data.guild && data.guild.icon) {
      serverData.icon = `https://cdn.discordapp.com/icons/${data.guild.id}/${data.guild.icon}.png`;
      elements.iconInput.value = serverData.icon;
    }
  } catch (e) {
    console.error("Failed to fetch invite info", e);
  }
}

function generateCode() {
  const color = elements.colorInput.value;
  const url = elements.inviteUrl.value || "#";
  const name = elements.dcName.textContent;
  const desc = elements.dcDesc.textContent;
  const showCount = elements.showCount.checked;
  const countText = elements.dcCount.textContent;

  // Minimal inline CSS for portability
  const html = `
<div style="
  font-family: 'Inter', sans-serif;
  background: #202225;
  border-radius: 8px;
  padding: 16px;
  max-width: 400px;
  color: #fff;
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
">
  <div style="display: flex; align-items: center; gap: 12px;">
    <div style="
      width: 48px; height: 48px; background: ${color}; border-radius: 14px;
      display: flex; align-items: center; justify-content: center; font-size: 24px; overflow: hidden;
    ">
      ${elements.iconInput.value ? `<img src="${elements.iconInput.value}" style="width: 100%; height: 100%; object-fit: cover;">` : "🎮"}
    </div>
    <div style="flex: 1; min-width: 0;">
      <h3 style="margin: 0; font-size: 16px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${name}</h3>
      ${showCount ? `<p style="margin: 4px 0 0; font-size: 12px; color: #b9bbbe;">${countText}</p>` : ""}
    </div>
    <a href="${url}" target="_blank" style="
      background: ${color}; color: ${getContrastColor(color)}; text-decoration: none;
      padding: 8px 16px; border-radius: 4px; font-size: 14px; font-weight: 600;
    ">Join</a>
  </div>
  ${desc ? `<p style="margin: 12px 0 0; font-size: 13px; color: #dcddde; border-top: 1px solid #333; padding-top: 10px;">${desc}</p>` : ""}
</div>`.trim();

  return html;
}

// --- EVENTS ---

// Input listeners for live preview
[elements.titleInput, elements.descInput, elements.inviteUrl, elements.colorInput, elements.showCount, elements.iconInput]
  .forEach(el => el.addEventListener("input", updatePreview));

// Also refetch icon when manual invite link changes
elements.inviteUrl.addEventListener("change", (e) => fetchIconInfo(e.target.value).then(updatePreview));

// Server ID fetch (debounced slightly via blur or enter ideally, but change is fine)
elements.serverId.addEventListener("change", fetchServerInfo);

// Copy Button
elements.copyBtn.addEventListener("click", () => {
  const code = generateCode();
  navigator.clipboard.writeText(code).then(() => {
    const originalText = elements.copyBtn.innerHTML;
    elements.copyBtn.innerHTML = "<span>✅</span> Code Copied";
    elements.copyBtn.style.background = "#3ba55c";

    setTimeout(() => {
      elements.copyBtn.innerHTML = originalText;
      elements.copyBtn.style.background = ""; // Reset to CSS default
    }, 2000);
  });
});

// Initialize
updatePreview();
