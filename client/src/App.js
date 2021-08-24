import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import {CreateForm} from './product/CreateForm';
import {ProductList} from "./product/ProductList";
import {ProductView} from "./product/ProductView";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";


const App = () => {
    const [welcomeText, setWelcomeText] = useState('Loading');
    useEffect(() => {
        const loadWelcomeText = async () => {
            try {
                const response = await fetch('/getWelcomeText');
                const body = await response.json();
                setWelcomeText(body.welcomeText);
            } catch (e) {
                console.log('Problem:' + e.message);
            }
        }

        loadWelcomeText().then(r => {
        });
    }, []);

    return (
        <Router>
            <div className="App">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1>{welcomeText}</h1>
            </div>

            <Switch>
                <Route path="/create-product">
                    <CreateForm/>
                </Route>
                <Route path="/view-product/:id">
                    <ProductView/>
                </Route>
                <Route path="/edit-product/:productId">
                    <CreateForm/>
                </Route>
                <Route path="/">
                    <ProductList/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
