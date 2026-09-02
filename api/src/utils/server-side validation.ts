const joi = require("joi");
export const validation = joi.object({
  recipientName: joi.string().required(),
  address: joi.string().required(),
  status: joi.string().valid("pending", "delivered").required(),
});
