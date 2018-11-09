import React from 'react';
import { render } from 'react-dom';
import { Router } from "@reach/router";
import NavBar from './NavBar';
import { injectGlobal } from 'emotion';
import Loadable from 'react-loadable';
import Results from './Results';
import SearchParams from './SearchParams';
import { Provider } from 'react-redux';
import store from './store';

// inject global styles
injectGlobal`
  * {
    box-sizing: border-box;
  }
`;

// you should only code split if it saves a significant amount of time like 1/2 second +
// code splitting details page. so it only loads the details page when you go to the page
// you could use service workers to load json of additional packages in the background. Parcel can generate the json for you.
const LoadableDetails = Loadable({
  loader: () => import('./Details'),
  loading() {
    return <h1>Loading split out content</h1>;
  }
});

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Provider store={store}>
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
