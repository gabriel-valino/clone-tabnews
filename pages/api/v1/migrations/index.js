import migrationsRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

export default async function migrations(req, res) {
  const dbClient = await database.getNewClient();
  const defaultMigrationOptions = {
    dbClient,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  if (req.method !== "GET" && req.method !== "POST") {
    await dbClient.end();
    res.status(405).json({ error: "Método não permitido" });
  }

  if (req.method === "GET") {
    const pendingMigrations = await migrationsRunner(defaultMigrationOptions);
    await dbClient.end();
    return res.status(200).json(pendingMigrations);
  }

  if (req.method === "POST") {
    const migratedMigrations = await migrationsRunner({
      ...defaultMigrationOptions,
      dryRun: false,
    });

    await dbClient.end();

    if (migratedMigrations.length > 0) {
      return res.status(201).json(migratedMigrations);
    }

    return res.status(200).json(migratedMigrations);
  }

  return res.status(405).end();
}
