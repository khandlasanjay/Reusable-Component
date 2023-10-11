const mongoose = require('mongoose');

/**
 * Checks if given ID is good for MongoDB
 * @param {string} id - id to check
*/
const isIDGood = async (id = '') => {
    return new Promise((resolve, _reject) => {
      const goodID =  new mongoose.Types.ObjectId(id.toString());
      resolve(goodID);
    })
}

module.exports = isIDGood;