const confDAO = require("../models/confModel");
const conf = new confDAO({ filename: "conf.db", autoload: true });

exports.newList = function (req, res) {
  conf.init();
  res.redirect("/");
};

exports.listTalks = function (req, res) {
  const { session, speaker } = req.query;
  conf
    .getTalk(session, speaker)
    .then((list) => {
      res.json(list);
    })
    .catch((err) => {
      console.error("Error fetching talks:", err);
      res.status(500).json({ error: "Failed to fetch talks" });
    });
};

exports.listRatingsBySpeaker = function (req, res) {
  let speakerName = req.params["speaker"];
  conf
    .getSpeaker(speakerName)
    .then((list) => {
      res.json(list[0].ratings);
      console.log("ratings: ", list[0].ratings);
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.listRatingsById = function (req, res) {
  let talkId = req.params["id"];
  conf
    .getTalkById(talkId)
    .then((list) => {
      res.json(list[0].ratings);
      console.log("ratings: ", list[0].ratings);
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.rateTalkById = function (req, res) {
  let talkId = req.params["id"];
  let newRating = req.params["rating"];

  conf
    .rateTalkById(talkId, newRating)
    .then(console.log("adding rating using params"))
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.handlePosts = function (req, res) {
  let talkId = req.body.talkId;
  let newRating = req.body.rating;
  conf
    .rateTalk(talkId, newRating)
    .then(console.log("rating added"))
    .catch((err) => {
      console.log("promise rejected", err);
    });
};
