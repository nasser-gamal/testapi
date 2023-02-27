const User = require("../models/user");
const sinon = require("sinon");
const userControllers = require("../controllers/user");
const { expect } = require("chai");

describe("User Controller - Login", (done) => {
  it("if Access Database Fails", () => {
    sinon.stub(User, "findOne");
    User.findOne.throws();

    const req = {
      body: { email: "test@test.com", password: "123456" },
    };

    userControllers
      .login(req, {}, () => {})
      .then((result) => {
        expect(result).to.be.an("error");
        expect(result).to.have.property("status", 500);
        done();
      });

    User.findOne.restore();
  });
});
