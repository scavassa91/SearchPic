import React, { Component } from 'react';
import { connect } from 'react-redux';

class PictureList extends Component {

    constructor(props) {
        super(props)

        this.renderPicture = this.renderPicture.bind(this);
    }

    renderOwner(photoItem) {
        const owner = photoItem.tags.owner;
        console.log(owner);
        

        if (!owner) {
            return <p className="card-text"></p>;
        }

        const userName = owner.realname;
        const icon_farm = owner.iconfarm;
        const icon_serv = owner.iconserver;
        const user_id = owner.nsid;
        let userImage;
        
        if (icon_farm !== 0) {
            userImage = `http://farm${icon_farm}.staticflickr.com/${icon_serv}/buddyicons/${user_id}.jpg`;
        } else {
            userImage = 'https://www.flickr.com/images/buddyicon.gif';
        }
        
        return(
            <p className="card-text">
                <img src={userImage} className="rounded-circle" alt={userName} />
                <span>{userName}</span>
            </p>
        );
    }

    renderTags(photoItem) {
        const _tags = photoItem.tags;

        if (!_tags) {
            return <div></div>;
        }

        const tags = _tags.tags.tag.map(tag => {
            return <span key={tag.id} className="badge badge-secondary">{tag._content}</span>
        });

        return(
            <div>
                <p className="card-text">{tags}</p>
                <p className="card-text"><small className="text-muted">{_tags.dates.taken}</small></p>
            </div>
        );
    }

    renderPicture(photoItem) {
        const photo = photoItem.photo;
        const photoUrl = `http://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
        const blankUrl = `https://www.flickr.com/photos/${photo.owner}/${photo.id}`

        return (
            <div key={photo.id} className="card">
                <a href={blankUrl} className="card-link" target="_blank">
                    <img className="card-img-top img-fluid" src={photoUrl} alt={photo.title}/>
                    <div className="card-block">
                        {this.renderOwner(photoItem)}
                        <h3 className="card-title">{photo.title}</h3>
                        {this.renderTags(photoItem)}
                    </div>
                </a>
            </div>
        );
    }

    render() {
        return (
            <div className="card-columns">
                {this.props.pictures.map(this.renderPicture)}
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log(state);
    
    return {
        pictures: state.pictures
    };
}

export default connect(mapStateToProps)(PictureList);
