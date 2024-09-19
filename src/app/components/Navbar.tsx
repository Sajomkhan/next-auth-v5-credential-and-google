import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import Logout from "./Logout";

const Navbar = async () => {
  const session = await auth();
  console.log(session);

  return (
    <nav className="border-b bg-background w-full flex items-center">
      <div className="flex w-full items-center justify-between my-4">
        <Link href="/" className="text-2xl font-bold">
          Logo
        </Link>

        <div className="flex items-center gap-5">
          <Link href="/">Home</Link>
          <Link href="/admin">Admin</Link>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
          <Link href="/reg">Reg</Link>
        </div>

        <div className="flex items-center gap-5">
          {!session?.user?.email ? (
            <Link href="/login">
              <div className="bg-teal-500 text-white px-3 py-1 rounded-sm">
                Login
              </div>
            </Link>
          ) : (
            <>
              <div className="flex items-center gap-4">
                {session?.user?.email.split("@")[0]}
                {session?.user?.image && (
                  <Image
                    src={session?.user?.image || ""}
                    width={30}
                    height={30}
                    alt="User Photo"
                    className="rounded-full"
                  />
                )}
              </div>
              <Logout />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
