import React from 'react';
import dynamic from 'next/dynamic'
import axios from 'axios';
import { connect } from "react-redux"
import { setProducts, setSelectedProductsNull } from "../redux/actions/product"
import NavBar from "../Layouts/Navbar"
import Footer from "../Layouts/footer"
import Head from 'next/head';


const DynamicTable = dynamic(() => import('../components/table'),
      { loading: () => <p>...</p> }
)

function Home(props) {
      const { useState, useEffect } = React;
      const { product, setProduct } = props;
      // const [selectedFile, setselectedFile] = useState(null);
      const [openModal, setOpenModal] = useState(true);
      const _setSelectedProductsNull = (e) => {
            props.setSelectedProductsNull(e);
      }

      useEffect(() => {
            props.setProducts();
      }, [])


      const LargeSVGBanner = () => {
            return (
                  <svg className=' hidden lg:inline-block w-full h-screen absolute' viewBox="0 0 1728 1112" fill="none" xmlns="http://www.w3.org/2000/svg">

                        <g className='floating' filter="url(#filter0_d_0_1)">
                              <rect x="169" y="241" width="97" height="96" rx="24" fill="white" shape-rendering="crispEdges" />
                              <rect x="196" y="267" width="44" height="44" fill="url(#paint7_linear_0_1)" />
                        </g>
                        <g className='floating-4' filter="url(#filter1_d_0_1)">
                              <rect x="1436" y="427" width="107" height="106.088" rx="24" fill="white" />
                        </g>
                        <path className='floating-4' d="M1464 480C1464 465.641 1475.64 454 1490 454H1516V480C1516 494.359 1504.36 506 1490 506V506C1475.64 506 1464 494.359 1464 480V480Z" fill="url(#paint8_linear_0_1)" />
                        <g className='floating-4' filter="url(#filter2_d_0_1)">
                              <rect x="401" y="855" width="83" height="82" rx="24" fill="white" />
                        </g>
                        <circle className='floating-4' cx="442" cy="896" r="22" fill="url(#paint9_linear_0_1)" />
                        <defs>
                              <filter id="filter0_d_0_1" x="159" y="235" width="137" height="136" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <feOffset dy="4" />
                                    <feGaussianBlur stdDeviation="10" />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0.329412 0 0 0 0 0.2 0 0 0 0 0.984314 0 0 0 0.1 0" />
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
                              </filter>
                              <filter id="filter1_d_0_1" x="1416" y="411" width="147" height="146.088" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <feOffset dy="4" />
                                    <feGaussianBlur stdDeviation="10" />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0.329412 0 0 0 0 0.2 0 0 0 0 0.984314 0 0 0 0.1 0" />
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
                              </filter>
                              <filter id="filter2_d_0_1" x="381" y="839" width="123" height="122" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <feOffset dy="4" />
                                    <feGaussianBlur stdDeviation="10" />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0.329412 0 0 0 0 0.2 0 0 0 0 0.984314 0 0 0 0.1 0" />
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
                              </filter>

                              <linearGradient id="paint7_linear_0_1" x1="211.174" y1="308.24" x2="236.145" y2="280.42" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#5433FB" />
                                    <stop offset="1" stop-color="#0CC3E9" />
                              </linearGradient>
                              <linearGradient id="paint8_linear_0_1" x1="1470.12" y1="490.92" x2="1499.63" y2="458.042" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#5433FB" />
                                    <stop offset="1" stop-color="#0CC3E9" />
                              </linearGradient>
                              <linearGradient id="paint9_linear_0_1" x1="427.469" y1="903.98" x2="449.034" y2="879.954" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#5433FB" />
                                    <stop offset="1" stop-color="#0CC3E9" />
                              </linearGradient>
                        </defs>
                  </svg>

            )
      }

      const SvgRight = () => {
            return <div className=''>
                  <svg className='svg-right hidden lg:inline-block absolute right-0 bottom-0 w-2/5' viewBox="0 0 695 695" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g className=' opacity-10 ' >
                              <path d="M433.223 555.554C462.227 555.554 476.751 590.564 456.244 611.042L359.5 694.5C353.396 700.599 323.636 696.5 315 696.5L30.5 694.5C1.52073 694.5 -8.89313 700.927 11.5604 680.433L126.668 565.114C132.776 558.991 141.074 555.554 149.726 555.554H433.223Z" fill="url(#paint0_linear_0_1)" />
                              <path d="M500.994 277.464C500.994 248.507 465.926 234.004 445.42 254.48L329.91 369.804C323.805 375.898 320.375 384.166 320.375 392.788V701.5C366 701.5 359.5 701.5 393 701.5H489C495.108 695.401 500.994 710.122 500.994 701.5V277.464Z" fill="url(#paint1_linear_0_1)" />
                              <path d="M697 31.9999C697 3.04228 710 -8.00002 693.763 8.58531L578.253 123.907C572.149 130.003 568.718 138.27 568.718 146.891V701.5C607.5 701.5 585.5 701.5 631 701.5H696.113C698.463 516 693.763 868.617 693.763 860L699.922 444.623L697 31.9999Z" fill="url(#paint2_linear_0_1)" />
                        </g>
                        <g className='floating' opacity="0.2">
                              <circle cx="698.982" cy="570.218" r="69.3773" transform="rotate(120 698.982 570.218)" fill="url(#paint3_linear_0_1)" />
                              <circle cx="479.584" cy="600.565" r="16.6506" transform="rotate(120 479.584 600.565)" fill="url(#paint4_linear_0_1)" />
                              <circle cx="612.244" cy="337.49" r="33.3011" transform="rotate(120 612.244 337.49)" fill="url(#paint5_linear_0_1)" />
                        </g>
                        <g className='floating-4' opacity="0.2">
                              <circle className='' cx="353.982" cy="427.218" r="69.3773" transform="rotate(120 353.982 427.218)" fill="url(#paint6_linear_0_1)" />
                        </g>
                        <defs>
                              <linearGradient id="paint0_linear_0_1" x1="619.486" y1="610.95" x2="131.187" y2="167.148" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#5433FB" />
                                    <stop offset="1" stop-color="#0CC3E9" />
                              </linearGradient>
                              <linearGradient id="paint1_linear_0_1" x1="619.486" y1="610.95" x2="131.187" y2="167.148" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#5433FB" />
                                    <stop offset="1" stop-color="#0CC3E9" />
                              </linearGradient>
                              <linearGradient id="paint2_linear_0_1" x1="619.486" y1="610.95" x2="131.187" y2="167.148" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#5433FB" />
                                    <stop offset="1" stop-color="#0CC3E9" />
                              </linearGradient>
                              <linearGradient id="paint3_linear_0_1" x1="645.922" y1="599.357" x2="724.668" y2="511.626" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#5433FB" />
                                    <stop offset="1" stop-color="#0CC3E9" />
                              </linearGradient>
                              <linearGradient id="paint4_linear_0_1" x1="466.85" y1="607.558" x2="485.749" y2="586.502" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#5433FB" />
                                    <stop offset="1" stop-color="#0CC3E9" />
                              </linearGradient>
                              <linearGradient id="paint5_linear_0_1" x1="586.776" y1="351.476" x2="624.573" y2="309.366" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#5433FB" />
                                    <stop offset="1" stop-color="#0CC3E9" />
                              </linearGradient>
                              <linearGradient id="paint6_linear_0_1" x1="300.922" y1="456.357" x2="379.668" y2="368.626" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#5433FB" />
                                    <stop offset="1" stop-color="#0CC3E9" />
                              </linearGradient>
                        </defs>
                  </svg>

            </div >
      }

      return (
            <div className="dark:bg-gray-800">
                  <Head>
                        <title>Home | Best Boiler Plate for NextJS</title>
                        <meta property="og:image" content="https://drive.google.com/thumbnail?id=1o9PQIe0vmxhCxvL9qY0NsWUUzXsWfjGh" key="ogimage" />
                  </Head>
                  <NavBar position="relative" productTitle="">
                        <div className="m-auto z-50 ">

                              <div className=' text-center  '>
                                    <div className=" text-5xl  2xl:text-7xl  xl:text-7xl font-bold text-center  ">
                                          Help us,
                                          <span className=' text-transparent  bg-clip-text bg-gradient-to-r from-first-color to-second-color'> Help Your Business!</span>
                                    </div>
                                    <div className=' text-xl font-medium mx-auto w-7/12 pt-9'>
                                          Yesu-tech does everything you need to start your business. We design and develop Website, Applications and more.
                                    </div>

                                    <button onClick={() => alert("yow")} className='bg-theme-yesu  text-white m-12 px-12 font-semibold rounded-lg py-2.5 z-50 cursor-pointer'>
                                          GET IN TOUCH
                                    </button>
                              </div>


                        </div >






                        <LargeSVGBanner />
                        <SvgRight />

                  </NavBar >
                  <div className="flex items-center justify-center w-full  text-center z-50 bg-theme-yesu h-auto">
                        <div className=' py-64 w-7/12'>
                              <div className=' text-white text-4xl md:text-7xl font-bold '>
                                    We live in a digital World,
                                    therefore we need a digital Sword
                              </div>
                        </div>
                        <svg className='   px-32    hidden xl:inline-block absolute w-full' viewBox="0 0 1469 401" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect className='floating' opacity="0.3" y="136.013" width="100.026" height="100.026" transform="rotate(-30 0 136.013)" fill="#0CC3E9" />
                              <circle opacity="0.3" className='animate-pulse' cx="1152" cy="369" r="32" fill="#0CC3E9" />
                              <path opacity="0.3" className='floating-4' d="M1278 95.5C1278 42.7568 1320.76 0 1373.5 0H1469V95.5C1469 148.243 1426.24 191 1373.5 191C1320.76 191 1278 148.243 1278 95.5Z" fill="#0CC3E9" />
                        </svg>


                  </div >

                  <Footer />
            </div >
      )
}

const mapStateToProps = state => ({
      userInfo: state.main,
      error: state.main,
      product: state.product,
})

const mapDispatchToProps = {
      setProducts: setProducts,
      setSelectedProductsNull: setSelectedProductsNull
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)