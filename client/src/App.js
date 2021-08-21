import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';


const App = () => {
  const [welcomeText, setWelcomeText] = useState('Loading');
  useEffect( () => {
    const loadWelcomeText = async () => {
      try {
        const response = await fetch('/helloWorld');
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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{welcomeText}</h1>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
