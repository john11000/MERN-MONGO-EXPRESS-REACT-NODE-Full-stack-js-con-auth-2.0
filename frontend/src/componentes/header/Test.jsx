
import React from'react';
import {useHistory, withRouter } from "react-router-dom";


export default function HomeButton() {
  let history = useHistory()

  function handleClick() {
    history.push("/home")
  }

  return (
    <button type="button" onClick={handleClick}>
      Go home
    </button>
  );
}

export default withRouter(HomeButton);