const DBConnection = {
    server:"localhost",
    database:"ExamsDB",
    user:"oded",
    password:"1234",
    options: {
        encrypt: true
    },
    pool: {
        min: 2
    }
}

module.exports = DBConnection;