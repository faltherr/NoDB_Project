import React from 'react'

const TrailCounter = (props) => {
    let trailNumber = props.totalTrails()
    return (
      <div className='trailStats'> Total trails: {trailNumber} </div>
    )
  }

export default TrailCounter