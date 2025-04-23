import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router";
import { Provider } from "react-redux";
import { CookiesProvider, Cookies } from "react-cookie";

import Root from "./pages/Root";
import store from "./redux/store";

import Homepage from "./pages/Homepage/Homepage";
import SignUp from "./pages/Homepage/SignUp/SignUp";
import Login from "./pages/Homepage/Login/Login";
import SignUpSuccess from "./pages/Homepage/SignUpSuccess/SignUpSuccess";

import Auth from "./pages/Auth/Auth";
import ForgetPassword from "./pages/Auth/ForgetPassword/ForgetPassword";

import User from "./pages/User/User";
import UserNotification from "./pages/User/UserNotification/UserNotification";
import UserMessages from "./pages/User/UserMessages/UserMessages";

import SearchUsers from "./pages/DynamticPages/SearchUsers/SearchUsers";
import UserPublic from "./pages/DynamticPages/UserPublic/UserPublic";

export const cookies = new Cookies(null, {
  expires: Number(process.env.REACT_APP_COOKIE_EXPIRED_TIME),
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />} />
      <Route path="home" element={<Homepage />}>
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="searchuser" element={<SearchUsers isAuth={false} />} />
      </Route>
      <Route path="auth" element={<Auth />}>
        <Route path="forgetpassword" element={<ForgetPassword />} />
      </Route>
      <Route path="user/:userid" element={<User />}>
        <Route path="searchuser" element={<SearchUsers isAuth={true} />} />
        <Route path="notification" element={<UserNotification />} />
        <Route path="messenger" element={<UserMessages />} />
      </Route>
      <Route path="signupsuccess" element={<SignUpSuccess />} />
      <Route path="userpublic" element={<UserPublic />} />
    </>
  )
);
function App() {
  return (
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </CookiesProvider>
  );
}

export default App;
