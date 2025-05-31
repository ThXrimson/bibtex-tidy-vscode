// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {
  ExtensionContext,
  workspace,
  languages,
  commands,
  TextDocumentWillSaveEvent,
  TextDocument,
} from "vscode";
import { BibTeXTidyOptions, tidy } from "bibtex-tidy";
import { BibTeXDocumentFormatterProvider } from "./bib_tidy_provider";

const schemes = ["file", "untitled"];

export function activate(context: ExtensionContext) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const options = workspace.getConfiguration("bibtex-tidy").get<BibTeXTidyOptions>("options") ?? {};
  const provider = new BibTeXDocumentFormatterProvider(options);
  for (const scheme of schemes) {
    context.subscriptions.push(
      languages.registerDocumentFormattingEditProvider(
        { language: "bibtex", scheme },
        provider
      )
    );
  }

  const formatOnSave = workspace.getConfiguration().get("editor.formatOnSave");
  if (formatOnSave) {
    workspace.onWillSaveTextDocument((event: TextDocumentWillSaveEvent) => {
      // Only on explicit save
      if (event.reason === 1 && isAllowedTextDocument(event.document)) {
        commands.executeCommand("editor.action.formatDocument");
      }
    });
  }
}

function isAllowedTextDocument(textDocument: TextDocument): boolean {
  const { scheme } = textDocument.uri;
  const { languageId } = textDocument;
  if ("bibtex" === languageId) {
    return scheme in schemes;
  }
  return false;
}

export function deactivate() {}
