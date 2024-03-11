"use client";

import { PasswordInput } from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please enter a valid email format" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must contain at least 8 characters" }),
});

type FormType = z.infer<typeof formSchema>;

const signinPage = () => {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: FormType) => {
    console.log(values);
  };

  const router = useRouter();
  const [otpSent, setOtpSent] = useState(false);

  return (
    <main className="flex h-screen w-screen justify-center items-center bg-[url(/signup-bg.jpg)]">
      <div className="flex h-[80vh] w-[80vw] shadow-lg">
        <section className="hidden lg:flex lg:flex-col lg:justify-center lg:items-center gap-8 rounded-l-2xl w-1/2 bg-zinc-800">
          <h1 className="text-white text-3xl font-extrabold">
            Welcome to CustomEd
          </h1>
          <Image
            src="/signin-illustration.svg"
            width={400}
            height={400}
            alt="Signup Illustration"
          />
          <span className="text-primary-foreground">
            Don't have an account ?{" "}
            <Link className="hover:underline" href="/auth/signup">
              Signup
            </Link>
          </span>
        </section>

        <section className="flex flex-col items-center justify-center rounded-r-2xl lg:w-1/2 w-full bg-slate-50">
          <div className="space-y-4 mb-10">
            <h2 className="text-primary text-center text-xl font-bold">
              Signin
            </h2>
            <p className="text-center text-gray-500">Welcome to CustomEd</p>
          </div>
          <Form {...form}>
            <form
              method="POST"
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col w-3/4 space-y-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="font-semibold text-primary"
                        placeholder="Email"
                        {...field}
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
                    <FormControl>
                      <PasswordInput
                        className="font-semibold text-primary"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {otpSent ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link" className="text-gray-500 self-end">
                      Forgot password ?
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Recover password</DialogTitle>
                      <DialogDescription>
                        Please enter the OTP you received.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="otp" className="text-right">
                          OTP
                        </Label>
                        <Input id="otp" className="col-span-3" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        onClick={() => router.push("/auth/forgot-password")}
                      >
                        Submit
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link" className=" text-gray-500 self-end">
                      Forgot password ?
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Recover password</DialogTitle>
                      <DialogDescription>
                        Please provide your email to recover your password.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                          Email
                        </Label>
                        <Input id="email" className="col-span-3" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={() => setOtpSent(true)}>
                        Submit
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
              <div className="flex flex-col gap-y-4 w-full">
                <Button className="w-full" type="submit">
                  Submit
                </Button>

                <span className="md:hidden text-primary text-center text-sm">
                  Don't have an account ?
                  <Link
                    href="/auth/signup"
                    className="text-primary ml-2 underline"
                  >
                    Signup
                  </Link>
                </span>
              </div>
            </form>
          </Form>
        </section>
      </div>
    </main>
  );
};
export default signinPage;
