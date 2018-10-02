import React from 'react';
import { Header } from './Header';
import { Main } from './Main';

class App extends React.Component {
    state = {
        isLoggedIn: false
    }
    handleLogin = () => {
        this.setState({ isLoggedIn: true});

    }
    handleLogout = () => {
        this.setState({ isLoggedIn: false});
    }
    render() {
        return (
          <div className="App">
            <Header isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout}/>
            <Main isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin} />
          </div>
        );
    }
}

export default App;
