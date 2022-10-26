const express = require("express");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Detail = require("../../models/Detail");
const Logo = require("../../models/Logo");
const Timeline = require("../../models/Timeline");

const router = express.Router();

// @route   GET api/project/steps
// @access  Public
// @desc    Get steps details
router.get("/steps", async (req, res) => {
  try {
    const stepsDetails = await Timeline.find();
    res.status(200).json(stepsDetails);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error...");
  }
});

// @route   GET api/project/:projectId
// @access  Public
// @desc    Get project details
router.get("/:projectId", async (req, res) => {
  const { projectId } = req.params;
  try {
    const projectDetails = await Logo.findById(projectId);
    res.status(200).json(projectDetails);
  } catch (err) {
    res.status(500).send("Server error...");
  }
});

// @route   POST api/project
// @access  Authorized
// @desc    Update details for the project
router.post(
  "/",
  auth,
  [check("title", "Please include a title").exists()],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      err = error.array()[0];
      return res.status(400).json({ msg: err.msg });
    }
    const { _id, projectId, title, finished, description, label, status } =
      req.body;
    const newTimeline = {
      timeline: {
        title: title,
        finished: finished,
        status: status,
        description: description,
        label: label,
      },
      projectId: projectId,
    };
    try {
      const newDetailProject = await Detail.findByIdAndUpdate(
        _id,
        { timeline: newTimeline.timeline },
        { new: true }
      );

      await Logo.findByIdAndUpdate(projectId, { modifiedAt: Date.now() });

      res.status(200).json(newDetailProject);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

// @route   POST api/project/timeline
// @access  Authorized
// @desc    Create timeline for the project
router.post(
  "/timeline",
  auth,
  [
    check("title", "Please include a title").exists(),
    check("status", "Status is undefined").exists(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      err = error.array()[0];
      return res.status(400).json({ msg: err.msg });
    }
    const { projectId, title, finished, description, label, status } = req.body;
    const newTimeline = {
      timeline: {
        title: title,
        finished: finished,
        status: status,
        description: description,
        label: label,
      },
      projectId: projectId,
    };
    try {
      const newCreatedTimeline = await Detail.create(newTimeline);

      await Logo.findByIdAndUpdate(projectId, { modifiedAt: Date.now() });

      res.status(200).json(newCreatedTimeline);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

module.exports = router;
