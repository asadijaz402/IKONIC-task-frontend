import "./App.css";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Landing } from "./components/layout/Landing";
import { logout, setUser } from "./redux/action/auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import store from "./store";
import { PrivateRoute } from "./components/common/PrivateRoute";
import { Posts } from "./components/posts/Posts";
import { Post } from "./components/post/Post";
if (localStorage.getItem("token")) {
  const data = jwt_decode(localStorage.getItem("token"));
  store.dispatch(setUser(data));
  const currentTime = Date.now() / 1000;
  if (data.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/login";
  }
}
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route element={<PrivateRoute />}>
              <Route path="/feed" element={<Posts />} />
              <Route path="/post/:id" element={<Post />} />
            </Route>
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>

          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
