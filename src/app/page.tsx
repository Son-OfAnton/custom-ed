import backgroundImage from "../../public/assets/background-home.svg";
import landingPage from "../../public/assets/landing-page.svg";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";


export default function Home() {
  return (
    <div className="relative">
      <div className="md:flex block h-screen w-screen md:justify-center justify-between items-center md:bg-cover md:bg-center md:bg-no-repeat md:bg-[url(../../public/assets/background-home.svg)]">
        <div className="z-30 h-fill justify-between">
          <NavBar />

          <div className="md:grid md:grid-cols-12 block gap-4 md:mt-8 mt-20 items-center w-fill">
            <div className="col-span-5 md:ml-20 ml-0 mx-auto">
              <h1 className="md:text-4xl text-2xl font-bold mb-5 md:ml-0 ml-4">
                Discover Your Unique Path to Learning.
              </h1>
              <p className="mt-2 md:text-small mb-10 md:ml-0 ml-4">
                Unlock Your Potential, With our Personalized Learning platform.
              </p>
              <div className="flex md:justify-start justify-center">
              <Button asChild>
        <Link href="/"> 
              Join us   
        </Link>
      </Button>
              </div>
            </div>
            <div className="col-span-7 md:flex md:justify-end md:mt-5 mt-20">
              <div className="flex justify-center md:justify-end">
                <div className="max-w-screen-md">
                  <Image
                    src={landingPage}
                    alt="discovery"
                    width={1000}
                    height={600}
                    className="md:object-cover object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}