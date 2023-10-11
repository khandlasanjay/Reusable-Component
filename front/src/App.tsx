import React, { } from 'react';
import GoogleLogin from './components/GoogleLogin';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<GoogleLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
