const express = require("express");
const router = express.Router();
const {
  createMember,
  loginMember,
  getMember,
} = require("../controller/member");
const AuthMiddleware = require("../middleware/AuthMiddleware");

router.get("/check-auth", AuthMiddleware, (req, res) => {
  const user = req.userInfo;  
  res.status(200).json({
    success: true,
    message: "Authenticated user",
    data: user,
  });
});
router.post("/create", createMember);
router.post("/login", loginMember);
router.get("/getMember", getMember);

module.exports = router;
