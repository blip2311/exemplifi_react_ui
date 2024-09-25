import React, { lazy, Suspense } from "react";
import "./App.scss";
import Sidebar from "./Layout/Sidebar/Sidebar";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import MobileHeader from "./Layout/MobileHeader/MobileHeader";

function App() {
  const Home = lazy(() => import("./Pages/Home/Home"));
  const CreateTask = lazy(() => import("./Pages/CreateTask/CreateTask"));
  const TaskDetails = lazy(() =>import("./Pages/TaskDetails/TaskDetails")
  );
  return (
    <BrowserRouter>
      <Suspense>
        <Sidebar />
        <MobileHeader />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="*" element={<Home />} exact />
          <Route path="/create-task" element={<CreateTask />} exact />
          <Route path="/task-details" element={<TaskDetails />} exact />
          <Route path="/card-details/:id" element={<TaskDetails exact />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
