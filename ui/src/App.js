import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './elements/Header.js';
import Home from './elements/Home.js';
import Profile from './elements/Profile.js';
import Cart from './elements/Cart.js';
import SignInPage from './elements/SignInPage.js'
import SignUpPage from './elements/SignUpPage.js'
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
            <Route path="/sign-in" component={SignInPage} />
            <Route path="/sign-up" component={SignUpPage} />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
