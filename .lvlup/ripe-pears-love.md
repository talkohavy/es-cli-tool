---
"es-cli-tool": patch
---

refactored inquireConfirm: header is now and object comprised of isSure boolean & alternativeMessage string. isSure is set to false by default, as opposed to before when it defaulted to true. Message can now show either "false" or "true" based on isSure. Also, added a line-break before & after the question.
