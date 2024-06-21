const mysql = require("mysql")
class MysqlAdaptor{
constructor(){
this.connectionObj={
    host: 'localhost',
    port:3306,
    user: 'root', // replace with your MySQL username
    password: 'root', // replace with your MySQL password
    database: 'merntest' // replace with your MySQL database name
}
this.mySqlDriver = mysql.createPool(this.connectionObj)
}
getDriver(){
    return this.mySqlDriver
}

executeQuery(mysqlQuery,params=[]){
    return new Promise((resolve,reject)=>{
        this.mySqlDriver.getConnection(function (err,connection){
            if(err){
                console.log(err);
                if(connection){
                    connection.release();
                }
                reject(err);
            }
            let includeParams=true
            if(!params || (params instanceof Array && !params.length>0)){
                includeParams=false
            }
            if(includeParams){
                connection.query(mysqlQuery,params,function(err,result){
                    if(err){
                        if(connection){
                            connection.release();
                        }
                        reject(err);
                    }else{
                        if(connection){
                            connection.release();
                        }
                        resolve(result);
                    }
                })
            }else{
                connection.query(mysqlQuery,function(err,result){
                    if(err){
                        if(connection){
                            connection.release();
                        }
                        reject(err);
                    }else{
                        if(connection){
                            connection.release();
                        }
                        resolve(result);
                    }
                })
            }
        })
    })
}
}
module.exports=MysqlAdaptor