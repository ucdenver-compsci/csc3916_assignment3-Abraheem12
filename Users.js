var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

mongoose.Promise = global.Promise;

// Connect to the MongoDB database
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Error connecting to MongoDB:", err));

mongoose.set('useCreateIndex', true);

// Define user schema
var UserSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false }
});

// Hash the password before saving to the database
UserSchema.pre('save', async function(next) {
    try {
        if (!this.isModified('password')) return next();

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        return false;
    }
};

// Return the model to the server
module.exports = mongoose.model('User', UserSchema);
