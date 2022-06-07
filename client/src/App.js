import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { Container} from '@mui/material';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';


const App = () => {
  return (
    <Container maxWidth="lg">
      <Router>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/auth' element={<Auth/>}/>
      </Routes>
      </Router>
      
    </Container>
  );
};

export default App;
