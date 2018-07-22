import React, { Component } from 'react';

import './App.css';

import AllTrails from './Components/AllTrails'
// import Favorites from './Components/Favorites'

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <AllTrails />
          {/* <Favorites /> */}
        </div>
      </div>
    );
  }
}

export default App;
