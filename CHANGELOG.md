# es-cli-tool

## 0.0.58

### Patch Changes

- Updated the README.md file. Override password, and stop using network.

## 0.0.57

### Patch Changes

- Renamed 2 global variables: CLI_TOOL_NAME & toolNameBigText.

## 0.0.56

### Patch Changes

- Removed devDependencies key from package.json.

## 0.0.55

### Patch Changes

- Package is now using `esbuild` as its bundler. 50% less bundle-size.

## 0.0.54

### Patch Changes

- BUGFIX: inquireConfirm - default value needs to be an explicit boolean. The `undefined` value isn't considered as `false`, and the confirm's default value is true, ergo `undefined` is equal `true`. The solution is to add double !! before `isSure`.

## 0.0.53

### Patch Changes

- no need for .d.ts file for cli tool. removed from tsconfig.
- No context is set is error code 0, added line-break for You have 0 contexts.
- added a line-break before & after currentContext "No context is currently set" message.

## 0.0.52

### Patch Changes

- added a line-break before & after message "Failed to get indexes names".

## 0.0.51

### Patch Changes

- BUGFIX: removed extra "--" for the sure flag.

## 0.0.50

### Patch Changes

- added a confirmation check to the delete-index command. Added a new flag called "--sure" that the user can pass in order to pass the check.
- create-index command can now accept an index flag as input.
- BUGFIX: the delete-index command never got its builder set.
- refactored inquireConfirm: header is now and object comprised of isSure boolean & alternativeMessage string. isSure is set to false by default, as opposed to before when it defaulted to true. Message can now show either "false" or "true" based on isSure. Also, added a line-break before & after the question.
- clearAll command is using the new form of inquireConfirm.

## 0.0.49

### Patch Changes

- support zsh & bash auto-complete for commands. simply run the "completion" command, and paste its output inside your zsh/bash rc file.

## 0.0.48

### Patch Changes

- removed --editor flag from all commands. Added a "." to the endings of all command descriptions. Get a much more detailed description to the "get" command.

## 0.0.47

### Patch Changes

- Went back to using a commandMapper. Turns out that without it, the help menu for sub-commands is non-existent. So the commandMapper returned, we're no longer passing a handler to yargs for executing a command, and removed the errorSilencer - as it's only being used on the commandMapper.
- Created a hard-update command that overwrites the document's content entirely.
- `update` command made from a hard-update to a soft update.

## 0.0.46

### Patch Changes

- `get-settings` command now supports the --index flag.
- `get-mapping` command now supports the --index flag.

## 0.0.45

### Patch Changes

- The delete command now has an option to specify an index, and an option to specify the document's id

## 0.0.44

### Patch Changes

- Replace console.error with logger.error in getContext function.

## 0.0.43

### Patch Changes

- Less files.
- Fixed the README.md file.

## 0.0.42

### Patch Changes

- Fixed the README.md file. there was a mistake there. also, added the new subcommand of "sq get all".

## 0.0.41

### Patch Changes

- The get command now has a subcommand called "get", which by default matches all documents and fetches up to 10 of them. you can add a number to control the amount of documents returned.

## 0.0.40

### Patch Changes

- Added an update command.

## 0.0.39

### Patch Changes

- Added a line-break before inquireNewIndexName.
- Improved the README.md file.

## 0.0.38

### Patch Changes

- The "no index found message" now has a new line-break before & after.

## 0.0.37

### Patch Changes

- Updated the help picture in the README.md file.

## 0.0.36

### Patch Changes

- Also added a line-break after `create-context` message.

## 0.0.35

### Patch Changes

- Also gave a line-break after `use-context` text message.

## 0.0.34

### Patch Changes

- Giving a line-break after delete-context "deleted successfully" message.
- Giving a line-break on `clear-all` command.
- Giving a line-break after `use-context` "already selected" message.

## 0.0.33

### Patch Changes

- Created a `delete-context` command.

## 0.0.32

### Patch Changes

- Added more missing line breaks for UX. in `create-context` & `use-context`.

## 0.0.31

### Patch Changes

- BUGFIX: removed try/catch from the run function, and handled its errors.
- Added line breaks between parts for clear UX.
- Replaced word bright with bold.
- BUGFIX: don't console.log the error when hitting ctrl+c on choose an index.
- Using an error silencer now on index.ts.
- BUGFIX: error silencer idn't pass the props which are all the flags.

## 0.0.30

### Patch Changes

- Builder, Description, and the CommandString are all stored inside the command's main file.
- Added an option to remove coloring from output. Useful when wanting to write output into a file. The flag is global and is called --color. there's also an option to negate with --no-color.

