import { Button } from "@/components/button";
import { Input } from "@/components/input";
import Link from "next/link";


export default function Login() {
    return (<div
        className="w-full md:w-2/3 p-4">

        <h1 className="text-6xl text-left font-bold mb-2">
            Login
        </h1>
        <p className="text-md text-left after:w-full after:h-[1px] after:bg-gray-200 after:my-4 after:content-[''] after:block">You must login to continue</p>


        <form className="rounded-md  mx-auto">
            <Input type="email" label="Email" id="email" />
            <Input type="password" label="Password" id="password" />
            <Button title="Login" type="submit" />
        </form>
        <Link className="font-light text-sm hover:underline text-center mx-auto" href="/auth/register">Not registered yet?
            <span className="text-blue-600"> Create an account</span> </Link>
    </div>)
}