import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import './App.css';

class App extends Component {

  state = {
    users: [],
    user:{},
    loading: false,
    alert: null
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const url = `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    try {
      const response = await fetch(url);
      const users = await response.json();
      this.setState({
        users: HATEOAS(users),
        loading: false
      });
    } catch (e) {
      console.error(`Error: ${e}`);
    }
  }


  searchUsers = async (text) => {
    const url_search = `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    try {
      const response = await fetch(url_search);
      const data = await response.json();
      const users = data.items;
      this.setState({
        users: HATEOAS(users),
        loading: false
      });
    } catch (e) {
      console.error(`Error: ${e}`);
    }
  }
  //  Get single Github user
  getUser = async (userName) => {
    this.setState({
      loading: true
    }); 
    const url_single = `https://api.github.com/users/${userName}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    try {
      const response = await fetch(url_single);
      const user = await response.json();
      console.log('user HATEOAS_2: ', HATEOAS_2(user))
      this.setState({
        user: HATEOAS_2(user),
        loading: false
      });
    } catch (e) {
      console.error(`Error: ${e}`);
    }
    
  }
  //  Clear users from state
  clearUsers = () => {
    this.setState({
      users: [],
      loading: false
    })
  }
  // Set alert
  setAlert = (msg, type) => {
    this.setState({
      alert: {
        msg: msg,
        type: type
      }
    })
    setTimeout(() => this.setState({ alert: null }), 5000);
  }
  render() {
    return (
      <Router>
        <div className="App" >
          <Navbar
            icon='fa-brands fa-github'
            title={' Github Finder'} />
          <div className='container'>
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={this.state.users.length > 0 ? true : false}
                      setAlert={this.setAlert} />
                    <Users
                      loading={this.state.loading}
                      users={this.state.users} />
                  </>
                )} />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props => (
                <User {...props} getUser={this.getUser} user={this.state.user} loading={this.state.loading}/>
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

const HATEOAS = (users) =>
  users.map(u => {
    return {
      id: u.id,
      login: u.login,
      avatar_url: u.avatar_url,
      html_url: u.html_url,
    };
  });

  const HATEOAS_2 = (u) => {
    return {
      name: u.name,
      avatar_url: u.avatar_url,
      location: u.location,
      bio: u.bio,
      blog: u.blog,
      login: u.login,
      html_url: u.html_url,
      followers: u.followers,
      following: u.following,
      public_repos: u.public_repos,
      public_gists: u.public_gists,
      company: u.company,
      hireable: u.hireable
    };
  }
 
   
 


export default App;
