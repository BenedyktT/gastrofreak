const categories = require("./categories");
const axios = require("axios");
const supertest = require("supertest");
const app = require("../server");
const request = supertest(app);
jest.mock("axios");
describe("categories endpoint", () => {
  const responseBody = {
    categories: [
      {
        idCategory: "2",
        strCategory: "Beef",
        strCategoryThumb: "https://www.themealdb.com/images/category/beef.png",
        strCategoryDescription:
          "Beef is the culinary name for murce of high-quality protein and essential nutrients.[2]"
      }
    ]
  };
  test("should exist", async done => {
    axios.get.mockResolvedValue({ data: responseBody });
    const req = await request.get("/categories");
    expect(req.status).toBe(200);
    expect(req).toBeDefined();
    done();
  });

  test("categories id", async done => {
    const spy = jest.spyOn(request, "get");
    const res = await request.get("/categories/12345");
    expect(spy).toHaveBeenCalled();

    done();
  });
});
