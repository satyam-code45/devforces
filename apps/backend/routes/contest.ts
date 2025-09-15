import { Router } from "express";
import { userMiddleware } from "../middleware/user";

const router = Router()


//https://api.devforces.com/contest?offset=10&page=20
router.get("/active",(req,res) => {
    const {offset,page} = req.query;
})

router.get("/finished",(req,res) => {
     const {offset,page} = req.query;
})

//return all the sub challenges and their start times
router.get("/:contestId",userMiddleware,(req,res) => {
    const contestId = req.params.contestId
})

router.get("/:contestId/:challengeId",userMiddleware,(req,res) => {
    const contestId = req.params.contestId
})

router.get("/leaderboard/:contestId", (req,res) => {

})

router.post("/submit/:challengeId", userMiddleware,(req,res) =>{
    //have rate limiting
    //max 20 submission per problem
    //forward the request to GPT
    //store the response to sorted set and then to DB
})

export default router