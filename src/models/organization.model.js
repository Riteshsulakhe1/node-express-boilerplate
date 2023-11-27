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
  { timestamps: true }
);

OrganizationSchema.plugin(toJSON);

OrganizationSchema.statics.isUserAlreadyOwnAnOrg = async function (adminId) {
  console.log('adminId==>', adminId);
  const org = await this.findOne({ adminId });
  console.log('org==>', org);
  return org ? true : false;
};

const Organization = mongoose.model('Organization', OrganizationSchema);
module.exports = Organization;
