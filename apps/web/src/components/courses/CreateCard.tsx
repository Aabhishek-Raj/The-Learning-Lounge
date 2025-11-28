import Link from "next/link";
import { Button } from "../ui/button";

const CreateCard = () => {
  return (
    <div className="flex bg-secondary items-center justify-between p-12 mt-4 border rounded-sm">
      <p>Jump Into Course Creation</p>
      <Link href="/course/create">
        <Button size="lg">Create Your Course</Button>
      </Link>
    </div>
  );
};

export default CreateCard;
