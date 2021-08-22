import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { CreateForm } from './product/CreateForm';
import {ProductList} from "./product/ProductList";


const App = () => {
  const [welcomeText, setWelcomeText] = useState('Loading');
  useEffect( () => {
    const loadWelcomeText = async () => {
      try {
        const response = await fetch('/getWelcomeText');
        const body = await response.json();
        setWelcomeText(body.welcomeText);
      } catch (e) {
        console.log('Problem:' + e.message);
      }
    }

    loadWelcomeText().then(r => {});
  }, []);

  return (
    <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{welcomeText}</h1>
        <CreateForm />
        <ProductList />
    </div>
  );
}

export default App;
