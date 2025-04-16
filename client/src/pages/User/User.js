import { Outlet } from "react-router";

function User() {
  return (
    <>
      <p>Hello user</p>
      <Outlet />
    </>
  );
}

export default User;
