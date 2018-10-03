import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchPictures } from '../actions';

class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            term: '',
            lastTerm: 'Surfboards',
            page: 1,
            searchType: 'text',
            lastSearchType: 'text'
        }
    }

    componentDidMount() {
        this.props.fetchPictures(this.state.lastTerm, this.state.searchType, this.state.page , true);

        window.addEventListener("scroll", () => {
            
            var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
            var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
            var clientHeight = document.documentElement.clientHeight || window.innerHeight;
            var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

            if (scrolledToBottom) {
                this.setState({ page: this.state.page + 1 });
                this.loadMorePicture();
            }
        });
    }

    loadMorePicture() {
        this.setState({ requestSent: true});
        this.props.fetchPictures(this.state.lastTerm, this.state.lastSearchType, this.state.page, false);
    }

    onInputChange(event) {
        this.setState({ term: event.target.value });
    }

    onSelectChange(event) {
        this.setState({ searchType: event.target.value });
    }

    onFormSubmit(event) {
        event.preventDefault();
        this.setState({
            lastTerm: this.state.term,
            lastSearchType: this.state.searchType,
            page: 1
        });
        this.props.fetchPictures(this.state.term, this.state.lastSearchType, this.state.page , true);
    }
    
    render() {
        return (
            <form onSubmit={event => this.onFormSubmit(event)} className="form-group">
                <div className="input-group">
                    <select onChange={event => this.onSelectChange(event)} className="custom-select select-search-type">
                        <option value="text">Text</option>
                        <option value="tags">Tag</option>
                    </select>
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

    componentWillUnmount() {
        window.removeEventListener('scroll');
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchPictures }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);