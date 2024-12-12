export function errorSilencer(cb: (props?: any) => any) {
  return async (props: any) => {
    try {
      await cb(props);
    } catch (_error) {
      _error;
    }
  };
}
