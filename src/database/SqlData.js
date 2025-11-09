import SQLite from 'react-native-sqlite-storage';
import { Loger } from '../utils/Loger';

var db = SQLite.openDatabase({ name: 'IPSA.db', location: 'default' });


export var SqlTableName = {

    HT_MAJOR_COMPONENT_TABLE: "HT_MAJOR_COMPONENT_TABLE",
    LT_MAJOR_COMPONENT_TABLE: "LT_MAJOR_COMPONENT_TABLE",
   
}


export const SqlData = {

    openSQlDatabase: () => {
        db = SQLite.openDatabase(
            {
                name: 'IPSA.db',
                location: 'default',
            },
            () => {
            },
            error => {
            }
        );
    },

    createTablex: (tableName) => {
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS ' + tableName + ' (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, list TEXT);', [],
                (result) => {
                    //  Loger.onLog(tableName+"--sus-------->",result);
                },
                (tx, error) => {
                    // Loger.onLog(tableName+"--err-------->",error);
                }
            );
        });
    },

    setDatax: (tableName, SaveOnlyLastRow, obj, success,) => {

        const jsonData = JSON.stringify(obj);
        db.transaction((tx) => {

            if (SaveOnlyLastRow) {
                tx.executeSql(`DELETE FROM ` + tableName + `;`, [],
                    (_, result) => {
                    },
                    (_, err) => {
                    }
                );
            }

            tx.executeSql('INSERT INTO ' + tableName + ' (list) VALUES (?);', [jsonData],
                (result) => {
                    //  Loger.onLog(tableName+".--. inser data in table",result);
                    return success(result);
                },
                (tx, error) => {
                    //  Loger.onLog("inser data in table error",error);
                    return error(err);
                }
            );
        });
    },

    getdatax: (query, success, error) => {

        //  Loger.onLog("---------->",query);
        db.transaction((tx) => {
            tx.executeSql(query, [], (tx, results) => {

                if (results.rows.length > 0) {
                    return success(results)
                } else {
                    return error('Object not found')
                }
            },
                (tx, err) => {
                    // Loger.onLog("---------->",err);
                    return error(err)

                }
            );
        });
    },

    DeleteData: (id, query, success, error) => {
        db.transaction((tx) => {
            tx.executeSql(query, [id],
                (_, result) => {
                        success(result)
                },
                (_, err) => {
                        error(err)
                }
            );
        });
    },
    
    clearDataBase: () => {
        const db = SQLite.openDatabase({ name: 'IPSA.db', location: 'default' });
        db.close(() => {
            SQLite.deleteDatabase({ name: 'IPSA.db', location: 'default' }, () => {
            }, error => {
            });
        });
    }
};