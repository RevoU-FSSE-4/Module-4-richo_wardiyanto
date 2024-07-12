import React, { useEffect, useState } from "react";
import "./App.css";
import { HomePage } from "./components/homepage";
import NotFound from "./components/pages/notfound";
import Home from "./components/pages/home";
import About from "./components/pages/about";
import { BrowserRouter, Router, Route, Link, Routes } from "react-router-dom";
import SignInForm from "./services/signIn";
import CreateAccount from "./services/newAccount";
import PrivateRoute from "./hook/privateRouter";
import InsideLogin from "./services/insideLogin";
import { ProfileContext } from "./hook/profile/Profile";
import GlobalProfile from "./hook/profile/GlobalProfile";
import Create from "./services/newCategory";
import EditCategory from "./services/editCategory";
import DeleteCategory from "./services/deleteCategory";


function App() {
  const [userProfile, setUserProfile] = useState("Anonymous User");

  const changeUserProfile = (email: string) => {
    setUserProfile(email);
  };

  const thisContext: GlobalProfile = {
    email: userProfile,
    setemail: changeUserProfile,
  };

  return (
    <ProfileContext.Provider value={thisContext}>
      <div className="App">
        <header className="App-header">
          <h1>Happening Now...</h1>
          <hr />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/signin" element={<SignInForm />} />
            <Route path="/newaccount" element={<CreateAccount />} />
            <Route path="/" element={<PrivateRoute />}>
            </Route>
              <Route path="/insideLogin" element={<InsideLogin />} />
              <Route path="/newCategory" element={<Create />} />
              <Route path="/editCategory/:id" element={<EditCategory />} />
              <Route path="/deleteCategory/:id" element={<DeleteCategory />} />
          </Routes>
          <br />
          <HomePage />
        </header>
      </div>
    </ProfileContext.Provider>
  );
}

export default App;
