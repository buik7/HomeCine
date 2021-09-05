import { BrowserRouter, Switch } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import Home from "./Pages/Home/Home";
import SignIn from "./Pages/SignIn/SignIn";
import AdminTemplate from "./Templates/AdminTemplate";
import AuthTemplate from "./Templates/AuthTemplate";
import { useDispatch } from "react-redux";
import { sagaTypes } from "./Redux/constants/sagaTypes";
import { localStorageKeys } from "./Util/constants/systemConstant";
import Film from "./Pages/Film/Film";
import User from "./Pages/User/User";
import Cinema from "./Pages/Cinema/Cinema";
import ModalComponent from "./Components/Modal";
import FilmSchedule from "./Pages/FilmSchedule/FilmSchedule";
import CinemaDetail from "./Pages/CinemaDetail/CinemaDetail";
import CinemaSchedule from "./Pages/CinemaTime/CinemaSchedule";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);
    if (token) {
      dispatch({
        type: sagaTypes.GET_USER_LOGIN_SAGA,
        token: token,
      });
    }
  }, []);

  return (
    <div>
      <ModalComponent />
      <BrowserRouter>
        <Switch>
          <AdminTemplate path="/film" Component={Film} />
          <AdminTemplate path="/user" Component={User} />
          <AdminTemplate path="/cinema" Component={Cinema} />
          {/* <Route path="/signin" component={SignIn} /> */}
          <AuthTemplate path="/signin" Component={SignIn} />
          <AdminTemplate path="/add-schedule/:id" Component={FilmSchedule} />
          <AdminTemplate path="/cinema-detail/:id/:maCumRap" exact Component={CinemaSchedule} />
          <AdminTemplate path="/cinema-detail/:id" exact Component={CinemaDetail} />
          
          <AdminTemplate path="/" Component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
