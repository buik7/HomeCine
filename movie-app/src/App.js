import { BrowserRouter, Switch, Route } from "react-router-dom";
import React, { useEffect } from "react";
import HomeTemplate from "./Templates/HomeTemplate";
import Home from "./Views/Home/Home";
import Detail from "./Views/Detail/Detail";
import Film from "./Views/Film/Film";
import Event from "./Views/Event/Event";
import Contact from "./Views/Contact/Contact";
import Profile from "./Views/Profile/Profile";
import Search from "./Views/Search/Search";
import { useDispatch } from "react-redux";
import { getUserLoginThunk } from "./Redux/Thunks/userThunk";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserLoginThunk);
  }, [dispatch]);

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <HomeTemplate path="/detail/:id" Component={Detail} />
          <HomeTemplate path="/film" Component={Film} />
          <HomeTemplate path="/event" Component={Event} />
          <HomeTemplate path="/contact" Component={Contact} />
          <HomeTemplate path="/profile" Component={Profile} />
          <HomeTemplate path="/search/:keyword" Component={Search} />
          <HomeTemplate path="/" Component={Home} />

          {/* <Route path="/" component={Home}></Route> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
