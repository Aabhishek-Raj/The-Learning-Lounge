import { Button } from "@/components/ui/button";
import Link from "next/link";


export default async function Home() {

  return (
     <div>
      <section className="bg-[url('/peoplejump.jpg')] bg-cover bg-center min-h-screen p-4">
        <article className="ml-40 mt-40 mb-10 max-w-[50%]">
          <h1 className="text-8xl font-bold text-white">Learn essential career and life skills</h1>
          <p className="mb-10">
            Millions of people trust Learning Lounge, the first app of its kind. Learn essential career and life skills — entirely free.
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
