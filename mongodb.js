const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/admin")
    .then(() => {
        console.log("mongodb connected");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

const regSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    }
});

const Collection = mongoose.model("upload", regSchema);

module.exports = Collection;
