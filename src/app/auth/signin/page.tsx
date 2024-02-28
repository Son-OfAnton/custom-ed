"use client"

import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const formSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please enter a valid email format" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must contain at least 8 characters" }),
})

type FormType = z.infer<typeof formSchema>

const signupPage = () => {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (values: FormType) => {
    console.log(values)
  }

  return (
    <main className="flex h-screen w-screen justify-center items-center bg-[url(/signup-bg.jpg)]">
      <div className="flex h-[80vh] w-[80vw] shadow-lg">
        <section className="hidden lg:flex lg:flex-col lg:justify-center lg:items-center gap-8 rounded-l-2xl w-1/2 bg-[#292929]">
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
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-3/4 space-y-6"
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
                      <Input
                        className="font-semibold text-primary"
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </section>
      </div>
    </main>
  )
}
export default signupPage
