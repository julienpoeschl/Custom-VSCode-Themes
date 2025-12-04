const fs = require("fs");
const path = require("path");

// Get workspace folder (parent of demonstrations directory)
const workspaceFolder = path.join(__dirname, "..");

// Function to resolve VS Code variables
function resolveVariables(str) {
  return str.replace("${workspaceFolder}", workspaceFolder);
}

// Read config from workspace settings
const settingsPath = path.join(workspaceFolder, ".vscode", "settings.json");
let config = { files: [], outputFolder: "" };

if (fs.existsSync(settingsPath)) {
  try {
    const settings = JSON.parse(fs.readFileSync(settingsPath, "utf8"));
    config.files = (settings["bulkSnap.files"] || []).map(resolveVariables);
  } catch (e) {
    console.error("Error reading settings.json:", e.message);
  }
}

const files = config.files || [];

if (!Array.isArray(files) || files.length === 0) {
  console.error("❌ bulkSnap.files is empty or not configured in .vscode/settings.json");
  process.exit(1);
}

console.log("✓ Bulk CodeSnap configuration loaded");
console.log("  Files:", files);
console.log("\nℹ️ To use the bulk snap:");
console.log("   1. Ensure CodeSnap extension is installed");
console.log("   2. Run: Ctrl+Shift+P > Run Bulk CodeSnap");
console.log("   3. CodeSnap windows will open for each file");
console.log("   4. Click the round 'Save' button in each CodeSnap window");
