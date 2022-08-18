import next from "next";
import { relative } from "path";
import React, { useState } from 'react'

import Skeleton from "react-loading-skeleton";
// import Logo from '../public/Untitled-2.png'


function ProductLoad() {
    return (
        <div>

            <Skeleton height={70} width={70} circle={true} className="mb-2 ml-16" />
            <br />

            <Skeleton height={20} width={180} className="mb-4" />
            <br />
            <Skeleton height={20} width={180} className="mb-4" />
            <br />
            <Skeleton height={20} width={180} className="mb-4" />
            <br />
            <Skeleton height={20} width={180} className="mb-4" />
            <br />
            <Skeleton height={20} width={180} className="mb-4" />

        </div>
    )
}
let items = [
    <ProductLoad />,

];
function SignInLoading() {
    return (
        <div>

            <div className="row container max-w-7xl justify-items-center mx-auto items-center">
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