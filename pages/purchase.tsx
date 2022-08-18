import React from 'react'
import { connect } from "react-redux";
import { myPurchases } from "../redux/actions/main";
import NavBar from "../Layouts/Navbar"
import Head from 'next/head';
import axios from 'axios';
import Footer from "../Layouts/footer"

const Purchase = (props) => {
    const { userInfo, setUserInfo } = props;
    const { useEffect, useState } = React;
    const [scrollY, setScrollY] = useState(0);
    const [showNav, setShowNav] = useState(true);
    const [selectedID, setSelectedID] = useState(`To Ship`);

    var toNumber = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    function logit() {
        setScrollY(window.pageYOffset);
    };
    useEffect(() => {
        props.myPurchases();
        function watchScroll() {
            window.addEventListener("scroll", logit);
        }
        watchScroll();
        return () => {
            window.removeEventListener("scroll", logit);
        };

    }, []);


    // const alertScroll = () => {
    //     if (scrollY > 50) { setShowNav(true) }
    //     if (scrollY <= 51) { setShowNav(false) }
    // };

    return (
        <div >
            <Head>
                <title>Your Orders</title>
            </Head>
            <NavBar >
                <div className=" h-auto  container mb-5" >
                    <div className={`${scrollY > 100 ? `fixed` : `relative`} z-20 dark:bg-gray-700 bg-white   max-w-6xl container  top-0 py-0`} >
                        <div className="border-b border-gray-200 dark:border-gray-700  ">
                            <ul className="flex flex-wrap justify-between -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                                {/* <li className="mr-2">
                                    <a onClick={(e) => { setSelectedID(e.target['innerText']) }} className={`inline-flex cursor-pointer p-4 border-b-2 rounded-t-lg   group ${selectedID == 'All' ? `text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500
` : `border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300`}`}>
                                        All
                                    </a>
                                </li> */}
                                <li className="mr-2">
                                    <a onClick={(e) => { setSelectedID(e.target['innerText']) }} className={`inline-flex cursor-pointer p-4 border-b-2 rounded-t-lg group ${selectedID == 'To pay' ? `text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500
` : `border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300`}`} aria-current="page">
                                        To pay
                                    </a>
                                </li>
                                <li className="mr-2">
                                    <a onClick={(e) => { setSelectedID(e.target['innerText']) }} className={`inline-flex cursor-pointer p-4 border-b-2 rounded-t-lg group ${selectedID == 'To Ship' ? `text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500
` : `border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300`}`}>
                                        To Ship
                                    </a>
                                </li>
                                <li className="mr-2">
                                    <a onClick={(e) => { setSelectedID(e.target['innerText']) }} className={`inline-flex cursor-pointer p-4 border-b-2 rounded-t-lg group ${selectedID == 'To Receive' ? `text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500
` : `border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300`}`}>
                                        To Receive
                                    </a>
                                </li>
                                <li className="mr-2">
                                    <a onClick={(e) => { setSelectedID(e.target['innerText']) }} className={`inline-flex cursor-pointer p-4 border-b-2 rounded-t-lg group ${selectedID == 'Completed' ? `text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500
` : `border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300`}`}>Completed</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* <h1>{selectedID}</h1> */}
                    {/* <button onClick={() => { console.log(userInfo.orders); }}>TEST</button> */}
                    {userInfo.orders.map((orders, index) => {
                        return <div key={index} className="bg-gray-200 dark:bg-gray-600 my-3   dark:text-white grid grid-cols-12">
                            {/* <div className="flex mt-9 bg-yellow-50 dark:bg-gray-500 bg-opacity-70 p-2">
                                <span className=" md:text-sm text-left font-medium">Order ID: {orders.order_id}</span>

                            </div> */}
                            {orders.order_array.map((store, indx) => {
                                return <div key={indx} className=" col-span-12 m-3 w-auto  items-center border-b-2 pb-4 border-gray-400">
                                    <div className="    bg-opacity-70 ">Location:
                                        <span className=" md:text-sm text-left font-medium "> {store.location}</span>

                                    </div>
                                    {store.children.map((child, indexes) => {
                                        return <div key={indexes} className=" grid grid-cols-12  w-full  items-center mt-3 pt-3   ">
                                            <div className="flex items-center col-span-11">



                                                <img src={`https://res.cloudinary.com/dhdn7ukv9/image/upload/${child.img}`} width="60" className="" />
                                                <div className="flex flex-col ml-3">
                                                    <span className=" md:text-sm w-full text-left font-medium">
                                                        {child.product_name}
                                                    </span>
                                                    <span className=" md:text-sm w-full text-left font-sm">
                                                        {child.variation ? `Variation: ${child.variation}` : null}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className=' col-span-1 text-center '>
                                                <span className=" md:text-sm  font-sm font-bold text-red-500">
                                                    ₱{child.price}
                                                </span>

                                            </div>
                                        </div>
                                    })}
                                </div>
                            })}

                            <div className="col-span-11  text-right  md:text-sm m-3 font-sm">
                                Shipping Cost
                            </div>
                            <div className="col-span-1 md:text-sm m-3 text-center   font-sm font-bold text-red-500">
                                ₱{orders.shipping_total}
                            </div>
                            <div className="col-span-11  text-right  md:text-sm m-3 font-sm">
                                Order Total
                            </div>
                            <div className="col-span-1 md:text-sm m-3 text-center   font-sm font-bold text-red-500">
                                ₱{toNumber(orders.order_total + orders.shipping_total)}
                            </div>
                            <div className=' col-span-12  font-xs text-right'>
                                <button className=" bg-red-700 px-11 py-2 text-white mr-4">Cancel</button>
                                <button className=" bg-green-700 px-11 py-2 text-white">Receive</button>
                            </div>
                            <span className=" md:text-xs col-span-12  font-xs text-right m-3">Order ID: {orders.order_id}</span>
                            {/* <h1>{orders.order_id}({orders.order_total},{orders.shipping_total})</h1> */}
                        </div>
                    })}
                </div>


            </NavBar>
            <Footer />
        </div>
    )
}

const mapStateToProps = state => ({
    userInfo: state.main,
    error: state.error
})

const mapDispatchToProps = {
    myPurchases: myPurchases
}



export default connect(mapStateToProps, mapDispatchToProps)(Purchase);