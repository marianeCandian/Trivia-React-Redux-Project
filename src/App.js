import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/login';
import Games from './pages/games';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/games" component={ Games } />
    </Switch>
  );
}
