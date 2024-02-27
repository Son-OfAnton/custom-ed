"use client"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { cn } from "@/lib/utils"
import Link from "next/link"

const formSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Please enter a valid email format" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Password must contain at least 8 characters" }),
    confirmPassword: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Password must contain at least 8 characters" }),
    role: z.string({ required_error: "Role is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
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
        <section className="flex flex-col items-center justify-center rounded-l-2xl lg:w-1/2 w-full bg-slate-50">
          <div className="space-y-4 mb-10">
            <h2 className="text-primary text-center text-xl font-bold">
              Signup
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="font-semibold text-primary"
                        type="password"
                        placeholder="Confirm Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger
                            className={cn(
                              "font-semibold text-muted-foreground",
                              {
                                "text-primary": field.value !== undefined,
                              }
                            )}
                          >
                            <SelectValue placeholder="Role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem
                            className="font-semibold text-primary"
                            value="teacher"
                          >
                            Teacher
                          </SelectItem>
                          <SelectItem
                            className="font-semibold text-primary"
                            value="student"
                          >
                            Student
                          </SelectItem>
                        </SelectContent>
                      </Select>
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

        <section className="hidden lg:flex lg:flex-col lg:justify-center lg:items-center gap-8 rounded-r-2xl w-1/2 bg-[#292929]">
          <h1 className="text-white text-3xl font-extrabold">
            Begin Your Journey
          </h1>
          <Image
            src="/signup-illustration.svg"
            width={300}
            height={300}
            alt="Signup Illustration"
          />
          <Link className="text-primary-foreground hover:underline" href="/">Already have an account ? </Link>
        </section>
      </div>
    </main>
  )
}
export default signupPage
