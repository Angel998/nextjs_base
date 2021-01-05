const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const server = require("./server/index");
const { errorLog } = require("./utils/log");

async function init() {
  await server.init();
}

process.on("unhandledRejection", (err) => {
  errorLog(`unhandledRejection: ${err}`);
  if (process.env.NODE_ENV != "production") {
    console.log(err.stack);
  }
  server.close();
});

init();
