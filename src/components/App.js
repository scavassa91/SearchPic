import React, { Component } from 'react';

import SearchBar from '../containers/search_bar';

import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App container">
        
        <SearchBar />
      </div>
    );
  }
}

export default App;
