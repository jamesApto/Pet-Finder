import React from 'react';
import { PetMedia, PetPhoto } from 'petfinder-client';

interface Props {
    media: PetMedia
}

interface State {
    active: number,
    photos: PetPhoto[]
}

class Carousel extends React.Component<Props, State> {
    public state = {
        photos: [],
        active: 0
    };

    /* // old way
    constructor(props) {
        super(props);
        this.handleIndexClick = this.handleIndexClick.bind(this);
    }
    */

    public static getDerivedStateFromProps({ media }: Props) {
        let photos: PetPhoto[] = [];

        if (media && media.photos && media.photos.photo) {
            photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
        }

        return {
            photos
        };
    }

    /* unbound
    public handleIndexClick(event) {
        // we have to bind here so state works correctly
        this.setState({
            active: +event.target.dataset.index // the + converts a string to a number (coercion)
        });
    }
    */

    public handleIndexClick = (event: React.MouseEvent<HTMLElement>) => {
        if (!(event.target instanceof HTMLElement)) {
            return;
        }

        if (event.target.dataset.index) {
            // we have to bind here so state works correctly
            this.setState({
                active: +event.target.dataset.index // the + converts a string to a number (coercion)
            });
        }
    };

    public render() {
        // destructering
        const { photos, active }: State = this.state;
        const hero = photos[active] ? photos[active].value : "http://placecorgi.com/300/300";

        return (
            <div className="carousel">
                <img src={hero} alt="primar animal" />
                <div className="carousel-smaller">
                    {photos.map((photo, index) => (
                        /* eslint-disable-next-line */
                        <img
                            onClick={this.handleIndexClick}
                            data-index={index}
                            key={photo.value}
                            src={photo.value}
                            className={index === active ? 'active' : ''}
                            alt="animal thumb" />
                    ))}
                </div>
            </div>
        );
    }
}

export default Carousel;
