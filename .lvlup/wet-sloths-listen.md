---
"es-cli-tool": patch
---

the -X GET is misleading because the -d flag wins and makes it a POST request anyways, since a request with a body cannot be a GET
