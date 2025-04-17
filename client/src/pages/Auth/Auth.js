import { Outlet } from "react-router";

import HomepageNavigation from "../Homepage/HomepageNavigation/HomepageNavigation";

function Auth() {
  return (
    <>
      <HomepageNavigation />
      <Outlet />
    </>
  );
}

export default Auth;
