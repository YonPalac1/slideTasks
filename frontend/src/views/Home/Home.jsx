import React from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import "./Home.scss";

export const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="home-container">
        <div className="home-container__content">
          <h2>User Guide</h2>
          <p>
            Check out this user guide video for all the different
            functionalities that this application has to offer
          </p>
        </div>
        <div className="home-container__video">
          <div className="home-container__video__img"></div>
        </div>
      </div>
      <div className="home-container">
        <div className="home-container__video">
          <div className="home-container__video__img"></div>
        </div>
        <div className="home-container__content">
          <h2>Pomodoro</h2>
          <p>
            Simple tutorial on how the pomodoro method works and how to use it
            to avoid procrastination or improve productivity
          </p>
        </div>
      </div>
    </div>
  );
};
