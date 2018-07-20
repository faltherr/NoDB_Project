import React, { Component } from 'react';
import axios from 'axios';

import Favorites from './Favorites'

export default class AllTrails extends Component {
    constructor() {
        super()
        this.state = {
            trailsList: [],
            selected: []
        }
    }

    componentDidMount() {
        axios.get('/api/trails').then(results => {
            // console.log(results)
            // let trails = results.data.map( t => {
            //     return t.results
            // })
            this.setState({ trailsList: results.data })
            console.log(this.state.trailsList)
        })
    }

    handleClick(e){
        this.setState(selected.push(e))
    }

    // handleClick(){
    //     let arr = [];
    //     arr.push(this.trailsList.name)
    //     this.setState({selected: arr})
    // }

    // handleAddFav(fav){
    //     this.setState({selected:[...this.state.selected, fav]})
    // }




    render() {
        let allTrails = this.state.trailsList.map((element, index) => {
            return (
                <h2 key={index}> {element.name} 
                    <p>Trail Length: {element.length} miles</p> 
                    <p>Trail Difficulty: {element.difficulty} </p>  
                </h2>
            )
        })
        return (
            <div className="App" onClick={this.handleClick}>
                {allTrails}
                {/* <Favorites add={this.handleAddFav} /> */}
            </div>
        );
    }
}