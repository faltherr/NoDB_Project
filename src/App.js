import React, { Component } from 'react';

import './CSS/main.css';

import AllTrails from './Components/AllTrails'
// import Favorites from './Components/Favorites'

class App extends Component {
  render() {
    return (
      <div className='allTrailsMain'>
        <div>
          <AllTrails />
          {/* <Favorites /> */}
        </div>
      </div>
    );
  }
}

export default App;
