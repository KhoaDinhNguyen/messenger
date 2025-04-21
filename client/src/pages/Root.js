import { useEffect } from "react";
import { useNavigate } from "react-router";

function Root() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("home");
  });
  return <></>;
}

export default Root;
