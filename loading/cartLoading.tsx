import next from "next";
import { relative } from "path";
import React, { useState } from 'react'

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
// import Logo from '../public/Untitled-2.png'


function ProductLoad() {
    return (
        <div className="p-4 px-5 py-5 grid grid-cols-12 w-full items-center h-full">
            <div className="col-span-3 flex">
                <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
                    <Skeleton style={{ opacity: .55 }} height={70} width={70} className="m-2 ml-16" />

                </SkeletonTheme>

                <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
                    <Skeleton style={{ opacity: .55 }} height={20} width={100} className="mt-10" />
                </SkeletonTheme>
            </div>
            <div className=" col-span-5 items-baseline flex">
                <div className="grid  text-left">
                    <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
                        <Skeleton style={{ opacity: .55 }} height={20} width={100} className="" />
                    </SkeletonTheme>
                    <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
                        <Skeleton style={{ opacity: .55 }} height={20} width={50} className="" />
                    </SkeletonTheme>
                </div>
            </div>
            <div className="w-full flex  justify-end col-span-2">
                <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
                    <Skeleton style={{ opacity: .55 }} height={20} width={50} className="" />
                </SkeletonTheme>
            </div>
            <div className='col-span-1'>
                <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
                    <Skeleton style={{ opacity: .55 }} height={20} width={50} className="" />
                </SkeletonTheme>
            </div>
            <div className='col-span-1 m-auto'>
                <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
                    <Skeleton style={{ opacity: .55 }} height={35} width={35} circle={true} className="m-2 " />
                </SkeletonTheme>
            </div>

        </div>

    )
}
let items = [
    <ProductLoad />,
    <ProductLoad />,
    <ProductLoad />,
    <ProductLoad />

];
function SignInLoading() {
    return (
        <div>

            <div className="mx-auto w-screen bg-gray-100  dark:bg-gray-600  shadow-lg rounded-lg md:max-w-6xl">

                {items.map((item, index) => {
                    return <div key={index} >

                        {item}

                    </div>
                })}
            </div >
        </div>


    )

}

export default SignInLoading