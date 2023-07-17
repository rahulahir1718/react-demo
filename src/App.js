import './App.css';
import './dev-style.css';
import { useContext, useEffect, useState } from 'react';
import Login from './pages/Auth/Login';
import React from 'react';
import Header from './pages/Header';
import AuthContext from './Store/auth-context';
import TeamList from './pages/TeamList';

function App() {

const context = useContext(AuthContext);

return (
    <React.Fragment>
      <Header />
      {context.isLoggedIn ? <TeamList/> : <Login/>}
    </React.Fragment>
  );
}

export default App;
