// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {
  ExtensionContext,
  languages,
} from "vscode";
import { BibTeXDocumentFormatterProvider } from "./bib_tidy_provider";

const schemes = ["file", "untitled"];

export function activate(context: ExtensionContext) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const provider = new BibTeXDocumentFormatterProvider();
  for (const scheme of schemes) {
    context.subscriptions.push(
      languages.registerDocumentFormattingEditProvider({ language: "bibtex", scheme }, provider)
    );
  }
}

export function deactivate() {}
