const Pool = require ('pg').Pool
const pool = new Pool ({
    user: 'abzrkisyhdtwdx',
    host: 'ec2-44-210-36-247.compute-1.amazonaws.com',
    database: 'dd4pd9b8cqit6d',
    password: '89e36263767de4000ecf25068b7e1ec45fa025620370481c2421bc34f3953be3',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;