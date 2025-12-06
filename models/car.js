const mongoose =require('mongoose')
const { type } = require('os')


const carsSchema = new mongoose.Schema ({

    model :{
        type: String,
        require: true
    },

    brand: {
        type: String,
        require: true
    },
    specs: {
        type: String
    },
    rating: {
        
        type: String,
        enum:['bad','good','verygood','excellent'],
        default: 'good'
    },
    imageurl: {

       type: String
    }
    
})

const Cars = mongoose.model('Cars',carsSchema)

module.exports = Cars