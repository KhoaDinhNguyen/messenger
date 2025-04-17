import { Outlet } from "react-router";

import HomepageNavigation from "./HomepageNavigation/HomepageNavigation";

function Homepage() {
  return (
    <>
      <HomepageNavigation />
      <Outlet />
    </>
  );
}

export default Homepage;
