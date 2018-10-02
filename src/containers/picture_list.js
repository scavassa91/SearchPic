import React, { Component } from 'react';
import { connect } from 'react-redux';

class PictureList extends Component {

    renderPicture(photo) {
        const photoUrl = `http://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
        const blankUrl = `https://www.flickr.com/photos/${photo.owner}/${photo.id}`
        return (
            <div key={photo.id} className="card">
                <a href={blankUrl} className="card-link" target="_blank">
                    <img className="card-img-top img-fluid" src={photoUrl} alt={photo.title}/>
                    <div className="card-block">
                        <h4 className="card-title">{photo.title}</h4>
                        <p className="card-text">- Tags</p>
                        <p className="card-text">- Owner</p>
                        <p className="card-text"><small className="text-muted">Date taken</small></p>
                    </div>
                </a>
            </div>
        );
    }

    render() {
        console.log(this.props.pictures);
        return (
            <div className="card-columns">
                {this.props.pictures.map(this.renderPicture)}
            </div>
        );
    }
}

function mapStateToProps({ pictures }) {
    return { pictures };
}

export default connect(mapStateToProps)(PictureList);
