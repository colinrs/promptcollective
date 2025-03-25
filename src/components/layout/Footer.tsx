
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-8">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent mb-4">
              PromptShare
            </h2>
            <p className="text-gray-600 max-w-xs">
              Create, share, and discover powerful prompts for AI assistants
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-4">
            <div className="flex flex-col gap-2">
              <h3 className="font-medium text-gray-800 mb-1">Resources</h3>
              <Link to="/gallery" className="text-gray-600 hover:text-primary transition-colors">
                Explore Prompts
              </Link>
              <Link to="/create" className="text-gray-600 hover:text-primary transition-colors">
                Create New
              </Link>
              <Link to="/categories" className="text-gray-600 hover:text-primary transition-colors">
                Categories
              </Link>
            </div>
            
            <div className="flex flex-col gap-2">
              <h3 className="font-medium text-gray-800 mb-1">Account</h3>
              <Link to="/auth?mode=login" className="text-gray-600 hover:text-primary transition-colors">
                Login
              </Link>
              <Link to="/auth?mode=register" className="text-gray-600 hover:text-primary transition-colors">
                Sign up
              </Link>
              <Link to="/my-prompts" className="text-gray-600 hover:text-primary transition-colors">
                My Prompts
              </Link>
            </div>
            
            <div className="flex flex-col gap-2 col-span-2 md:col-span-1 mt-4 md:mt-0">
              <h3 className="font-medium text-gray-800 mb-1">Legal</h3>
              <Link to="/privacy" className="text-gray-600 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-600 hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 mt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 sm:mb-0">
            © {new Date().getFullYear()} PromptShare. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-500 hover:text-primary transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-primary transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-primary transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
