import React, { Component } from 'react';
import axios from 'axios';

import Favorites from './Favorites'
import TrailCounter from './TrailCounter'

import { ToastContainer, ToastStore } from 'react-toasts';

import TrailLength from './TrailLength'

// import { OpenWeatherMap } from 'react-weather';

// import { WeatherWidget } from 'react-native-weather';

// Failed attempts at functional components
// import OpenWeatherMap from './Weather'
import DeleteButton from './DeleteButton'
// import Averager from './Averager'

// import '../CSS/App.css';

// No idea how to use Toast
// Toast notification dependencies



export default class AllTrails extends Component {
    constructor() {
        super()
        this.state = {
            trailsList: [],
            selected: [],
            trailString: '',
            // toggleBackground: false
            // this.child = React.createRef()
            // isToggleOn: true
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
            // console.log("TRAILS LIST!!!!!!!!!!!!!!!!!!", this.state.trailsList)
        })
    }

    removeTrail = (id) => {
        axios.delete(`/api/trails/${id}`).then(res => {
            // console.log('Trail Removed')
            this.setState({
                trailsList: res.data
            })
        })
        ToastStore.success('Successfully removed trail')
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
        ToastStore.success('Successfully added trail')
    }

    filterByDifficulty = () => {
        let trailDifficulty = this.trailDifficulty.value;
        // console.log(this.trailDifficulty)
        axios.get(`/api/trails/?difficulty=${trailDifficulty}`).then(res => {
            this.setState({
                trailsList: res.data
            })
        })
    }

    //Update Trail Status

    updateTrailStatusFn = (id, trailCondition) => {
        let updateTrailStatus = {
            conditionStatus: trailCondition
        }
        axios.put(`/api/trails/${id}`, updateTrailStatus).then(res => {
            // console.log('Trail updated', updateTrailStatus)
            this.setState({
                trailsList: res.data
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

    //Reset the state of the selected items to an empty array

    resetHoldStateList(favs) {
        this.setState({ selected: [] })

        // console.log("resetting state")
        // console.log("passed param", favs)
    }

    trailCount = () => {
        return this.state.trailsList.length
        // console.log('222222222222222222', this.state.trailsList)
    }

    // trailAverageElevation = () =>{

    // }

    //Why does this not work? I can't get the value on state of the trails list...

    trailLength = () => {
        let newCalc = [];
        let arr = this.state.trailsList;
        // console.log("1111111111111111111",arr)
        for (let i = 0; i < arr.length; i++) {
            newCalc.push(+arr[i]['length'])
        }
        // console.log("5555555555", newCalc)
        let sumLength = 0;

        for (let j = 0; j < newCalc.length; j++) {
            sumLength += newCalc[j]
        }
        return parseInt(sumLength, 10)

    }

    render() {
        let allTrails = this.state.trailsList.filter((element, index) => {
            return element.name.toUpperCase().includes(this.state.trailString.toUpperCase());
        }).map((element, index) => {
            return (
                <div key={index} className="eachTrail">
                    <div className='trailsTitleAndPhoto'>
                        <h3 key={index} className='headerChanger' onClick={() => this.clickToSelect(element)} > {element.name} </h3>
                    </div>
                    <div className='splitForPhotos'>
                        <div className='textColumnOnLeft'>
                                <p className='summaryText'> Trail Conditions: {element.conditionStatus}  </p>
                                <p className='summaryText'>Stars:  {element.stars}</p>
                                <p className='summaryText'>Trail Length:  {element.length} miles </p>
                                <p className='summaryText'>Trail Difficulty: {element.difficulty} </p>
                            
                        </div>
                        <img className='photoColumnOnRight' src={element.imgMedium} />
                    </div>
                    <div className='trailSummary'>
                        <div className='summaryBox'>
                        <p> Summary: </p>
                        <p> {element.summary} </p>
                        </div>
                    </div>
                    <div className='statusSplitter'>
                        <div>Do you know the current status of this trail? </div>
                        <div className='trailStatusContainer'>
                            <button className='formClass' onClick={() => { this.updateTrailStatusFn(element.id, 'Closed'); ToastStore.success('Trail is now closed') }}> Trail is Closed </button>
                            <button className='formClass' onClick={() => { this.updateTrailStatusFn(element.id, 'Open'); ToastStore.success('Trail is now open') }}> Trail is Open </button>
                        </div>
                    </div>
                    <div className='trailRemoverContainer'>
                    <div> Has this trail permanently closed? </div>
                    <DeleteButton id={element.id} deleteTrail={this.removeTrail} />
                    </div>
                    {/* {console.log("element", element)} */}
                </div>

            )
        })
        return (
            <div className="App" >
                <div className="topBar"> 
                <h1 className='titleText'  > Salt Lake Trail Directory</h1> </div>
                <div className="mainContent">
                    <div className='trailsMainContainer'>
                        <div className='header'>
                            <input placeholder='Search by name' className='formClass' value={this.state.trailString} onChange={(e) => this.handleChange(e.target.value)}></input>
                            <button className='formClass' onClick={() => { this.clickSearch(this.state.trailString) }}> Search </button>
                            {/* This is a filter with options for difficulty */}
                            <select className='formClass' ref={trailDifficulty => {
                                this.trailDifficulty = trailDifficulty;
                            }} onChange={this.filterByDifficulty}
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
                            {/* <StarFilter className='starFilter' trails={this.state.trailsList} /> */}
                        </div>
                        <div className='trails'>
                            {allTrails}
                        </div>
                        <div className='trailStatsContainer'>
                        <TrailCounter totalTrails={this.trailCount} />
                        <TrailLength totalLength={this.trailLength} />
                        </div>
                        {/* <Averager  arrTrails={this.state.trailsList}/> */}
                    </div>
                    <div className="favoritesMainContainer">
                        <Favorites holdStateList={this.state.selected} reset={this.resetHoldStateList} />
                    </div>
                </div>
                <br></br>
                <br></br>
                <div className='newTrailFormContainer'>
                <p className='trailStats'> Do you know of a trail we don't have in our list? Add it here! </p>
                {/* New Trail Form  */}
                <p className="form-wrap">
                    <input
                        className="btn-sp"
                        placeholder="Trail Name"
                        ref={name => {
                            this.name = name;
                        }}
                    />
                    <input
                        className="btn-sp"
                        placeholder="Trail Condition"
                        ref={conditionStatus => {
                            this.conditionStatus = conditionStatus;
                        }}
                    />
                    <input
                        type="number"
                        className="btn-sp"
                        placeholder="Stars"
                        ref={stars => {
                            this.stars = stars;
                        }}
                    />
                    <input
                        type="number"
                        className="btn-sp"
                        placeholder="Length (miles)"
                        ref={length => {
                            this.length = length;
                        }}
                    />
                    <input
                        className="btn-sp"
                        placeholder="Difficulty"
                        ref={difficulty => {
                            this.difficulty = difficulty;
                        }}
                    />
                    <input
                        className="btn-sp"
                        placeholder="Summary"
                        ref={summary => {
                            this.summary = summary;
                        }}
                    />

                    <button className="btn-sp btn" onClick={this.addTrail}>
                        Add a trail
            </button>
                </p>
                </div>
                {/* <WeatherWidget api={"35762496bb47b7a6a5f448e76975d31f"} lat={"40.76078"} lng={"-111.891052"}/> */}
                {/* <OpenWeatherMap city="Salt Lake City" country="US" appid="c3aec212608b77670a41f13a3813ff32"  /> */}
                <ToastContainer store={ToastStore} />
            </div>
        );
    }
}
