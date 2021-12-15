import { debug } from "console";
import { config } from "dotenv";
import { existsSync } from "fs";
export const loaderEnviroment = () => {
  if (existsSync(".env")) {
    debug("Using .env file to supply config environment variables");
    config({ path: ".env" });
  } else {
    debug("Using .env.example file to supply config environment variables");
    config({ path: ".env.example" }); // you can delete this after you create your own .env file!
  }
};
