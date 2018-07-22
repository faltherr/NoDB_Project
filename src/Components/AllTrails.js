import React, { Component } from 'react';
import axios from 'axios';

import Favorites from './Favorites'
// import '../CSS/App.css';

// Toast notification dependencies
// import { ToastContainer, toast } from '../react-toastify';


export default class AllTrails extends Component {
    constructor() {
        super()
        this.state = {
            trailsList: [],
            selected: [],
            trailString: '',
            isToggleOn: true
        }

        this.resetHoldStateList = this.resetHoldStateList.bind(this)
    }

    componentDidMount() {
        axios.get('/api/trails').then(results => {
            // console.log(results)
            // let trails = results.data.map( t => {
            //     return t.results
            // })
            this.setState({ trailsList: results.data })
            // console.log(this.state.trailsList)
        })
    }

    // Can I make this a functional component?
    removeTrail(id) {
        axios.delete(`/api/trails/${id}`).then(res => {
            // console.log('Trail Removed')
            this.setState({
                trailsList: res.data
            })
        })
    }

    addTrail = () => {
        let newTrail = {
            name: this.name.value,
            conditionStatus: this.conditionStatus.value,
            stars: this.stars.value,
            length: this.length.value,
            difficulty: this.difficulty.value,
            summary: this.summary.value
        }
        axios.post('/api/trails/', newTrail).then(res => {
            console.log('Trail Added')
            this.setState({
                trailsList: res.data
            })
        })
    }

    filterByDifficulty = () => {
        let trailDifficulty = this.trailDifficulty.value;
        // console.log(this.trailDifficulty)
        axios.get(`/api/trails/?difficulty=${trailDifficulty}`).then(res => {
          this.setState({
            trailsList:res.data
        })
      })
    }

    updateTrailStatusFn = (id, trailCondition) => {
        let updateTrailStatus ={
            conditionStatus : trailCondition
        }
        axios.put(`/api/trails/${id}`, updateTrailStatus).then(res => {
            console.log('Trail updated', updateTrailStatus)
            this.setState({
                trailsList : res.data
            })
        })
    }

    // Filter Search Bar
    handleChange = (trail) => {
        this.setState({ trailString: trail })
    }

    clickSearch = (trail) => {
        var unfiltered = this.state.trailsList;
        var search = [];
        for (let i = 0; i < unfiltered.length; i++) {
            if (unfiltered[i].name.indexOf(trail) > -1) {
                search.push(unfiltered[i])
            }
        }
        this.setState({ trailsList: search })
    }

    //Click to select an item and update the state of the select object

    clickToSelect = (e) => {
        let select = this.state.selected;
        select.push(e)
        // console.log(select)
        this.setState({ selected: select })
        // console.log(this.state.selected)
    }


    resetHoldStateList(favs) {
        this.setState({ selected: [] })

        // console.log("resetting state")
        // console.log("passed param", favs)
    }


    render() {
        let allTrails = this.state.trailsList.filter((element, index) => {
            return element.name.toUpperCase().includes(this.state.trailString.toUpperCase());
        }).map((element, index) => {
            return (
                <div key={index} className="eachTrail">
                    <div className='trailsTitleAndPhoto'>
                        <h3 key={index} onClick={() => this.clickToSelect(element)}> {element.name}   </h3>
                    </div>
                    <div className="trailsConditionStar">
                        <p> Trail Conditions: {element.conditionStatus} Stars (Out of 5): {element.stars}</p>
                    </div>
                    <div className='trailLengthDifficulty'>
                        <p>Trail Length: {element.length} miles Trail Difficulty: {element.difficulty} </p>
                    </div>
                    <div className='trailSummary'>
                        <p> Summary: </p>
                        <p> {element.summary} </p>
                    </div>
                    {/* Update trail status */}
                    <button className ='closeTrail' onClick={() => this.updateTrailStatusFn(element.id, 'Closed')}> Trail is Closed </button>
                    <button className ='closeTrail' onClick={() => this.updateTrailStatusFn(element.id, 'Open')}> Trail is Open </button>
                    <button className="btnDelete" onClick={() => this.removeTrail(element.id)}>
                        Delete Trail
                    </button>
                </div>
            )
        })
        return (
            <div className="App" >
                <div className="topBar"></div>
                <div className="mainContent">
                    <div className='trailsMainContainer'>
                        <div className='header'>
                            <input placeholder='Search by name' value={this.state.trailString} onChange={(e) => this.handleChange(e.target.value)}></input>
                            <button onClick={() => { this.clickSearch(this.state.trailString) }}> Search </button>
                            {/* This is a filter with options for difficulty */}
                            <select ref={trailDifficulty => {
                                    this.trailDifficulty = trailDifficulty;
                                    }}onChange={this.filterByDifficulty}
                                className="btn-sp"
                                value="">
                                <option value="" disabled>
                                    Filter by Difficulty
                                </option>
                                <option value="green">Easy</option>
                                <option value="greenBlue">Easy plus</option>
                                <option value="blue">Intermediate</option>
                                <option value="blueBlack">Intermediate plus</option>
                                <option value="black">Difficult</option>
                                <option value="dblack">Difficult plus</option>
                            </select>
                        </div>
                        <div className='trails'>
                            {allTrails}
                        </div>
                    </div>
                    <div className="favoritesMainContainer">
                        <Favorites holdStateList={this.state.selected} reset={this.resetHoldStateList} />
                    </div>
                </div>
                <br></br>
                <p> Do you know of a trail we don't have in our list? Add it here! </p>
                {/* New Trail Form  */}
                <p className="form-wrap">
                    <input
                        className="btn-sp"
                        placeholder="name"
                        ref={name => {
                            this.name = name;
                        }}
                    />
                    <input
                        className="btn-sp"
                        placeholder="trailCondition"
                        ref={conditionStatus => {
                            this.conditionStatus = conditionStatus;
                        }}
                    />
                    <input
                        type="number"
                        className="btn-sp"
                        placeholder="stars"
                        ref={stars => {
                            this.stars = stars;
                        }}
                    />
                    <input
                        type="number"
                        className="btn-sp"
                        placeholder="length"
                        ref={length => {
                            this.length = length;
                        }}
                    />
                    <input
                        className="btn-sp"
                        placeholder="difficulty"
                        ref={difficulty => {
                            this.difficulty = difficulty;
                        }}
                    />
                    <input
                        className="btn-sp"
                        placeholder="summary"
                        ref={summary => {
                            this.summary = summary;
                        }}
                    />

                    <button className="btn-sp btn" onClick={this.addTrail}>
                        Add a trail
            </button>
                </p>

            </div>
        );
    }
}

// onClick = {this.clickSearch(this.state.trailString)}

// To access an element anywhere in our script:
// ref={(a) => this._inputElement = a}