import { getRouteAsync } from "./routeHelper";

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2)
    return decodeURIComponent(parts.pop().split(";").shift());
};

export const getToken = async () => {
  try {
    const routeObject = await getRouteAsync("sanctum.csrf-cookie");
    if (!routeObject || !routeObject.url) {
      throw new Error("Url Not found");
    }
    const response = await fetch(routeObject.url, {
      method: routeObject.methods[0],
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Could not fetch CSRF token");
    }
    console.log(getCookie("XSRF-TOKEN"));
    return getCookie("XSRF-TOKEN");
  } catch (error) {
    console.error("CSRF error:", error);
  }
};
