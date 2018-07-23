import React, { Component } from 'react';

function WeatherWidget (props){
    render(){
        return(
            <div>
                </div>
        )
    }

}














// import axios from 'axios';

// import { OpenWeatherMap } from 'react-weather';


// export default class OpenWeatherMap1 extends Component {
//     constructor() {
//         super()
//         this.state = {
//             weather: []
//         }
//     }

//     //Current Weather 
//     componentDidMount() {
//         axios.get(`http://api.openweathermap.org/data/2.5/weather?id=${this.props.id}&APPID=c3aec212608b77670a41f13a3813ff32`).then(results => {
//             console.log('WEATHER Curent!!!!!!!!!!!!!!!!', results.data)
//             this.setState({ weather: results.data })
//         })
//     }

//     //Weather Forecast
//     componentDidMount() {
//         axios.get(`http://api.openweathermap.org/data/2.5/forecast?id=${this.props.id}&APPID=c3aec212608b77670a41f13a3813ff32`).then(results => {
//             console.log('WEATHER Forecast!!!!!!!!!!!!!!!!', results)
//             this.setState({ weather: results.data })
//         })
//     }

//     render() {
//         return (<div></div>)
//     }
// }