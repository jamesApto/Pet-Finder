import React from 'react';
import { ANIMALS } from 'petfinder-client';
import { connect } from 'react-redux';
import getBreeds from './actionCreators/getBreeds';
import changeBreed from './actionCreators/changeBreed';
import changeAnimal from './actionCreators/changeAnimal';
import changeLocation from './actionCreators/changeLocation';

class SearchBox extends React.Component {
  handleFormSubmit = (event) => {
    event.preventDefault();
    this.props.search();
  }

  render() {
    return (
      <div className="search-params">
        <form onSubmit={this.handleFormSubmit}>
          <label htmlFor="location">
            Location
            <input
              id="location"
              value={this.props.location}
              placeholder="Location"
              onChange={this.props.handleLocationChange}
            />
          </label>

          <label htmlFor="animals">
              Animals
              <select
                id="animals"
                value={this.props.animal}
                onChange={this.props.handleAnimalChange}
                onBlur={this.props.handleAnimalChange}
              >
                <option key="all" value="">All</option>
                {
                  ANIMALS.map(animal => (
                    <option key={animal} value={animal}>{animal}</option>
                  ))
                }
              </select>
          </label>

          <label htmlFor="breeds">
              Breed
              <select
                id="breeds"
                value={this.props.breed}
                onChange={this.props.handleBreedChange}
                onBlur={this.props.handleBreedChange}
                disabled={!this.props.breeds.length}
              >
                <option key="all" value="">All</option>
                {
                  this.props.breeds.map(breed => (
                    <option key={breed} value={breed}>{breed}</option>
                  ))
                }
              </select>
          </label>
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

// pull data out of redux and inject into component
const mapStateToProps = ({ breed, breeds, animal, location }) => ({
  breed,
  breeds,
  animal,
  location
});

// map functions
const mapDispatchToProps = (dispatch) => ({
  handleAnimalChange(event) {
    dispatch(changeAnimal(event.target.value));
    dispatch(getBreeds());
  },
  handleBreedChange(event) {
    dispatch(changeBreed(event.target.value));
  },
  handleLocationChange(event) {
    dispatch(changeLocation(event.target.value));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBox);
