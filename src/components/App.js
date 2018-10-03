import React, { Component } from 'react';

import SearchBar from '../containers/search_bar';
import PictureList from '../containers/picture_list';

import SearchPic from '../assets/searchpic.png';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <div className="container">
            <div className="row">
              <div className="col-sm-2">
                <img className="img-fluid" src={SearchPic} alt="SearchPic"/>
              </div>
              <div className="col-sm-10">
                <SearchBar />
              </div>
            </div>
          </div>
        </header>
        <div className="container hold-list">
          <PictureList />
        </div>
      </div>
    );
  }
}

export default App;
