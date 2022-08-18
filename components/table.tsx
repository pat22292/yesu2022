import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay, Controller, Thumbs } from 'swiper';
// import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
// import product from '../pages/product';
import Loading from '../loading/loading';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Link from 'next/link'
import Category from '../components/category';
import CategoryPhone from '../components/category-phone';



SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay, Controller, Thumbs]);




export default function Table({ products, setSelectedProductsNull }) {
  const router = useRouter()
  const [firstSwiper, setFirstSwiper] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [catsSwiper, setCatsSwiper] = useState(null);
  const [catSlidePerView, setCatSlidePerView] = useState(10);
  const [isMobile, setIsMobile] = useState(false)

  //choose the screen size 
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true)
      setCatSlidePerView(2);
    } else {
      setIsMobile(false)
      setCatSlidePerView(10);
    }
  }

  useEffect(() => {
    window.addEventListener('load', handleResize);
    window.addEventListener("resize", handleResize);

  }, []);

  var priceOrRange = (singlePrice, max, min) => {
    if (singlePrice != 0) {
      return `₱${singlePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    }
    else {
      return `₱${min.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} - ₱${max.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
    }
  }

  return (
    <div className="px-0 mx-0 pb-16 sm:pt-36 pt-0">
      <div className="grid grid-cols-3">
        <div className="sm:col-span-2 col-span-3">
          <Swiper
            className="slider-banner"
            // style={{ height: '500px' }}
            controller={{ control: firstSwiper }}
            // spaceBetween={50}
            // centeredSlides

            autoplay={{ delay: 10000, disableOnInteraction: false }}
            slidesPerView={1}
            navigation
            thumbs={{ swiper: thumbsSwiper }}
            pagination={{ clickable: true }}
          // scrollbar={{ draggable: true }}

          //   onSwiper={(swiper) => console.log(swiper)}
          //   onSlideChange={() => console.log('slide change')}
          >
            <SwiperSlide className="bg-no-repeat bg-cover bg-center" style={{ backgroundImage: "url('/largeLeft.png')" }}></SwiperSlide>
            <SwiperSlide className="bg-no-repeat bg-cover bg-center" style={{ backgroundImage: "url('/largeLeft-2.png')" }}></SwiperSlide>
            {/* <SwiperSlide className="bg-no-repeat bg-cover bg-center" style={{ backgroundImage: "url('https://image.freepik.com/free-psd/banner-template-mechanic-profession_23-2148519016.jpg')" }}></SwiperSlide>
            <SwiperSlide className="bg-no-repeat bg-cover bg-center" style={{ backgroundImage: "url('https://image.freepik.com/free-vector/fashion-banner-background-web-banner-billboard-fashion-promotion-funny-design-concept_142491-93.jpg')" }}></SwiperSlide>  */}

          </Swiper>
        </div>
        <div className=" sm:block hidden pl-1 col-span-1 row">
          <Swiper
            className="slider-banner-small mb-1"
            // style={{ height: '500px' }}
            controller={{ control: firstSwiper }}
            // spaceBetween={50}
            // centeredSlides
            autoplay={{ delay: 10000, disableOnInteraction: false }}
            slidesPerView={1}
            thumbs={{ swiper: thumbsSwiper }}
            pagination={{ clickable: true }}
          // scrollbar={{ draggable: true }}

          //   onSwiper={(swiper) => console.log(swiper)}
          //   onSlideChange={() => console.log('slide change')}
          >
            <SwiperSlide className="bg-no-repeat bg-cover bg-center" style={{ backgroundImage: "url('/small.jpg')" }}></SwiperSlide>

          </Swiper>
          <Swiper
            className="slider-banner-small"
            // style={{ height: '500px' }}
            controller={{ control: firstSwiper }}
            // spaceBetween={50}

            // centeredSlides
            autoplay={{ delay: 10000, disableOnInteraction: false }}
            slidesPerView={1}
            thumbs={{ swiper: thumbsSwiper }}
            pagination={{ clickable: true }}
          // scrollbar={{ draggable: true }}

          //   onSwiper={(swiper) => console.log(swiper)}
          //   onSlideChange={() => console.log('slide change')}
          >
            <SwiperSlide className="bg-no-repeat bg-cover bg-center" style={{ backgroundImage: "url('/SMALL02.png')" }}></SwiperSlide>

          </Swiper>
        </div>

      </div>
      {/* <Swiper
        onSwiper={setThumbsSwiper}
        watchSlidesVisibility
        slidesPerView={2}
        watchSlidesProgress
      >
        <SwiperSlide className="bg-no-repeat bg-center bg-contain mx-2" style={{ backgroundImage: "url('https://image.freepik.com/free-psd/web-template-business-event_23-2148358507.jpg')" }}></SwiperSlide>
        <SwiperSlide className="bg-no-repeat bg-center bg-contain mx-2" style={{ backgroundImage: "url('https://st2.depositphotos.com/2100659/9816/v/950/depositphotos_98169850-stock-illustration-concept-vector-banner-special-offer.jpg')" }}></SwiperSlide>
        <SwiperSlide className="bg-no-repeat bg-center bg-contain mx-2" style={{ backgroundImage: "url('https://i.pinimg.com/originals/81/82/69/8182696cac2fd2d3a5296f9715290ddf.jpg')" }}></SwiperSlide>
        <SwiperSlide className="bg-no-repeat bg-center bg-contain mx-2" style={{ backgroundImage: "url('https://d2kh7o38xye1vj.cloudfront.net/wp-content/uploads/2018/06/17th-April.jpg')" }}></SwiperSlide>
      </Swiper> */}





      <div className="dark:bg-dark-bg relative pt-5 ">
        <div className="bg-white  dark:bg-dark-bg">
          <h3 className="dark:bg-dark-bg dark:text-white sm:pt-0 ml-3 text-gray-600 text-2xl font-medium">Categories</h3>

          <div className="sm:block hidden ">

            <Category />
          </div>
          <div className="sm:hidden visible">
            <CategoryPhone />
          </div>

        </div>
        <div className="mt-4">
          <h3 className="dark:bg-dark-bg dark:text-white sm:pt-0 ml-3 text-gray-600 text-2xl font-medium">Products</h3>

          {products != null ? (
            <div>
              {products.length != 0 ? (
                <div className="dark:bg-dark-bg grid gap-2 grid-cols-2 sm:grid-cols-2 sm:mx-0 mx-2  lg:grid-cols-6 xl:grid-cols-6 mt-6">

                  {products.map((product, index) => {

                    // <li key={index}>{product}</li>

                    return <div onClick={() => setSelectedProductsNull([])} key={index} className="w-full shadow-xl border-black overflow-hidden">

                      <Link href={{

                        pathname: '/product',
                        query: {
                          name: product.product_name,
                          id: product.id,
                          img: product.img_id
                        },

                      }} passHref
                      >
                        <a onClick={() => setSelectedProductsNull([])} target="">
                          <div className="cursor-pointer">
                            <div
                              className="h-48 px-0 mx-0 w-full bg-center bg-no-repeat bg-contain"
                              style={{ backgroundImage: `url(https://res.cloudinary.com/dhdn7ukv9/image/upload/${product.img_id})` }}
                            >
                            </div>

                            <div className="px-3 py-2 dark:bg-dark-bg">
                              <p className="h-20 dark:text-white text-sm text-gray-700 font-normal truncate-2-lines">{product.product_name}</p>
                              {/* <p className=" text-red-400 text-sm font-medium">{product.price}</p> */}
                            </div>
                            <div className="px-3 py-2 dark:bg-dark-bg">
                              {/* <p className="h-auto dark:text-white text-sm text-gray-700 font-normal truncate-2-lines">{product.product_name}</p> */}
                              <p className=" text-red-400 text-sm font-medium">{priceOrRange(product.price, product.max, product.min)}</p>
                              {/* <p className=" text-red-400 text-sm font-medium">₱{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p> */}
                            </div>
                          </div>
                        </a>
                      </Link>
                    </div>
                  })}
                </div>
              ) : (
                <Loading />
              )}
            </div>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  )
}