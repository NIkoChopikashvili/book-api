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

exports.updateBookValidation = Joi.object({
  body: {
    title: Joi.string(),
    author: Joi.string(),
  },
  params: {
    id: Joi.string().required(),
  },
});

exports.updatePageValidation = Joi.object({
  body: {
    page: Joi.number(),
    content: Joi.string(),
  },
  params: {
    id: Joi.string().required(),
  },
});

exports.deleteBookValidation = Joi.object({
  params: {
    id: Joi.string().required(),
  },
});

exports.bookDetailsValidation = Joi.object({
  params: {
    id: Joi.string().required(),
  },
});

exports.readPageValidation = Joi.object({
  params: {
    bookId: Joi.string().required(),
  },
});

exports.getBooksValidation = Joi.object({
  query: {
    page: Joi.string(),
    pageSize: Joi.string(),
  },
});
