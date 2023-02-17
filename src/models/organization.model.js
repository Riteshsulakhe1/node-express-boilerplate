const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const OrganizationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    adminId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
  },
  { timestamp: true }
);

OrganizationSchema.plugin(toJSON);
const Organization = mongoose.model('Organization', OrganizationSchema);
module.exports = Organization;
