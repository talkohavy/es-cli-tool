export interface Context {
  url: string;
  flags: string[];
}

export interface Config {
  contexts: Record<string, Context>;
  currentContext: string | null;
}
