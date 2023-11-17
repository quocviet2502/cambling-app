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
        id_user Text,
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
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS observation (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_user Text,
        observation_name TEXT,
        observation_dateOfBirth TEXT,
        observation_comments TEXT
      );`,
      [],
      () => console.log("Database and table created successfully."),
      (error) => console.log("Error occurred while creating the table.", error)
    );
  });
};

const getHikes = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM hikes WHERE id_user = ?;",
        [id],  // Truyền giá trị biến vào mảng tham số
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
const addHikes = (userId,name, location, date, packing, length, level, description) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO hikes (id_user,hike_name, hike_location, hike_dateOfBirth, hike_packing, hike_length, hike_level, hike_description) VALUES (?,?, ?, ?, ?, ?, ?, ?)",
        [userId,name, location, date, packing, length, level, description],
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
const getObservation = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM observation WHERE id_user = ?;",
        [id],
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

const deleteObservation = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM observation WHERE id = ?",
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

const updateObservation = (id, name, date, comments) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE observation SET observation_name = ?, observation_dateOfBirth = ?, observation_comments = ? WHERE id = ?",
        [
          name,date,comments,id,
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
const addObservation = (userId,name,date,comments) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO observation (id_user,observation_name, observation_dateOfBirth, observation_comments) VALUES (?,?, ?, ?)",
        [userId,name, date, comments],
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
const clearAllObservation = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'DELETE FROM observation',
      [],
      () => console.log('Done'),
      (error) => console.error('Error: ' + error)
    );
  });
};
const Database = {
  initDatabase,
  addHikes,
  getHikes,
  deleteHikes,
  clearAllHikes,
  updateHikes,
  clearAllObservation,
  addObservation,
  updateObservation,
  deleteObservation,
  getObservation
};

export default Database;