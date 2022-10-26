const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();

const auth = require("../../middleware/auth");
const {
  uploadImages,
  resizeImages,
  getResult,
} = require("../../middleware/upload");

const Details = require("../../models/Detail");

// @route 	POST api/image
// @access	Auth
// @desc    Upload files
router.post("/", auth, uploadImages, resizeImages, async (req, res) => {
  const { timelineId, deleted } = req.body;
  const needToDelete = deleted ? deleted : [];
  needToDelete.map((item) => {
    try {
      fs.unlinkSync(path.join(__dirname, "../../upload/" + item + ".jpeg"));
    } catch (err) {
      console.log(err);
    }
  });

  await Details.findById(timelineId).then(async (data) => {
    const newPhotos = data.timeline.photos.filter(
      (item) => !needToDelete.includes(item.description)
    );

    const addedPhotos = req.body.images.map((image) => {
      const photo = {
        title: "Preview Image",
        url: image.filename,
        description: image._id,
      };
      return photo;
    });

    const timeline = await Details.findByIdAndUpdate(
      timelineId,
      { "timeline.photos": addedPhotos.concat(newPhotos) },
      { new: true }
    );
    res.status(200).json(timeline);
  });
});

module.exports = router;
