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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />} />
      <Route path="home" element={<Homepage />}>
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
      </Route>
    </>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
