import { NextRequest, NextResponse } from "next/server";

// Define the shape of your login row
type LoginRow = {
  id: number;
  email: string;
  name: string;
};

// Import your existing query helper
import { query } from "../../lib/db";

export async function POST(request: NextRequest) {
  try {
    // Type the request body
    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };
    console.log(email,password);
    // Cast the query result because your helper is untyped
    const [rows] = (await query(
      "SELECT 1 AS isValidated FROM user WHERE email = ? AND password = ?",
      [email, password]
    )) as [LoginRow[], unknown];

    if (!rows || rows.length === 0) {
  return NextResponse.json({ isValidated: false }, { status: 401 });
  }

  return NextResponse.json({ isValidated: true });

    // Return first row
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
