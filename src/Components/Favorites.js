import React, { Component } from "react";



export default class Favorites extends Component {
    constructor() {
        super()
        this.state = {
            favorites: []
        }
    }

    //Compare array to see it the values are contained in the passed in array
    // comparer = (otherArray) => {
    //     return function(current){
    //       return otherArray.filter(function(other){
    //         return other.value == current.value && other.display == current.display
    //       }).length == 0;
    //     }
    //   }


    // compare two arrays for any difference
    // diff = (a)  => {
    //     return this.filter(function(i) {return a.indexOf(i) < 0;});
    // };

    handleAdd = () => {
        let uniqueFavs = this.props.holdStateList.filter(element => !this.state.favorites.includes(element));
        uniqueFavs.map((obj) => this.state.favorites.push(obj))
        this.props.reset(this.state.favorites)
        // console.log("favorites state", this.state.favorites)

        // let favs = this.state.favorites;
        // let int = this.props.holdStateList
        // console.log("int", int)
        // console.log("favs", favs)

        // let newArr = int.diff(favs)
        // console.log(newArr)

        // diff = function(a) {
        //     return this.filter(function(i) {return a.indexOf(i) < 0;});
        // };

        // for (let i = 0; i<favs.length; i++){
        //     for (let j=0; j<this.props.holdStatelist; j++){
        //         fav[i].id !== this.props.holdStatelist[j].id
        //     }
        // }


        // console.log(this.props.holdStateList)
        // let favs = this.state.favorites
        // let {holdStateList} = this.props

        // let favCompare = favs.filter(this.comparer(holdStateList))
        // console.log(favCompare)
        // let hSCompare = holdStateList.filter(this.comparer(favs))
        // console.log(hSCompare)

        // let filteredArr = holdStateList.filter(function(item){
        //     return favs.indexOf(item.id) === -1;
        //   });
        //   console.log(filteredArr)


        // for (let i =0; i<holdStateList.length; i++){

        //     if (holdStateList[i].id === favs)
        //     favs.push(holdStateList[i])
        // }

        // this.setState({holdStateList: []})
        // console.log("Imtermediate list", this.props.holdStateList)


        // this.setState({ favorites:hSCompare})
        // console.log("Favorites", this.state.favorites)
    }

    render() {
        let favoritesList = this.state.favorites.map((element, index) => {
            return (
                <div key={index} >
                    <h2 key={index}> {element.name} </h2>
                </div>
            )
        })
        return (
            <div className='favoritesSubMainContainer'>
                <div className='favsButtonHolder'>
                    <button className='addToFavoritesButton' onClick={() => this.handleAdd()}>Add to Favorites</button>
                </div>
                <div className ='favsTitle'> My Favorite Hikes </div>
                <div className='favsList'> 
                {favoritesList}
                </div>
            </div>
        )
    }



}



