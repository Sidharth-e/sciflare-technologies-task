const mongoose = require('mongoose');
const Joi = require("joi");

const organizationSchema = new mongoose.Schema({
  organizationName: {
    type: String,
    required: true
  },
  _user: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
],
});

const validate = (data) => {
	const schema = Joi.object({
		name: Joi.string().required().label("Name"),
    _user: Joi.ObjectId().required().label("userid"),
	});
	return schema.validate(data);
};


const Organization  = mongoose.model('Organization', organizationSchema);

module.exports = { Organization, validate };
