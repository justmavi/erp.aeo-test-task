import respawn from "respawn";

export default () => {
  console.log("Running migrations...");

  const monitor = respawn(["npm", "run", "migrate"], {
    name: "migrator",
    maxRestarts: 10,
    fork: false,
    sleep: 1500,
  });
  monitor.start();

  monitor.on("exit", (code) => {
    if (code === 0) {
      console.log("Done");
      monitor.stop();
    } else console.log("Failed. Retrying...");
  });

  monitor.on("crash", () => {
    console.log("Failed to automatically run migrations");
  });
};
