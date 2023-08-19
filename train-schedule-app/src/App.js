import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllTrainsPage from './pages/AllTrainsPage';
import SingleTrainPage from './pages/SingleTrainsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact component={AllTrainsPage} />
        <Route path="/trains/:trainNumber" component={SingleTrainPage} />
      </Routes>
    </Router>
  );
}

export default App;
