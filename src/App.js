import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import firebase from './firebase';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Register from './components/Register/Register';
import New from './components/New/New';

import './global.css';

class App extends Component {

  state = {

    firebaseInitialized: false

  };

  componentDidMount() {

    firebase.isInitializae().then(resultado => {

      // Devolve o usuário

      this.setState({ firebaseInitialized: resultado });

    });

  };

  render() {

    return this.state.firebaseInitialized !== false ? (

      <div>
  
        <BrowserRouter>

        <Header />
        
          <Switch>

            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/dashboard/new" component={New} />

          </Switch>

        </BrowserRouter>
  
      </div>
  
    ) 
    
    : (

      <h1>Carregando...</h1>

    );

  };

};

export default App;