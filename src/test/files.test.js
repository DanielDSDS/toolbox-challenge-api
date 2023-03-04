const chai = require("chai");
const chaihttp = require("chai-http");
const server = require("../index");
const { expect } = chai;

chai.should();
chai.use(chaihttp);

describe("CSV files API", () => {

  // Tests /files/data endpoint 
  describe("GET secret file list", () => {
    // Debe retornar un arreglo de archivos 
    it("should return an array of files", (done) => {
      chai.request(server)
        .get('/files/data')
        .set({ 'Authorization': 'Bearer aSuperSecretKey' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('array');
          done();
        })
    })

    // Debe retornar un arreglo de archivos 
    it("should return a specific file", (done) => {
      chai.request(server)
        .get('/files/data')
        .query({ fileName: 'test18.csv' })
        .set({ 'Authorization': 'Bearer aSuperSecretKey' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          done();
        })
    })

    // Debe retornar un error de no conseguido 
    it("should return a not found error", (done) => {
      chai.request(server)
        .get('/files/data?fileName=randomName')
        .set({ 'Authorization': 'Bearer aSuperSecretKey' })
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        })
    })
  })

  // Tests /files/list endpoint 
  describe("GET secret file", () => {

    // Debe retornar la informacion igual que la api externa 
    it("should return same values as external API", (done) => {
      chai.request('https://echo-serv.tbxnet.com/v1')
        .get('/secret/files')
        .set({ 'Authorization': 'Bearer aSuperSecretKey' })
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          chai.request(server)
            .get('/files/list')
            .set({ 'Authorization': 'Bearer aSuperSecretKey' })
            .query({ fileName: 'test1.csv' })
            .end((err, resp) => {
              expect(resp).to.have.status(200);
              expect(resp.body).to.be.a('object');
              expect(JSON.stringify(resp.body) === JSON.stringify(res.body)).to.be.true;
              done();
            })
        })
    })
  })
})
