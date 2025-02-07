import database from "infra/database.js";

async function status(req, res) {
  const updatedAt = new Date().toISOString();

  const postgresVersion = await database.query("SHOW server_version;");
  const maxConnections = await database.query("SHOW max_connections;");

  const databaseName = process.env.POSTGRES_DB;

  const oppenedConnections = await database.query({
    text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: postgresVersion.rows[0].server_version,
        max_connections: parseInt(maxConnections.rows[0].max_connections),
        oppened_connections: oppenedConnections.rows[0].count,
      },
    },
  });
}

export default status;
