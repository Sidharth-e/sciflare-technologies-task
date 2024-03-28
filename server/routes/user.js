const router = require("express").Router();
const { User, validate } = require("../models/user");
const { Organization } = require("../models/organization");
const bcrypt = require("bcrypt");
const passport = require('../config/passport');
router.post("/", async (req, res) => {
  try {
    const { organization, ...userData } = req.body;
    const { error } = validate(userData);
    if (error)
      return res.status(400).send({ message: error.details[0].message });
    let user = await User.findOne({ email:userData.email });
    if (user)
      return res
        .status(400)
        .send({ message: "User with given email already exists!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(userData.password, salt);

    // Create the user in the database
    user = await new User({ ...userData, password: hashPassword }).save();
    let organizationData = await new Organization({ organizationName:organization, _user: user._id }).save();

    // Generate token after saving the user
    const token = user.generateAuthToken();
    res.status(200).header('Authorization', `Bearer ${token}`).send({ token: token, message: "User created successfully" ,data:user});
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/", passport.authenticate('jwt',{session:false}),async (req, res) => {
  try {
    const records = await User.find();
    res.status(200).send({ data: records, message: "Records" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/:id", passport.authenticate('jwt',{session:false}),async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send({ message: "User not found" });

    res.status(200).send({ data: user, message: "User found successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.delete("/:id", passport.authenticate('jwt',{session:false}),async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send({ message: "User not found" });

    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.put("/:id",passport.authenticate('jwt',{session:false}), async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!user) return res.status(404).send({ message: "User not found" });

    res.status(200).send({ data: user, message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
