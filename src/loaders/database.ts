import { createConnection, getRepository, In } from "typeorm";
import { User } from "../entities/user";
import { staticData } from "../settings/static-data";
export const databaseLoader = () => {
  createConnection().then(async (connection) => {
    if (connection.isConnected) {
      console.log("\x1b[36m%s\x1b[0m", "Connect database success");
      try {
        const userRepo = await getRepository(User);
        const usersDefault = await userRepo.findOne({
          username: In(staticData.users.map((u) => u.username)),
        });
        if (!usersDefault) {
          userRepo.insert(staticData.users);
          console.log("Insert default Data success");
        }
      } catch {}
    } else {
      console.log(`${"Connect database failed"}.red`);
    }
  });
};
