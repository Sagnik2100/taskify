import { NextResponse } from "next/server";
import {query} from '../../lib/db';

export async function POST(request){
    try{
        const {email , password} = await request.json();

        const [rows] = await query("CALL sp_validateLogin(?,?)", [email, password]);

        return NextResponse.json(rows);
    }catch(e){
        return NextResponse.json(e)
    }
}