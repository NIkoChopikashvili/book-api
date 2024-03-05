const Joi = require("joi");

exports.createBookValidation = Joi.object({
  body: {
    title: Joi.string().required(),
    pages: Joi.array()
      .items(
        Joi.object({
          page: Joi.number().required(),
          content: Joi.string().required(),
        })
      )
      .required(),
  },
});
