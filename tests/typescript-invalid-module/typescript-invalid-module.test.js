const { runSlsCommand, clearNpmCache } = require("../helpers");

beforeEach(async () => {
  await clearNpmCache(__dirname);
});

afterAll(async () => {
  await clearNpmCache(__dirname);
});

test("typescript invalid module", async () => {
  expect.assertions(1);

  try {
    await runSlsCommand(__dirname);
  } catch (err) {
    expect(err.stdout).toContain("CommonJS, ES3, or ES5 are not supported");
  }
});
