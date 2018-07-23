import React from 'react'

const TrailLength = (props) => {
    let trailLength = props.totalLength()
    return (
      <div className='trailStats'> Total length of trails: {trailLength} miles </div>
    )
  }

export default TrailLength