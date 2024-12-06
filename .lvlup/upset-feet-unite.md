---
"es-cli-tool": patch
---

BUGFIX: commandMapper should be async, and await the command. Otherwise, command would leave the lexical environment, where the try-catch is set, and the error would propogate to global lexical environment.
