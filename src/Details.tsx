import React from "react";
import pf, { PetMedia } from 'petfinder-client';
import { navigate, RouteComponentProps } from "@reach/router";
import Carousel from "./Carousel";
import Modal from "./Modal";
import Loadable from 'react-loadable';

if (!process.env.API_KEY || !process.env.API_SECRET) {
  throw new Error("No API KEY");
}

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

const LoadableContent = Loadable({
  loader: () => import('./AdoptModalContent'),
  loading() {
    return <h1>Loading content</h1>;
  }
});

class Details extends React.Component<RouteComponentProps<{ id: string}>>{
  // new syntax
  public state = {
    loading: true,
    showModal: false,
    name: "",
    location: "",
    animal: "",
    breed: "",
    description: "",
    media: {} as PetMedia
  };

  public toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  public componentDidMount() {
    if (!this.props.id) {
      return;
    }

    petfinder.pet.get({
      output: "full",
      id: this.props.id
    }).then(data => {
      if (!data.petfinder.pet) {
        navigate('/');
        return;
      }

      const pet = data.petfinder.pet;
      let breed;

      if (Array.isArray(pet.breeds.breed)) {
        breed = pet.breeds.breed.join(", ");
      } else {
        breed = pet.breeds.breed;
      }

      this.setState({
        name: pet.name,
        animal: pet.animal,
        location: `${pet.contact.city}, ${pet.contact.state}`,
        description: pet.description,
        media: pet.media,
        breed,
        loading: false
      });
    }).catch(() => {
      navigate("/");
    });
  }

  public render() {
    if (this.state.loading) {
      return <h1>Loading</h1>;
    }

    const { name, animal, breed, location, description, media, showModal } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{animal} - {breed} - {location}</h2>
          <button onClick={this.toggleModal}>Adopt {name}
          </button>
          <p>{description}</p>
          { showModal ? (
            <Modal>
              <LoadableContent toggleModal={this.toggleModal} name={name} />
            </Modal>
          ) : null }
        </div>
      </div>
    );
  }
}

export default Details;
