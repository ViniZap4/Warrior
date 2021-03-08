import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

//import pages
import Main from './page/main/main'

export default function src() {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
      </Switch>
    </BrowserRouter>
  );
}

