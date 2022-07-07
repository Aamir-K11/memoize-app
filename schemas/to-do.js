const mongoose = require('mongoose');

const ToDoSchema = new mongoose.Schema({
   
    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        maxLength: 100,
        trim: true
    },

    priority: {
        type: String,
        enum: ['HIGH', 'MEDIUM', 'LOW']
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const ToDo = mongoose.model('ToDo', ToDoSchema);

module.exports = {
    ToDo,
    ToDoSchema
};