export const sleep = (timeout: number): Promise<void> =>
  new Promise<void>((resolve) => setTimeout(resolve, timeout));
