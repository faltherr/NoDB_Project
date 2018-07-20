import React, { Component } from "react";

export default class Favorites extends Component {
    constructor() {
        super()
        this.state = {
            favorites : []
        }
    }

    // handleAdd(){
    //     this.props.add(this.state.favorites)
    // }


    render(){
        return(
            <div>
                {/* <button onClick = {(this.handleAdd)}> Add </button> */}
            </div>
        )
    }

    

}

