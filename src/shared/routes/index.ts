import { Router } from "express";
import { listen } from "../../../socket";
import { main } from "../infra/http/main";


const router = Router();

router.post('/send', (req , res) => {
   const body = req.body
    console.log('body', body)
})

export { router }