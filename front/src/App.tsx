import React, { } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ImageUpload from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <ImageUpload />
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
