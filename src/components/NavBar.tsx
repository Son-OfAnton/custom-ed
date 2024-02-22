"use client";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent mt-5">
      <div className="w-full flex justify-between flex-wrap">
        <div className="text-2xl font-bold md:ml-20 ml-3">Custom-ed</div>

        <div className="hidden md:flex flex-1 justify-end">
          <div className="flex items-center">
            <ul className="flex">
              <li className="mr-20">
  <a className="bg-hover-blue hover:text-blue-500">About us</a>
</li>
              <li className="mr-20">
                <a className="bg-hover-blue hover:text-blue-500">Login</a>
              </li>
              <li className="mr-20">
                <a className="bg-hover-blue hover:text-blue-500">Register</a>
              </li>
            </ul>
          </div>

          <div className="mr-14">
            <Button asChild>
        <Link href="/"> 
              Contact us    
        </Link>
      </Button>
          </div>
        </div>

        <div className="md:hidden flex items-center mr-5">
          <button onClick={toggle}>
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        <div
          className={`${
            isOpen ? "fixed top-0 left-0 w-full" : "hidden"
          } md:hidden bg-white z-50`}
        >
          <div className="flex flex-col items-center py-8">
            <button onClick={toggle} className="mb-4">
              <X size={30} />
            </button>
            <ul className="flex flex-col items-center">
              <li className="my-3">
                 <a className="bg-hover-blue hover:text-blue-500">About us</a>
              </li>
              <li className="my-3">
                 <a className="bg-hover-blue hover:text-blue-500">Login</a>
              </li>
              <li className="my-3">
                 <a className="bg-hover-blue hover:text-blue-500">Register</a>
              </li>
              <li className="my-3">
                <Button asChild>
        <Link href="/"> 
              Contact us    
        </Link>
      </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
