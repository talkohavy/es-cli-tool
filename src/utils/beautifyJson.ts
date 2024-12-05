export function beautifyJson(jsonStr: string) {
  return JSON.stringify(JSON.parse(jsonStr), null, 2);
}
