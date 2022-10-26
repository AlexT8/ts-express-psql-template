import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const config = process.env

const URI = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASS}@cluster0.sjn9k.mongodb.net/${config.MONGO_DB}?retryWrites=true&w=majority`

export const connectDB = async ()=> {
    try{
        await mongoose.connect(URI)
        console.log('MongoDB connected!')

    }catch(err){
        console.error(err)

        //exit in failure
        process.exit(1)
    }
}