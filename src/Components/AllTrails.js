import React, { Component } from 'react';
import axios from 'axios';

// import Favorites from './Favorites'

export default class AllTrails extends Component {
    constructor() {
        super()
        this.state = {
            trailsList: [],
            selected: [],
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

    //Click to select an item and update the state of the select object
    
    clickToSelect = (e) => {
        let select = this.state.selected;
        select.push(e)
        console.log(select)
        this.setState({selected:select})
        console.log(this.state.selected)
        }


    render() {
        let allTrails = this.state.trailsList.map((element, index) => {
            return (
                <div> 
                    <h3 key={index} onClick = {() => this.clickToSelect(element)}> {element.name}   </h3>
                    {/* <p>Trail Length: {element.length} miles</p> 
                    <p>Trail Difficulty: {element.difficulty} </p>   */}
                    
                </div>
                
            )
        })
        return (
            <div className="App" >
                <input placeholder='Search by name' onChange ={ (e) => this.handleChange(e.target.value) }></input>
                <button onClick = { () => {this.clickSearch(this.state.trailString)}}> Search </button>
                {allTrails} 

               
            </div>
        );
    }
}

// onClick = {this.clickSearch(this.state.trailString)}

// To access an element anywhere in our script:
// ref={(a) => this._inputElement = a}