const User = require('./UserSchema')

const insertUser = (userObj) =>{
    const user = new User(userObj);
    return user.save()
    .then(data =>{
        console.log("User inserted:", data);
        return data;
    }).catch(error  =>{
        console.error("Insert failed:", error.message);
        throw error;
    })
}

module.exports = {
    insertUser,
}