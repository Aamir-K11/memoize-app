const bcrypt = require('bcrypt');

const PasswordHashHook = function(schema) 
{
    schema.pre('save', async function() {

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(this.password, saltRounds);
        this.password = hashedPassword;
    });
}

module.exports = PasswordHashHook;