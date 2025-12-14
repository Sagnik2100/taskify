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

    // Cast the query result because your helper is untyped
    const [rows] = (await query(
      "CALL sp_validateLogin(?,?)",
      [email, password]
    )) as [LoginRow[], unknown];

    // Optional: check if rows returned
    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Return first row
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
