import React, { useState } from 'react'
import Head from 'next/head';
import Cookie from 'js-cookie'
// import Logo from '../public/Untitled-2.png'


function Footer() {

  const dm = () => {
    if (Cookie.get("DarkMode") == "true") {
      return true;
    }
    else {
      return false;
    }
  }
  const [darkState, setDarkState] = useState(dm);
  const theme = darkState ? "dark" : "light";

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('html');
    if (jssStyles) {
      jssStyles.classList.add(theme);
    }
  }, [darkState]);
  const handleThemeChange = () => {
    setDarkState(!darkState);
    Cookie.set("DarkMode", !darkState);

    document.querySelector('html').classList.remove('dark');
    // localStorage.setItem('darkMode',!darkState);

  };

  const [navHidden, setnavHidden] = React.useState(true);
  const handleNavHide = () => {
    setnavHidden(!navHidden);
  };
  const handleBodyClick = () => {
    setnavHidden(true);
  };


  return (
    <div className="bg-gray-100 dark:bg-theme-green text-black dark:text-white">
      <div className="relative flex flex-wrap justify-center bg-gray-white px-3">
        <div className="flex flex-wrap mb-4 w-full sm:max-w-6xl sm:mx-auto sm:px-6 lg:px-0 max-w-full">
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 ">
            <h3 className="text-3xl py-4">About Us</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </p>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 sm:pl-8 pl-0">
            <h3 className="text-3xl py-4">Links</h3>
            <ul>
              <li><a href="#">Link</a></li>
              <li><a href="#">Link</a></li>
              <li><a href="#">Link</a></li>
              <li><a href="#">Link</a></li>
              <li><a href="#">Link</a></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 ">
            <h3 className="text-3xl py-4">Links</h3>
            <ul>
              <li><a href="#">Link</a></li>
              <li><a href="#">Link</a></li>
              <li><a href="#">Link</a></li>
              <li><a href="#">Link</a></li>
              <li><a href="#">Link</a></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4">
            <h3 className="text-3xl py-4">Subscribe</h3>
            <form >
              <div className="mb-4">
                <input className="bg-gray-200 dark:bg-gray-900  dark:text-white  appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="Email" />
              </div>
              <button className="bg-theme-blue hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 dark:bg-gray-900 text-black dark:text-white p-2 pl-6">
        <p className="bottom">© Copyright 2020 - W3hubs.com</p>
      </div>
    </div>
  );

}

export default Footer