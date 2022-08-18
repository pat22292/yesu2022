import React, { useEffect, useState } from 'react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay, Controller, Thumbs } from 'swiper';
// import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';



const Category = () => {

    const [catsSwiper, setCatsSwiper] = useState();

    return (
        <div>

            <Swiper
                className="w-full ml-3 text-center text-sm bg-white dark:bg-dark-bg text-black dark:text-white"
                controller={{ control: catsSwiper }}
                slidesPerView={10}
                thumbs={{ swiper: catsSwiper }}
            >
                <SwiperSlide >
                    <div className="m-1 pb-2 shadow-md sm:h-40 h-48 sm:w-auto w-40">
                        <img src="./catergories/men.png" alt="" />
                        <span >Men's Apparel</span>
                    </div>
                    <div className="m-1 pb-2 shadow-md sm:h-40 h-48 sm:w-auto w-40 ">
                        <img src="./catergories/women.png" alt="" />
                        <span>Women Apparel</span>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="m-1 pb-2 shadow-md sm:h-40 h-48 sm:w-auto w-40 ">
                        <img src="./catergories/MobilesGadgets.png" alt="" />
                        <span >Mobiles & Gadgets</span>
                    </div>
                    <div className="m-1 pb-2 shadow-md sm:h-40 h-48 sm:w-auto w-40 ">
                        <img src="./catergories/health.png" alt="" />
                        <span>Health & Personal Care</span>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="m-1 pb-2 shadow-md sm:h-40 h-48 sm:w-auto">
                        <img src="./catergories/mobileAccessories.png" alt="" />
                        <span >Mobile & Accessories</span>
                    </div>
                    <div className="m-1 pb-2 shadow-md sm:h-40 h-48 sm:w-auto">
                        <img src="./catergories/makeupFrag.png" alt="" />
                        <span>Make up & Fragrance</span>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="m-1 pb-2 shadow-md sm:h-40 h-48 sm:w-auto">
                        <img src="./catergories/Entertainment.png" alt="" />
                        <span >Home Entertainment</span>
                    </div>
                    <div className="m-1 pb-2 shadow-md sm:h-40 h-48 sm:w-auto">
                        <img src="./catergories/Appliances.png" alt="" />
                        <span>Appliances</span>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="m-1 pb-2 shadow-md sm:h-40 h-48 sm:w-auto w-40 ">
                        <img src="./catergories/Babies.png" alt="" />
                        <span >Babies & Kids</span>
                    </div>
                    <div className="m-1 pb-2 shadow-md sm:h-40 h-48 sm:w-auto w-40 ">
                        <img src="./catergories/Computers.png" alt="" />
                        <span>Laptop & Computers</span>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="m-1 pt-4 pr-2 pl-2 shadow-md sm:h-40 h-48 sm:w-auto w-40">
                        <img src="./catergories/HomeLiving.png" alt="" />
                        <span>Home Living</span>
                    </div>
                    <div className="m-1 pb-2 shadow-md sm:h-40 h-48 sm:w-auto w-40 ">
                        <img src="./catergories/cameras.png" alt="" />
                        <span>Cameras</span>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="m-1 pt-4 pr-2 pl-2 shadow-md sm:h-40 h-48 sm:w-auto w-40">
                        <img src="./catergories/groceries.png" alt="" />
                        <span>Groceries</span>
                    </div>
                    <div className="m-1 pb-2 shadow-md sm:h-40 h-48 sm:w-auto w-40 ">
                        <img src="./catergories/sports.png" alt="" />
                        <span>Sports & Travel</span>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="m-1 pt-4 pr-2 pl-2 shadow-md sm:h-40 h-48 sm:w-auto w-40">
                        <img src="./catergories/toys.png" alt="" />
                        <span>Toys & <br /> Collectibles</span>
                    </div>
                    <div className="m-1 pb-2 shadow-md sm:h-40 h-48 sm:w-auto w-40 ">
                        <img src="./catergories/motorcycle.png" alt="" />
                        <span>Motorcycle</span>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="m-1 pt-4 pr-2 pl-2 shadow-md sm:h-40 h-48 sm:w-auto w-40">
                        <img src="./catergories/gaming.png" alt="" />
                        <span>Digital Gaming</span>
                    </div>
                    <div className="m-1 pb-2 shadow-md sm:h-40 h-48 sm:w-auto w-40 ">
                        <img src="./catergories/hobbies.png" alt="" />
                        <span>Hobbies & Accessories</span>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="m-1 pt-4 pr-2 pl-2 shadow-md sm:h-40 h-48 sm:w-auto w-40">
                        <img src="./catergories/pet.png" alt="" />
                        <span>Pet Stuffs</span>
                    </div>
                    <div className="m-1 pb-2 shadow-md sm:h-40 h-48 sm:w-auto w-40 ">
                        <img src="./catergories/food.png" alt="" />
                        <span>Food & <br />
                            Beverages</span>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default Category;



