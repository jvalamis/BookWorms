import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
} from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Login from './components/Login.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import Main from './components/Main.jsx';
import DATA from './mockData';

const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      searchedItem: null,
      loggedIn: false
    };
    this.searchForBook = (query) => {
      console.log(query, 'query in index.jsx');
      axios.post('/googleData', {
        query,
      })
        .then((response) => {
          console.log(response.data, 'response in index.jsx');
          // this.state.searchedItem = response.data;
        })
        .catch((error) => {
          console.log(error, 'error in index.jsx');
        });
    };
  }

  componentDidMount() {
    // $.ajax({
    //   url: '/items',
    //   success: (data) => {
    this.setState({
      items: DATA,
    });
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   },
    // });
  }

  // searchForBook(query) {
  //   console.log(query, 'query in index.jsx');
  //   axios.post('/googleData', { query })
  //     .then((response) => {
  //       console.log(response.data, 'response in index.jsx');
  //       // this.state.searchedItem = response.data;
  //     })
  //     .catch((error) => {
  //       console.log(error, 'error in index.jsx');
  //     });
  // }

  render() {
    // if (this.state.loggedIn === false) {
    //   return <Route path="/" render={(props) => 
    //         <Nav {...props} items={this.state.items} handleSearchInput={this.searchForBook.bind(this)}/>}/>
    //         <Login />
    // }
    return (
      
      <div>
        <Router>
          <div>
            {/* <Route path="/" component={Nav} items={this.state.items}/> */}
            <Route
              path="/"
              render={props => <Nav {...props} items={this.state.items} handleSearchInput={this.searchForBook.bind(this)} />}
            />
            {/* <Route path="/main" component={Main} /> */}
            <Route
              path="/main"
              render={props => <Main {...props} items={this.state.items} />}
            />

            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUpPage} />
          </div>
        </Router>
      </div>

    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
