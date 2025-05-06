export function getMatchAllQuery(count: number): Record<string, any> {
  return {
    size: count,
    query: {
      match_all: {},
    },
  };
}
