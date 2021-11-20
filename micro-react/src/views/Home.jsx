import React from "react";
import "./index.css";

const Home = ({ info }) => {
  return <div className="home">主应用带来的问候：「{info}」，你终于来到 React 子应用 Home 页面了</div>;
};

export default Home;
