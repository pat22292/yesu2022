import React, { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head';
import Cookie from 'js-cookie'
import { useRouter } from 'next/router';
import localForage from "localforage";
import { connect } from "react-redux"
import { signOut } from "../redux/actions/main"
import { Transition } from "@headlessui/react";

// import Logo from '../public/Untitled-2.png'


function Navbar(props, { children, position, productTitle }) {

  const [isOpen, setIsOpen] = useState(false);

  return (

    <div className="container max-w-full mx-auto items-center w-full">
      <div>
        <nav className="bg-transparent">
          <div className=" hidden xl:inline-block max-w-full absolute lg:px-24  w-full pt-9">
            <div className="flex  w-full justify-between">
              <div className="flex items-center justify-between w-full ">


                <svg onClick={() => { }} className="cursor-pointer" width="199" height="50" viewBox="0 0 199 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M25.3023 22.2182C24.1444 22.2182 23.5646 23.6158 24.3832 24.4333L28.9945 29.037C29.2382 29.2805 29.5688 29.4171 29.9136 29.4171H41.2149C42.3718 29.4171 42.9521 28.0217 42.1356 27.2035L37.5404 22.5998C37.2965 22.3554 36.9653 22.2182 36.6199 22.2182H25.3023Z" fill="url(#paint0_linear_0_1)" />
                  <path d="M22.5968 11.1164C22.5968 9.96041 23.9967 9.38146 24.8153 10.1989L29.4267 14.8028C29.6704 15.0461 29.8073 15.3761 29.8073 15.7203V48.6995C29.8073 49.8557 28.4074 50.4346 27.5886 49.6171L22.9774 45.0134C22.7336 44.7699 22.5968 44.44 22.5968 44.0958V11.1164Z" fill="url(#paint1_linear_0_1)" />
                  <path d="M12.6824 1.29995C12.6824 0.14392 14.0823 -0.435028 14.9011 0.382418L19.5125 4.98622C19.7562 5.22957 19.8931 5.55963 19.8931 5.90377V38.8831C19.8931 40.039 18.4932 40.6181 17.6744 39.8006L13.0631 35.1967C12.8194 34.9534 12.6824 34.6234 12.6824 34.2793V1.29995Z" fill="url(#paint2_linear_0_1)" />
                  <path d="M2.21871 0.382715C1.39995 -0.43473 0 0.144217 0 1.30024V7.81103C0 8.15517 0.136923 8.48523 0.380665 8.72856L8.37193 16.707C9.18993 17.5236 10.5886 16.9465 10.5907 15.7917L10.602 9.29225C10.6026 8.94732 10.4657 8.61633 10.2214 8.37243L2.21871 0.382715Z" fill="url(#paint3_linear_0_1)" />
                  <path d="M67.6529 21.925L74.3999 8.60791H81.7886L71.0598 28.3624V34.6559V40.9495H64.246V28.5836L53.5173 8.60791H60.9501L67.6529 21.925ZM95.5703 20.5535C94.1398 20.5535 93.019 21.0107 92.2075 21.925C91.3966 22.8246 90.9322 24.1077 90.8138 25.7742H100.282C100.252 24.1077 99.8176 22.8246 98.9766 21.925C98.1362 21.0107 97.0007 20.5535 95.5703 20.5535ZM96.5217 41.3919C92.5394 41.3919 89.4275 40.2932 87.186 38.0958C84.9446 35.8984 83.8239 32.7866 83.8239 28.7606C83.8239 24.6165 84.8562 21.4162 86.9204 19.1598C88.9999 16.8887 91.8683 15.7531 95.5261 15.7531C99.0213 15.7531 101.742 16.7486 103.689 18.7395C105.635 20.7305 106.609 23.4809 106.609 26.9909V30.2648H90.6592C90.7328 32.182 91.3008 33.6789 92.3627 34.7555C93.4245 35.832 94.9139 36.3704 96.8309 36.3704C98.3208 36.3704 99.7292 36.2155 101.056 35.9058C102.384 35.5961 103.77 35.1021 105.215 34.4237V39.6443C104.035 40.2342 102.774 40.6693 101.432 40.9495C100.091 41.2444 98.4533 41.3919 96.5217 41.3919ZM129.349 33.6051C129.349 36.1417 128.465 38.0737 126.695 39.401C124.94 40.7283 122.307 41.3919 118.797 41.3919C116.998 41.3919 115.465 41.2666 114.196 41.0159C112.928 40.7799 111.741 40.4259 110.635 39.954V34.3794C111.888 34.9693 113.297 35.4634 114.86 35.8615C116.438 36.2598 117.825 36.4588 119.019 36.4588C121.467 36.4588 122.691 35.7509 122.691 34.3352C122.691 33.8042 122.529 33.3766 122.204 33.0521C121.88 32.7129 121.32 32.3369 120.523 31.9239C119.727 31.4963 118.665 31.0022 117.337 30.4418C115.435 29.6454 114.034 28.9081 113.134 28.2297C112.25 27.5512 111.601 26.777 111.188 25.9069C110.79 25.022 110.59 23.9381 110.59 22.655C110.59 20.4576 111.439 18.7617 113.134 17.5671C114.845 16.3578 117.264 15.7531 120.39 15.7531C123.369 15.7531 126.268 16.402 129.084 17.6998L127.049 22.5666C125.81 22.0357 124.652 21.6006 123.576 21.2614C122.499 20.9222 121.401 20.7526 120.28 20.7526C118.289 20.7526 117.293 21.2909 117.293 22.3675C117.293 22.9721 117.61 23.4957 118.245 23.9381C118.894 24.3805 120.302 25.0368 122.47 25.9069C124.402 26.6885 125.817 27.4185 126.717 28.0969C127.617 28.7753 128.28 29.5569 128.708 30.4418C129.136 31.3266 129.349 32.3811 129.349 33.6051ZM152.135 40.9495L151.228 37.7861H150.874C150.151 38.9364 149.126 39.8286 147.799 40.4628C146.472 41.0822 144.96 41.3919 143.264 41.3919C140.358 41.3919 138.169 40.6177 136.694 39.0692C135.219 37.5059 134.482 35.2642 134.482 32.3442V16.2177H141.229V30.663C141.229 32.4475 141.546 33.7895 142.18 34.6891C142.814 35.574 143.824 36.0164 145.211 36.0164C147.098 36.0164 148.462 35.3896 149.303 34.1361C150.144 32.8678 150.564 30.7736 150.564 27.8536V16.2177H157.311V40.9495H152.135Z" fill="#414147" />
                  <path d="M170.382 40.8602H168.158V32.4566H165.311V30.6558H173.229V32.4566H170.382V40.8602ZM177.992 34.4249C177.528 34.4249 177.164 34.5691 176.902 34.8576C176.639 35.1415 176.488 35.5463 176.45 36.0721H179.519C179.51 35.5463 179.369 35.1415 179.096 34.8576C178.824 34.5691 178.455 34.4249 177.992 34.4249ZM178.3 40.9998C177.009 40.9998 176 40.6531 175.273 39.9598C174.547 39.2665 174.183 38.2847 174.183 37.0144C174.183 35.7068 174.518 34.6971 175.187 33.9852C175.862 33.2686 176.792 32.9103 177.977 32.9103C179.111 32.9103 179.993 33.2244 180.624 33.8525C181.255 34.4807 181.571 35.3485 181.571 36.456V37.489H176.399C176.423 38.0939 176.607 38.5662 176.952 38.9059C177.296 39.2455 177.779 39.4154 178.401 39.4154C178.883 39.4154 179.34 39.3665 179.77 39.2688C180.201 39.1711 180.65 39.0152 181.119 38.8012V40.4484C180.736 40.6345 180.328 40.7718 179.892 40.8602C179.457 40.9532 178.926 40.9998 178.3 40.9998ZM186.606 40.9998C184.11 40.9998 182.862 39.6666 182.862 37.0004C182.862 35.6743 183.201 34.6622 183.88 33.9642C184.559 33.2616 185.532 32.9103 186.799 32.9103C187.727 32.9103 188.559 33.0871 189.295 33.4407L188.65 35.088C188.306 34.953 187.985 34.8437 187.689 34.7599C187.392 34.6715 187.096 34.6273 186.799 34.6273C185.661 34.6273 185.092 35.4137 185.092 36.9864C185.092 38.5127 185.661 39.2758 186.799 39.2758C187.22 39.2758 187.61 39.2223 187.968 39.1152C188.327 39.0036 188.686 38.8314 189.044 38.5988V40.4205C188.691 40.6391 188.332 40.7904 187.968 40.8741C187.61 40.9579 187.156 40.9998 186.606 40.9998ZM198.311 40.8602H196.123V36.3024C196.123 35.1764 195.693 34.6133 194.832 34.6133C194.22 34.6133 193.778 34.8157 193.506 35.2206C193.233 35.6254 193.097 36.2815 193.097 37.1888V40.8602H190.909V29.9998H193.097V32.2123C193.097 32.3845 193.08 32.7893 193.047 33.4268L192.996 34.055H193.111C193.599 33.2918 194.373 32.9103 195.435 32.9103C196.377 32.9103 197.092 33.1569 197.579 33.6501C198.067 34.1434 198.311 34.8506 198.311 35.772V40.8602Z" fill="#414147" />
                  <defs>
                    <linearGradient id="paint0_linear_0_1" x1="5" y1="35.4997" x2="33.4999" y2="8.49968" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#5433FB" />
                      <stop offset="1" stopColor="#0CC3E9" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_0_1" x1="5" y1="35.4997" x2="33.4999" y2="8.49968" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#5433FB" />
                      <stop offset="1" stopColor="#0CC3E9" />
                    </linearGradient>
                    <linearGradient id="paint2_linear_0_1" x1="5" y1="35.4997" x2="33.4999" y2="8.49968" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#5433FB" />
                      <stop offset="1" stopColor="#0CC3E9" />
                    </linearGradient>
                    <linearGradient id="paint3_linear_0_1" x1="5" y1="35.4997" x2="33.4999" y2="8.49968" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#5433FB" />
                      <stop offset="1" stopColor="#0CC3E9" />
                    </linearGradient>
                  </defs>
                </svg>




                <div className=" md:block w-max">
                  <div className="flex space-x-24 w-max text-lg">
                    <a
                      href="#"
                      className=" hover:bg-gray-700 hover:text-white text-font-blue px-3 py-2 rounded-md font-normal"
                    >
                      Design
                    </a>

                    <a
                      href="#"
                      className="text-font-blue hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-normal"
                    >
                      Development
                    </a>

                    <a
                      href="#"
                      className="text-font-blue hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-normal"
                    >
                      Pricing
                    </a>



                    <a
                      href="#"
                      className="bg-theme-yesu text-white px-3 py-2 rounded-xl font-medium"
                    >
                      Contact us
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <Transition
            show={isOpen}
            enter=" transition ease-in-out duration-100 transform"
            enterFrom="opacity-75 scale-100"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-100 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-100"
          >
            {(ref) => (
              <div className="md:hidden z-50 absolute bg-white w-full" id="mobile-menu">
                <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 absolute  w-full bg-white z-50 sm:px-3">
                  <a
                    href="#"
                    className="hover:bg-gray-700 text-black block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Dashboard
                  </a>

                  <a
                    href="#"
                    className="text-gray-500 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Team
                  </a>

                  <a
                    href="#"
                    className="text-gray-500 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Projects
                  </a>

                  <a
                    href="#"
                    className="text-gray-500 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Calendar
                  </a>

                  <a
                    href="#"
                    className="text-gray-500 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Reports
                  </a>
                </div>
              </div>
            )}
          </Transition>
        </nav>


        <div className="flex h-screen ">
          {/* <div className="w-screen"> */}
          {/* <!-- Replace with your content --> */}

          {props.children}
          {/* <!-- /End replace --> */}
          {/* </div> */}
        </div>
      </div >

    </div >
  );

}
const mapStateToProps = state => ({
  userInfo: state.main
})

const mapDispatchToProps = {
  signOut: signOut
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
