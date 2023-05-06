import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useDispatch } from "react-redux";
import { logout } from "./redux/userSlice";

import Home from "./pages/Admin/Home";
import Login from "./pages/Admin/Login";
import Register from "./pages/Admin/Register";
import UserCards from "./pages/Admin/UserCards/ListUserCards";
import Outgoings from "./pages/Admin/Outgoings/Outgoings";
import Monthly from "./pages/Admin/Monthly/Monthly";

function App() {
  const dispatch = useDispatch();
  let user = useSelector((state) => state.users.user);
  if ((Date.now() / 1000) > user.exp) {
    dispatch(logout());
    localStorage.removeItem("user");
    localStorage.removeItem("access-token");
    user = false;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />}></Route>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />}></Route>
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />}></Route>

        <Route path="/usercards" element={user ? <UserCards /> : <Navigate to="/login" />}></Route>
        <Route path="/outgoings" element={user ? <Outgoings /> : <Navigate to="/login" />}></Route>
        <Route path="/monthly" element={user ? <Monthly /> : <Navigate to="/login" />}></Route>


      </Routes>
    </Router>
  );
}

export default App;
