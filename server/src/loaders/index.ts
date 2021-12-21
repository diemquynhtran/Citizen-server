import { databaseLoader } from "./database";
import { mkdirLoader } from "./mkdir";

export const loader = () => {
  databaseLoader();
  mkdirLoader();
};
// chứa các hàm số chạy ngay sau khi app được khởi tạo, connect db, socket io, create folder
    