const express = require("express");
const router = express.Router();

const { addToWaitinglist } = require("../model/waitinglist");

/* GET users listing. */
router.get("/", (res) => {
  res.send("respond with a resource");
});

router.post("/waitinglist", (req, res) => {
  addToWaitinglist(req.body, (error, result) => {
    if (error) {
      return res.status(400).send({ result: "fail", message: error.message });
    } 
    return res.send(result);
  });
});
module.exports = router;
