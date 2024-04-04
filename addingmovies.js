const mongoose = require("mongoose");
const MovieModel = require("./Movies"); 
require("dotenv").config();

mongoose.Promise = global.Promise;

mongoose.set("strictQuery", false);
mongoose.set("useFindAndModify", false);


mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(() => {
    console.log("Database successfully connected");
    addmovies().then(() => {
        console.log("Movie database populated successfully");
        mongoose.connection.close(() => {
            console.log("Mongoose connection closed");
        });
    });
}).catch((connectionError) => {
    console.error("Connection error:", connectionError);
});

mongoose.set("useCreateIndex", true);

async function addmovies() {
    try {
        await MovieModel.deleteMany({});
        console.log("Database cleared successfully");

        console.log("Starting to populate the database with movies...");
        
        // Assuming movie instances are created and they have been saved

    } catch (populationError) {
        console.error("Error populating the database:", populationError);
    }
}


  const dieHard = new MovieModel({
    title: "Die Hard",
    releaseDate: "July 15, 1988",
    genre: "Action",
    actors: [
      { actorName: "Bruce Willis", characterName: "John McClane" },
      { actorName: "Alan Rickman", characterName: "Hans Gruber" },
      { actorName: "Bonnie Bedelia", characterName: "Holly Gennero McClane" },
    ],
});
const rocky = new MovieModel({
    title: "Rocky",
    releaseDate: "November 21, 1976",
    genre: "Drama",
    actors: [
      { actorName: "Sylvester Stallone", characterName: "Rocky Balboa" },
      { actorName: "Talia Shire", characterName: "Adrian" },
      { actorName: "Burt Young", characterName: "Paulie" },
    ],
});
const spiderMan = new MovieModel({
    title: "Spider-Man",
    releaseDate: "May 3, 2002",
    genre: "Action",
    actors: [
      { actorName: "Tobey Maguire", characterName: "Peter Parker / Spider-Man" },
      { actorName: "Kirsten Dunst", characterName: "Mary Jane Watson" },
      { actorName: "Willem Dafoe", characterName: "Norman Osborn / Green Goblin" },
    ],
});
const theHangover = new MovieModel({
    title: "The Hangover",
    releaseDate: "June 5, 2009",
    genre: "Comedy",
    actors: [
      { actorName: "Bradley Cooper", characterName: "Phil Wenneck" },
      { actorName: "Ed Helms", characterName: "Stu Price" },
      { actorName: "Zach Galifianakis", characterName: "Alan Garner" },
    ],
});
const fridayThe13th = new MovieModel({
    title: "Friday the 13th",
    releaseDate: "May 9, 1980",
    genre: "Horror",
    actors: [
      { actorName: "Betsy Palmer", characterName: "Pamela Voorhees" },
      { actorName: "Adrienne King", characterName: "Alice Hardy" },
      { actorName: "Kevin Bacon", characterName: "Jack Burrell" },
    ],
});


  // Save the movies to the database
await dieHard.save();
await rocky.save();
await spiderMan.save();
await theHangover.save();
await fridayThe13th.save();



populateMovieDB().then(() => {
  mongoose.connection.close();
});
