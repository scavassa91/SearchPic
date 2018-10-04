import React from 'react';

import SearchBar from '../containers/SearchBar';

import SearchPic from '../assets/searchpic.png';

export default () => {
    return (
        <header>
            <div className="container">
                <div className="row">
                    <div className="col-sm-2 hold-logo">
                        <img className="img-fluid" src={SearchPic} alt="SearchPic"/>
                    </div>
                    <div className="col-sm-10 hold-search">
                        <SearchBar />
                    </div>
                </div>
            </div>
        </header>
    );
}