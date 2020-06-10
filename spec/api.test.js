const app = require("../server/app");
const supertest = require("supertest");
const request = supertest(app);

it("returns all listings", async (done) => {
  const response = await request.get("/listings");
  expect(response.status).toBe(200);
  done();
});

it("returns listing with a specific id", async (done) => {
  const response = await request.get("/listings/1001");
  expect(response.status).toBe(200);
  done();
});

it("gets the photos endpoint at a specific id", async (done) => {
  const response = await request.get("/listings/1001/photos");
  expect(response.status).toBe(200);
  done();
});

it('Should save listing to database', async done => {
  const res = await request.post('/listings')
	.send({
    {
      "documentId": 15550,
      "listingId": 15550,
      "assets": [
        {
          "description": "Testes California gem",
          "_id": "5ecae55994f6f913fbe83871",
          "url": "https://images.unsplash.com/photo-1534512900-8ef06ef6cce7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=50&auto=compress"
        },
      ],
    }
    })
  done()
})
