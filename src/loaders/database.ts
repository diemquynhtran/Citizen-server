import { createConnection } from "typeorm";
export const databaseLoader = () => {
  createConnection().then(async (connection) => {
    if (connection.isConnected) {
      console.log("\x1b[36m%s\x1b[0m", "Connect database success");
    } else {
      console.log(`${"Connect database failed"}.red`);
    }
  });
};
