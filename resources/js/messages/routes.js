import React from "react";
import { Switch, Route } from "react-router-dom";
import Message from "./pages/Message";

const Routes = () => {
  const route = process.env.MIX_APP_ROUTE;
  return (
    <Switch>
      <Route path={`${route}/message`} component={Message} />
    </Switch>
  );
};

export default Routes;
