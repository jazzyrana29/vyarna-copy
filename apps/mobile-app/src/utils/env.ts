export const getBaseUrl = (): string =>
  (process.env.EXPO_PUBLIC_BASE_URL || "").replace(/\/+$/, "");

export const joinUrlParts = (base: string, path: string): string =>
  `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
