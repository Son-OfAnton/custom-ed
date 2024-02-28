"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ChangeEvent, useRef, useState } from "react"

const signupPage = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""])
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  const handleChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value
    if (isNaN(Number(value))) return
    const newOTP = [...otp]
    newOTP[index] = value
    setOtp(newOTP)

    if (value !== "" && index < inputRefs.length - 1) {
      inputRefs[index + 1].current!.focus()
    }
  }

  const handleKeyDown = (index: number, event: any) => {
    if (event.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs[index - 1].current!.focus()
    }
  }

  const handleSubmit = () => {
    console.log("OTP: ", otp.join(""))
  }

  return (
    <main className="flex h-screen w-screen justify-center items-center bg-[url(/signup-bg.jpg)]">
      <div className="flex h-[80vh] w-[80vw] shadow-lg">
        <section className="flex flex-col items-center justify-evenly rounded-l-2xl lg:w-1/2 w-full bg-slate-50">
          <h2 className="mb-6 text-primary text-center text-xl font-bold">
            OTP Verification
          </h2>
          <div className="w-3/4 flex flex-col gap-24 items-center">
            <div>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  value={digit}
                  maxLength={1}
                  className="text-text_primary font-semibold rounded-md w-12 bg-input px-4 py-2 mx-3 justify-center outline-none focus:border-2 focus:border-primary"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(index, e)
                  }
                  onKeyDown={(e: any) => handleKeyDown(index, e)}
                />
              ))}
            </div>
            <Button className="w-full" onClick={handleSubmit}>Verify</Button>
          </div>
        </section>

        <section className="hidden lg:flex lg:flex-col lg:justify-center lg:items-center gap-8 rounded-r-2xl w-1/2 bg-[#292929]">
          <h1 className="text-white text-3xl font-extrabold">
            Verify Your Email
          </h1>
          <Image
            src="/signup-illustration.svg"
            width={300}
            height={300}
            alt="Signup Illustration"
          />
          <span className="text-primary-foreground">
            Didn't get the code ?
            <Button
              variant="link"
              className="text-primary-foreground font-normal"
            >
              Resend
            </Button>
          </span>
        </section>
      </div>
    </main>
  )
}
export default signupPage
