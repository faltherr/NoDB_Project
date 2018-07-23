import React from 'react';

export default class StarsFilter extends React.Component {
  filterByStars(arrTrail) {
    let { stars } = this.arrTrail;
    let oneStar = []
    let twoStar = []
    let threeStar = []
    let fourStar = []
    for (let i = 0; i < this.arrTrail.length; i++) {
      if (stars >= 0 && stars < 2) {
        oneStar.push(this.arrTrail[i])
        this.setState({arrTrail : oneStar})
      } else if (stars >= 2 && stars < 3) {
        twoStar.push(this.arrTrail[i])
        this.setState({arrTrail : twoStar})
      } else if (stars >= 3 && stars < 4) {
        threeStar.push(this.arrTrail[i])
        this.setState({arrTrail : threeStar})
      } else {
        fourStar.push(this.arrTrail[i])
        this.setState({arrTrail : fourStar})
      }
    }

  }
    render(){
      return (
        <select ref={trailStars=> {
          this.trailStars = trailStars;
        }} onChange={this.filterByStars}
          className="btn-sp"
          value="">
          <option value="" disabled>
            Filter by Stars
          </option>
          <option value="oneStar">Less than 2 stars</option>
          <option value="twoStar">2 to 3 stars</option>
          <option value="threeStar">3 to 4 stars</option>
          <option value="fourStar">More than 4 stars</option>
        </select>
      )
    }
  }