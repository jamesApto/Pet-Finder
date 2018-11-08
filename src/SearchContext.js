import React from 'react';

const SearchContext = React.createContext({
    location: "Denver, CO",
    animal: "",
    breed: "",
    breeds: [],

    handleAnimalChange() {},
    handleBreedChange() {},
    handleLocationChange() {},
    getBreeds() {}
});

export const Provider = SearchContext.Provider;
export const Consumer = SearchContext.Consumer;
