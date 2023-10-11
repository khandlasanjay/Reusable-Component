import * as mongoose from "mongoose";

const connectDB = async () => {
    try {
        const mongoURI = process.env.DB_HOST;
        const options: any = {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        await mongoose.connect(mongoURI, options);
        console.log("MongoDB Connected...");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

export default connectDB;