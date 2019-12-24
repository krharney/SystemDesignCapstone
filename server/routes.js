const controller = require("./controllers/controller");
const router = require("express").Router();

//Connect controller methods to their corresponding routes
router.get("/qa/:product_id", controller.getQuestionById);
router.post("/qa/:product_id", controller.postQuestion);

// router.post("/messages", controller.messages.post);

// router.get("/users", controller.users.get);

// router.post("/users", controller.users.post);

module.exports = router;
