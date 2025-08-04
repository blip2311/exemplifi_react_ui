import CardComponent from "./TaskCard";

export const CardWrapper = ({ taskData }) => {
  // const [taskData, setTaskData] = useState(tasks);
  // const [error, setError] = useState(null);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       getRouteAsync("tasks.index").then(async (routeObject) => {
  //         const url = routeObject.url;
  //         const response = await fetch(url, { method: routeObject.methods[0] });
  //         if (!response.ok) {
  //           throw new Error("Network response was not ok");
  //         }
  //         const jsonData = await response.json();
  //         setTaskData(jsonData.data);
  //       });
  //       // loadRouteMap().then(async () => {
  //       //   // Get the route using the routeHelper
  //       //   const routeObject = getRoute();
  //       //   const baseUrl = process.env.REACT_APP_API_BASE_URL;
  //       //   if (!baseUrl) {
  //       //     throw new Error("REACT_APP_API_BASE_URL is not defined");
  //       //   }
  //       //   // Construct the full URL
  //       //   const url = `${baseUrl}/${routeObject.url}`;
  //       //   const response = await fetch(url, { method: routeObject.methods[0] });
  //       //   if (!response.ok) {
  //       //     throw new Error("Network response was not ok");
  //       //   }
  //       //   const jsonData = await response.json();
  //       //   setTaskData(jsonData.data);
  //       // });
  //     } catch (err) {
  //       setError(err);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <>
      <div className="col-12 card-wrapper">
        {taskData.map((card) => (
          <CardComponent
            key={card.id}
            id={card.id}
            status={card.status}
            title={card.title}
            date={card.due_date}
          />
        ))}
      </div>
    </>
  );
};

export default CardWrapper;
