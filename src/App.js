import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Products from './pages/Products';
import Shopcart from './pages/Shopcart';
import Details from './pages/Details';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Products } />
      <Route exact path="/shopcart" component={ Shopcart } />
      <Route exact path="/product-details/:id" component={ Details } />
    </Switch>
  );
}

export default App;
