import React from "react";
import "./Home.scss";
import CardWrapper from "./CardWrapper";
import HeaderFilterForm from "../../Layout/Header/HeaderWithForm";
export const Home = () => {
  return (
    <main className="content-wrapper">
        <div className="container">
        <HeaderFilterForm />
        <CardWrapper />

        </div>
    </main>
  );
};
export default Home;
