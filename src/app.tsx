import React from 'react';
import { render } from 'react-dom';
import { Router } from "@reach/router";
import pf from 'petfinder-client';
import { Provider } from './SearchContext';
import NavBar from './NavBar';
import Loadable from 'react-loadable';
import Results from './Results';
import SearchParams from './SearchParams';

if (!process.env.API_KEY || !process.env.API_SECRET) {
  throw new Error("No API KEY");
}

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

interface State {
  location: string;
  animal: string;
  breed: string;
  breeds: string[];
  handleAnimalChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleBreedChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleLocationChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  getBreeds: () => void;
}


// you should only code split if it saves a significant amount of time like 1/2 second +
// code splitting details page. so it only loads the details page when you go to the page
// you could use service workers to load json of additional packages in the background. Parcel can generate the json for you.
const LoadableDetails = Loadable({
  loader: () => import('./Details'),
  loading() {
    return <h1>Loading split out content</h1>;
  }
});

class App extends React.Component<{}, State> {
  public constructor(props: {}) {
    super(props);

    this.state = {
      location: "Denver, CO",
      animal: "",
      breed: "",
      breeds: [],
      handleAnimalChange: this.handleAnimalChange,
      handleBreedChange: this.handleBreedChange,
      handleLocationChange: this.handleLocationChange,
      getBreeds: this.getBreeds
    }
  }

  public handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      location: event.target.value,
    });
  };

  public handleAnimalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      animal: event.target.value,
      breed: "",
      breeds: []
    }, this.getBreeds);
  };

  public handleBreedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      breed: event.target.value
    });
  };

  public getBreeds() {
    if (this.state.animal) {
      petfinder.breed.list({
        animal: this.state.animal
      }).then(data => {
        if (
          data.petfinder &&
          data.petfinder.breeds &&
          Array.isArray(data.petfinder.breeds.breed)
        ) {
          this.setState({
            breeds: data.petfinder.breeds.breed
          });
        }
      })
    } else {
      this.setState({
        breeds: []
      });
    }
  }

  public render() {
    return (
      <React.Fragment>
        <NavBar />
        <Provider value={this.state}>
          <Router>
            <Results path="/" />
            <LoadableDetails path="/details/:id" />
            <SearchParams path="/search-params" />
          </Router>
        </Provider>
      </React.Fragment>
    );
  }
}

render(<App />, document.getElementById("root"));
