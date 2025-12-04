const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

async function snapFile(filePath) {
    const uri = vscode.Uri.file(filePath);
    const document = await vscode.workspace.openTextDocument(uri);
    const editor = await vscode.window.showTextDocument(document);

    // Select whole document
    const lastLine = document.lineCount - 1;
    const lastLineLength = document.lineAt(lastLine).text.length;
    editor.selection = new vscode.Selection(0, 0, lastLine, lastLineLength);

    // Trigger CodeSnap
    await vscode.commands.executeCommand("codesnap.start");
    
    // Wait for user confirmation before proceeding to next file
    return new Promise((resolve) => {
        vscode.window.showInformationMessage(
            `CodeSnap opened for ${path.basename(filePath)}. Click 'Ready for Next' when you've saved.`,
            "Ready for Next"
        ).then((selection) => {
            if (selection === "Ready for Next") {
                resolve();
            }
        });
    });
}

async function runBulkSnap() {
    const config = vscode.workspace.getConfiguration("bulkSnap");

    let files = config.get("files") || [];
    let outputFolder = config.get("outputFolder");

    // Resolve ${workspaceFolder} variable
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (workspaceFolder) {
        if (outputFolder && outputFolder.includes("${workspaceFolder}")) {
            outputFolder = outputFolder.replace("${workspaceFolder}", workspaceFolder);
        }
        files = files.map(file => 
            file.includes("${workspaceFolder}") ? file.replace("${workspaceFolder}", workspaceFolder) : file
        );
    }

    if (!Array.isArray(files) || files.length === 0) {
        vscode.window.showErrorMessage("bulkSnap.files is empty.");
        return;
    }

    if (!outputFolder || !fs.existsSync(outputFolder)) {
        vscode.window.showErrorMessage("bulkSnap.outputFolder " + outputFolder + " does not exist.");
        return;
    }

    vscode.window.showInformationMessage(`Opening CodeSnap for ${files.length} files. Click 'Save' in each CodeSnap window.`);
    
    for (const file of files) {
        await snapFile(file);
    }

    vscode.window.showInformationMessage("All CodeSnap windows opened. Please click 'Save' in each window.");
}

function activate(context) {
    const disposable = vscode.commands.registerCommand("bulkSnap.run", runBulkSnap);
    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = { activate, deactivate };
