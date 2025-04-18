import { Outlet } from "react-router";

import UserNavigation from "../../components/UserComponents/UserNavigation/UserNavigation";

function User() {
  return (
    <>
      <UserNavigation />
      <Outlet />
    </>
  );
}

export default User;
