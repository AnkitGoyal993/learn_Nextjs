import mongoose from 'mongoose'

export async function connect(){
    try {
        mongoose.connect(process.env.MONGODB_URL!)
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log("mongooDB connected successfully")
        })
        connection.on('error',(error)=>{
            console.log("mongooDB connection faild " + error)
            process.exit()
        })
    } catch (error) {
        console.log("error "+error)
    }
}