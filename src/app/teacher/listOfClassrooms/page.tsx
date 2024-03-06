
import SideBar from "@/components/leftSideBar";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  School,
  User,
  MessagesSquare,
  Users,
  Trash,
  Pencil,
  Search,
  BellRing
} from "lucide-react";
import React from "react";
import {Button}from "@/components/ui/button";
import {Input} from "@/components/ui/input";
const items = [
  {
    text: "Classroom",
    icon: <School size={30} />,
    path: "/teacher/createClassroom",
  },
  {
    text: "Profile",
    icon: <User size={30} />,
    path: "/teacher/createClassroom",
  },
  {
    text: "Messages",
    icon: <MessagesSquare size={30} />,
    path: "/teacher/createClassroom",
  },
];

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
];

const Page = () => {
  return (
    <div className="flex">
      <div>
        <SideBar items={items} currentPage="Classroom" />
      </div>
      <div className="flex-1 mt-20">
    
   <div className="flex ml-7 mb-9 items-center">
        <BellRing size={25} className="" />
        <div className="relative flex items-center ml-3">
            <Search size={17} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <Input placeholder="Search" className="py-2 px-16 mr-10 w-12/12"></Input>
    </div>
   </div>




        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-7">
          {courseList.map((course) => (
            <div key={course.courseTitle}>
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
                        <Trash size={20} className="mr-5" />
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
      <div className="text-center mt-10 block">
        <Button>Create Classroom</Button>
      </div>
      </div>
      </div>
    
  );
};

export default Page;
