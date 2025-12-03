import Header from "@/components/header/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Teaching = () => {
  return (
    <div>
      <section className="bg-[url('/teacheronboard.jpg')] bg-cover bg-center min-h-screen p-4">
        <article className="ml-40 mt-40 mb-10 max-w-[50%]">
          <h1 className="text-8xl font-bold text-background">Come teach with us</h1>
          <p className="mb-10">
            Become an instructor and change lives — including your own
          </p>
          <Link href={"/tutor/courses"}>
            <Button className="cursor-pointer">Get Started</Button>
          </Link>
        </article>
      </section>
      <section className="bg-[url('/teacher.jpg')] bg-cover bg-top min-h-screen p-4 mt-2"></section>
    </div>
  );
};

export default Teaching;
