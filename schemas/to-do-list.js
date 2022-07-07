const mongoose = require('mongoose');
const {ToDoSchema} = require('../schemas/to-do');

const ToDoListSchema = mongoose.Schema({
    
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    todos: {
        type: [ToDoSchema],
        default: []
    }

});