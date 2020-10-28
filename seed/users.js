const db = require('../db/connection')
const User = require('../models/user')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const faker = require('faker')

const main = async () => {

    //create users
    const users = [...Array(10)].map(user => (
        {
            username: faker.name.firstName(),
            email: faker.internet.email(),
            password: faker.random.uuid(),
        }

    ))

    await User.insertMany(users)
    console.log("Created users!")

    //create login user
    const  user = await User.create({
        username:'marka',
        email:'marca@marca.com',
        password: 'shoonga'
    })

    await user.save

    console.log('created' + User.countDocuments({username:'marka'}))

    User.count({}, function( err, count){
        console.log( "Number of users:", count );
    })



}




const run = async () => {
    await main()
    db.close()
}

run()