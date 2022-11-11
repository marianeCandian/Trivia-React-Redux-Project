import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Games from './pages/games';
import Settings from './pages/settings';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/games" component={ Games } />
      <Route path="/settings" component={ Settings } />
    </Switch>
  );
}
