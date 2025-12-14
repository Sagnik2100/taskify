import { NextResponse } from "next/server";
import {query} from '../../lib/db';

export async function GET(){
    const rows = await query("select id ,title,description from tasks;");
    console.log(rows);
    return NextResponse.json(rows);
}