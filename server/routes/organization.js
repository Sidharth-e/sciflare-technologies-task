const router = require("express").Router();
const { Organization, validate } = require("../models/organization");
const { User } = require("../models/user");

const passport = require('../config/passport');

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    let organization = await Organization.findOne({ email: req.body.name });
    if (organization)
      return res
        .status(400)
        .send({ message: "organization with given name already exists!" });


    // Create the user in the database
    organizationData = await new Organization({ ...req.body}).save();

    res.status(200).send({message: "organization Data created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/",passport.authenticate('jwt',{session:false}), async (req, res) => {
  try {    
    
    const records = await Organization.find().populate('_user')  ;
    res.status(200).send({ data: records, message: "Records" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.delete("/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    // Delete the organization
    const organization = await Organization.findByIdAndDelete(req.params.id);
    if (!organization) return res.status(404).send({ message: "Organization not found" });

    // Delete associated users
    await User.deleteMany({ _id: { $in: organization._user } });

    res.status(200).send({ message: "Organization and associated users deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});



router.put("/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    // Update organization
    const organization = await Organization.findByIdAndUpdate(
      req.params.id,
      { $set: { organizationName: req.body.organizationName } }, // Update only organizationName
      { new: true }
    );

    if (!organization) return res.status(404).send({ message: "Organization not found" });

    // Update associated users
    for (let user of organization._user) {
      const {_user} = req.body; 
      const {_id,...userData}=_user[0]// Exclude _id field
      await User.findByIdAndUpdate(
        user._id,
        { $set: userData }, // Update user with the remaining fields
        { new: true }
      );
    }

    res.status(200).send({ data: organization, message: "Organization and associated users updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});



module.exports = router;
