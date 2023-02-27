const auth = require("../middleware/is-auth");
const { expect } = require("chai");
const jwt = require("jsonwebtoken");
const sinon = require("sinon");

describe("Auth MiddleWare", () => {
  it("Not Authorized", () => {
    const req = {
      get: () => {
        return null;
      },
    };
    expect(auth.bind(this, req, {}, () => {})).to.throw();
  });

  it("token Provided", () => {
    const req = {
      get: () => {
        return "cxa";
      },
    };
    expect(auth.bind(this, req, {}, () => {})).to.throw();
  });

  it("Error When It's Not UserId", () => {
    const req = {
      get: () => {
        return "Bearer sadasdasdxys";
      },
    };
    sinon.stub(jwt, "verify");
    jwt.verify.returns({ userId: "abc" });
    // jwt.verify = () => {
    //   return { userId: "abc" };
    // };
    auth(req, {}, () => {});
    expect(req).to.have.property("userId");
    // expect(req).to.have.property("userId", "abc");
    expect(jwt.verify.called).to.be.true;
    jwt.verify.restore();
  });

  it("token Not Valid", () => {
    const req = {
      get: () => {
        return "Bearer xys";
      },
    };
    expect(auth.bind(this, req, {}, () => {})).to.throw();
  });
});
