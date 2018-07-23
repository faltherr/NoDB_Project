import React from 'react'

function DeleteButton(props) {
    return (
        <button onClick={() => props.deleteTrail(props.id)} className='trailDeleteBtn'>Remove Trail</button>
    )
}

export default DeleteButton