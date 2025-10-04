import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const App = () => {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold text-pink-500">Welcome to AuthenTech</h1>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
