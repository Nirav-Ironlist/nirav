module.exports = {
  dbConfig: {
    client: "mysql",
    connection: {
      host: "localhost",
      user: "root",
      password: "admin",
      database: "blog_db",
    },
    pool: {
      min: 0,
      max: 2,
    },
  },
};

// require("dotenv").config();
// module.exports = {
//   // PROJECT_NAME: "ironlist_cleanning_tool",
//   // PORT: 3005,
//   // apiVersion: "v1",

//   database: {
//     mySQLConfig_publish: {
//       client: "mysql",
//       connection: {
//         host: "13.127.136.20",
//         user: "enprocon",
//         password: "E!NpR*C@N12",
//         database: "enprocon",
//         // 'port':3307
//       },
//       acquireConnectionTimeout: 10000,
//     },
//     use: "mysql",
//   },

//   // jwtTokenVerificationEnable: true, // true/false
//   // secret: process.env.JWT_TOKEN_SECRET, // jwt secret key
//   // cryptoEnable: false, // To enable this method
//   // cryptoKey: "!!ronlist@@@@", // Secret encryption key
//   // cryptoIV: "a2xhcgAAAAAAAAAA", // Secret encryption IV
// };
