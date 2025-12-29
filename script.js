:root {
  --bg-app: #202225;
  --bg-panel: #2f3136;
  --bg-preview: #36393f;
  --text-primary: #ffffff;
  --text-secondary: #b9bbbe;
  --accent: #5865F2; /* Discord Blurple */
  --accent-hover: #4752c4;
  --success: #3ba55c;
  --input-bg: #202225;
  --border: #202225;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--bg-app);
  color: var(--text-primary);
  font-family: 'Inter', sans-serif;
  height: 100vh;
  overflow: hidden;
}

.app {
  display: grid;
  grid-template-columns: 400px 1fr;
  height: 100vh;
}

/* --- CONTROLS PANEL --- */
.controls {
  background: var(--bg-panel);
  padding: 30px;
  overflow-y: auto;
  border-right: 1px solid rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.header h1 {
  font-size: 24px;
  margin: 0 0 5px 0;
  color: var(--text-primary);
}

.header p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
}

.divider {
  border: 0;
  height: 1px;
  background: #40444b;
  margin: 10px 0;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.control-group.row {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.control-group label {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-secondary);
  letter-spacing: 0.5px;
}

.control-group input[type="text"],
.control-group input[type="url"],
.control-group textarea {
  background: var(--input-bg);
  border: 1px solid rgba(0,0,0,0.3);
  padding: 10px;
  border-radius: 4px;
  color: var(--text-primary);
  font-family: inherit;
  font-size: 14px;
  transition: border-color 0.2s;
}

.control-group input:focus,
.control-group textarea:focus {
  outline: none;
  border-color: var(--accent);
}

.control-group small {
  color: var(--text-secondary);
  font-size: 11px;
}

/* Color Input */
input[type="color"] {
  width: 50px;
  height: 30px;
  border: none;
  background: none;
  cursor: pointer;
}

/* Checkbox */
input[type="checkbox"] {
  width: 20px;
  height: 20px;
  accent-color: var(--accent);
  cursor: pointer;
}

/* Button */
.btn-primary {
  margin-top: auto;
  background: var(--accent);
  color: white;
  border: none;
  padding: 14px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-primary:hover {
  background: var(--accent-hover);
}

.btn-primary:active {
  transform: translateY(1px);
}

/* --- PREVIEW AREA --- */
.preview {
  background: var(--bg-preview);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  position: relative;
}

.preview-header h2 {
    color: var(--text-secondary);
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 1px;
    margin-bottom: 20px;
}

.preview-note {
    margin-top: 20px;
    color: var(--text-secondary);
    font-size: 12px;
    opacity: 0.7;
}

/* --- WIDGET CARD --- */
/* Note: These styles match the generated logic in JS mostly */
.discord-card {
  width: 100%;
  max-width: 450px;
  background: #202225; /* Darker card background */
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
  font-family: 'Inter', sans-serif;
  color: #fff;
}

.discord-top {
  display: flex;
  align-items: center;
  gap: 16px;
}

.discord-icon {
  width: 50px;
  height: 50px;
  background-color: #36393f;
  border-radius: 16px; /* Discord squircle-ish */
  position: relative;
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.online-dot {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 14px;
  height: 14px;
  background: var(--success);
  border-radius: 50%;
  border: 3px solid #202225;
}

.discord-info {
  flex: 1;
  min-width: 0; /* Text truncation fix */
}

.discord-info h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.discord-info p {
  margin: 4px 0 0;
  font-size: 12px;
  color: #b9bbbe;
  font-weight: 500;
}

.discord-btn {
  background: var(--success);
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  transition: opacity 0.2s;
  white-space: nowrap;
}

.discord-btn:hover {
  opacity: 0.9;
}

.discord-desc {
  margin: 12px 0 0 0;
  font-size: 13px;
  color: #dcddde;
  line-height: 1.4;
  padding-top: 12px;
  border-top: 1px solid rgba(255,255,255,0.06);
}

/* --- FOOTER --- */
.footer {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 400px;
  padding: 10px 20px;
  font-size: 12px;
  color: var(--text-secondary);
  display: flex;
  justify-content: space-between;
  background: rgba(0,0,0,0.2);
  pointer-events: none;
}
.footer a {
    pointer-events: auto;
    color: var(--accent);
    text-decoration: none;
}

/* Responsiveness */
@media (max-width: 800px) {
  .app {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    overflow-y: auto;
    height: auto;
  }
  
  .controls {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
  
  .footer {
    left: 0;
    position: relative;
    background: #202225;
  }
}
