# bibtex-tidy

`bibtex-tidy` is a Visual Studio Code extension based on [FlamingTempura/bibtex-tidy](https://github.com/FlamingTempura/bibtex-tidy/) that helps you clean up and format your BibTeX files. It automatically sorts entries and fields, removes duplicates, and makes your `.bib` files more readable and consistent.

## Features

- One-click formatting for `.bib` files
- Automatic sorting of entries and fields
- Duplicate entry removal
- Customizable sorting rules
- Option to keep or remove specific fields
- Command palette and context menu support
- And more features support by [FlamingTempura/bibtex-tidy](https://github.com/FlamingTempura/bibtex-tidy/)

## Requirements

- Visual Studio Code 1.100.0 or higher

## Extension Settings

You can configure the extension settings in your `settings.json` file:

```json
{
  "bibtex-tidy.sort": true,
  "bibtex-tidy.removeDuplicateFields": true,
  "bibtex-tidy.sortFields": true
}
```

---

## License

This project is licensed under the MIT License.

It uses the following third-party libraries:

- [bibtex-tidy](https://github.com/FlamingTempura/bibtex-tidy) (MIT License)
- [diff](https://github.com/kpdecker/jsdiff) (BSD 3-Clause License)

See [LICENSE](./LICENSE) for details.

---

**Enjoy using bibtex-tidy!**
