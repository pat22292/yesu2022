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

      return (
            <div className="dark:bg-gray-800">
                  <Head>
                        <title>Home | Best Boiler Plate for NextJS</title>
                        <meta property="og:image" content="https://drive.google.com/thumbnail?id=1o9PQIe0vmxhCxvL9qY0NsWUUzXsWfjGh" key="ogimage" />
                  </Head>
                  <NavBar position="fixed" productTitle="">
                        <div className="flex absolute  items-center justify-center h-full text-center z-50">

                              <div className=' text-center '>
                                    <div className=" text-6xl font-bold text-center ">
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






                        <svg className=' hidden sm:block h-full' width="1569" height="877" viewBox="0 0 1569 877" fill="transparent" xmlns="http://www.w3.org/2000/svg">
                              <g className=' opacity-25 '>
                                    <path d="M1307.22 737.554C1336.23 737.554 1350.75 772.564 1330.24 793.042L1214.73 908.361C1208.63 914.46 1200.35 917.881 1191.71 917.881H908.623C879.643 917.881 865.107 882.927 885.56 862.433L1000.67 747.114C1006.78 740.991 1015.07 737.554 1023.73 737.554H1307.22Z" fill="url(#paint0_linear_0_1)" />
                                    <path d="M1374.99 459.464C1374.99 430.507 1339.93 416.004 1319.42 436.481L1203.91 551.804C1197.81 557.898 1194.37 566.167 1194.37 574.788V1400.89C1194.37 1429.85 1229.44 1444.35 1249.95 1423.88L1365.46 1308.56C1371.57 1302.46 1374.99 1294.19 1374.99 1285.57V459.464Z" fill="url(#paint1_linear_0_1)" />
                                    <path d="M1623.34 213.569C1623.34 184.611 1588.27 170.109 1567.76 190.585L1452.25 305.907C1446.15 312.003 1442.72 320.27 1442.72 328.891V1155C1442.72 1183.95 1477.79 1198.46 1498.3 1177.98L1613.81 1062.66C1619.91 1056.56 1623.34 1048.29 1623.34 1039.68V213.569Z" fill="url(#paint2_linear_0_1)" />
                                    <path d="M1885.45 190.593C1905.96 170.116 1941.02 184.619 1941.02 213.576V376.666C1941.02 385.287 1937.6 393.554 1931.49 399.65L1731.31 599.503C1710.82 619.96 1675.79 605.504 1675.74 576.575L1675.45 413.77C1675.44 405.129 1678.87 396.839 1684.99 390.729L1885.45 190.593Z" fill="url(#paint3_linear_0_1)" />
                              </g>
                              <g className=' opacity-25 ' >
                                    <circle cx="1572.98" cy="752.219" r="69.3773" transform="rotate(120 1572.98 752.219)" fill="url(#paint4_linear_0_1)" />
                                    <circle cx="1353.58" cy="782.565" r="16.6506" transform="rotate(120 1353.58 782.565)" fill="url(#paint5_linear_0_1)" />
                                    <circle cx="1486.24" cy="519.49" r="33.3011" transform="rotate(120 1486.24 519.49)" fill="url(#paint6_linear_0_1)" />
                                    <circle cx="1227.98" cy="609.219" r="69.3773" transform="rotate(120 1227.98 609.219)" fill="url(#paint7_linear_0_1)" />
                              </g>
                              <g filter="url(#filter0_d_0_1)">
                                    <rect x="20" y="16" width="97" height="96" rx="24" fill="white" shapeRendering="crispEdges" />
                                    <rect x="47" y="42" width="44" height="44" fill="url(#paint8_linear_0_1)" />
                              </g>
                              <g filter="url(#filter1_d_0_1)">
                                    <rect x="1277" y="192" width="107" height="106.088" rx="24" fill="white" />
                              </g>
                              <path d="M1305 245C1305 230.641 1316.64 219 1331 219H1357V245C1357 259.359 1345.36 271 1331 271C1316.64 271 1305 259.359 1305 245Z" fill="url(#paint9_linear_0_1)" />
                              <g filter="url(#filter2_d_0_1)">
                                    <rect x="242" y="620" width="83" height="82" rx="24" fill="white" />
                              </g>
                              <circle cx="283" cy="661" r="19" fill="url(#paint10_linear_0_1)" />
                              <defs >
                                    <filter id="filter0_d_0_1" x="0" y="0" width="137" height="136" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                          <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                          <feOffset dy="4" />
                                          <feGaussianBlur stdDeviation="10" />
                                          <feComposite in2="hardAlpha" operator="out" />
                                          <feColorMatrix type="matrix" values="0 0 0 0 0.329412 0 0 0 0 0.2 0 0 0 0 0.984314 0 0 0 0.1 0" />
                                          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
                                          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
                                    </filter>
                                    <filter id="filter1_d_0_1" x="1257" y="176" width="147" height="146.088" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                          <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                          <feOffset dy="4" />
                                          <feGaussianBlur stdDeviation="10" />
                                          <feComposite in2="hardAlpha" operator="out" />
                                          <feColorMatrix type="matrix" values="0 0 0 0 0.329412 0 0 0 0 0.2 0 0 0 0 0.984314 0 0 0 0.1 0" />
                                          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
                                          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
                                    </filter>
                                    <filter id="filter2_d_0_1" x="222" y="604" width="123" height="122" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                          <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                          <feOffset dy="4" />
                                          <feGaussianBlur stdDeviation="10" />
                                          <feComposite in2="hardAlpha" operator="out" />
                                          <feColorMatrix type="matrix" values="0 0 0 0 0.329412 0 0 0 0 0.2 0 0 0 0 0.984314 0 0 0 0.1 0" />
                                          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
                                          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
                                    </filter>
                                    <linearGradient id="paint0_linear_0_1" x1="1815.78" y1="1070.25" x2="1101.88" y2="393.917" gradientUnits="userSpaceOnUse">
                                          <stop stopColor="#5433FB" />
                                          <stop offset="1" stopColor="#0CC3E9" />
                                    </linearGradient>
                                    <linearGradient id="paint1_linear_0_1" x1="1815.78" y1="1070.25" x2="1101.88" y2="393.917" gradientUnits="userSpaceOnUse">
                                          <stop stopColor="#5433FB" />
                                          <stop offset="1" stopColor="#0CC3E9" />
                                    </linearGradient>
                                    <linearGradient id="paint2_linear_0_1" x1="1815.78" y1="1070.25" x2="1101.88" y2="393.917" gradientUnits="userSpaceOnUse">
                                          <stop stopColor="#5433FB" />
                                          <stop offset="1" stopColor="#0CC3E9" />
                                    </linearGradient>
                                    <linearGradient id="paint3_linear_0_1" x1="1815.78" y1="1070.25" x2="1101.88" y2="393.917" gradientUnits="userSpaceOnUse">
                                          <stop stopColor="#5433FB" />
                                          <stop offset="1" stopColor="#0CC3E9" />
                                    </linearGradient>
                                    <linearGradient id="paint4_linear_0_1" x1="1519.92" y1="781.357" x2="1598.67" y2="693.626" gradientUnits="userSpaceOnUse">
                                          <stop stopColor="#5433FB" />
                                          <stop offset="1" stopColor="#0CC3E9" />
                                    </linearGradient>
                                    <linearGradient id="paint5_linear_0_1" x1="1340.85" y1="789.558" x2="1359.75" y2="768.502" gradientUnits="userSpaceOnUse">
                                          <stop stopColor="#5433FB" />
                                          <stop offset="1" stopColor="#0CC3E9" />
                                    </linearGradient>
                                    <linearGradient id="paint6_linear_0_1" x1="1460.78" y1="533.477" x2="1498.57" y2="491.366" gradientUnits="userSpaceOnUse">
                                          <stop stopColor="#5433FB" />
                                          <stop offset="1" stopColor="#0CC3E9" />
                                    </linearGradient>
                                    <linearGradient id="paint7_linear_0_1" x1="1174.92" y1="638.357" x2="1253.67" y2="550.626" gradientUnits="userSpaceOnUse">
                                          <stop stopColor="#5433FB" />
                                          <stop offset="1" stopColor="#0CC3E9" />
                                    </linearGradient>
                                    <linearGradient id="paint8_linear_0_1" x1="52.1744" y1="73.2399" x2="77.1451" y2="45.42" gradientUnits="userSpaceOnUse">
                                          <stop stopColor="#5433FB" />
                                          <stop offset="1" stopColor="#0CC3E9" />
                                    </linearGradient>
                                    <linearGradient id="paint9_linear_0_1" x1="1311.12" y1="255.92" x2="1340.63" y2="223.042" gradientUnits="userSpaceOnUse">
                                          <stop stopColor="#5433FB" />
                                          <stop offset="1" stopColor="#0CC3E9" />
                                    </linearGradient>
                                    <linearGradient id="paint10_linear_0_1" x1="268.469" y1="668.98" x2="290.034" y2="644.954" gradientUnits="userSpaceOnUse">
                                          <stop stopColor="#5433FB" />
                                          <stop offset="1" stopColor="#0CC3E9" />
                                    </linearGradient>
                              </defs>
                        </svg>


                        {/* <DynamicTable products={product.products} setSelectedProductsNull={_setSelectedProductsNull} /> */}

                        {/* <div className={`relative z-10 ${openModal ? `` : `hidden`}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">

          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex  sm:items-center justify-center min-h-full items-center text-center sm:p-0">

              <div className="relative bg-transparent  text-left  transition-all sm:my-8 sm:max-w-2xl sm:w-full xl:block sm:hidden">
                <Svg />
              </div>

              <div className="relative bg-transparent  text-left w-full  max-w-xs sm:w-full xl:hidden sm:block">
                <SvgMobile />
              </div>

            </div>
          </div>
        </div> */}


                  </NavBar >
                  <div className="flex items-center justify-center w-full text-center z-50 bg-theme-yesu h-auto">
                        <div className=' py-44 w-7/12'>
                              <div className=' text-white text-7xl font-bold '>
                                    We live in a digital World,
                                    therefore we need a digital Sword
                              </div>
                        </div>
                        <svg className='absolute' width="1469" height="401" viewBox="0 0 1469 401" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect className='animate-wiggle' opacity="0.3" y="136.013" width="100.026" height="100.026" transform="rotate(-30 0 136.013)" fill="#0CC3E9" />
                              <circle className='animate-wiggle ' opacity="0.3" cx="1152" cy="369" r="32" fill="#0CC3E9" />
                              <path opacity="0.3" d="M1278 95.5C1278 42.7568 1320.76 0 1373.5 0H1469V95.5C1469 148.243 1426.24 191 1373.5 191C1320.76 191 1278 148.243 1278 95.5Z" fill="#0CC3E9" />
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