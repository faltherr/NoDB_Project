let trails = require('../trailsData.js')

module.exports = {
    // Read
    readTrails: (req, res) => {
        res.status(200).send(trails);
    },
    //Create
    createTrails: (req, res) => {
        // Find max id from the array of objects
        let idMaxArr = []
        for(let i=0; i<trails.length; i++){
            idMaxArr.push(trails[i].id)
        } 
        let id = idMaxArr.reduce(function(a,b){
            return Math.max(a,b)
        })
        id++ 
        let {name, type, summary, difficulty, stars, location, length, longitude, latitude, conditionStatus} = req.body
        let newTrail = {...req.body, id}
        trails.push(newTrail)
        res.status(200).send(trails)
    },
    //Update
    updateTrails: (req, res) => {
        let {id} = req.params;

        let index = trails.findIndex(t => {
            return t.id === Number(id)
        })

        // Method #2 if confused
        // let index = -1
        // for(let i=0 ; i<trails.length; i++){
        //     if(trails[i].id === Number(id)){
        //         index = i
        //     }
        // }

        // if (index >=0){
        //     trails[index] ={...trails[index], ...req.body}
        // }

        trails[index] ={...trails[index], ...req.body}

        res.status(200).send(trails)
    },

    //Delete

    deleteTrails : (req, res) => {
        let {id} = req.params;
        let index = trails.findIndex(t => t.id === Number(req.params.id));
        
        trails.splice(index, 1)

        res.status(200).send(trails)
    }
    

}