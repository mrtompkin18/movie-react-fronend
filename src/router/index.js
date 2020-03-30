import React from "react";
import { Switch, Route } from "react-router-dom";

import Detail from "../containers/Detail";
import Landing from "../containers/Landing";

const Index = () => {
    return (
        <Switch>
            <Route exact={true} path="/">
                <Landing />
            </Route>
            <Route path="/movie/:id">
                <Detail />
            </Route>
        </Switch>
    )
}

export default Index;
