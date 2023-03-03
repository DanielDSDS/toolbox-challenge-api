const chai = require("chai");
const chaihttp = require("chai-http");
const server = require("../index");
const { expect } = chai;

chai.should();
chai.use(chaihttp);

describe("CSV files API", () => {
  // Tests /secret/files endpoint 
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

    it("should fail when not specifying a bearer token", (done) => {
      chai.request(server)
        .get('/files/data')
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        })
    })
  })

  // Tests /secret/file/{name} endpoint 
  describe("GET secret file", () => {
    // Debe funcionar al especificar un nombre de archivo 
    it("should succeed when passing a specific file through query params", (done) => {
      chai.request(server)
        .get('/files/data')
        .set({ 'Authorization': 'Bearer aSuperSecretKey' })
        .query({ fileName: 'test1.csv' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('string');
          expect(res.body).to.be.empty;
          done();
        })
    })

    // Debe fallar al no encontrar el archivo especificado 
    it("should fail when not specifying a file name", (done) => {
      chai.request(server)
        .get('/files/data')
        .set({ 'Authorization': 'Bearer aSuperSecretKey' })
        .query({ fileName: 'non-existent test' })
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        })
    })
  })

})
