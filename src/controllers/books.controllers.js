const { sq } = require("../config/db-setup");
const { PageModel, BookModel, LastReadModel } = require("../models");
const { resultCodes } = require("../enums");
const { BookNotFound, PageNotFound } = require("../exceptions");

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.createBook = async (req, res, next) => {
  const t = await sq.transaction();
  const { title, pages } = req.body;
  try {
    const book = await BookModel.create(
      { title, author: req.user.username, lastReadPage: 0 },
      { transaction: t }
    );

    // Extract the book ID to associate with each page
    const bookId = book.id;

    // Prepare pages with bookId
    const pagesWithBookId = pages.map((page) => ({ ...page, bookId }));

    // Use bulkCreate for pages
    await PageModel.bulkCreate(pagesWithBookId, { transaction: t });

    await t.commit();

    return res.status(201).json({ result: resultCodes.SUCCESS, bookId });
  } catch (err) {
    await t.rollback();
    next(err);
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.bookDetails = async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await BookModel.findByPk(id, {
      include: [
        {
          model: PageModel,
          as: "Pages",
        },
      ],
    });

    if (!book) throw new BookNotFound("Could not find book with that id.");

    return res.status(200).json({ result: resultCodes.SUCCESS, book });
  } catch (err) {
    next(err);
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.deleteBook = async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await BookModel.findByPk(id);

    if (!book) throw new BookNotFound("Could not find book with that id.");

    await book.destroy();

    return res.status(200).json({ result: resultCodes.SUCCESS, book });
  } catch (err) {
    next(err);
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.updateBook = async (req, res, next) => {
  const { title, author } = req.body;
  const { id } = req.params;

  try {
    const bookToUpdate = await BookModel.findByPk(id);

    if (!bookToUpdate)
      throw new BookNotFound("Could not find book with that id.");

    // Update book information based on the request payload
    bookToUpdate.title = title || bookToUpdate.title;
    bookToUpdate.author = author || bookToUpdate.author;

    // Save the changes
    await bookToUpdate.save();

    return res
      .status(200)
      .json({ result: resultCodes.SUCCESS, book: bookToUpdate });
  } catch (err) {
    next(err);
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.updatePage = async (req, res, next) => {
  const { content, page } = req.body;
  const { id } = req.params;

  try {
    const pageToUpdate = await PageModel.findByPk(id);

    if (!pageToUpdate)
      throw new PageNotFound("Could not find page with that id.");

    pageToUpdate.content = content || pageToUpdate.content;
    pageToUpdate.page = page || pageToUpdate.page;

    // Save the changes
    await pageToUpdate.save();

    res.status(200).json({
      result: resultCodes.SUCCESS,
      page: pageToUpdate,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.books = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  try {
    const { count, rows: books } = await BookModel.findAndCountAll({
      offset: (page - 1) * pageSize,
      limit: pageSize,
      include: [
        {
          model: PageModel,
          as: "Pages",
        },
      ],
    });

    const totalPages = Math.ceil(count / pageSize);

    return res.status(200).json({
      result: resultCodes.SUCCESS,
      books,
      totalPages,
      currentPage: page,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.readBook = async (req, res, next) => {
  const bookId = req.params.bookId;
  const { userId } = req.user;
  try {
    if (!bookId) throw new BookNotFound("Could not find book with that id.");

    let lastRead = await LastReadModel.findOne({ where: { bookId, userId } });

    if (!lastRead)
      lastRead = await LastReadModel.create({ userId, bookId, page: 0 });

    const page = await PageModel.findOne({
      where: { bookId, page: lastRead.page + 1 },
    });

    if (!page) throw new PageNotFound("This was the last page of the book.");

    lastRead.page = lastRead.page + 1;

    // Save the changes
    await lastRead.save();

    return res.status(200).json({
      result: resultCodes.SUCCESS,
      page,
    });
  } catch (err) {
    next(err);
  }
};
