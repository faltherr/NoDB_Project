import React from 'react';

export default class difficultySlider extends React.Component {
  filterByDifficulty(){
    let difficulty = this.state.difficulty;

    axios.get(`/api/data/?difficulty=${difficulty}`).then(res => {
      this.setState({
        trailsList:res.data
    })
  }
    render() {
      return (
      )
    }
  }