const mongoose = require('mongoose');

const upload = mongoose.model('Upload', {
    image:{
        type: String
    }
})
module.exports = upload;