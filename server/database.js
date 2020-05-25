import * as mongoose from 'mongoose'



let connect = mongoose.default.connect;
let db = mongoose.default.connection;
var url = "mongodb://localhost:27017/project";

connect(url);