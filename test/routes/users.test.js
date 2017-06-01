let mongoose = require("mongoose");
mongoose.Promise = require('bluebird');
let User = require('../../models/user');

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../app');
let should = chai.should();

chai.use(chaiHttp);

describe('USERS', () => {

  beforeEach((done) => { //Before each test we empty the database
    User.remove({}, (err) => {
      done();
    });
  });

  describe('/GET a list of all users', () => {
    it('it should GET all the posts', (done) => {
      chai.request(app)
        .get('/users/all')
        .end((res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body[0].should.have.property('_id');
          done();
        });
      });
    });

});
