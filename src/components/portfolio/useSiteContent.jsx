export function useSiteContent() {
  const get = (section, key, fallback = "") => fallback;
  return { get, loading: false };
}
