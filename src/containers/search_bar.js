import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchPictures } from '../actions';

class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            term: '',
            lastTerm: '',
            page: 1,
            requestSent: false
        }
    }

    componentDidMount() {
        this.props.fetchPictures('', this.state.page , true);

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
        if (!this.state.requestSent) {
            this.setState({ requestSent: true});
            this.props.fetchPictures(this.state.lastTerm, this.state.page, false);
        }
    }

    onInputChange(event) {
        this.setState({ term: event.target.value });
    }

    onFormSubmit(event) {
        event.preventDefault();
        this.setState({
            lastTerm: this.state.term,
            page: 1
        });
        this.props.fetchPictures(this.state.term, this.state.page , true);
    }
    
    render() {
        return (
            <form onSubmit={event => this.onFormSubmit(event)} className="form-group">
                <div className="input-group">
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