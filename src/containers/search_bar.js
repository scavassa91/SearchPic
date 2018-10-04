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
            searchType: 'tags',
            lastSearchType: 'tags',
            page: 1,
        }
    }

    componentDidMount() {
        // Make the first request using text surfboards
        this.props.fetchPictures(this.state.lastTerm, this.state.lastSearchType, this.state.page , true);

        // Add the scroll event listener
        window.addEventListener("scroll", () => this.handleScroll());
    }

    /**
     * Handler to verify when the page is at the bottom
     */
    handleScroll() {
        var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        var clientHeight = document.documentElement.clientHeight || window.innerHeight;
        var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

        if (scrolledToBottom) {
            this.setState({ page: this.state.page + 1 });
            this.loadMorePicture();
        }
    }

    /**
     * Make the infinity sroll request
     */
    loadMorePicture() {
        this.props.fetchPictures(this.state.lastTerm, this.state.lastSearchType, this.state.page, false);
    }

    /**
     * Update the local term state
     * @param {Event} event 
     */
    onInputChange(event) {
        this.setState({ term: event.target.value });
    }

    /**
     * Update the local searchType state
     * @param {Event} event 
     */
    onSelectChange(event) {
        this.setState({ searchType: event.target.value });
    }

    /**
     * Update the local state, scroll to top and make the request
     * @param {Event} event 
     */
    onFormSubmit(event) {
        event.preventDefault();
        this.setState({
            lastTerm: this.state.term,
            lastSearchType: this.state.searchType,
            page: 1
        });
        window.scrollTo(0, 0);
        this.props.fetchPictures(this.state.term, this.state.lastSearchType, this.state.page , true);
    }
    
    render() {
        return (
            <form onSubmit={event => this.onFormSubmit(event)} className="form-group">
                <div className="input-group">
                    <select onChange={event => this.onSelectChange(event)} className="custom-select select-search-type">
                        <option value="tags">Tag</option>
                        <option value="text">Text</option>
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

    /**
     * Remove scroll event listener before the container unmount
     */
    componentWillUnmount() {
        window.removeEventListener("scroll", () => this.handleScroll());
    }
}

// Transform the actions into a props function for this container
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchPictures }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);