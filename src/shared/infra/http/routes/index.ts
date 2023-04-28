import { Router } from "express";


const router = Router();

router.post('/send', (req , res) => {
   const body = req.body
    console.log('body', body)
})

export { router }