import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Layout from './components/layout/layout';
import BurgerBuilder from './containers/Burger-Builder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {
  render() {
    return (
    <div>
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders}/>
          <Route path="/" exact component={BurgerBuilder} />

        </Switch>
      </Layout>
    </div>
  );
  }
}

export default App;
