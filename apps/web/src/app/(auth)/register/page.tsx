"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/lib/auth";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "name is required",
  }),
  email: z.string().min(1, {
    message: "email is required",
  }),
  password: z.string().min(1, {
    message: "password is required",
  }),
});

const RegisterPage = () => {
  const { register } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const loading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await register(values);
      redirect("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-center items-center mt-8"
      >
        <div className="flex flex-col w-[450px] gap-6">
          <h2 className="text-4xl font-bold py-4">Join us</h2>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-bold ">
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={loading}
                    className="bg-input text-foreground border border-border py-6 shadow-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Enter your name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-bold ">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={loading}
                    className="bg-input text-foreground border border-border py-6 shadow-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Enter your email"
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
            size="lg"
            disabled={loading}
            className="cursor-pointer"
          >
            Create
          </Button>
          <Separator />
          <footer className="flex flex-col items-center text-center">
            <p className="text-xs mb-1">Already have an accound?</p>
            <Link className="text-primary text-xs underline" href="/login">
              Log in
            </Link>
          </footer>
        </div>
      </form>
    </Form>
  );
};

export default RegisterPage;
