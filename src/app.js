import React from 'react';
import { render } from 'react-dom';
import Results from './Results';
import { Router } from "@reach/router";
import Details from './Details';
import SearchParams from './SearchParams';
import pf from 'petfinder-client';
import { Provider } from './SearchContext';
import NavBar from './NavBar';
import { injectGlobal } from 'emotion';

// inject global styles
injectGlobal`
  * {
    box-sizing: border-box;
  }
`;

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class App extends React.Component {
  constructor(props) {
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

  handleLocationChange = event => {
    this.setState({
      location: event.target.value,
    });
  };

  handleAnimalChange = event => {
    this.setState({
      animal: event.target.value,
      breed: "",
      breeds: []
    }, this.getBreads);
  };

  handleBreedChange = event => {
    this.setState({
      breed: event.target.value
    });
  };

  getBreads() {
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

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Provider value={this.state}>
          <Router>
            <Results path="/" />
            <Details path="/details/:id" />
            <SearchParams path="/search-params" />
          </Router>
        </Provider>
      </React.Fragment>
    );
  }
}

render(<App />, document.getElementById("root"));
