import React from 'react';
import { Link } from '@reach/router';

class Pet extends React.Component {
  render() {
    const { name, animal, breed, media, location, id } = this.props;
    let photos = [];
    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(p => p["@size"] === "pn");
    }

    const hero = photos[0] ? photos[0].value : "http://placecorgi.com/300/300";

    return (
      <Link className="pet" to={`/details/${id}`}>
        <div className="image-container">
          <img src={ hero } alt={ name } />
        </div>
        <div className="info">
          <h1>{ name.toUpperCase() }</h1>
          <h2>{ animal } - { breed } - { location }</h2>
        </div>
      </Link>
    );
  }
}

export default Pet;
