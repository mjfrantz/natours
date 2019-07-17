const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');


dotenv.config({
    path: './config.env'
});

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('DB connection successsful'));

//READ JSON file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

//Import data into database 
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data successsfully loaded!');
    } catch (err) {
        console.log(err)
    }
    process.exit();
};

// Delete all data from Collection
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data successsfully deleted!');
    } catch (err) {
        console.log(err)
    }
    process.exit();
};

if (process.argv[2] === '--import') {
    importData()
} else if (process.argv[2] === '--delete') {
    deleteData();
}