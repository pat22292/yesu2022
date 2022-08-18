import React from 'react';
import NavBar from "../Layouts/Navbar"
import Head from 'next/head';
import Footer from "../Layouts/footer"
import { connect } from "react-redux"
import { setSelectedProducts } from "../redux/actions/product"
import { addToCart, getCart, setCartCount } from "../redux/actions/main"
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFade, Navigation, Pagination, Scrollbar, A11y, Autoplay, Controller, Thumbs, Virtual } from 'swiper';
// import CircularLoading from '../loading/circularLoading';
import { setTimeout } from 'timers';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import router, { useRouter } from 'next/router'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Label } from '@headlessui/react/dist/components/label/label';
import localForage from "localforage";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay, Controller, Thumbs, EffectFade, Virtual]);

Product.getInitialProps = async ({ query }) => {

    return { query }

}
// Product.getInitialProps = async ({ query }) => {

//     const { id, name } = query

//     return {
//         id,
//         name: name
//     }

// }


function Product(props) {

    const { useEffect, useState } = React;
    const router = useRouter();
    const [firstSwiper, setFirstSwiper] = useState(null);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const { product, setProduct } = props;
    const [selectedVar, setSelectedVar] = useState(null);
    const [storeAddress, setStoreAddress] = useState(null);
    const [selectedVarID, setSelectedVarID] = useState(null);
    const [quantity, setQuantity] = useState(1);
    // const [selectedVarOp, setSelectedVarOp] = useState(0);
    const [optionIndex, setOptionIndex] = useState(null);
    const [price, setPrice] = useState(0);
    const productPrice = product.selectedProduct.price;
    const defaultMaxPrice = product.selectedProduct.max;
    const defaultMinPrice = product.selectedProduct.min;
    const imgGallery = product.galleries;
    const productVariations = product.variations;
    const branches = product.selectedProdBranch;
    // const [buttonDisabled, setButtonDisabled] = useState(storeAddress == null ? true : false);
    const varOptionName = product.selectedProduct.variation_option_name;
    var options = selectedVar ? product.variations[selectedVar] : product.variations[0];
    const [_timeout, _setTimeOut] = useState(false);
    var toNumber = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    var rett = (index) => {
        var some = [];
        Object.keys(options.variation_option).forEach(function (key) {
            some.push(options.variation_option[key].Price);
        });
        if (optionIndex == null) {

            return `₱${toNumber(defaultMinPrice)} - ₱${toNumber(defaultMaxPrice)}`
        }
        else {
            return `₱${toNumber(some[index])}`;
        }
    }

    var returnVarOrPrice = () => {
        if (productPrice != 0) {

            return `₱${productPrice ? toNumber(productPrice) : 0}`;
        }
        if (defaultMinPrice != 0 && price == 0) {
            return `₱${toNumber(defaultMinPrice)} - ₱${toNumber(defaultMaxPrice)}`

        }
        else {
            return `₱${toNumber(price)}`;
        }
    }


    useEffect(() => {
        if (!router.isReady) return;
        props.setSelectedProducts(router.query.id);
        setTimeout(() => {
            _setTimeOut(true)
        }, 800);

    }, [router.isReady]);

    const changeMoth = async (index, varID) => {
        setSelectedVar(index);
        setSelectedVarID(varID);
    }

    const setPriceVar = (id, price) => {
        setSelectedVar(id);
        setPrice(price);
    }

    const buttonDisabled = () => {
        if (storeAddress != null && productVariations.length == 0) {

            return false;
        }
        if (storeAddress != null && productVariations.length != 0 && selectedVar != null) {
            return false;
        }
        else {
            return true;
        }

    }


    const defaultVariationStyle = "items-center relative flex object-center bg-center self-center justify-center cursor-pointer  w-full center align-middle col-span-1 text-center m-2 p-1 sm:mx2 mx-1 text-xs font-semibold border-grey-800 dark:border-white text-gray-500 dark:text-white  h-full"

    const addToCartTest = async (product_id, variation: number, variation_option: number, qty, location) => {

        // console.log(product_id, variation, variation_option, qty, location);
        await props.addToCart(product_id, variation, variation_option, qty, location);
        // props.setCartCount(3);
        props.getCart();
        localForage.getItem('account-end').then(function (value) {
            // setCartCount(value['cart'].length);
            props.setCartCount(value['cart'].length);
        }).catch(function (err) {
            console.log(err);
        });

    }


    const setSelVar = () => { setSelectedVar(0); setSelectedVarID(0); }
    return (

        <div>
            <Head>
                <title>{router.query.name}</title>

                <meta property="og:title" content={`${router.query.name} || Bulakan Depot`} key="ogtitle" />
                {/* <meta property="og:url" content={`https://nextjs-boiler-plate.vercel.app/productname=${router.query.name}&id=${router.query.id}&img=${router.query.img}`} /> */}
                <meta property="og:image" content={`https://test-lumen-7.herokuapp.com/pos/text-image/${router.query.id}`} key="ogimage" />
                {/* <meta property="og:image" content="https://res.cloudinary.com/dhdn7ukv9/image/upload/v1635937810/Untitled_alphbp.png" key="ogimage" /> */}
                <meta property="og:type" content="website" />
                <meta property="fb:app_id" content="391842734986226" />
                <meta property="og:description" content={"description"} key="ogdesc" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${router.query.name} || Bulakan Depot`} />
                <meta name="twitter:description" content="Click for more..." />
                <meta name="twitter:image" content={`https://test-lumen-7.herokuapp.com/pos/text-image/${router.query.id}`} />
            </Head>
            <NavBar position="relative" productTitle={router.query.name}>

                <div className="relative grid sm:px-5 px-0  m-0 gap-0 grid-cols-1 md:grid-cols-1 sm:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 h-full bg-white dark:bg-dark-bg">
                    <div className="col-span-2" >

                        <Swiper
                            style={{
                                height: '500px',
                                width: 'auto',
                            }}
                            effect="fade"
                            spaceBetween={100}
                            className="product-slider"
                            controller={{ control: firstSwiper }}
                            centeredSlides
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            slidesPerView={1}
                            thumbs={{ swiper: thumbsSwiper }}
                            onSwiper={(swiper) => {
                                setFirstSwiper(swiper)
                            }
                            }
                        >

                            <SwiperSlide className="bg-no-repeat bg-center sm:bg-contain bg-cover bg-white" style={{ backgroundImage: `url('https://res.cloudinary.com/dhdn7ukv9/image/upload/${router.query.img}')` }}>
                            </SwiperSlide>
                            {product.selectedProduct.length != 0 ? <div>

                                {imgGallery.map((images, index1) => {
                                    return <SwiperSlide key={index1} className="bg-no-repeat bg-white bg-center  sm:bg-contain bg-cover  w-full" style={{ backgroundImage: `url('https://res.cloudinary.com/dhdn7ukv9/image/upload/${images}')` }}>
                                    </SwiperSlide>
                                })}
                                {productVariations.map((proVar, index2) => {
                                    return <SwiperSlide key={index2} className="bg-no-repeat bg-white bg-center  sm:bg-contain bg-cover  w-full" style={{ backgroundImage: `url('https://res.cloudinary.com/dhdn7ukv9/image/upload/${proVar.variation_image}')` }}>
                                    </SwiperSlide>
                                })}
                            </div>
                                : null
                            }

                        </Swiper>
                        <div className="sm:px-0 px-2 sm:block hidden">
                            <Swiper

                                style={{ height: '100px' }}
                                onSwiper={setThumbsSwiper}
                                // watchSlidesVisibility
                                slidesPerView={4}
                                spaceBetween={25}
                                navigation
                                watchSlidesProgress

                            >

                                <SwiperSlide key={0} className="bg-no-repeat bg-contain bg-center " style={{ backgroundImage: `url('https://res.cloudinary.com/dhdn7ukv9/image/upload/${router.query.img}')` }}>
                                </SwiperSlide>

                                {product.selectedProduct.length != 0 ? <div>

                                    {_timeout == true ?

                                        <div>
                                            {imgGallery.map((images, index1) => {
                                                return <SwiperSlide key={index1} className="bg-no-repeat bg-white dark:bg-transparent  bg-contain bg-center" style={{ backgroundImage: `url('https://res.cloudinary.com/dhdn7ukv9/image/upload/${images}')` }}>
                                                </SwiperSlide>
                                            })}
                                            {productVariations.map((images, index2) => {
                                                return <SwiperSlide key={index2} className="bg-no-repeat bg-white dark:bg-transparent  bg-contain bg-center" style={{ backgroundImage: `url('https://res.cloudinary.com/dhdn7ukv9/image/upload/${images.variation_image}')` }}>
                                                </SwiperSlide>
                                            })}
                                        </div>
                                        :
                                        <div>
                                            <SwiperSlide className="flex">
                                                <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
                                                    <Skeleton height={100} width={100}
                                                        className=" mb-2 " style={{ opacity: .35 }} />
                                                </SkeletonTheme>
                                            </SwiperSlide>
                                            <SwiperSlide className="flex">
                                                <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
                                                    <Skeleton height={100} width={100}
                                                        className=" mb-2 " style={{ opacity: .35 }} />
                                                </SkeletonTheme>
                                            </SwiperSlide>
                                            <SwiperSlide className="flex">
                                                <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
                                                    <Skeleton height={100} width={100}
                                                        className=" mb-2 " style={{ opacity: .35 }} />
                                                </SkeletonTheme>
                                            </SwiperSlide>
                                        </div>}

                                </div> :
                                    <div>
                                        <SwiperSlide className="flex">
                                            <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
                                                <Skeleton height={100} width={100}
                                                    className=" mb-2 " style={{ opacity: .35 }} />
                                            </SkeletonTheme>
                                        </SwiperSlide>
                                        <SwiperSlide className="flex">
                                            <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
                                                <Skeleton height={100} width={100}
                                                    className=" mb-2 " style={{ opacity: .35 }} />
                                            </SkeletonTheme>
                                        </SwiperSlide>
                                        <SwiperSlide className="flex">
                                            <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
                                                <Skeleton height={100} width={100}
                                                    className=" mb-2 " style={{ opacity: .35 }} />
                                            </SkeletonTheme>
                                        </SwiperSlide>
                                    </div>
                                }
                            </Swiper>

                        </div>
                    </div>

                    <div className=" col-span-3 sm:pl-6 pl-3 sm:pt-4 pt-4 w-auto sm:pb-0 pb-6">
                        <h1 className=" dark:text-white text-xl font-semibold text-black">
                            {router.query.name}
                        </h1>
                        {/* <button onClick={() => { console.log(productVariations) }} className=' bg-gray-600 text-white p-1'>Check Requirements</button> */}
                        <div className="flex items-center mt-2 mb-4 ">
                            <p className="text-red-500 underline">4.8</p>
                            <svg className="mx-1 sm:w-4 sm:h-4 w-3 h-3 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                            <svg className="mx-1 sm:w-4 sm:h-4 w-3 h-3 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                            <svg className="mx-1 sm:w-4 sm:h-4 w-3 h-3 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                            <svg className="mx-1 sm:w-4 sm:h-4 w-3 h-3 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                            <svg className="mx-1 sm:w-4 sm:h-4 w-3 h-3 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                            <p className="pl-2 text-gray-600 dark:text-white">| &nbsp; 489 Ratings &nbsp;  | &nbsp; 1,000 Sold</p>
                        </div>

                        <h1 className="text-3xl font-bold text-red-500 pb-6">
                            {productPrice ? `₱${toNumber(productPrice)}` :
                                varOptionName
                                    ? rett(optionIndex) : returnVarOrPrice()}
                        </h1>

                        {/* <div className="grid grid-cols-5">
                            <div className="col-span-1 text-gray-600 dark:text-white text-sm">
                                Shop Vouchers:
                            </div>
                            <div className="col-span-2 grid grid-cols-2 items-center pb-4">
                                <div className="text-center p-1 sm:mx2 mx-1 text-white bg-blue-400">₱50 Off</div>
                                <div className="text-center p-1 sm:mx2 mx-1 text-white bg-blue-400">₱20 Off</div>
                            </div>
                        </div> */}
                        <div className="grid grid-cols-5 pb-6">
                            <div className="col-span-1 text-gray-600text-sm dark:text-white ">
                                Store:
                            </div>
                            <div className="col-span-2 grid grid-cols-2 w-36">
                                <div className="col-span-2  p-1 sm:mx2 mx-1 dark:text-white">{product.selectedProduct.store_name}</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-5 pb-6">
                            <div className="col-span-1 text-gray-600 dark:text-white text-sm">
                                Shipping:
                            </div>
                            <div className=" col-span-2 row">
                                <div className="flex content-center space-x-2 pb-6">
                                    <div className="">
                                        <svg className=" text-blue-400 w-6 h-6 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                                        </svg>
                                    </div>
                                    <div className="dark:text-white text-gray-700">
                                        <Menu as="div" className="relative text-left">


                                            <Menu.Button className="text-sm text-left font-normal text-gray-400">
                                                Select Branch: ▼
                                                {/* <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" /> */}
                                            </Menu.Button>


                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="z-50 absolute  mt-2 w-72  rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">

                                                    <div className="py-1">
                                                        <div>
                                                            {/* <h3 className='flex m-2 text-xs'>
                                                                ""}:
                                                            </h3> */}
                                                            <div className="grid grid-cols-3 m-2 gap-2 items-center">
                                                                {branches.map((Labl, index) => {
                                                                    return <div key={index} className={`border-gray-500 border ${defaultVariationStyle}`}
                                                                        onClick={() => setStoreAddress(Labl.address)}
                                                                    >
                                                                        {Labl.name}

                                                                        {/* {selectedVar == index ?
                                                                                                        <span className="absolute top-0 right-0 text-white px-1 text-xs bg-blue-500">
                                                                                                            ✓
                                                                                                        </span> : null
                                                                                                    } */}
                                                                    </div>
                                                                })}
                                                            </div>
                                                        </div>

                                                    </div>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4">
                                    <div className=" col-span-2 text-gray-600">
                                        Shipping from
                                    </div>
                                    <div className=" col-span-2 sm:mx-0 mx-1 text-black dark:text-white ">{storeAddress}</div>
                                    {/* <div className=" col-span-2 text-gray-600 ">
                                        Shipping Fee
                                    </div>
                                    <div className=" col-span-2 sm:mx-0 mx-1 text-black dark:text-white ">₱0</div> */}
                                </div>
                            </div>

                        </div>
                        {product.selectedProduct.variation_name ?
                            <div className="grid grid-cols-5 pb-6">
                                <div className="col-span-1  text-gray-600 dark:text-white text-sm ">
                                    {product.selectedProduct.variation_name}
                                </div>

                                <div className="col-span-3 grid grid-cols-4 gap-2 items-center">
                                    {productVariations.map((proVar, index) => {
                                        return <button key={index}
                                            onClick={() => { options.variation_option != null && optionIndex == null ? setOptionIndex(0) : null; proVar.variation_price ? setPriceVar(index, proVar.variation_price) : setPrice(options.variation_option[optionIndex]); changeMoth(index, proVar.variation_id); }}
                                            onMouseOver={() => { firstSwiper.slideTo(index + 1 + imgGallery.length, 1000, false); firstSwiper.autoplay.stop(); }}
                                            className={`${defaultVariationStyle} ${selectedVar == index ? "border-blue-500 border-2" : "border-gray-500 border"}`}
                                            onMouseLeave={() => { firstSwiper.slideTo(selectedVar + 1 + imgGallery.length, 1000, false); }}
                                        >

                                            {`${proVar.variation_name}`}
                                            {/* {`${proVar.variation_id}`} */}

                                            {selectedVar == index ?
                                                <span className="absolute top-0 right-0 text-white px-1 text-xs bg-blue-500">
                                                    ✓
                                                </span> : null
                                            }
                                        </button>
                                    })}
                                </div>


                            </div>
                            :
                            null
                        }
                        {varOptionName ?
                            <div className="grid grid-cols-5 pb-6">
                                <div className="col-span-1  text-gray-600 dark:text-white text-sm">
                                    {varOptionName}
                                </div>
                                <div className="col-span-3 grid grid-cols-4 gap-2 items-center w-auto ">
                                    {Object.keys(options.variation_option).map((proVarOpt, index1) => {
                                        return <button disabled={options.variation_option[proVarOpt].status == "unavailable" && selectedVarID != null ? true : false} className={` disabled:cursor-not-allowed disabled:opacity-30 ${defaultVariationStyle} ${optionIndex == index1 ? "border-blue-500 border-2" : "border-gray-500 border"}`} key={index1} onClick={() => { setPrice(options.variation_option[proVarOpt].Price), setOptionIndex(index1), selectedVar == null ? setSelectedVar(0) : null, selectedVar == null ? setSelectedVarID(productVariations[0].variation_id) : null }} >
                                            {`${proVarOpt}`}
                                            {index1 == optionIndex ?
                                                <span className="absolute top-0 right-0 text-white px-1 text-xs bg-blue-500">
                                                    ✓
                                                </span> : null
                                            }
                                        </button>

                                    })}
                                </div>



                            </div>
                            :
                            null
                        }

                        <div className="grid grid-cols-5 pb-6">
                            <div className="col-span-1 text-sm text-black dark:text-white">
                                Quantity
                            </div>
                            <div className="col-span-4 grid grid-cols-4  m-0 items-center w-auto ">
                                <div className="flex w-full">
                                    <svg onClick={() => quantity > 1 ? setQuantity(quantity - 1) : null} className="fill-current m-0 border  text-gray-600 dark:text-white w-7 cursor-pointer p-2" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                    </svg>

                                    <input className=" border text-center w-1/2" type="text" value={quantity} onChange={() => { }} />

                                    <svg onClick={() => setQuantity(quantity + 1)} className="fill-current m-0 border text-gray-600 dark:text-white w-7 cursor-pointer p-2" viewBox="0 0 448 512">
                                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-3 col-span-5 tems-center ">
                            <div className="flex items-center gap-2">
                                <button onClick={async () => await addToCartTest(
                                    router.query.id,
                                    productVariations != null ? selectedVarID : '',
                                    product.variation_option_name != '' ? optionIndex : '',
                                    quantity,
                                    storeAddress)}
                                    disabled={buttonDisabled()}
                                    className="flex disabled:opacity-50 disabled:cursor-not-allowed items-center sm:px-8 sm:py-3 px-4 py-2 border-2 border-transparent text-theme-blue bg-blue-100 border-theme-blue border-opacity-50" aria-label="Notifications">
                                    <svg className="w-5 h-5" viewBox="0 0 446.9 446.9" >
                                        <g>
                                            <path fill="#004a9f" d="M444.3,93.4c-2.6-3.7-6.7-5.9-11.1-6.1L155.9,75.3c-8-0.3-14.6,5.8-14.9,13.7c-0.3,7.9,5.8,14.6,13.7,14.9
            l258.4,11.1l-50.8,158.5H136.2L95.4,51.2c-0.9-4.9-4.2-8.9-8.9-10.8L19.6,14.1C12.2,11.3,3.9,14.9,1,22.2
            c-2.9,7.4,0.7,15.7,8.1,18.6l59.5,23.4l41.6,226.3c1.3,6.8,7.2,11.7,14.1,11.7h6.9L115.4,346c-1.3,3.7-0.8,7.7,1.5,10.9
            c2.2,3.2,5.9,5.1,9.8,5.1h11c-6.8,7.6-11,17.6-11,28.7c0,23.7,19.3,43,43,43s43-19.3,43-43c0-11-4.2-21.1-11-28.7h93.8
            c-6.8,7.6-11,17.6-11,28.7c0,23.7,19.3,43,43,43c23.7,0,43-19.3,43-43c0-11-4.2-21.1-11-28.7h13.4c6.6,0,11.9-5.3,11.9-11.9
            c0-6.6-5.3-11.9-11.9-11.9H143.7l12.9-35.8h216.2c6.2,0,11.8-4,13.7-10l59.7-186.4C447.5,101.7,446.8,97,444.3,93.4z M169.7,409.8
            c-10.5,0-19.1-8.6-19.1-19.1s8.6-19.1,19.1-19.1s19.1,8.6,19.1,19.1S180.2,409.8,169.7,409.8z M327.4,409.8
            c-10.5,0-19.1-8.6-19.1-19.1s8.6-19.1,19.1-19.1s19.1,8.6,19.1,19.1S337.9,409.8,327.4,409.8z"/>
                                        </g>
                                    </svg>
                                    <span className="pl-2">
                                        Add to Cart
                                    </span>
                                </button>
                                <button disabled={buttonDisabled()} className="flex disabled:opacity-50 disabled:cursor-not-allowed items-center sm:px-16 sm:py-3 px-10 py-2 border-2 border-transparent  text-white bg-blue-400" aria-label="Notifications">
                                    Buy Now
                                </button>
                            </div>

                        </div>


                    </div>
                    {/* <h1 className=" text-2xl dark:bg-gray-700  col-span-5 row p-3 mt-3 dark:text-white w-full">
                        {product.selectedProduct.store_name}
                    </h1> */}
                    <div className="row relative sm:px-0  px-3 col-span-3 text-left">

                        <h1 className=" sm:pt-5 pt-0 my-0 dark:text-white text-normal font-semibold text-black leading-10">
                            Product Description:
                        </h1>

                        <p style={{ whiteSpace: 'pre-line' }} className="dark:text-white text-base text-black leading-10 text-left">
                            {product.selectedProduct.description}
                        </p>

                    </div>
                </div>

            </NavBar>
            <Footer />
        </div>

    )
}

const mapStateToProps = state => ({
    userInfo: state.main,
    product: state.product
})

const mapDispatchToProps = {
    setSelectedProducts: setSelectedProducts,
    addToCart: addToCart,
    getCart: getCart,
    setCartCount: setCartCount
}


export default connect(mapStateToProps, mapDispatchToProps)(Product)

