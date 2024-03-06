"use client";
import { LogOut, Settings } from "lucide-react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useState } from "react";


interface Item {
  text: string;
  icon: React.ReactNode;
  path: string;
}

interface Props {
  items: Item[];
  currentPage: string;
}

const SideBar = ({ items, currentPage }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <div className="hidden md:flex md:flex-col items-center w-72 shadow-md justify-around h-screen">
        <div className="text-2xl font-bold mx-auto">CustomEd</div>
        <div>
          {items.map((item) => (
            <ul key={item.text}>
              <li className="mx-auto">
                <Link href={item.path} passHref>
                  <span
                    className={`flex items-center mb-20 hover:text-blue-500${
                      currentPage === item.text ? "active-item" : ""
                    }`}
                    style={{
                      width: "100%",
                      padding: "5px 72px",
                      background: `${
                        currentPage === item.text
                          ? "linear-gradient(to bottom, #FFFFFF,  #C6D6FF)"
                          : "none"
                      }`,
                      
                    }}
                  >
                    <span className="mr-7">{item.icon}</span>
                    {item.text}
                  </span>
                </Link>
              </li>
            </ul>
          ))}
        </div>
        <div className="mx-auto">
          <div className="flex items-center mb-14 hover:text-blue-500">
            <LogOut size={30} className="mr-7" />
            <Link href="/">Logout</Link>
          </div>
          <div className="flex items-center hover:text-blue-500">
            <Settings size={30} className="mr-7" />
            <Link href="/">Setting</Link>
          </div>
        </div>
      </div>
       <div className="md:hidden flex items-center ml-5 mt-5">
          <button onClick={toggle}>
            {isOpen ? <X size={30} className="bg" /> : <Menu size={30} />}
          </button>
        </div>
      {isOpen && (
        <div className="md:hidden absolute left-0 bg-white z-50">
      <div className="md:hidden flex flex-col items-center w-72 shadow-md justify-around h-screen">
        <div className="text-2xl font-bold mx-auto">CustomEd</div>
        <div>
          {items.map((item) => (
            <ul key={item.text}>
              <li className="mx-auto">
                <Link href={item.path} passHref>
                  <span
                    className={`flex items-center mb-20 hover:text-blue-500${
                      currentPage === item.text ? "active-item" : ""
                    }`}
                    style={{
                      width: "100%",
                      padding: "5px 72px",
                      background: `${
                        currentPage === item.text
                          ? "linear-gradient(to bottom, #FFFFFF,  #C6D6FF)"
                          : "none"
                      }`,
                      
                    }}
                  >
                    <span className="mr-7">{item.icon}</span>
                    {item.text}
                  </span>
                </Link>
              </li>
            </ul>
          ))}
        </div>
        <div className="mx-auto">
          <div className="flex items-center mb-14 hover:text-blue-500">
            <LogOut size={30} className="mr-7" />
            <Link href="/">Logout</Link>
          </div>
          <div className="flex items-center hover:text-blue-500">
            <Settings size={30} className="mr-7" />
            <Link href="/">Setting</Link>
          </div>
        </div>
      </div>
      </div>)}
    </div>
  );
};

export default SideBar;