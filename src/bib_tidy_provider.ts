import {
  DocumentFormattingEditProvider,
  TextDocument,
  FormattingOptions,
  CancellationToken,
  TextEdit,
  Position,
  Range,
  EndOfLine,
} from "vscode";
import { tidy, BibTeXTidyOptions } from "bibtex-tidy";
import { diffLines } from "diff";

export class BibTeXDocumentFormatterProvider implements DocumentFormattingEditProvider {
  private options: BibTeXTidyOptions;

  constructor(options: BibTeXTidyOptions) {
    this.options = options;
  }

  public provideDocumentFormattingEdits(
    document: TextDocument,
    options: FormattingOptions,
    token: CancellationToken
  ): Thenable<TextEdit[]> {
    const content = document.getText();
    this.options.modify = false;
    this.options.tab = !options.insertSpaces;
    this.options.space = options.tabSize;
    const result = tidy(content, this.options);
    return diff(content, result.bibtex);
  }
}

async function diff(oldStr: string, newStr: string): Promise<TextEdit[]> {
  const changes = diffLines(oldStr, newStr);
  const edits: TextEdit[] = [];
  var line = 0;
  for (const change of changes) {
    const { count, added, removed, value } = change;
    if (!added && !removed) {
      line += count;
    } else if (added) {
      // Insertions
      const start = new Position(line, 0);
      edits.push(TextEdit.insert(start, value));
    } else if (removed) {
      // Deletions
      const start = new Position(line, 0);
      const end = new Position(line + count, 0);
      edits.push(TextEdit.delete(new Range(start, end)));
      line += count;
    }
  }
  edits.push(TextEdit.setEndOfLine(process.platform === "win32" ? EndOfLine.CRLF : EndOfLine.LF));
  return edits;
}
