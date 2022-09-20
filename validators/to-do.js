const { body } = require('express-validator')

const Validators = {

  validateNewToDo: () => {
    return [
      body('title').notEmpty(),
      body('priority').notEmpty().toUpperCase().isIn(['HIGH', 'MEDIUM', 'LOW'])
    ]
  }
}

module.exports = Validators
