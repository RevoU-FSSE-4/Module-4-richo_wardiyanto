import React from "react";
import { BrowserRouter, Router, Route, Link, Routes } from "react-router-dom";
import tailwind from "tailwindcss";

const NotFound = (): React.ReactElement => {
    return (
      <div>
        <h1>404 - Not Found!</h1>
      </div>
    );
  };

export default NotFound;