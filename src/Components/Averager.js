import React from 'react';

const Averager = (props) => {
        let newCalc = []
        console.log("ARARY!!!!!!!!!!!", props.arrTrails)
        for (let i = 0; i < props.arrTrails.length; i++) {
            newCalc.push(props.arrTrails[i].ascent)
        }
        let numerator = newCalc.reduce((accumulator, currentValue) => accumulator + currentValue)
        let mean = (numerator / props.arrTrails.length)
    
        return (
            <div>
                <p>Mean Elevation Gain: {mean}</p>
            </div >
        )
    }


export default Averager