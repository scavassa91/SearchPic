import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchPictures } from '../actions';

class PictureList extends Component {

    constructor(props) {
        super(props)

        this.renderPicture = this.renderPicture.bind(this);
    }

    renderOwner(photoItem) {
        const owner = photoItem.tags.owner;
        
        if (!owner) {
            return <p className="card-text"></p>;
        }

        let userName;
        !owner.realname ? userName = owner.username : userName = owner.realname;
        const icon_farm = owner.iconfarm;
        const icon_serv = owner.iconserver;
        const user_id = owner.nsid;
        
        let userImage;
        
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

    renderTags(photoItem) {
        const _tags = photoItem.tags;

        if (!_tags) {
            return <div></div>;
        }

        const tags = _tags.tags.tag.map(tag => {
            return <span key={tag.id} className="badge badge-custom">{tag._content}</span>
        });
        
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

    renderPicture(photoItem) {
        const photo = photoItem.photo;
        const photoUrl = `http://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
        const blankUrl = `https://www.flickr.com/photos/${photo.owner}/${photo.id}`

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
    }

    render() {
        return (
            <div className="container hold-list">
                <div className="card-columns">
                    {this.props.pictures.map(this.renderPicture)}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        pictures: state.pictures
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchPictures}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PictureList);
