---
"es-cli-tool": patch
---

BUGFIX: inquireConfirm - default value needs to be an explicit boolean. The `undefined` value isn't considered as `false`, and the confirm's default value is true, ergo `undefined` is equal `true`. The solution is to add double !! before `isSure`.
