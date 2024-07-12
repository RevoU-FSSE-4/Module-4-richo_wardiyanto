import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BrowserRouter, Router, Route, Link, Routes } from "react-router-dom";
import tailwind from "tailwindcss";

const Home = (): React.ReactElement => {
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export default Home;