let mongoose = require("mongoose");

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../app');
let should = chai.should();

chai.use(chaiHttp);
describe('INDEX', () => {
  it('should render index page', () => {
    chai.request(app)
      .get('/users/all')
      .end((res) => {
        res.should.have.status(200);
        
    });
  });
});
