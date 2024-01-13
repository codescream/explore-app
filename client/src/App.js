import React from 'react';
import { Container } from '@material-ui/core'; 
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Auth from './components/login/Auth';


const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route exact path='/' Component={Home} />
          <Route path='/auth' Component={Auth} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App;