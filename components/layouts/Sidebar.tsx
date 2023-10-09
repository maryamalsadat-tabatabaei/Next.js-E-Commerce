"use client";
import { AuthContext } from "@/context/AuthContext";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window?.innerWidth >= 768);
    };

    window?.addEventListener("resize", handleResize);
    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  interface LinkItem {
    href: string;
    text: string;
  }

  interface SidebarLinkProps {
    href: string;
    text: string;
  }

  const SidebarLink: React.FC<SidebarLinkProps> = ({ href, text }) => (
    <li>
      <Link
        href={href}
        passHref
        className="block py-3 px-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md transition-all duration-300 ease-in-out"
      >
        {text}
      </Link>
    </li>
  );

  const AdminLinks: React.FC = () => {
    const adminLinks: LinkItem[] = [
      { href: "/admin/products/new", text: "New Product (Admin)" },
      { href: "/admin/products", text: "All Products (Admin)" },
      { href: "/admin/products/stats", text: "Stats (Admin)" },
      { href: "/admin/orders", text: "All Orders (Admin)" },
      { href: "/admin/users", text: "All Users (Admin)" },
      { href: "/admin/users/top-users", text: "Top Users (Admin)" },
    ];

    return (
      <>
        {adminLinks.map((link, index) => (
          <SidebarLink key={index} href={link.href} text={link.text} />
        ))}
      </>
    );
  };

  interface UserLinksProps {
    logoutHandler: () => void;
  }

  const UserLinks: React.FC<UserLinksProps> = ({ logoutHandler }) => {
    const userLinks: LinkItem[] = [
      { href: "/profile", text: "Your Profile" },
      { href: "/profile/orders", text: "Orders" },
      { href: "/profile/update", text: "Update Profile" },
      { href: "/profile/update-password", text: "Update Password" },
    ];

    return (
      <>
        {userLinks.map((link, index) => (
          <SidebarLink key={index} href={link.href} text={link.text} />
        ))}
        <li>
          <a
            onClick={logoutHandler}
            className="block py-3 px-2 text-red-800 hover:bg-red-100 hover:text-white-500 rounded-md cursor-pointer transition-all duration-300 ease-in-out"
          >
            Logout
          </a>
        </li>
      </>
    );
  };

  const logoutHandler = () => {
    signOut();
  };

  return (
    <aside
      className={`w-full md:w-1/3 lg:w-1/4 px-4 mb-4 md:mb-0 ${
        isOpen ? "md:block" : "md:hidden"
      }`}
    >
      <button
        onClick={toggleSidebar}
        className="md:hidden mb-5 w-full text-center px-4 py-2 inline-block text-lg text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
      >
        {isOpen ? "Close Sidebar" : "Open Sidebar"}
      </button>
      {(isOpen || window?.innerWidth >= 768) && (
        <div className="sidebar bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Navigation</h2>
          <ul className="text-gray-500">
            {user?.role === "admin" && <AdminLinks />}
            <UserLinks logoutHandler={logoutHandler} />
          </ul>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
