import React from 'react';
import './App.css';
import { Route, withRouter } from 'react-router-dom'
import Home from './components/routes/Home'


  function App() {
  return (
  <div>
    <Route exact path="/" component={Home}/>
  </div>
)
}

export default App
