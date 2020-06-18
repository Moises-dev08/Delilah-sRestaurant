// LIBRARY
const bcrypt = require('bcryptjs');

// FUNCTIONS

async function hash(password) {
    const salt = await bcrypt.genSalt(10);
    var data;
    const hashResult = await bcrypt.hash(password, salt).then(function (result) {
        data = result;
    });
    return data;
};
async function passwordTest(password, longhash) {
    var data;
    const validation = await bcrypt.compare(password,longhash).then(function (result) {
        data = result;
    });
    return data;   
};
// EXPORT MODULE
module.exports = { passwordTest, hash } 