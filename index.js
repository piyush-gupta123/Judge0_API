import Express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes.js";
import verifyToken from "./verifyToken.js"

mongoose.set("strictQuery", true);

const app = Express();

dotenv.config();
app.use(Express.json());
app.use('/user',userRouter);
const PORT = process.env.PORT || 5000;

app.get('/welcome',verifyToken,(req,res)=>{
  return res.status(200).json({Message: "Welcome User!!"})
})

mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Mongo DB is connected and Server is running at ${PORT}`);
    })
  )
  .catch((err) => console.log(err));
