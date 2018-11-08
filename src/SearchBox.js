import React from 'react';
import { ANIMALS } from 'petfinder-client';
import { Consumer } from './SearchContext';

class SearchBox extends React.Component {
  handleFormSubmit = (event) => {
    event.preventDefault();
    this.props.search();
  }

  render() {
    return (
      <Consumer>
        {context => (
          <div className="search-params">
            <form onSubmit={this.handleFormSubmit}>
              <label htmlFor="location">
                Location
                <input
                  id="location"
                  value={context.location}
                  placeholder="Location"
                  onChange={context.handleLocationChange}
                />
              </label>

              <label htmlFor="animals">
                  Animals
                  <select
                    id="animals"
                    value={context.animal}
                    onChange={context.handleAnimalChange}
                    onBlur={context.handleAnimalChange}
                  >
                    <option>All</option>
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
                    value={context.breed}
                    onChange={context.handleBreedChange}
                    onBlur={context.handleBreedChange}
                    disabled={!context.breeds.length}
                  >
                    <option>All</option>
                    {
                      context.breeds.map(breed => (
                        <option key={breed} value={breed}>{breed}</option>
                      ))
                    }
                  </select>
              </label>
              <button>Submit</button>
            </form>
          </div>
        )}
      </Consumer>
    )
  }
}

export default SearchBox;
