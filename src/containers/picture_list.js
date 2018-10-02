import React, { Component } from 'react';
import { connect } from 'react-redux';

class PictureList extends Component {

    constructor(props) {
        super(props)

        this.renderPicture = this.renderPicture.bind(this);
    }

    renderOwner(index) {

        if (!this.props.tags[index]) {
            return <p className="card-text"></p>;
        }

        const userName = this.props.tags[index].owner.realname;
        const icon_farm = this.props.tags[index].owner.iconfarm;
        const icon_serv = this.props.tags[index].owner.iconserver;
        const user_id = this.props.tags[index].owner.nsid;
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

    renderTags(index) {
        if (!this.props.tags[index]) {
            return <div></div>;
        }

        const tags = this.props.tags[index].tags.tag.map(tag => {
            return <span key={tag.id} className="badge badge-secondary">{tag._content}</span>
        });

        return(
            <div>
                <p className="card-text">{tags}</p>
                <p className="card-text"><small className="text-muted">{this.props.tags[index].dates.taken}</small></p>
            </div>
        );
    }

    renderPicture(photo, index) {
        const photoUrl = `http://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
        const blankUrl = `https://www.flickr.com/photos/${photo.owner}/${photo.id}`

        return (
            <div key={photo.id} className="card">
                <a href={blankUrl} className="card-link" target="_blank">
                    <img className="card-img-top img-fluid" src={photoUrl} alt={photo.title}/>
                    <div className="card-block">
                        {this.renderOwner(index)}
                        <h3 className="card-title">{photo.title}</h3>
                        {this.renderTags(index)}
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
    return {
        pictures: state.pictures,
        tags: state.tags
    };
}

export default connect(mapStateToProps)(PictureList);
