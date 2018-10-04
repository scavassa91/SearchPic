import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchPictures } from '../actions';

class PictureList extends Component {

    constructor(props) {
        super(props)
        
        // Bind the context this into renderPicture function
        this.renderPicture = this.renderPicture.bind(this);
    }

    /**
     * Render the owner name and icon
     * @param {Object} photoItem 
     */
    renderOwner(photoItem) {
        const owner = photoItem.tags.owner;
        
        // Verify if the owner already exists before rendering
        if (!owner) {
            return <p className="card-text"></p>;
        }

        let userName;
        !owner.realname ? userName = owner.username : userName = owner.realname;
        const icon_farm = owner.iconfarm;
        const icon_serv = owner.iconserver;
        const user_id = owner.nsid;
        
        let userImage;
        
        // Verify if the icon farm exists if it's not show a default icon
        if (icon_farm !== 0) {
            userImage = `http://farm${icon_farm}.staticflickr.com/${icon_serv}/buddyicons/${user_id}.jpg`;
        } else {
            userImage = 'https://s.yimg.com/pw/images/buddyicon03_l.png';
        }
        
        return(
            <p className="card-text card-text-user">
                <img src={userImage} className="rounded-circle card-img-user" alt={userName} />
                <span>{userName}</span>
            </p>
        );
    }

    /**
     * Render photo tags and taken date
     * @param {Object} photoItem 
     */
    renderTags(photoItem) {
        const _tags = photoItem.tags;

        // Verify if the tags exists before rendering
        if (!_tags) {
            return <div></div>;
        }

        // Create de array of tags to be render
        const tags = _tags.tags.tag.map(tag => {
            return <span key={tag.id} className="badge badge-custom">{tag._content}</span>
        });
        
        // Adjust date
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const date = new Date(_tags.dates.taken);
        const stringDate = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`

        return(
            <div>
                <p className="card-text">{tags}</p>
                <p className="card-text"><small className="text-muted">Taken on {stringDate}</small></p>
            </div>
        );
    }

    /**
     * Render the picture and the title
     * @param {Object} photoItem 
     */
    renderPicture(pictures) {
        if (pictures.error) {
            return <div className="error">{pictures.error}</div>;
        } else  if (pictures.length === 0) {
            return <div className="error">Loading...</div>;
        } else if (pictures === 'not-found') {
            return <div className="error">Oops! There are no matches for your search</div>;
        } 

        let cards = pictures.map((photoItem) => {
            const photo = photoItem.photo;
            // Create the image url
            const photoUrl = `http://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
            // Create the image url link to flickr
            const blankUrl = `https://www.flickr.com/photos/${photo.owner}/${photo.id}`;

            return (
                <div key={photo.id} className="card">
                    <a href={blankUrl} className="card-link" target="_blank">
                        {this.renderOwner(photoItem)}
                        <img className="card-img-top img-fluid card-img" src={photoUrl} alt={photo.title}/>
                        <div className="card-block">
                            <h5 className="card-title">{photo.title}</h5>
                            {this.renderTags(photoItem)}
                        </div>
                    </a>
                </div>
            );
        });
        
        return cards;
        
    }

    render() {
        return (
            <div className="container hold-list">
                <div className="card-columns">
                    {/* {this.props.pictures.map(this.renderPicture)} */}
                    {this.renderPicture(this.props.pictures)}
                </div>
            </div>
        );
    }
}

// Transform redux state into an object the will be the props of this container
function mapStateToProps(state) {
    return {
        pictures: state.pictures
    };
}

// Transform the actions into a props function for this container
function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchPictures}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PictureList);
