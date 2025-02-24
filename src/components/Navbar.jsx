import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import React from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-base-200 shadow-md p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Side - Logo */}
        <NavLink to="/" className="text-2xl font-bold text-primary">
          MyLogo
        </NavLink>

        {/* Middle - Menu (Hidden on small screens) */}
        <ul className="hidden md:flex gap-6 text-lg">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-bold border-b-2 border-primary"
                  : "hover:text-primary"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-memes"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-bold border-b-2 border-primary"
                  : "hover:text-primary"
              }
            >
              Add Memes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-bold border-b-2 border-primary"
                  : "hover:text-primary"
              }
            >
              Profile
            </NavLink>
          </li>
        </ul>

        {/* Right Side - Button */}
        <button className="btn btn-primary hidden md:block">Get Started</button>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <ul className="md:hidden mt-4 space-y-2 bg-base-100 p-4 rounded-lg shadow-lg">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-bold border-b-2 border-primary"
                  : "hover:text-primary"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-menu"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-bold border-b-2 border-primary"
                  : "hover:text-primary"
              }
            >
              Add Memes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-bold border-b-2 border-primary"
                  : "hover:text-primary"
              }
            >
              Profile
            </NavLink>
          </li>
          <li>
            <button
              className="btn btn-primary w-full mt-2"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}
