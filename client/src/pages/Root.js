import { useEffect } from "react";
import { useNavigate } from "react-router";
import LandingPage from "./LandingPage/LandingPage";

function Root() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("home");
  });
  return <></>;
}

export default Root;
