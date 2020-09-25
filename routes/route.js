const express = require("express");
const router = express.Router();
const members = require("../members");
router.get("/", (req, res) => res.json(members));
router.get("/:id", (req, res) => {
  const found = members.some((elem) => elem.id == parseInt(req.params.id));
  if (found) {
    res.json(members.filter((elem) => elem.id == parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: "some thing is wrong" });
  }
});
router.post("/", (req, res) => {
  const newMember = {
    id: Math.floor(Math.random() * 1000),
    name: req.body.name,
    age: req.body.age,
    job: req.body.job,
  };
  if (!newMember.name || !newMember.age || !newMember.job) {
    return res.status(400).json({ msg: "please fill out all the field" });
  }
  members.push(newMember);
  res.redirect("/");
});

router.put("/:id", (req, res) => {
  const newMember = req.body;
  members.forEach((elem) => {
    if (elem.id === parseInt(req.params.id)) {
      elem.name = newMember.name ? newMember.name : elem.name;
      elem.age = newMember.age ? newMember.age : elem.age;
      elem.job = newMember.job ? newMember.job : elem.job;
    }
  });
  res.json({ msg: "updated successfuly" });

  if (!newMember.name || !newMember.age || !newMember.job) {
    return res.status(400).json({ msg: "please fill out all the field" });
  }
  members.push(newMember);
  res.json(members);
});

router.delete("/:id", (req, res) => {
  const found = members.some((elem) => elem.id == parseInt(req.params.id));
  if (found) {
    res.json(members.filter((elem) => elem.id != parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: "bad request" });
  }
});

module.exports = router;
