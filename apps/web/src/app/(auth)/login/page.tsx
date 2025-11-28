"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().min(1, {
    message: "email is required",
  }),
  password: z.string().min(1, {
    message: "password is required",
  }),
});

const Login = () => {
  const router = useRouter();

  const { login } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await login(values);
      router.push("/tutor/courses");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-center items-center mt-8"
      >
        <div className="flex flex-col w-[450px] gap-6">
          <h2 className="text-4xl font-bold py-3">Log in</h2>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-bold w-full">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={loading}
                    className="bg-input text-foreground border border-border shadow-sm py-6 focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Enter you email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-bold ">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={loading}
                    className="bg-input text-foreground border border-border py-6 shadow-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Enter your password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={loading}
            size="lg"
            className="cursor-pointer"
          >
            Log in
          </Button>

          <Separator />
          <footer className="flex flex-col items-center text-center">
            <p className="text-xs mb-1">Not a member yet?</p>
            <Link className="text-primary text-xs underline" href="/register">
                Create account
            </Link>
          </footer>
        </div>
      </form>
    </Form>
  );
};

export default Login;
