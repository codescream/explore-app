import React from 'react';
import { Container } from '@material-ui/core'; 
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Auth from './components/login/Auth';


const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route exact path='/' Component={() => <Navigate to='/posts' />} />
          <Route exact path='/posts' Component={Home} />
          <Route path='/posts/search' Component={Home} />
          {/* <Route path='/posts/id' Component={PostDetail} /> */}
          <Route path='/auth' Component={() => JSON.parse(localStorage.getItem('profile')) ? <Navigate to='/posts' /> : <Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App;