import mysql2 from 'mysql2/promise';

export async function query(query , values = []){
    const dbconnection = await mysql2.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    }
    );

    
    try{
        const [results] = await dbconnection.execute(query , values);
        return results;
    } catch(exception){
        console.log("Database Error : " , exception);
    } finally{
        await  dbconnection.end();
    }
}