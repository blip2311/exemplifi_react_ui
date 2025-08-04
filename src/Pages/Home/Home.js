import React, { useEffect, useState } from "react";
import "./Home.scss";
import CardWrapper from "./CardWrapper";
import HeaderFilterForm from "../../Layout/Header/HeaderWithForm";
import { getRouteAsync } from "../../Utils/routeHelper";
export const Home = () => {
  const [tasks, setTask] = useState([]);
  useEffect(() => {
    getTasks();
  }, []);
  const getTasks = async (status, due_date) => {
    try {
      const routeObject = await getRouteAsync("tasks.index");
      if (!routeObject || !routeObject.url) {
        throw new Error("Route could not be found");
      }
      const parameterPresent = status || due_date ? "?" : "";
      const statusParameter = status ? `status=${status}` : "";
      const dueDateParameter = due_date
        ? `due_date_from=${due_date}&due_date_to=${due_date}`
        : "";
      const andParameter = status && due_date ? "&" : "";
      console.log(
        `status: ${statusParameter}, due_date: ${dueDateParameter}, `
      );
      const url = `${routeObject.url}${parameterPresent}${statusParameter}${andParameter}${dueDateParameter}`;
      const response = await fetch(url, {
        method: routeObject.methods[0],
      });
      if (!response.ok) {
        throw new Error("Cannot fetch tasks");
      }
      const jsonObject = await response.json();
      setTask(jsonObject.data);
    } catch (error) {
      console.error("Error fetching tasks: ", error);
    }
  };

  return (
    <main className="content-wrapper">
      <div className="container">
        <HeaderFilterForm taskData={tasks} getTasks={getTasks} />
        <CardWrapper taskData={tasks} />
      </div>
    </main>
  );
};
export default Home;
