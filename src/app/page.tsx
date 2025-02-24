'use client'
import { redirect } from "next/navigation";
const page = () => {
    redirect("/home");
    return null;
}

export default page;