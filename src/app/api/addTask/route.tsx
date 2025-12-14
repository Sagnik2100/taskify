import { NextResponse } from "next/server";
import {query} from '../../lib/db';

export async function POST(request){
    try{
        const {title,desc} = await request.json();
        await query("insert into tasks  set user_id = 1, title = ?, description = ? ",[title,desc]);
        
        const [rows] = await query( "SELECT id ,title, description from  tasks where title = ? and description = ?" , [title,desc] )
        return NextResponse.json( rows[0] );
    }catch(error){
        return NextResponse.json(error);
    }
}