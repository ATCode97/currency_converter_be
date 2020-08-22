process.env.NODE_ENV = "test";
const connection = require("../db/connection");
const app = require("../app");
const request = require("supertest");
const chai = require("chai");
const { expect } = chai;
chai.use(require("chai-sorted"));

describe("/api", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  it("status 404: will catch any invalid paths after /api", () => {
    return request(app)
      .get("/api/not-a-valid-path")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).to.equal("invalid pathway");
      });
  });
  describe("/currencyhistory", () => {
    xdescribe("GET methods", () => {
      it("status 200", () => {
        return request(app)
          .get("/api/currencyhistory")
          .expect(200)
          .then(({ body: { transaction } }) => {
            console.log(transaction);
            expect(transaction[0]).to.be.an("object");
            expect(transaction).to.have.length(5);
          });
      });
      it("status 200: can sort queries by exchanged_at in descending order by default", () => {
        return request(app)
          .get("/api/currencyhistory?sort_by=exchanged_at")
          .expect(200)
          .then(({ body: { transaction } }) => {
            console.log(transaction);
            expect(transaction).to.be.descendingBy("exchanged_at");
          });
      });
      it("status 200: can sort queries by in an ascending order", () => {
        return request(app)
          .get("/api/currencyhistory?order=asc")
          .expect(200)
          .then(({ body: { transaction } }) => {
            console.log(transaction);
            expect(transaction).to.be.ascendingBy("exchanged_at");
          });
      });
      it("status 400: return an error message if met with an invalid sort_by request", () => {
        return request(app)
          .get("/api/currencyhistory?sort_by=invalid")
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("bad request");
          });
      });
    });
    describe("POST method", () => {
      xit("status 201", () => {
        return request(app)
          .post("/api/currencyhistory")
          .expect(201)
          .send({
            GBP: 200,
            foreign_currency: "USD",
            amount: 237.12,
          })
          .then(({ body: { transaction } }) => {
            expect(transaction.GBP).to.equal(200);
            expect(transaction.foreign_currency).to.eql("USD");
            expect(transaction.amount).to.equal(237.12);
            expect(transaction).to.contain.keys("exchanged_at");
          });
      });
      it("status 400: the send body is missing a GBP keys", () => {});
      it("status 400: the send body is missing a foreign_currency key", () => {});
      it("status 400: the send body is missing a amount key", () => {});
      it("status 422: posting with an invalid datatype", () => {});
    });
    xdescribe("invalids methods", () => {
      it("status 405: methods not allowed", () => {
        const invalidMethods = ["delete", "put", "patch"];
        const promiseArray = invalidMethods.map((method) => {
          return request(app)
            [method]("/api/currencyhistory")
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("method not allowed");
            });
        });
        return Promise.all(promiseArray);
      });
    });
  });
});
