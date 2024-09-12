import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import Nav from './components/Nav'; 
// import Home from './pages/Home';
// import ShopLogin from './pages/ShopLogin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <ShopLogin/> */}
    {/* <Home/> */}
    {/* <Nav/> */}
  </React.StrictMode>
);


reportWebVitals();
