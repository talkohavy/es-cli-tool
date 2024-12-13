---
"es-cli-tool": patch
---

Went back to using a commandMapper. Turns out that without it, the help menu for sub-commands is non-existent. So the commandMapper returned, we're no longder passing a handler to yargs for executing a command, and removed the errorSilencer - as it's only being used on the commandMapper.
