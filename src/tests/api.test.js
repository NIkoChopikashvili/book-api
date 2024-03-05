const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");
const generateUsername = require("./sampleData");

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Croco Book API", () => {
  let authToken;
  let bookId;
  let pageId;
  const user = {
    username: generateUsername(),
    password: "test_password",
  };

  describe("/signup", () => {
    it("should create a new user", (done) => {
      chai
        .request(app)
        .post("/signup")
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          authToken = res.body.token;
          done();
        });
    });
  });

  describe("/signIn", () => {
    it("should sign in a user", (done) => {
      chai
        .request(app)
        .post("/signIn")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          authToken = res.body.token;
          done();
        });
    });
  });

  describe("/books", () => {
    it("should get all books", (done) => {
      chai
        .request(app)
        .get("/books")
        .set("Cookie", `token=${authToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("result").eql("Success");
          res.body.should.have.property("books");
          pageId = res.body.books[0].Pages[0].id;
          done();
        });
    });

    it("should create a new book", (done) => {
      const newBook = {
        title: "Test Book",
        pages: [{ page: 1, content: "Page 1 content" }],
      };

      chai
        .request(app)
        .post("/book")
        .set("Cookie", `token=${authToken}`)
        .send(newBook)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("result").eql("Success");
          res.body.should.have.property("bookId");
          bookId = res.body.bookId;
          done();
        });
    });
  });

  describe("/book/{id}", () => {
    it("should get details of a book by ID", (done) => {
      chai
        .request(app)
        .get(`/book/${bookId}`)
        .set("Cookie", `token=${authToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("result").eql("Success");
          res.body.should.have.property("book");
          done();
        });
    });

    it("should update details of a book by ID", (done) => {
      const updatedBook = {
        title: "Updated Book Title",
        author: "Updated Author",
      };

      chai
        .request(app)
        .put(`/book/${bookId}`)
        .set("Cookie", `token=${authToken}`)
        .send(updatedBook)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("result").eql("Success");
          res.body.should.have.property("book");
          done();
        });
    });

    it("should delete a book by ID", (done) => {
      chai
        .request(app)
        .delete(`/book/${bookId}`)
        .set("Cookie", `token=${authToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("result").eql("Success");
          res.body.should.have.property("book");
          done();
        });
    });
  });

  describe("/page/{id}", () => {
    it("should update details of a page by ID", (done) => {
      const updatedPage = {
        content: "Updated Page Content",
        page: 1,
      };

      chai
        .request(app)
        .put(`/page/${pageId}`)
        .set("Cookie", `token=${authToken}`)
        .send(updatedPage)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("result").eql("Success");
          res.body.should.have.property("page");
          done();
        });
    });
  });
});
