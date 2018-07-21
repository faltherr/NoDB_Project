import React, { Component } from 'react';
import axios from 'axios';

// import Favorites from './Favorites'

export default class AllTrails extends Component {
    constructor() {
        super()
        this.state = {
            trailsList: [],
            searched: [],
            trailString: ''
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

    // Filter Search Bar
    handleChange = (trail) => {
        this.setState({trailString:trail})
    }

    clickSearch = (trail) => {
        var unfiltered = this.state.trailsList;
        var search = [];
        for (let i = 0; i<unfiltered.length; i++){
            if (unfiltered[i].name.indexOf(trail)>-1){
                search.push(unfiltered[i])
            }
        }
        this.setState({trailsList:search})
    }

    // handleClick(e){
    //     console.log(e)
        // this.setState(selected.push(e))
    // }

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
                <h2 key={index} > {element.name} 
                    {/* <p>Trail Length: {element.length} miles</p> 
                    <p>Trail Difficulty: {element.difficulty} </p>   */}
                </h2>
            )
        })
        return (
            <div className="App" >
                <input onChange ={ (e) => this.handleChange(e.target.value) }></input>
                <button onClick = { () => {this.clickSearch(this.state.trailString)}}> Search </button>
                {allTrails}

               
            </div>
        );
    }
}

// onClick = {this.clickSearch(this.state.trailString)}