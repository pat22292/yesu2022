import React from 'react';
import router, { Router, useRouter } from 'next/router'
import { connect } from "react-redux"
import { setInfo, deleteCart, getCart, alterCart, setSelectedCart, setCartCount, calcDistance, setCheckoutList } from "../redux/actions/main"


const checkout = (props) => {
    const { useEffect, useState } = React;

    const { userInfo, setUserInfo } = props;
    const [checkOutList, setCheckoutList] = useState([]);
    useEffect(() => {
        setCheckoutList(userInfo.checkoutList);
        console.log(userInfo.checkoutList);
    }, []);

    const checkOutIndividualTotal = (child) => {
        // console.log(child[0].price);
        // console.log(child);
        var total = 0;
        for (var i = 0; i < child.length; i++) {
            total += child[i].price;
        }

        return toNumber(total);
    }
    var toNumber = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return (
        <div>
            <table className="table-auto w-full h-full p-3">
                <thead>
                    <tr>
                        <th></th>
                        <th>Item</th>
                        <th>Variation/ Option</th>
                        <th>Quantity</th>
                        <th>Item Subtotal</th>

                    </tr>
                </thead>
                {/* <tbody> */}
                {checkOutList.map((product, index) => {
                    return <tbody className='' key={index}>
                        <tr>

                            <td colSpan={5} className='text-left p-4 m-4 bg-yellow-50 dark:bg-gray-500 bg-opacity-70 '>
                                {product.location} {product.distance}
                            </td>
                        </tr>


                        {product.children.map((child, indexes) => {
                            return <tr key={indexes}>
                                <td ><img src={`https://res.cloudinary.com/dhdn7ukv9/image/upload/${child.img}`} width="80" className="m-2" /></td>
                                <td>{child.product_name}</td>
                                <td>{child.variation}, {child.selected_optn}</td>
                                <td>{child.quantity}</td>
                                <td>{child.price}</td>

                            </tr>

                        })}
                        <tr>
                            <td colSpan={3}></td>
                            <td colSpan={1}> Shipping:</td>
                            <td className=' text-green-500 font-bold text-xl p-3' colSpan={1}>50</td>
                        </tr>
                        <tr className='border-2'>
                            <td colSpan={3}></td>
                            <td colSpan={1}> Total:</td>
                            <td className=' text-yellow-600 font-bold text-xl p-3' colSpan={1}>{checkOutIndividualTotal(product.children)}</td>
                        </tr>

                        {/* </tr> */}

                    </tbody>
                })}

                <tfoot className=" border-4">
                    <tr>
                        <td colSpan={3}></td>
                        <td colSpan={1}>Grand Total:</td>
                        {/* <td className=' text-red-500 font-bold text-2xl border border-double p-5 mt-2  border-black' colSpan={1}>{toNumber(getTotal())}</td> */}
                    </tr>
                </tfoot>

            </table>
            {/* <ul>
                {checkOutList.map((list, index) => {
                    return <li>
                        {list.location} {list.distance}
                    </li>
                })}
            </ul> */}

        </div>
    )

}

const mapStateToProps = state => ({
    userInfo: state.main,
    error: state.error
})

const mapDispatchToProps = {
    setInfo: setInfo,
    getCart: getCart,
    deleteCart: deleteCart,
    alterCart: alterCart,
    setSelectedCart: setSelectedCart,
    setCartCount: setCartCount,
    calcDistance: calcDistance,
    setCheckoutList: setCheckoutList
}



export default connect(mapStateToProps, mapDispatchToProps)(checkout);
