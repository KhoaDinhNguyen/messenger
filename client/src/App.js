import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router";

import Root from "./pages/Root";

import Homepage from "./pages/Homepage/Homepage";
import SignUp from "./pages/Homepage/SignUp/SignUp";
import Login from "./pages/Homepage/Login/Login";

import Auth from "./pages/Auth/Auth";
import ForgetPassword from "./pages/Auth/ForgetPassword/ForgetPassword";

import User from "./pages/User/User";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />} />
      <Route path="home" element={<Homepage />}>
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
      </Route>
      <Route path="auth" element={<Auth />}>
        <Route path="forgetpassword" element={<ForgetPassword />} />
      </Route>
      <Route path="user/:username" element={<User />}></Route>
    </>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
