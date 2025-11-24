import { Button } from "@/components/ui/button";
import Link from "next/link";


export default async function Home() {

  return (
     <div>
      <section className="bg-[url('/peoplejump.jpg')] bg-cover bg-center min-h-screen p-4">
        {/* <ModeToggle /> */}
        <nav className="flex justify-between items-center ">
          <div className="sm:flex hidden flex-1"></div>
          <h3 className="flex-1 text-4xl font-bold text-blue-400">Learning Lounge</h3>
          <div className="flex flex-1 justify-center gap-3 sm:justify-end">
            <Link href={'/register'}>
              <button className="cursor-pointer bg-blue-400 text-white p-3 rounded-4xl font-bold hover:bg-blue-300">
                Sign Up
              </button>
            </Link>
            <Link href={'/login'}>
              <button className="cursor-pointer text-white p-3 rounded-4xl font-bold hover:bg-blue-300">
                Login In
              </button>
            </Link>
          </div>
        </nav>
        <article className="ml-40 mt-40 mb-10 max-w-[50%]">
          <h1 className="text-8xl font-bold text-white">Make Your Life Unforgettable</h1>
          <p className="mb-10">
            Millions of people trust ChatterSpere, the first app of its kind. Plan, track, and share
            your life — entirely free.
          </p>
          <Link href={'/register'}>
            <Button className="cursor-pointer">Start Learning</Button>
          </Link>
        </article>
      </section>
      <section className="bg-[url('/child.jpg')] bg-cover bg-top min-h-screen p-4 mt-2"></section>
     </div>
  );
}
