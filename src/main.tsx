import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import { ThemeProvider } from "@mui/material/styles";
import { FirebaseAppProvider } from 'reactfire'; 
import 'firebase/auth';

// internal imports
import { Home, Shop, Cart, Auth, Mort } from './components'; 
import './index.css'
import { theme } from './Theme/themes';
import { firebaseConfig } from './firebaseConfig';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <ThemeProvider theme = { theme }>
        <Router>
          <Routes>
            <Route path='/' element={<Home title = {"Welcome To Outlet"}/>} />
            <Route path='/auth' element={<Auth title = {"Welcome To Outlet"}/>} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/mort' element={<Mort />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </FirebaseAppProvider>
  </React.StrictMode>,
)