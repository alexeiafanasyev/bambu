import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import './App.css';

import PeopleList from './components/peopleList'
import PeopleItemDetails from './components/peopleItemDetails'


class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={PeopleList}/>
                    <Route path="/people/:id" component={PeopleItemDetails}/>
                </div>
            </Router>
        );
    }
}

export default App;
