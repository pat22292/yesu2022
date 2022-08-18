import React, { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head';
import Cookie from 'js-cookie'
import { useRouter } from 'next/router';
import localForage from "localforage";
import { connect } from "react-redux"
import { signOut, getCart, setCartCount } from "../redux/actions/main"
// import { userInfo } from 'os';
// import Logo from '../public/Untitled-2.png'


function Navbar(props, { children, position, productTitle }) {
  const router = useRouter();
  const { userInfo, setUserInfo } = props;
  const [userDetails, setUserDetails] = useState([]);
  const [smProfile, setSmProfile] = useState('');
  // const [cartCount, setCartCount] = useState(0);
  // const [token, setToken] = useState('');
  const [cartCount, setCartCount] = useState(0);
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
  const [backSession, setBackSession] = useState(false);
  React.useEffect(() => {
    // props.getCart();


    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('html');
    if (jssStyles) {
      jssStyles.classList.add(theme);
    }


    localForage.getItem('mini-session').then(async function (value) {
      props.getCart();
      value != null ? setBackSession(true) : setBackSession(false);
      // console.log(value['user'])
      setUserDetails(value['user']);

      setSmProfile(value['smProfileImage']);

      // console.log();
      // setCartCount(userInfo.cart.length);
      // setToken(value['token']);
      // console.log(userDetails);
    }).catch(function (err) {
      // console.log(err);
    });
    localForage.getItem('account-end').then(function (value) {
      // setCartCount(value['cart'].length);
      props.setCartCount(value['cart'].length);
    }).catch(function (err) {
      console.log(err);
    });

    // localForage.getItem('Cart'));
  }, [darkState]);
  const handleThemeChange = () => {
    setDarkState(!darkState);
    Cookie.set("DarkMode", !darkState);

    document.querySelector('html').classList.remove('dark');
    // localStorage.setItem('darkMode',!darkState);

  };


  const [navHidden, setnavHidden] = React.useState(true);
  const handleNavHide = () => {
    setnavHidden(false);
  };
  const handleBodyClick = () => {
    setnavHidden(true);
  };
  // const socialite = () => {


  //   window.open("https://test-lumen-7.herokuapp.com/pos/social-login", "_blank", "toolbar=no,scrollbars=no,resizable=no,top=150,left=600,width=450,height=600");
  // }

  return (
    <div>

      <nav className={`${props.position}  bg-theme-green text-gray-400 w-full z-50 hidden md:block p-0 m-0`}>
        <div className="container h-6 max-w-6xl mx-auto items-center">
          <div className="flex justify-between">
            <div className="items-center">

              <div className="hidden md:block">
                <div className="flex items-center space-x-3">
                  <Link passHref href={{ pathname: '/newProduct' }}
                  >
                    <p className="cursor-pointer px-1 py-1 mt-1 rounded-md text-xs font-normal text-white focus:outline-none focus:text-white focus:bg-gray-700">Add Product</p>
                  </Link>
                  <span className="text-xs font-light text-white">|</span>
                  <a href="#" className="px-1 py-1 mt-1 rounded-md text-xs font-normal text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Offer your Service</a>
                  <span className="text-xs font-light text-white">|</span>
                  <a href="#" className="px-1 py-1 mt-1 rounded-md text-xs font-normal text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Download</a>
                  <span className="text-xs font-light text-white">|</span>
                  <a href="#" className="px-1 py-1 mt-1 rounded-md text-xs font-normal text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Follow us on: </a>

                  <a href="#">
                    <svg className="h-4 w-4" viewBox="0 0 167.7 167.7">
                      <g>
                        <path fill="#FFFFFF" d="M83.8,0.3C37.5,0.3,0,37.9,0,84.2c0,41.5,30.2,75.9,69.8,82.6v-65.1H49.6V78.2h20.2V61
                      c0-20,12.2-31,30.1-31c8.6,0,15.9,0.6,18.1,0.9v20.9l-12.4,0c-9.7,0-11.6,4.6-11.6,11.4v14.9h23.2l-3,23.4H94v65.7
                      c41.5-5,73.6-40.3,73.6-83.2C167.7,37.9,130.1,0.3,83.8,0.3z"/>
                      </g>
                    </svg>
                  </a>

                  <a href="#">
                    <svg className="h-4 w-4" viewBox="0 0 512 512" >
                      <path fill="#FFFFFF" d="M305,256c0,27.1-21.9,49-49,49s-49-21.9-49-49s21.9-49,49-49S305,228.9,305,256z" />
                      <path fill="#FFFFFF" d="M370.6,169.3c-2.4-6.4-6.1-12.2-11-16.9c-4.7-4.9-10.5-8.6-16.9-11c-5.2-2-13-4.4-27.3-5.1
	c-15.5-0.7-20.2-0.9-59.4-0.9c-39.3,0-43.9,0.1-59.4,0.9c-14.3,0.7-22.1,3.1-27.3,5.1c-6.4,2.4-12.2,6.1-16.9,11
	c-4.9,4.7-8.6,10.5-11,16.9c-2,5.2-4.4,13-5.1,27.3c-0.7,15.5-0.9,20.1-0.9,59.4c0,39.3,0.2,43.9,0.9,59.4c0.7,14.3,3,22.1,5.1,27.3
	c2.4,6.4,6.1,12.2,11,16.9c4.7,4.9,10.5,8.6,16.9,11c5.2,2,13,4.4,27.3,5.1c15.5,0.7,20.1,0.9,59.4,0.9c39.3,0,43.9-0.1,59.4-0.9
	c14.3-0.7,22.1-3,27.3-5.1c12.8-4.9,23-15.1,27.9-27.9c2-5.2,4.4-13,5.1-27.3c0.7-15.5,0.9-20.2,0.9-59.4c0-39.3-0.1-43.9-0.9-59.4
	C375,182.3,372.6,174.5,370.6,169.3z M256,331.5c-41.7,0-75.5-33.8-75.5-75.5s33.8-75.5,75.5-75.5c41.7,0,75.5,33.8,75.5,75.5
	S297.7,331.5,256,331.5z M334.5,195.2c-9.7,0-17.6-7.9-17.6-17.6s7.9-17.6,17.6-17.6s17.6,7.9,17.6,17.6
	C352.1,187.3,344.2,195.2,334.5,195.2z"/>
                      <path fill="#FFFFFF" d="M256,0C114.6,0,0,114.6,0,256s114.6,256,256,256s256-114.6,256-256S397.4,0,256,0z M402.1,316.6
	c-0.7,15.6-3.2,26.3-6.8,35.7c-7.6,19.7-23.2,35.4-43,43c-9.3,3.6-20,6.1-35.7,6.8c-15.7,0.7-20.7,0.9-60.6,0.9
	c-39.9,0-44.9-0.2-60.6-0.9c-15.6-0.7-26.3-3.2-35.7-6.8c-9.8-3.7-18.7-9.5-26-17c-7.5-7.3-13.3-16.2-17-26
	c-3.6-9.3-6.1-20-6.8-35.7c-0.7-15.7-0.9-20.7-0.9-60.6s0.2-44.9,0.9-60.6c0.7-15.6,3.2-26.3,6.8-35.7c3.7-9.8,9.5-18.7,17-26
	c7.3-7.5,16.2-13.3,26-17c9.4-3.6,20-6.1,35.7-6.8c15.7-0.7,20.7-0.9,60.6-0.9s44.9,0.2,60.6,0.9c15.6,0.7,26.3,3.2,35.7,6.8
	c9.8,3.7,18.7,9.5,26,17c7.5,7.3,13.3,16.2,17,26c3.6,9.4,6.1,20,6.8,35.7c0.7,15.7,0.9,20.7,0.9,60.6S402.8,300.9,402.1,316.6z"/>
                    </svg>

                  </a>
                </div>

              </div>

            </div>
            <div className="hidden md:block">
              <div className="flex items-center m-1 p-1">
                <button onClick={handleThemeChange} className="flex items-center  border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700" aria-label="Notifications">
                  <svg className="h-5 w-5 relative" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="px-2 rounded-md text-xs font-extralight text-white focus:outline-none focus:text-white focus:bg-gray-700">
                    Notifications
                  </span>
                </button>

                {backSession == true ?
                  <button onMouseOver={handleNavHide} className="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid" id="user-menu" aria-label="User menu" aria-haspopup="true">

                    <img className="h-auto w-6 rounded-full bg-white" src={smProfile} alt="" />
                    <span className="px-2 rounded-md text-xs font-extralight text-white focus:outline-none focus:text-white focus:bg-gray-700">
                      {userDetails['fname']}
                    </span>
                  </button>
                  :


                  <span className=" cursor-pointer rounded-md text-xs font-extralight text-white focus:outline-none focus:text-white focus:bg-gray-700">
                    <Link passHref href={{ pathname: '/signin' }}
                    >
                      Login
                    </Link>
                  </span>}

                <div className="navbar-popup z-50 origin-top-right absolute right-auto lg:right-48 xl:right-96 xl:pt-9  mt-32 w-48 rounded-md shadow-lg" hidden={navHidden}>
                  <div className="py-1 rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">{`${userDetails['first_name']} ${userDetails['last_name']}`}</a>
                    <Link passHref href={{ pathname: '/purchase' }}>
                      <span className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100" role="menuitem">
                        My Purchase</span>
                    </Link>
                    <a onClick={async () => { await props.signOut(); router.reload(); }} className=" cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</a>
                  </div>
                </div>

              </div>
            </div>
            <div className="mr-2 flex md:hidden">

              <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white">

                <svg className="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>

                <svg className="hidden h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="hidden md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700">Dashboard</a>

                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Team</a>

                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Projects</a>

                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Calendar</a>

                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Reports</a>
              </div>
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5 space-x-3">
                  <div className="flex-shrink-0">
                    <img className="h-6 w-6 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-base font-medium leading-none text-white">Tom Cook</div>
                    <div className="text-sm font-medium leading-none text-gray-400">tom@example.com</div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Guest</a>

                  <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">My Purchase</a>

                  <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Sign out</a>
                </div>
              </div>

            </div>
          </div>
        </div>



        <div className="flex justify-between max-w-6xl w-full mx-auto items-center pt-6 pb-4">

          <Link href={{
            pathname: '/',

          }} passHref
          >
            <a >
              {/* onClick={() => router.push('/')} */}
              <div className="flex cursor-pointer" >

                <svg className="relative mr-6 w-28 h-14 text-white" version="1.2" baseProfile="tiny" id="Layer_1"
                  x="0px" y="0px" viewBox="0 0 190 73">
                  <path fill="none" strokeWidth="3" stroke="#fff" strokeMiterlimit="10" d="M155.7,23.5l-1.6-1.6l-2.8,2.8l-2.9-2.9l-2.8,2.9l-2.9-2.9l-2.5,2.6
	l-2.6-2.7l-2.8,2.8l-2.9-2.9l-2.7,2.7c0.9-7.5,6.5-13.3,13.3-13.3C149,11,154.5,16.4,155.7,23.5z"/>
                  {/* <path fill="#fff" d="M-2.6,18.2" /> */}
                  <polyline fill="#fff" points="30.9,2.3 30.9,55.6 40.4,55.6 40.4,2.3 35.6,2.3 " />
                  <polyline fill="#fff" points="167.4,3.1 167.4,53.5 176.1,53.5 176.1,3.1 171.8,3.1 " />
                  <path fill="#fff" d="M187.3,55.5l0.1-11.6h-3.5c-1.1,0-2,0.8-2,1.9l-0.1,9.7h2.8" />
                  <polyline fill="#fff" points="160.7,32.9 188.5,32.9 188.5,23.2 160.7,23.2 160.7,28.1 " />
                  <polyline fill="#fff" points="167.4,55.8 187.3,55.8 187.3,47.6 167.4,47.6 167.4,51.7 " />
                  <polyline fill="#fff" points="45.6,28.7 45.6,47.8 52.6,47.8 52.6,28.7 49.1,28.7 " />
                  <polyline fill="#fff" points="45.6,47 45.6,55.4 52.6,55.4 52.6,47 49.1,47 " />
                  <polyline fill="#fff" points="46,32.9 84.7,32.9 84.7,27.1 46,27.1 46,30 " />
                  <polyline fill="#fff" points="43,26 47,32.2 49.1,31.1 45.2,24.9 44.1,25.4 " />
                  <polyline fill="#fff" points="45.6,47.2 77.7,47.2 77.7,41.2 45.6,41.2 45.6,44.2 " />
                  <polyline fill="#fff" points="45.9,55.4 81.3,55.4 81.3,51.7 45.9,51.7 45.9,53.5 " />
                  <polyline fill="#fff" points="63.7,44.6 63.7,30 62.8,30 62.8,44.6 63.2,44.6 " />
                  <polyline fill="#fff" points="69,44.4 69,29.7 68.1,29.7 68.1,44.4 68.6,44.4 " />
                  <polyline fill="#fff" points="58.1,44.6 58.1,30 57.1,30 57.1,44.6 57.7,44.6 " />
                  <polyline fill="#fff" points="74,36.6 51.8,36.6 51.8,37.5 74,37.5 74,37 " />
                  <ellipse fill="none" stroke="#fff" strokeWidth="8" strokeMiterlimit="10" cx="19.4" cy="37" rx="14" ry="15.4" />
                  <path fill="#fff" d="M128.1,57.9L128.1,57.9z" />
                  <polyline fill="#fff" points="95.7,71.7 95.7,21.6 86,21.6 86,71.7 90.8,71.7 " />
                  <ellipse fill="none" stroke="#fff" strokeWidth="8" strokeMiterlimit="10" cx="106.9" cy="38.3" rx="14" ry="14" />
                  <polygon fill="#fff" points="77.7,47.2 84.7,32.9 73.5,32.9 73.7,46.8 " />
                  <ellipse fill="none" stroke="#fff" strokeWidth="3" strokeMiterlimit="10" cx="50.1" cy="59.2" rx="2.5" ry="2.3" />
                  <ellipse fill="none" stroke="#fff" strokeWidth="3" strokeMiterlimit="10" cx="74.7" cy="59.2" rx="2.5" ry="2.3" />
                  <ellipse fill="none" stroke="#fff" strokeMiterlimit="10" cx="43.4" cy="24.4" rx="1.2" ry="1.1" />
                  <path fill="#004a9f" stroke="#fff" strokeWidth="2" strokeMiterlimit="10" d="M156.9,24.7l-1.2-1.2l-1.6-1.6l-2.8,2.8l-2.9-2.9l-2.8,2.9l-2.9-2.9
	l-2.5,2.6l-2.6-2.7l-2.8,2.8l-2.9-2.9l-3,3l-3.2-3v30.5c0,2.5,2.1,4.6,4.6,4.6h24.3c2.6,0,4.6-2,4.6-4.6V22L156.9,24.7z M142.5,51.8
	c-6.3,0-11.4-5.1-11.4-11.5c0-1.6,0.3-3.1,0.9-4.5c1.7-4.1,5.8-7,10.5-7s8.8,2.9,10.5,7c0.6,1.4,0.9,2.9,0.9,4.5
	C153.9,46.7,148.8,51.8,142.5,51.8z"/>
                </svg>



                {/* <svg className="relative mr-6 w-36 h-14 text-white" x="0px" y="0px" viewBox="0 0 190 73">
              <path fill="#ffff" d="M43.3,14.5l-3.8-3.8l-3.8,3.8l-3.9-3.9L28,14.5l-3.9-3.9l-3.5,3.5L17,10.5l-3.8,3.8l-3.9-3.9l-4.1,4l-4.3-4V52
	c0,3.5,2.8,6.3,6.3,6.3h33.4c3.5,0,6.3-2.8,6.3-6.3V10.9L43.3,14.5z M34,44c-0.3,3-2.1,5.3-4.8,6.6c-1.5,0.7-3.6,1.1-5.2,1
	c-2.5-0.1-4.9-0.6-7.1-1.7c-0.8-0.4-2-1.2-2.9-1.9c-0.4-0.3-0.4-0.5-0.2-0.9c0.1-0.1,0.2-0.3,0.5-0.8c0.2-0.3,0.5-0.8,0.6-0.9
	c0.3-0.4,0.6-0.4,1-0.1c0,0,0,0,0.2,0.1c0.1,0.1,0.2,0.1,0.2,0.1c2.3,1.7,5,2.7,7.6,2.8c3.6-0.1,6.2-1.8,6.6-4.2
	c0.5-2.7-1.8-5-6-6.3c-1.5-0.4-4.7-1.7-5.6-2.1c-3.1-1.8-4.7-4.1-4.5-7.1c0.3-4.1,4-7.3,8.8-7.3c2.1,0,4.3,0.4,6.3,1.2
	c0.7,0.3,2,1,2.5,1.3c0.5,0.3,0.5,0.5,0.3,1c0,0.1-0.2,0.2-0.5,0.8c-0.4,0.6-0.5,0.7-0.5,0.8c-0.3,0.4-0.5,0.5-1,0.2
	c-2.2-1.4-4.4-2-6.9-2.1c-3.1,0.1-5.4,2-5.5,4.4c0,1.1,0.4,2.1,1.3,2.9c0.9,0.8,2.3,1.5,4.1,2.1C31.4,36.2,34.5,39.2,34,44z"/>
              <path fill="#ffff" d="M62.5,33.2c-1.9,0-3.8,0.6-5.3,1.8L57,35.1V22.3c0-0.4-0.1-0.6-0.6-0.6h-2.3c-0.5,0-0.6,0.1-0.6,0.6v29.3
	c0,0.4,0.1,0.6,0.6,0.6h2.3c0.4,0,0.6-0.1,0.6-0.6V42c0-3,2.5-5.4,5.5-5.4c3,0,5.5,2.4,5.5,5.5v9.5c0,0.5,0.1,0.6,0.6,0.6h2.3
	c0.5,0,0.6-0.1,0.6-0.6V42C71.4,37.2,67.4,33.2,62.5,33.2"/>
              <path fill="#ffff" d="M111.8,50.3c-3.4,0-6.1-2.7-6.2-6V44c0.1-3.4,2.9-6,6.2-6c3.4,0,6.2,2.8,6.2,6.2S115.3,50.3,111.8,50.3 M111.8,34.6
	c-2.2,0-4.3,0.8-6,2.1l-0.2,0.2v-1.7c0-0.5-0.1-0.6-0.6-0.6h-2.2c-0.5,0-0.6,0.1-0.6,0.6v27.6c0,0.5,0.1,0.6,0.6,0.6h2.2
	c0.5,0,0.6-0.1,0.6-0.6V51.3l0.2,0.2c1.7,1.4,3.8,2.1,6,2.1c5.3,0,9.5-4.2,9.5-9.5C121.4,38.9,117.1,34.6,111.8,34.6"/>
              <path fill="#ffff" d="M157.4,50.6c-3.4,0-6.1-2.7-6.2-6v-0.3c0.1-3.4,2.9-6,6.2-6c3.4,0,6.2,2.8,6.2,6.2S160.9,50.6,157.4,50.6 M157.4,34.9
	c-2.2,0-4.3,0.8-6,2.1l-0.2,0.2v-1.7c0-0.5-0.1-0.6-0.6-0.6h-2.2c-0.5,0-0.6,0.1-0.6,0.6v27.6c0,0.5,0.1,0.6,0.6,0.6h2.2
	c0.5,0,0.6-0.1,0.6-0.6V51.6l0.2,0.2c1.7,1.4,3.8,2.1,6,2.1c5.3,0,9.5-4.2,9.5-9.5C167,39.2,162.7,34.9,157.4,34.9"/>
              <path fill="#ffff" d="M87.8,53.4c1.9,0,3.8-0.6,5.3-1.8l0.2-0.1v0.7c0,0.4,0.3,0.8,0.8,0.8h1.9c0.4,0,0.8-0.3,0.8-0.8V35c0-0.3-0.3-0.6-0.6-0.6
	h-2.3c-0.3,0-0.6,0.3-0.6,0.6v9.6c0,3-2.5,5.4-5.5,5.4c-3,0-5.5-2.4-5.5-5.5V35c0-0.3-0.3-0.6-0.6-0.6h-2.3c-0.3,0-0.6,0.3-0.6,0.6
	v9.6C78.8,49.4,82.9,53.4,87.8,53.4"/>
              <g>
                <path fill="#ffff" d="M138,53.4l-0.3-2.3h-0.1c-1.2,1.5-3.5,2.8-6.5,2.8c-4.3,0-6.5-2.7-6.5-5.4c0-4.5,4.6-7,12.8-6.9v-0.4
		c0-1.5-0.5-4.3-4.8-4.3c-2,0-4.1,0.5-5.6,1.4L126,36c1.8-1,4.3-1.7,7-1.7c6.5,0,8.1,3.9,8.1,7.6v7c0,1.6,0.1,3.2,0.4,4.5H138z
		 M137.4,43.9c-4.2-0.1-9,0.6-9,4.2c0,2.2,1.7,3.2,3.7,3.2c2.8,0,4.5-1.5,5.2-3.1c0.1-0.3,0.2-0.7,0.2-1.1V43.9z"/>
              </g>
              <g>
                <path fill="#ffff" d="M175,35.6l4.4,12.2c0.5,1.4,1,3,1.3,4.2h0.1c0.4-1.2,0.8-2.8,1.3-4.3l4-12.1h3.9l-5.5,14.7c-2.6,7.1-4.4,10.7-7,12.9
		c-1.8,1.6-3.6,2.3-4.5,2.4l-0.9-3.1c0.9-0.3,2.1-0.9,3.2-1.8c1-0.8,2.3-2.3,3.1-4.2c0.2-0.4,0.3-0.7,0.3-0.9c0-0.2-0.1-0.5-0.3-1
		l-7.5-19H175z"/>
              </g>
            </svg> */}


              </div>
            </a>
          </Link>

          <div className="mr-12 ml-6 relative text-gray-600 w-full">
            {/* sm:block hidden */}
            <input className={`${router.pathname == '/product' ? ('sm:block hidden') : ('block')} border-2 border-gray-300 bg-white w-full h-10 px-5 text-sm focus:outline-none`}
              type="search" name="search" placeholder="Search" />
            <button type="submit" className="absolute right-0 top-0 mt-1 mr-1 bg-center bg-cover  w-16">
              <svg className=" text-white h-8 w-16 fill-current p-2 bg-theme-green" viewBox="0 0 56.966 56.966" width="512px" height="512px">
                <path
                  d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </div>
          <span className="relative inline-block">
            {/* <svg className="w-6 h-6 text-gray-700 fill-current" viewBox="0 0 20 20"><path d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" fill-rule="evenodd"></path></svg> */}
            <Link passHref href={{ pathname: '/cart' }}>
              <button className="flex mr-16 items-center p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700" aria-label="Notifications">
                <svg className="w-6 h-6 mt-1 fill-current" viewBox="0 0 446.9 446.9" >
                  <g>
                    <path fill="#FFFFFF" d="M444.3,93.4c-2.6-3.7-6.7-5.9-11.1-6.1L155.9,75.3c-8-0.3-14.6,5.8-14.9,13.7c-0.3,7.9,5.8,14.6,13.7,14.9
            l258.4,11.1l-50.8,158.5H136.2L95.4,51.2c-0.9-4.9-4.2-8.9-8.9-10.8L19.6,14.1C12.2,11.3,3.9,14.9,1,22.2
            c-2.9,7.4,0.7,15.7,8.1,18.6l59.5,23.4l41.6,226.3c1.3,6.8,7.2,11.7,14.1,11.7h6.9L115.4,346c-1.3,3.7-0.8,7.7,1.5,10.9
            c2.2,3.2,5.9,5.1,9.8,5.1h11c-6.8,7.6-11,17.6-11,28.7c0,23.7,19.3,43,43,43s43-19.3,43-43c0-11-4.2-21.1-11-28.7h93.8
            c-6.8,7.6-11,17.6-11,28.7c0,23.7,19.3,43,43,43c23.7,0,43-19.3,43-43c0-11-4.2-21.1-11-28.7h13.4c6.6,0,11.9-5.3,11.9-11.9
            c0-6.6-5.3-11.9-11.9-11.9H143.7l12.9-35.8h216.2c6.2,0,11.8-4,13.7-10l59.7-186.4C447.5,101.7,446.8,97,444.3,93.4z M169.7,409.8
            c-10.5,0-19.1-8.6-19.1-19.1s8.6-19.1,19.1-19.1s19.1,8.6,19.1,19.1S180.2,409.8,169.7,409.8z M327.4,409.8
            c-10.5,0-19.1-8.6-19.1-19.1s8.6-19.1,19.1-19.1s19.1,8.6,19.1,19.1S337.9,409.8,327.4,409.8z"/>
                  </g>
                </svg>
                <span className={`absolute inline-flex items-center justify-center px-2 py-2 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full ${userInfo.cart ? 'block' : 'hidden'}`}>{userInfo.cartLength}</span>
              </button>
            </Link>
          </span>
          {/* <h1>{userInfo.CART}</h1> */}
          {/* <button onClick={handleThemeChange} className="flex mr-16 items-center p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700" aria-label="Notifications">
            <svg className="w-6 h-6 mt-2" viewBox="0 0 446.9 446.9" >
              <g>
                <path fill="#FFFFFF" d="M444.3,93.4c-2.6-3.7-6.7-5.9-11.1-6.1L155.9,75.3c-8-0.3-14.6,5.8-14.9,13.7c-0.3,7.9,5.8,14.6,13.7,14.9
            l258.4,11.1l-50.8,158.5H136.2L95.4,51.2c-0.9-4.9-4.2-8.9-8.9-10.8L19.6,14.1C12.2,11.3,3.9,14.9,1,22.2
            c-2.9,7.4,0.7,15.7,8.1,18.6l59.5,23.4l41.6,226.3c1.3,6.8,7.2,11.7,14.1,11.7h6.9L115.4,346c-1.3,3.7-0.8,7.7,1.5,10.9
            c2.2,3.2,5.9,5.1,9.8,5.1h11c-6.8,7.6-11,17.6-11,28.7c0,23.7,19.3,43,43,43s43-19.3,43-43c0-11-4.2-21.1-11-28.7h93.8
            c-6.8,7.6-11,17.6-11,28.7c0,23.7,19.3,43,43,43c23.7,0,43-19.3,43-43c0-11-4.2-21.1-11-28.7h13.4c6.6,0,11.9-5.3,11.9-11.9
            c0-6.6-5.3-11.9-11.9-11.9H143.7l12.9-35.8h216.2c6.2,0,11.8-4,13.7-10l59.7-186.4C447.5,101.7,446.8,97,444.3,93.4z M169.7,409.8
            c-10.5,0-19.1-8.6-19.1-19.1s8.6-19.1,19.1-19.1s19.1,8.6,19.1,19.1S180.2,409.8,169.7,409.8z M327.4,409.8
            c-10.5,0-19.1-8.6-19.1-19.1s8.6-19.1,19.1-19.1s19.1,8.6,19.1,19.1S337.9,409.8,327.4,409.8z"/>
              </g>
            </svg>


          </button> */}

        </div>

      </nav>



      <nav className="absolute text-gray-400 w-full z-50 md:hidden block">
        <div className="flex justify-between max-w-6xl w-full mx-auto items-center pt-4 pb-4">
          <button className={`${router.pathname == '/product' ? ('sm:hidden block') : ('hidden')} z-50 absolute left-0 top-0 ml-6 mt-5 opacity-75 bg-gray-400 rounded-full p-2`} onClick={() => router.push('/')} type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" className="text-white h-5 w-5 fill-current" viewBox="0 0 20 20" fill="white" >
              <path d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" />
            </svg>
          </button>
          <div className="pt-2 mx-6 relative text-gray-600 w-full">

            {router.pathname == '/product' ? (
              <input className="border-2 sm:block hidden border-gray-300 bg-white w-full h-10 px-5 text-sm focus:outline-none"
                type="search" name="search" placeholder="Search" />
            ) : (
              <input className="border-2 border-gray-300 bg-white w-full h-10 px-5 text-sm focus:outline-none"
                type="search" name="search" placeholder="Search" />
            )}

            <button type="submit" className="sm:block hidden absolute right-0 top-0 mt-5 mr-4">
              <svg className="text-gray-600 h-4 w-4 fill-current" viewBox="0 0 56.966 56.966" width="512px" height="512px">
                <path
                  d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </div>

          <button onClick={handleThemeChange} className="flex  items-center p-1 border-2 border-transparent opacity-75 bg-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700" aria-label="Notifications">
            <svg className="w-7 h-7 sm:p-0 p-1" viewBox="0 0 446.9 446.9" >
              <g>
                <path fill="#FFFFFF" d="M444.3,93.4c-2.6-3.7-6.7-5.9-11.1-6.1L155.9,75.3c-8-0.3-14.6,5.8-14.9,13.7c-0.3,7.9,5.8,14.6,13.7,14.9
            l258.4,11.1l-50.8,158.5H136.2L95.4,51.2c-0.9-4.9-4.2-8.9-8.9-10.8L19.6,14.1C12.2,11.3,3.9,14.9,1,22.2
            c-2.9,7.4,0.7,15.7,8.1,18.6l59.5,23.4l41.6,226.3c1.3,6.8,7.2,11.7,14.1,11.7h6.9L115.4,346c-1.3,3.7-0.8,7.7,1.5,10.9
            c2.2,3.2,5.9,5.1,9.8,5.1h11c-6.8,7.6-11,17.6-11,28.7c0,23.7,19.3,43,43,43s43-19.3,43-43c0-11-4.2-21.1-11-28.7h93.8
            c-6.8,7.6-11,17.6-11,28.7c0,23.7,19.3,43,43,43c23.7,0,43-19.3,43-43c0-11-4.2-21.1-11-28.7h13.4c6.6,0,11.9-5.3,11.9-11.9
            c0-6.6-5.3-11.9-11.9-11.9H143.7l12.9-35.8h216.2c6.2,0,11.8-4,13.7-10l59.7-186.4C447.5,101.7,446.8,97,444.3,93.4z M169.7,409.8
            c-10.5,0-19.1-8.6-19.1-19.1s8.6-19.1,19.1-19.1s19.1,8.6,19.1,19.1S180.2,409.8,169.7,409.8z M327.4,409.8
            c-10.5,0-19.1-8.6-19.1-19.1s8.6-19.1,19.1-19.1s19.1,8.6,19.1,19.1S337.9,409.8,327.4,409.8z"/>
              </g>
            </svg>

          </button>
          <button onClick={handleThemeChange} className="flex mr-2 items-center p-3 border-2 border-transparent hover:text-white focus:outline-none" aria-label="Account">
            <svg xmlns="http://www.w3.org/2000/svg" className=" text-gray-700 h-5 w-5 fill-current" fill="white" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </nav>


      <div onMouseOver={handleBodyClick} className="dark:bg-dark-bg bg-gray-100 sm:py-2 py-0">
        <div className={`${router.pathname == '/product' ? ('sm:block hidden  py-4') : ('hidden')} text-gray-500 container max-w-6xl mx-auto w-full align-middle text-center`} >
          <div className="w-full flex">
            <p className="text-xs">Bulakan Depot</p>

            <svg className="relative  align-middle text-center w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5l7 7-7 7" />
            </svg>
            <p className="text-xs pl-2">Baby Dress</p>

            <svg className="relative  align-middle text-center w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5l7 7-7 7" />
            </svg>
            <p className="text-xs pl-2">{props.productTitle}</p>

          </div>

        </div>
        {/* <header className="bg-white shadow dark:bg-gray-800 ">
      <div className="container max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8 ">
        <h1 className="dark:text-white text-3xl font-bold leading-tight text-gray-900">
          Dashboard
        </h1>
      </div>
    </header> */}
        {/* <main className="sm:max-w-6xl sm:mx-auto sm:px-6 lg:px-0 max-w-full w-full"> */}
        <main className="dark:bg-dark-bg container max-w-6xl min-h-screen mx-auto items-center bg-gray-100">
          {/* <div className="sm:max-w-6xl sm:mx-auto  sm:px-6 lg:px-0 max-w-full"> */}

          {/* <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
        </div> */}

          {props.children}

          {/* </div> */}
        </main>
      </div>
    </div>
  );

}
const mapStateToProps = state => ({
  userInfo: state.main
})

const mapDispatchToProps = {
  signOut: signOut,
  getCart: getCart,
  setCartCount: setCartCount
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
// export default Navbar