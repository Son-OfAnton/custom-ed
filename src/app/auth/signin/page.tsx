"use client"

import { Input } from "@/components/ui/input"
<<<<<<< HEAD
=======
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
>>>>>>> f487309 (feat: Complete signup page)
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
<<<<<<< HEAD
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please enter a valid email format" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must contain at least 8 characters" }),
})

type FormType = z.infer<typeof formSchema>

const signinPage = () => {
=======
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
  })

type FormType = z.infer<typeof formSchema>

const signupPage = () => {
>>>>>>> f487309 (feat: Complete signup page)
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (values: FormType) => {
    console.log(values)
  }
<<<<<<< HEAD
  
  const router = useRouter()
  const [otpSent, setOtpSent] = useState(false)
=======
>>>>>>> f487309 (feat: Complete signup page)

  return (
    <main className="flex h-screen w-screen justify-center items-center bg-[url(/signup-bg.jpg)]">
      <div className="flex h-[80vh] w-[80vw] shadow-lg">
<<<<<<< HEAD
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
=======
        <section className="hidden lg:flex lg:flex-col lg:justify-center lg:items-center gap-8 rounded-l-2xl w-1/2 bg-[#292929]">
          <h1 className="text-white text-3xl font-extrabold">
            Begin Your Journey
          </h1>
          <Image
            src="/signup-illustration.svg"
            width={300}
            height={300}
            alt="Signup Illustration"
          />
          <Link className="text-primary-foreground hover:underline" href="/">
            Don't have an account ?{" "}
          </Link>
>>>>>>> f487309 (feat: Complete signup page)
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
<<<<<<< HEAD
              method="POST"
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col w-3/4 space-y-6"
=======
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-3/4 space-y-6"
>>>>>>> f487309 (feat: Complete signup page)
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
<<<<<<< HEAD
              {otpSent ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="link"
                      className="text-gray-500 self-end"
                    >
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
                      <Button type="submit" onClick={() => router.push("/auth/forgot-password")}>
                        Submit
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="link"
                      className=" text-gray-500 self-end"
                    >
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
=======
              <Button className="w-full" type="submit">
                Submit
              </Button>
>>>>>>> f487309 (feat: Complete signup page)
            </form>
          </Form>
        </section>
      </div>
    </main>
  )
}
<<<<<<< HEAD
export default signinPage
=======
export default signupPage
>>>>>>> f487309 (feat: Complete signup page)
