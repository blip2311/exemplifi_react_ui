export const loadRouteMap = async () => {
  const cached = localStorage.getItem("routeMap");
  if (cached) return; // Already cached, no need to fetch again

  const baseUrl = process.env.REACT_APP_API_BASE_URL || window.location.origin;
  const endpoint = `${baseUrl}/api/route-map`;
  try {
    const response = await fetch(endpoint);
    if (!response.ok)
      throw new Error(`Failed to fetch route map: ${response.status}`);

    const rawData = await response.json();
    const normalized = {};

    rawData.forEach((routeObj) => {
      const [name, details] = Object.entries(routeObj)[0];
      if (name) normalized[name] = details;
    });
    console.log(normalized);

    localStorage.setItem("routeMap", JSON.stringify(normalized));
    localStorage.setItem("routeMapTimestamp", Date.now().toString());
  } catch (error) {
    console.error("Error loading route map:", error);
  }
};
