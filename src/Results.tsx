import React from 'react';
import Pet from './Pet';
import pf, { Pet as PetType } from 'petfinder-client';
import SearchBox from './SearchBox';
import { Consumer } from './SearchContext';
import { RouteComponentProps } from '@reach/router';

if (!process.env.API_KEY || !process.env.API_SECRET) {
  throw new Error("No API KEY");
}

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

interface Props {
  searchParams: {
    location: string,
    animal: string,
    breed: string
  }
}

interface State {
  pets: PetType[]
}

class Results extends React.Component<Props, State> {
  public state = {
    pets: [] as PetType[]
  };

  public componentDidMount() {
    this.search();
  }

  public search = () => {
    petfinder.pet.find({
      output: "full",
      location: this.props.searchParams.location,
      animal: this.props.searchParams.animal,
      breed: this.props.searchParams.breed
    }).then((data) => {
      let pets: PetType[];
      if (data.petfinder.pets && data.petfinder.pets.pet) {
        if (Array.isArray(data.petfinder.pets.pet)) {
          pets = data.petfinder.pets.pet;
        } else {
          pets = [data.petfinder.pets.pet];
        }
      } else {
        pets = [];
      }

      this.setState({
        pets
      });
    });
  };

  public render() {
    return (
      <div className="search">
        <SearchBox search={this.search} />
        {this.state.pets.map(pet => {
          let breed;
          if (Array.isArray(pet.breeds.breed)) {
            breed = pet.breeds.breed.join(", ");
          } else {
            breed = pet.breeds.breed;
          }
          return (
            <Pet key={pet.id} id={pet.id} media={pet.media} location={`${pet.contact.city}, ${pet.contact.state}`} animal={pet.animal} name={pet.name} breed={breed} />
          )
        })}
      </div>
    )
  }
}

export default function ResultsWithContext(props: RouteComponentProps) {
  return (
    <Consumer>
      {context => <Results {...props} searchParams={context} />}
    </Consumer>
  );
};
