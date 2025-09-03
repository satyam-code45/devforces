import express from "express"
import userRouter from "./routes/user"
import adminRouter from "./routes/admin"
import contestRouter from "./routes/contest"

const app = express();

app.use("/user",userRouter)
app.use("/admin",adminRouter)
app.use("/contest",contestRouter)

app.listen(process.env.PORT  ||3000)