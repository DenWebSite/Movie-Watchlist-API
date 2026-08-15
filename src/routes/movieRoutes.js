import express from 'express';

const router = express.Router();

router.get("/", (req,res) => {
    res.json({message: 'get'});
})

router.post("", (req,res) => {
    res.json({message: 'post'});
})

export default router;