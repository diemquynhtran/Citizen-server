import { existsSync, mkdirSync } from "fs";

export const mkdirLoader = () => {
  const dirs = ["./public", "./public/avatar"];

  for (const dir of dirs) {
    if (!existsSync(dir)) {
      mkdirSync(dir);
    }
  }
  console.log("created directories");
};
