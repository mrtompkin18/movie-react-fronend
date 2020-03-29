import React from "react";
import { Switch, Route } from "react-router-dom";

import Movie from "../containers/Movie";
import Landing from "../containers/Landing";

const Index = () => {
    return (
        <Switch>
            <Route exact={true} path="/">
                <Landing />
            </Route>
            <Route path="/movie/:id">
                <Movie />
            </Route>
        </Switch>
    )
}

export default Index;
