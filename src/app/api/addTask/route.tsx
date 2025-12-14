import { NextResponse } from "next/server";
import {query} from '../../lib/db';
import { RowDataPacket, FieldPacket } from "mysql2";
type TaskRow = {
  id: number;
  title: string;
  description: string;
};

export async function POST(request: globalThis.Request){
    try{
        const {title,desc} = await request.json();
        await query("insert into tasks  set user_id = 1, title = ?, description = ? ",[title,desc]);
        
        const [rows] = (await query(
        "SELECT id, title, description FROM tasks WHERE title = ? AND description = ?",
        [title, desc]
        )) as [TaskRow[] & RowDataPacket[], FieldPacket[]];
        
        return NextResponse.json( rows[0] );
    }catch(error){
        return NextResponse.json(error);
    }
}