const { Pool } = require("pg")

const pool = new Pool({
    connectionString: "postgres://default:uBhbiy10Tnqd@ep-solitary-hat-a4qzzmis.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
  })
// const pool = new Client({
//     user: "abbasuz1_abbas",
//     host: "localhost",
//     database: "abbasuz1_new",
//     password: "b]onUwthLH[p",
//     port: 5619
// })
pool.connect(err => {
    if(err) {
        console.log("Connect Error");
    } else {
        console.log("Connect To PostgreSql");
    }
})

module.exports = pool