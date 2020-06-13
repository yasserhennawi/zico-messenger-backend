import express from 'express';
import TestModel from '../models/test';

let router = express.Router()

router.get("/", (req, res) => {
    TestModel.find({}, (err, tests) => {
        res.send(JSON.stringify(tests));
    });
})

router.post("/", (req, res) => {
    try {
        const { testField } = req.body;
        const test = new TestModel({ testField })
        test.save();
        res.send(test)
    } catch (error) {
        console.log("Adding a Test failed with: ", error)
    }
})

export default router