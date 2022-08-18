import next from "next";
import React, { useState } from 'react'

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
// import Logo from '../public/Untitled-2.png'


function ProductLoad() {
    return (
        <div>
            <div className="row">
                <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
                    <Skeleton height={190} className="mb-2 rounded-full" style={{ opacity: .35 }} />
                    <Skeleton height={20} style={{ opacity: .35 }} />
                    <Skeleton height={20} className="mb-1" style={{ opacity: .35 }} />
                    <Skeleton height={20} width={50} style={{ opacity: .35 }} />
                </SkeletonTheme>
            </div>
        </div >
    )
}
let items = [
    <ProductLoad />,
    <ProductLoad />,
    <ProductLoad />,
    <ProductLoad />,
    <ProductLoad />,
    <ProductLoad />,
    <ProductLoad />,
    <ProductLoad />,
    <ProductLoad />,
    <ProductLoad />,
    <ProductLoad />,
    <ProductLoad />,
];
function Loading() {
    return (
        <div>

            <div className="grid gap-2 grid-cols-2 sm:grid-cols-2 sm:mx-0 lg:grid-cols-6 xl:grid-cols-6">
                {items.map((item, index) => {
                    return <div key={index} className="w-full overflow-hidden">

                        {item}
                    </div>
                })}
            </div >
        </div>

    )

}

export default Loading