## 0.0.29

### Patch Changes

- The -X GET is misleading because the -d flag wins and makes it a POST request anyways, since a request with a body cannot be a GET.

## 0.0.28

### Patch Changes

- BUGFIX: two more places still had flags as an array.

## 0.0.27

### Patch Changes

- Flags are now string as-is - accepted once by the user.

## 0.0.26

### Patch Changes

- `executeDeleteQuery` converted to new way of using context.
- `executeCreateIndexQuery` converted to new way of using context.
- `executeAddQuery` converted to new way of using context.
- `executeGetMapping` converted to new way of using context.
- `executeGetSettings` converted to new way of using context.
- `executeUpdateMappingQuery` converted to new way of using context.
- `executeImportToIndexQuery` converted to new way of using context.
- `executeDeleteIndexQuery` converted to new way of using context.
- Huge refactor - yargs builders are now found inside the commands. Commands are now attached to the yargs objects and are executed upon parse.
- Added 3 commands: `create-context`, `user-context` & `current-context`.
- `current-context` command: better coloring.
- `executeGetQuery` converted to new way of using context.
- Converted console.log to logger.info.
- `inquireIndexName` made into a generic `inquireSelectFromList`.

## 0.0.25

### Patch Changes

- `colorizeJson` now supports bracket/braces levels.

## 0.0.24

### Patch Changes

- `import` command now supports & also requires a file flag.

## 0.0.23

### Patch Changes

- BUGFIX: check used index instead of selectedIndex.

## 0.0.22

### Patch Changes

- Added the --file & --index flags to the `get` command.
- Added the --file & --index flags to the `add` command.
- Added the --file & --index flags to the `update-mapping` command.

## 0.0.21

### Patch Changes

- Added `update-mapping` command.

## 0.0.20

### Patch Changes

- Added a well written README.md file.

## 0.0.19

### Patch Changes

- BUGFIX: `commandMapper` should be async, and await the command. Otherwise, command would leave the lexical environment, where the try-catch is set, and the error would propagate to global lexical environment.

## 0.0.18

### Patch Changes

- Made the commandMapper the errorCatcher. removed try-catch from all commands.
- `executeGetMapping` was missing the silent flag.
- `executeImportToIndexQuery` now requires that the data file should be the same name as the index you're trying to import into.
- Removed `beautifyJson`, as it is unused (`colorizeJson` replaced it).
- `delete` command is now using "?pretty" query param, and the json colorizer for its output.
- `delete-index` command is now using ?pretty query param, and the json colorizer for its output.
- `get-mapping` command is now using the json colorizer for its output.
- Added the `get-settings` command.
- `get` command is now using "?pretty" query param, and the json colorizer for its output.
- Created a json colorizer.
- Added the `get-mapping` command. you can now query an index's mapping.
- `import-to-index` command is now using "?pretty" query param, and the json colorizer for its output.
- `get-settings` command is using the json colorizer.
- Removed the index.ts off of logger (it was unused).
- `create-index` command is now using "?pretty" query param, and the json colorizer for its output.
- `add` command is now using "?pretty" query param, and the json colorizer for its output.

## 0.0.17

### Patch Changes

- Removed the `publish` command from manual/help.

## 0.0.16

### Patch Changes

- Added the `clear-all` command.

## 0.0.15

### Patch Changes

- Fixed the `get` command.

## 0.0.14

### Patch Changes

- BUGFIX: Values on the `Commands` enum need to be a string that is an exact match to the command.

## 0.0.13

### Patch Changes

- Made the package more lightweight now.

## 0.0.12

### Patch Changes

- Created the `import` command.

## 0.0.11

### Patch Changes

- Removed the "Bye." message.

## 0.0.10

### Patch Changes

- Added a `delete-index` command.

## 0.0.9

### Patch Changes

- BUGFIX: An accidental console.log left inside the code.

## 0.0.8

### Patch Changes

- Hardcoded the `--insecure` & `--silent` flags to the `add` query.

## 0.0.7

### Patch Changes

- Fixed `validateElasticsearchIndexName` - the regex was wrong.

## 0.0.6

### Patch Changes

- Added a `delete` command, the command that enables you to delete a single document.

## 0.0.5

### Patch Changes

- Added a `create-index` command.

## 0.0.4

### Patch Changes

- Added the HUGE text, writing the package's name.

## 0.0.3

### Patch Changes

- First release - `get` command & `add` command are **GA**.

## 0.0.2

### Patch Changes

- Added the `get` command

## 0.0.1

### Patch Changes

- First appearance 🎉 with the `add` command
