"use client";

import LeftSideBar from "@/components/LeftSideBar";
import SearchAndBell from "@/components/searchAndBell";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { School, User, MessagesSquare, Users, Trash, Pencil } from "lucide-react";
import React from "react";
import Link from "next/link"
interface Course {
  courseTitle: string;
  numberOfStudents: number;
}

const courseList: Course[] = [
  {
    courseTitle: "Mathematics",
    numberOfStudents: 30,
  },
  {
    courseTitle: "English Literature",
    numberOfStudents: 25,
  },
  {
    courseTitle: "Computer Science",
    numberOfStudents: 20,
  },
  {
    courseTitle: "History",
    numberOfStudents: 15,
  },
  {
    courseTitle: "Physics",
    numberOfStudents: 18,
  },
  {
    courseTitle: "Physics",
    numberOfStudents: 18,
  },
  {
    courseTitle: "Physics",
    numberOfStudents: 18,
  },
];

const ListOfClassroomPage = () => {
  return (
    <div className="md:flex overflow-x-hidden md:w-11/12 md:ml-auto h-screen">
      <div className="flex-1 mt-20 md:pl-40">
        <div>
          <SearchAndBell />
        </div>

        <div className="md:grid  md:grid-cols-2 lg:grid-cols-3 gap-4  md:mx-7 left-0 mx-auto ">
          {courseList.map((course) => (
            <div key={course.courseTitle} className="w-full mb-2 md:mb-0">
              <Card>
                <CardHeader>
                  <CardTitle>{course.courseTitle}</CardTitle>
                </CardHeader>

                <CardFooter>
                  <div className="flex items-center  w-full justify-between">
                    <div className="flex items-center">
                      <Users size={20} className="mr-2" />
                      <p>{course.numberOfStudents}</p>
                    </div>
                    <div className="flex">
                      <button>
                        <Trash size={20} className="md:mr-5 mr-3" />
                      </button>
                      <button>
                        <Pencil size={20} />
                      </button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
        <div className="ml-8 mt-10 block">
          <Button><Link href ="/teacher/classroom/createClassroom">Create Classroom</Link></Button>
        </div>
      </div>
    </div>
  );
};

export default ListOfClassroomPage;