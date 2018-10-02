import React from 'react';
import { Register } from './Register';
import { Login } from './Login';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Home } from './Home';

export class Main extends React.Component {
    getLogin = () => {
        if (this.props.isLoggedIn) {
            return <Redirect to='/home'/>;
        }
        return <Login handleLogin={this.props.handleLogin} />
    }

    getHome = () => {
        if (this.props.isLoggedIn) {
            return <Home />;
        }
        return <Redirect to="/login" />
    }

    getRoot = () => {
        return <Redirect to='/login'/>;
    }

    render() {
        return (
            <div className="main">
                <Switch>
                    <Route exact path="/" render={this.getRoot}/>
                    <Route path="/login" render={this.getLogin}/>
                    <Route path="/home" render={this.getHome}/>
                    <Route path="/register" component={Register}/>
                    <Route render={this.getRoot}/>
                </Switch>
            </div>
        );
    }
}
