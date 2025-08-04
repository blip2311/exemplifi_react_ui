import { loadRouteMap } from "./loadRouteMap";
/**
 * Asynchronously ensures the routeMap is loaded, then retrieves the route.
 * @param {string} name - The name of the Laravel route.
 * @returns {Promise<{ url: string, methods: string[] } | null>}
 */
export const getRouteAsync = async (name) => {
  await loadRouteMap();
  return getRoute(name);
};
/**
 * Retrieves a named route from localStorage's routeMap.
 * @param {string} name - The name of the Laravel route (e.g. 'tasks.store').
 * @returns {{ url: string, methods: string[] } | null} - Route details or null if not found.
 */
const getRoute = (name) => {
  try {
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    if (!baseUrl) {
      throw new Error("REACT_APP_API_BASE_URL is not defined");
    }
    const raw = localStorage.getItem("routeMap");
    if (!raw) return null;

    const map = JSON.parse(raw);
    const routeObject = map[name];
    routeObject.url = `${baseUrl}/${routeObject.url}`;
    return routeObject || null;
  } catch (error) {
    console.error(`Error accessing routeMap for "${name}":`, error);
    return null;
  }
};
