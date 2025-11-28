import CreateCard from "@/components/courses/CreateCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Courses = () => {
  return (
    <div className="mx-6">
      <h1 className="text-6xl py-6">Courses</h1>
      <Tabs defaultValue="account" className="w-full bg-background">
        <TabsList className="bg-muted-foreground">
          <TabsTrigger value="account">Courses</TabsTrigger>
          <TabsTrigger value="password">Course bundles</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <CreateCard />
        </TabsContent>
        <TabsContent value="password">Bundle your courses.</TabsContent>
      </Tabs>
    </div>
  );
};

export default Courses;
