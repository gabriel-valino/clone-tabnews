test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  const { updated_at } = responseBody;
  const { version, max_connections, oppened_connections } =
    responseBody.dependencies.database;

  expect(updated_at).toBeDefined();
  const parsedUpdatedAt = new Date(updated_at).toISOString();
  expect(updated_at).toEqual(parsedUpdatedAt);

  expect(version).toBeDefined();
  expect(version).toEqual("16.0");

  expect(version).toBeDefined();
  expect(max_connections).toEqual(100);

  expect(oppened_connections).toBeDefined();
  expect(oppened_connections).toEqual(1);
});
