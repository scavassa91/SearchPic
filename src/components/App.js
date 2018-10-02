import React, { Component } from 'react';

import SearchBar from '../containers/search_bar';
import PictureList from '../containers/picture_list';

import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App container">
        
        <SearchBar />
        <PictureList />
      </div>
    );
  }
}

export default App;
