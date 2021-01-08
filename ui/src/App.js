import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './elements/Header.js';
import Home from './elements/Home.js';
import Profile from './elements/Profile.js';
import Cart from './elements/Cart.js';
/*
  @author: Priyank Lohariwal
*/

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/cart" component={Cart} />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
