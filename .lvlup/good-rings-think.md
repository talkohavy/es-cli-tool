---
"es-cli-tool": patch
---

Import now uses a regular json file, and uses createTemporaryBulkFile to convert it into a nulk file. If transformation fails, it uses the original file.
