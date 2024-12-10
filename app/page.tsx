import { auth } from "@/auth";
import Link from "next/link";
import React from "react";

async function HomePage() {
    const session = await auth();

    console.log(session);

    if (!session?.user.isLoggedIn) {
        return (
            <div>
                Not Logged in
                <Link href="/login">Login</Link>
            </div>
        );
    }

    return (
        <div>
            HomePage
            <Link href="/login">Login</Link>
        </div>
    );
}

export default HomePage;
