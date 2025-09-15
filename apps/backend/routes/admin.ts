import {Router } from "express"
import { adminMiddleware } from "../middleware/admin"


const router = Router()

router.post("/contest",adminMiddleware,(req,res)=>{

})

router.post("/challenge",adminMiddleware,(req,res)=>{
    
})

router.post("/link/:challengeId/:contestId",adminMiddleware,(req,res)=>{
    
})

router.delete("/link/:challengeId/:contestId",adminMiddleware,(req,res)=>{
    
})

export default router
