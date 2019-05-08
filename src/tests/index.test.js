/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../index.js');
const { getClientWithPagination, getAllClient } = require('../routes/client');

chai.use(chaiHttp);
const { expect } = chai;

describe('Login', () => {
  // Test to get all students record
  it('should respond with bad error code 400', (done) => {
    chai
      .request(app)
      .post('/login')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('you need a username and password');

        done();
      });
  });

  it('should retun user not found', (done) => {
    chai
      .request(app)
      .post('/login')
      .send({ username: 'test', password: 'test' })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.text).to.equal('User not found !');
        done();
      });
  });

  it('should return access token', (done) => {
    chai
      .request(app)
      .post('/login')
      .send({ username: 'guest', password: 'guest' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('accesToken');
        done();
      });
  });
});

describe('client', () => {
  // Test to get all students record
  it('should respond with bad error code 400', (done) => {
    chai
      .request(app)
      .get('/client')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.text).to.equal('{"message":"No authorization token was found"}');
        done();
      });
  });
});
