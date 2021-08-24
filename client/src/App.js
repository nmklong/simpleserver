import logo from './logo.svg';
import './App.css';
import {CreateForm} from './product/CreateForm';
import {ProductList} from "./product/ProductList";
import {ProductView} from "./product/ProductView";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


const App = () => {
    return (
        <Router>
            <div className="App">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1><Link to="/">Home</Link></h1>
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
