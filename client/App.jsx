import React, {useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './style.scss';

import Home from './components/Home';
// import Login from './componets/Login';

function App() {
  return (
    <div className="main">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;