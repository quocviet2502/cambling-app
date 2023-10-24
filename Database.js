import * as SQLite from "expo-sqlite";

const database_name = "HikeApp.db";
const database_version = "1.0";
const database_displayname = "Hike App Database";
const database_size = 200000;

const db = SQLite.openDatabase(
  database_name,
  database_version,
  database_displayname,
  database_size
);

const initDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS hikes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_user INTEGER,
        hike_name TEXT,
        hike_location TEXT,
        hike_dateOfBirth TEXT,
        hike_packing TEXT,
        hike_length TEXT,
        hike_level TEXT,
        hike_description TEXT
      );`,
      [],
      () => console.log("Database and table created successfully."),
      (error) => console.log("Error occurred while creating the table.", error)
    );
  });
};

const getHikes = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM hikes",
        [],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const deleteHikes = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM hikes WHERE id = ?",
        [id],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const updateHikes = (id, name, location, date, packing, length, level, description) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE hikes SET hike_name = ?, hike_location = ?, hike_dateOfBirth = ?, hike_packing = ?, hike_length = ?, hike_level = ?, hike_description = ? WHERE id = ?",
        [
          name, location, date, packing, length, level, description,id,
        ],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};
const addHikes = (name, location, date, packing, length, level, description) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO hikes (hike_name, hike_location, hike_dateOfBirth, hike_packing, hike_length, hike_level, hike_description) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, location, date, packing, length, level, description],
        (_, { insertId }) => {
          resolve(insertId);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};
const clearAllHikes = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'DELETE FROM hikes',
      [],
      () => console.log('Đã xóa toàn bộ dữ liệu trong bảng'),
      (error) => console.error('Không thể xóa dữ liệu trong bảng: ' + error)
    );
  });
};

const Database = {
  initDatabase,
  addHikes,
  getHikes,
  deleteHikes,
  clearAllHikes,
  updateHikes
};

export default Database;