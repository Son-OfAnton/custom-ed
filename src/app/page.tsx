"use client";

import analytics from "../../public/assets/analytics.svg";
import backgroundImage from "../../public/assets/background-home.svg";
import filemanager from "../../public/assets/file_manager.svg";
import landingPage from "../../public/assets/landing-page.svg";
import announcement from "../../public/assets/news.svg";
import forum from "../../public/assets/online_discussion.svg";
import path from "../../public/assets/personalized path.svg";
import assesments from "../../public/assets/questions.svg";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="md:flex block h-screen w-screen md:justify-center justify-between items-center  md:bg-cover md:bg-center md:bg-no-repeat md:bg-[url(../../public/assets/background-home.svg)]">
          <div className="z-30 h-fill justify-between">
            <NavBar />

            <div className="md:grid md:grid-cols-12 block gap-4 md:mt-8 mt-20 items-center w-fill">
              <div className="col-span-5 md:ml-20 ml-0 mx-auto">
                <h1 className="md:text-4xl text-2xl font-bold mb-5 md:ml-0 ml-4 md:pt-0 pt-9">
                  Discover Your Unique Path to Learning.
                </h1>
                <p className="mt-2 md:text-small mb-10 md:ml-0 mx-4">
                  Unlock Your Potential, With our Personalized Learning
                  platform.
                </p>
                <div className="flex md:justify-start justify-center">
                  <Button asChild>
                    <Link href="/">Join us</Link>
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
      <div className="block md:my-10 w-full">
        <h1 className="text-4xl font-bold text-center">Our Services</h1>
      </div>
      <div className="md:flex block md:justify-center items-center justify-between mb-40">
        <div className="md:grid md:grid-cols-12 md:gap-4 md:mt-20 mt-10 items-center justify-center">
          <div className="col-span-12 md:col-span-6 mx-2 md:mb-0 mb-7 flex justify-center">
            <Card className="hover:scale-105 hover:z-10">
              <CardHeader>
                <CardTitle className="text-2xl">
                  Personalized Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  <Image
                    src={path}
                    alt="discovery"
                    width={500}
                    height={500}
                    className="md:object-cover object-cover"
                  />
                </CardDescription>
              </CardContent>
              <CardFooter>
                Providing a personalized learning experience for every student.
              </CardFooter>
            </Card>
          </div>
          <div className="col-span-12 md:col-span-6 mx-2 md:mb-0 mb-7 flex justify-center">
            <Card className="hover:scale-105 hover:z-10">
              <CardHeader>
                <CardTitle className="text-2xl">
                  Detailed Insight of your students
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  <Image
                    src={analytics}
                    alt="discovery"
                    width={500}
                    height={500}
                    className="md:object-cover object-cover"
                  />
                </CardDescription>
              </CardContent>
              <CardFooter>
                Analytics pinpoint student weaknesses and strengths.
              </CardFooter>
            </Card>
          </div>
          <div className="col-span-12 md:col-span-6 mx-2 md:mb-0 mb-7 flex justify-center">
            <Card className="hover:scale-105 hover:z-10">
              <CardHeader>
                <CardTitle className="text-2xl">Forums</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  <Image
                    src={forum}
                    alt="Forum"
                    width={500}
                    height={500}
                    className="md:object-cover object-cover"
                  />
                </CardDescription>
              </CardContent>
              <CardFooter>
                Engage in online discussions and collaborate with other
                students.
              </CardFooter>
            </Card>
          </div>
          <div className="col-span-12 md:col-span-6 mx-2 md:mb-0 mb-7 flex justify-center">
            <Card className="hover:scale-105 hover:z-10">
              <CardHeader>
                <CardTitle className="text-2xl">Classrooms</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  <Image
                    src={filemanager}
                    alt="File Manager"
                    width={500}
                    height={500}
                    className="md:object-cover object-cover"
                  />
                </CardDescription>
              </CardContent>
              <CardFooter>
                Efficiently organize learning materials in dedicated classrooms.
              </CardFooter>
            </Card>
          </div>
          <div className="col-span-12 md:col-span-6 mx-2 md:mb-0 mb-7 flex justify-center">
            <Card className="hover:scale-105 hover:z-10">
              <CardHeader>
                <CardTitle className="text-2xl">Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  <Image
                    src={announcement}
                    alt="Announcements"
                    width={500}
                    height={500}
                    className="md:object-cover object-cover"
                  />
                </CardDescription>
              </CardContent>
              <CardFooter>
                Stay updated with important news and announcements.
              </CardFooter>
            </Card>
          </div>
          <div className="col-span-12 md:col-span-6 mx-2 md:mb-0 mb-7 flex justify-center">
            <Card className="hover:scale-105 hover:z-10">
              <CardHeader>
                <CardTitle className="text-2xl">Assessments</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  <Image
                    src={assesments}
                    alt="Assessments"
                    width={500}
                    height={500}
                    className="md:object-cover object-cover"
                  />
                </CardDescription>
              </CardContent>
              <CardFooter>
                Measure student progress with interactive assessments.
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
