const {
    createPool

} = require('mysql')

const pool = createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'ch_data',
    connectionLimit:10
})
pool.query(`select * from`)