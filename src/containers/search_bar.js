import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchPictures } from '../actions';

class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.state = { term: '' };
    }

    onInputChange(event) {
        this.setState({ term: event.target.value });
    }

    onFormSubmit(event) {
        event.preventDefault();
        this.props.fetchPictures(this.state.term, 1);
    }
    
    render() {
        return (
            <form onSubmit={event => this.onFormSubmit(event)} className="form-group">
                <div className="input-group mb-3">
                    <input
                        onChange={event => this.onInputChange(event)}
                        value={this.state.term}
                        type="text"
                        className="form-control"
                        placeholder="Serch for a picture"/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="submit">Search</button>
                    </div>
                </div>
            </form>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchPictures }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);