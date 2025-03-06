"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "./Button";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const showHeader = pathname === "/";

  return (
    showHeader && (
      <header className="px-4 pb-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/logo_ClassConnect_transparent.webp"
              alt="ClassConnect Logo"
              width={192}
              height={192}
              priority
              className="max-w-full object-contain"
            />
          </div>
          <nav className="mt-4 md:mt-0 text-lg text-gray-600">
            <ul className="flex space-x-4">
              <li className="hover:text-blue-500">
                <Link href="#about">About</Link>
              </li>
              <li className="hover:text-blue-500">
                <Link href="#services">Services</Link>
              </li>
              <li className="hover:text-blue-500">
                <Link href="#faq">FAQ</Link>
              </li>
              <li className="hover:text-blue-500">
                <Link href="#contact">Contact</Link>
              </li>
            </ul>
          </nav>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
            <Button background={"login"}>
              <Link href="/auth?activeTab=login">Login</Link>
            </Button>
            <Button background={"signup"}>
              <Link href="/auth?activeTab=signup">Signup</Link>
            </Button>
          </div>
        </div>
      </header>
    )
  );
}
