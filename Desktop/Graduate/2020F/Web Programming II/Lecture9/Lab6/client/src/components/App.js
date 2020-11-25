import React from 'react';
import '../App.css';
import { NavLink, BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import Home from './Home';
import MyBin from './My-bin';
import MyPosts from './My-posts';
import NewPost from './New-post';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: 'http://localhost:4000' })
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">
              Welcome to Binterest!
            </h1>
            <nav>
              <NavLink className="navlink" to="/">
                Home
              </NavLink>
              <NavLink className="navlink" to="/my-bin">
                my-bin
              </NavLink>
              <NavLink className="navlink" to="/my-posts">
                my-posts
              </NavLink>
            </nav>
          </header>
          <Route exact path="/" component={Home} />
          <Route path="/my-bin" component={MyBin} />
          <Route path="/my-posts" component={MyPosts} />
          <Route path="/new-post" component={NewPost} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
