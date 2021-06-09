import React from "react";
import { useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";

export default function SignOff({ setCurrentUser }) {
  const history = useHistory();

  const handleClick = () => {
    setCurrentUser(null);
    history.push("/");
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleClick}>
      Log Off
    </Button>
  );
}