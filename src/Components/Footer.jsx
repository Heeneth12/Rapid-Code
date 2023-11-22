import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white shadow m-4 dark:bg-gray-800"
    style={{marginBottom:"0px", marginLeft:"0px" , marginRight:"0px", padding:"1px"}}>
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023 <a href="https://github.com/Heeneth12" className="hover:underline">Flowbite™</a>. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/heeneth-sai-b78173216/" className="hover:underline">Contact</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
