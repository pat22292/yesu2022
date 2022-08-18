import React from 'react';
import NavBar from "../Layouts/Navbar"
import Head from 'next/head';
import axios from 'axios';
import Footer from "../Layouts/footer"
import router, { Router, useRouter } from 'next/router'
import { connect } from "react-redux"
import { setInfo, deleteCart, getCart, alterCart, setSelectedCart, setCartCount, calcDistance, setCheckoutList, setCheckModalOff, postOrder } from "../redux/actions/main"
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Loading from '../loading/cartLoading';
import { useBeforeunload } from 'react-beforeunload';
import product from '../redux/reducers/product';
import localForage from "localforage";
import CircularLoading from '../loading/circularLoading';

// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ')
// }

const defaultVariationStyle = "items-center hover:border-blue-500 relative flex object-center bg-center self-center justify-center cursor-pointer  w-full center align-middle col-span-1 text-center m-2 p-1 sm:mx2 mx-1 text-xs font-semibold border-grey-800  text-gray-500  h-full"


const Cart = (props) => {
    const { useEffect, useState } = React;
    const { userInfo, setUserInfo } = props;
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [selectedCartIDs, setSelectedCartIDs] = useState([]);
    const [selectedItem, setSelectedItem] = useState([]);
    const [showModal, setShowModal] = useState(false);
    // const [checkOut, setCheckOut] = useState([]);
    const [defaultAddress, setDefaultAddress] = useState('');
    // const [grandTotal, setGrandTotal] = useState(0);
    // const [shippingTotal, setShippingTotal] = useState(0);
    // const [selectedItemLength, setSelectedItemLength] = useState(0);

    // const groupBy = () => {
    //     const res = Array.from(
    //         userInfo.cart.reduce((a, { store_name, ...rest }) => {
    //             return a.set(store_name, [rest].concat(a.get(store_name) || []));
    //         }, new Map())
    //     ).map(([store_name, children]) => ({ store_name, children }));

    //     return res;
    // }

    // const [groupedItem, setGroupedItem] = useState(userInfo.cart ? groupBy() : null);
    userInfo.cart ? null : router.replace('/signin');
    const [loading, setLoading] = useState(1);

    // useBeforeunload(() => "Are you sure to close this tab?");


    useEffect(() => {
        setTimeout(() => {
            setLoading(0);

        }, 2500);

        localForage.getItem('mini-session').then(function (value) {
            // setCartCount(value['cart'].length);
            setDefaultAddress(value['user']['municipality']);
        }).catch(function (err) {
            console.log(err);
        });
    }, []);


    const getTotal = () => {
        var sum = 0;
        selectedItem.map((product, index) => {
            sum += getPrice(product.single_price, product.variations, product.variation, product.variation_option, product.selected_optn, product.qty);
        })
        return sum;
    }

    const getCheckOutTotal = () => {
        var sum = 0;
        var shipSum = 0;
        var total = 0;
        selectedItem.map((product, index) => {
            sum += getPrice(product.single_price, product.variations, product.variation, product.variation_option, product.selected_optn, product.qty);
        })


        userInfo.checkoutList.map((product, index) => {
            shipSum += calculateShiing(product.distance);
        })



        if (sum != 0 && shipSum != 0) {
            total = sum + shipSum;
        }
        else {
            total = 0;
        }
        return total;
    }

    const checkOutIndividualTotal = (child, shipping) => {
        // console.log(child[0].price);
        // console.log(child);
        var total = 0;
        for (var i = 0; i < child.length; i++) {
            total += child[i].price;
        }
        total += shipping;
        return toNumber(total);
    }


    const unCheck = (id) => {
        const ele = document.getElementById(id) as HTMLInputElement;
        ele.checked = false;

    }

    const getPrice = (sngl, variations, slctdVar, optn, slctOptn, qty) => {
        if (sngl != 0) { return Number(sngl) * Number(qty) }
        if (sngl == 0 && optn == null) { return Number(variations[slctdVar]['price']) * Number(qty) }
        if (sngl == 0 && optn != null) { return Number(Object.values(optn)[slctOptn]['Price']) * Number(qty) }
        // return "null" {return}
    }
    const deleteCartItem = async (cartID) => {
        // console.log(cartID);
        setLoading(1);
        await props.deleteCart(cartID);
        await props.getCart();
        localForage.getItem('account-end').then(function (value) {
            // setCartCount(value['cart'].length);            props.setCartCount(value['cart'].length);
        }).catch(function (err) {
            console.log(err);
        });


        setTimeout(() => {
            setLoading(0);
        }, 1000);
    }

    const alterFrontCart = (index, variation, variationOpt, qty, indx) => {

        const oldCart = userInfo.cart;
        // console.log(oldCart);
        if (variation != null) {
            oldCart[index]['children'][indx]['variation'] = variation;
        }
        if (variationOpt != null) {
            oldCart[index]['children'][indx]['selected_optn'] = variationOpt;
        }
        if (qty != null) {
            oldCart[index]['children'][indx]['qty'] += qty;
            if (oldCart[index]['children'][indx]['qty'] < 1) {
                oldCart[index]['children'][indx]['qty'] = 1;
            }
        }
        props.alterCart(oldCart);
    }
    var toNumber = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const checkAll = (e) => {

        var value = false

        if (e.target.checked) {
            value = true;
        }
        var childrensID = [];
        var childrens = [];
        userInfo.cart.map((element, index) => {
            const groupInput = document.getElementById(`group-${index}`) as HTMLInputElement;
            groupInput.checked = value;
            element.children.forEach(child => {
                const ele = document.getElementById(`item-${child.cart_id}`) as HTMLInputElement;
                ele.checked = value;
                value ? (childrensID.push(child.cart_id), childrens.push(child)
                )
                    :
                    (childrensID.splice(childrensID.indexOf(child.cart_id), 1),
                        childrens.filter(item => item.cart_id !== child.cart_id)
                    )
            });
        });


        setSelectedCartIDs(childrensID);
        setSelectedItem(childrens);


    }


    const checkAllStore = (e, index, children) => {
        var value = false
        if (e.target.checked) {
            value = true;
        }
        if (value == true) {
            children.forEach(element => {
                const ele = document.getElementById(`item-${element.cart_id}`) as HTMLInputElement;
                ele.checked = true;
                setSelectedItem(selectedItem => [...selectedItem, element]);
                setSelectedCartIDs(selectedCartIDs => [...selectedCartIDs, element.cart_id]);

            });

        }
        if (value == false) {
            children.forEach(element => {
                const ele = document.getElementById(`item-${element.cart_id}`) as HTMLInputElement;
                ele.checked = false;
                setSelectedItem(selectedItem => selectedItem.filter(entry => entry.cart_id !== element.cart_id));
                selectedCartIDs.splice(selectedCartIDs.indexOf(element.cart_id), 1)
                // setSelectedCartIDs(selectedCartIDs => selectedCartIDs.filter(entry => element.cart_id !== element.cart_id));


            })

        }


    }


    const detectCheckedAll = () => {

        var slctdCart = selectedItem.length;

        var countOfCart = 0;
        userInfo.cart.map((element, index) => {
            element.children.forEach(child => {
                countOfCart += 1;
            });
        });
        // console.log(`${countOfCart} and ${selectedItem.length}`);

        const groupInput = document.getElementById("CheckAll") as HTMLInputElement;
        if (countOfCart == slctdCart) {
            groupInput.checked = true;

        }
        else {
            groupInput.checked = false;

        }
    }

    const calcDistance = async (origin) => {

        const formData = new FormData();
        formData.append('origin', origin);
        formData.append('destination', defaultAddress);
        try {
            const apiResponse = await axios.post(process.env.API_URL + `calc-distance`,
                formData
            );

            return apiResponse.data.text.replace(/[^0-9\.]+/g, "");

        } catch (error) {
            // console.log(error.message);


        }

    }
    const convertTocheckOut = async () => {

        var chckOut = [];
        selectedItem.map((child, indexes) => {

            chckOut.push({
                'cart_id': child.cart_id,
                'product_name': child.product_name,
                'variation': child.variation,
                'selected_optn': child.selected_optn,
                'quantity': child.qty,
                'img': child.img,
                'price': getPrice(child.single_price, child.variations, child.variation, child.variation_option, child.selected_optn, child.qty),
                'location': child.selected_loc
            })
        })
        const res = Array.from(
            chckOut.reduce((a, { location, ...rest }) => {
                return a.set(location, [rest].concat(a.get(location) || []));
            }, new Map())
        ).map(([location, children]) => ({ location, children }));

        var withDistance = [];
        // var distnces = [];

        res.forEach(async (child, indexes) => {
            // setDistances([...distances, await calcDistance(child.location)]);
            // var newDist = '';
            // newDist = await calcDistance(child.location);
            // distnces.push(newDist);

            withDistance.push({
                'location': child.location,
                'distance': await calcDistance(child.location),
                // 'distance': '1 km',
                'children': child.children,
            })

        })


        // setCheckOut(withDistance);
        props.setCheckoutList(withDistance);
        // router.push({
        //     pathname: '/checkout'
        // })
        // setTimeout(() => {
        //     router.push({
        //         pathname: '/checkout'
        //     })
        // }, 1000);
        // setShowModal(true);

        // setTimeout(() => {
        //     router.push({
        //         pathname: '/checkout',
        //         query: {
        //             list: checkOut,
        //             defaultAddress: defaultAddress
        //         }
        //     })
        // }, 1000);

        setTimeout(() => {
            setShowModal(true);
        }, 2000);
        // res.forEach(async (child, index) => {
        //     distnces.push(await calcDistance(child.location));

        // })
        // checkOut ? setShowModal(true) : setShowModal(false);
        // setTimeout(() => {
        //     setShowModal(true);
        // }, 800);

        // setDistances(distnces);
        // setShowModal(true);

        // console.log(distances);
    }

    const calculateShiing = (locaDistance) => {
        if (locaDistance <= 3) {
            // return Math.round(locaDistance * 20);
            return 20;
        }
        else {
            var newDist = locaDistance - 3;
            return Math.round(newDist * 10) + 20;
        }

    }

    const postOrder = (orderArray) => {
        var sum = 0;
        var shipSum = 0;
        selectedItem.map((product, index) => {
            sum += getPrice(product.single_price, product.variations, product.variation, product.variation_option, product.selected_optn, product.qty);
        })


        userInfo.checkoutList.map((product, index) => {
            shipSum += calculateShiing(product.distance);
        })
        props.postOrder(orderArray, sum, shipSum);
    }

    return (
        <div>
            <Head>
                <title>Your Cart</title>
            </Head>
            <NavBar position="fixed" productTitle={''}>
                <div className="h-full min-h-screen flex text-center items-center justify-center content-center">
                    {/* CART START */}
                    {userInfo.cart == [] || loading == 1 ?
                        <Loading /> :
                        <div>
                            {userInfo.cart ?
                                <div>

                                    <div className="py-36">
                                        <div className="mx-auto w-screen bg-gray-100 dark:bg-gray-600  dark:text-white shadow-lg rounded-lg md:max-w-6xl">
                                            <div className="md:flex">
                                                <div className="w-full p-4 px-5 py-5">
                                                    <div className="w-full">
                                                        <div className="p-5 w-full">
                                                            {/* <p>{selectedItem.length}</p> */}
                                                            {/* <button className='bg-blue-500 text-white p-2' onClick={() => { console.log(selectedItemLength) }}>Check selected</button> */}
                                                            <h1 className="text-xl font-medium ">Shopping Cart</h1>
                                                            {userInfo.cart.map((product, index) => {
                                                                return <div key={index}>
                                                                    <div className="flex mt-9 bg-yellow-50 dark:bg-gray-500 bg-opacity-70 p-2">
                                                                        <input id={`group-${index}`} onMouseLeave={detectCheckedAll} onChange={(e) => { checkAllStore(e, index, product.children) }}
                                                                            className="form-check-input appearance-none border border-gray-300 rounded-sm bg-white dark:bg-gray-600  checked:bg-blue-600  focus:outline-none transition duration-200 mt-1 mr-2 cursor-pointer" type="checkbox" value="" />
                                                                        <div className="flex flex-col "> <span className=" md:text-sm text-left font-medium">{product.location}</span>
                                                                        </div>

                                                                    </div>
                                                                    {/* <h1 className='text-xl text-left pt-12 '>{product.location}</h1> */}
                                                                    {product.children.map((child, indexes) => {
                                                                        return <div key={indexes} className=" grid grid-cols-12 w-full  items-center mt-6 pt-6">
                                                                            <div className="flex items-center col-span-4">

                                                                                <div className="form-check p-2">
                                                                                    <input id={`item-${child.cart_id}`} onChange={(e) => {
                                                                                        e.target['checked'] ?
                                                                                            (setSelectedCartIDs([...selectedCartIDs, child.cart_id]), setSelectedItem([...selectedItem, child])
                                                                                            )
                                                                                            :
                                                                                            (selectedCartIDs.splice(selectedCartIDs.indexOf(child.cart_id), 1),
                                                                                                setSelectedItem(selectedItem.filter(item => item.cart_id !== child.cart_id))
                                                                                            )
                                                                                    }}

                                                                                        onMouseLeave={detectCheckedAll}
                                                                                        className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white dark:bg-gray-600  checked:bg-blue-600  focus:outline-none transition duration-200 mt-1 align-top  float-left mr-8 cursor-pointer" type="checkbox" value="" />
                                                                                </div>

                                                                                <img src={`https://res.cloudinary.com/dhdn7ukv9/image/upload/${child.img}`} width="60" className="" />
                                                                                <div className="flex flex-col ml-3"> <span className=" md:text-sm w-48 text-left font-medium">{child.product_name}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-span-4">
                                                                                <div className="w-full text-left">
                                                                                    <Menu as="div" className="relative  text-left">
                                                                                        <div>
                                                                                            {child.variation ?
                                                                                                <Menu.Button className="text-sm text-left font-normal text-gray-400">
                                                                                                    Variation: ▼
                                                                                                </Menu.Button> : null}
                                                                                        </div>
                                                                                        <Transition
                                                                                            as={Fragment}
                                                                                            enter="transition ease-out duration-100"
                                                                                            enterFrom="transform opacity-0 scale-95"
                                                                                            enterTo="transform opacity-100 scale-100"
                                                                                            leave="transition ease-in duration-75"
                                                                                            leaveFrom="transform opacity-100 scale-100"
                                                                                            leaveTo="transform opacity-0 scale-95"
                                                                                        >
                                                                                            {child.variation ?
                                                                                                <Menu.Items className="z-50 absolute  mt-2 w-96  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                                                                                                    <div className="py-1">
                                                                                                        <h3 className='flex m-2 text-sm'>
                                                                                                            {child.var_name}:
                                                                                                        </h3>
                                                                                                        <div className="col-span-3 grid grid-cols-4 m-2 gap-2 items-center">


                                                                                                            {Object.entries(child.variations).map(([Label, content], indx) => {
                                                                                                                return <div key={indx} onClick={() => { alterFrontCart(index, child.variation_option == null ? Label : content['name'], null, null, indexes) }}
                                                                                                                    className={`border-gray-500 border ${defaultVariationStyle}`}
                                                                                                                >

                                                                                                                    {`${child.variation_option == null ? Label : content['name']}`}
                                                                                                                    {child.variation == content['name'] || child.variation == Label ?
                                                                                                                        <span className="absolute top-0 right-0 text-white px-1 text-xs bg-blue-500">
                                                                                                                            ✓
                                                                                                                        </span> : null}
                                                                                                                </div>
                                                                                                            })}
                                                                                                        </div>
                                                                                                        {child.variation_option != null ? <hr /> : null}
                                                                                                        {child.variation_option != null ?
                                                                                                            <div>
                                                                                                                <h3 className='flex m-2 text-sm'>
                                                                                                                    {child.var_otp_name}:
                                                                                                                </h3>
                                                                                                                <div className="col-span-3 grid grid-cols-4 m-2 gap-2 items-center">
                                                                                                                    {Object.entries(child.variation_option).map(([Labl, cntent], indx) => {
                                                                                                                        return <div key={indx}
                                                                                                                            onClick={() => { alterFrontCart(index, null, indx, null, indexes) }}
                                                                                                                            className={`border-gray-500 border ${defaultVariationStyle}`}
                                                                                                                        >
                                                                                                                            {Labl}
                                                                                                                            {Object.keys(child.variation_option)[child.selected_optn] == Labl ?
                                                                                                                                <span className="absolute top-0 right-0 text-white px-1 text-xs bg-blue-500">
                                                                                                                                    ✓
                                                                                                                                </span> : null}
                                                                                                                        </div>
                                                                                                                    })}

                                                                                                                </div>

                                                                                                            </div>
                                                                                                            : null}

                                                                                                    </div>
                                                                                                </Menu.Items>
                                                                                                : null}
                                                                                        </Transition>
                                                                                    </Menu>
                                                                                    <span className="text-sm text-left font-light text-gray-400">
                                                                                        {child.variation ? `${child.variation}` : null}

                                                                                        {child.selected_optn != null ? `, ${Object.keys(child.variation_option)[child.selected_optn]}` : null}</span>
                                                                                </div>

                                                                            </div>
                                                                            <div className="w-full flex  justify-end col-span-2">
                                                                                <div className=""> <span className="cursor-pointer font-semibold" onClick={() => { (alterFrontCart(index, null, null, -1, indexes)) }} >-</span> <input onChange={() => { }} type="text" className="focus:outline-none text-center bg-gray-100 dark:bg-gray-600  border h-6 w-12 rounded text-sm px-2 mx-2" value={child.qty} /> <span className="font-semibold cursor-pointer" onClick={() => { (alterFrontCart(index, null, null, +1, indexes)) }}>+</span> </div>
                                                                                <div className="">  </div>
                                                                                <div> <i className="fa fa-close text-sm font-medium"></i> </div>
                                                                            </div>
                                                                            <div className='col-span-1'>
                                                                                <span className="text-md pl-9 font-medium text-left">₱{toNumber(getPrice(child.single_price, child.variations, child.variation, child.variation_option, child.selected_optn, child.qty))}</span>
                                                                            </div>
                                                                            <div className='col-span-1 m-auto'>
                                                                                <svg className="cursor-pointer opacity-40 dark:bg-white rounded-full" onClick={() => { deleteCartItem(`[${child.cart_id}]`) }} fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="25px" height="25px"><path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 32.990234 15.986328 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.990234 15.986328 z" /></svg>
                                                                            </div>
                                                                        </div>

                                                                    })}
                                                                </div>
                                                            })}

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className="flex justify-center items-end "> <span className="text-sm font-medium text-gray-400 mr-1">Total:</span> <span className="text-lg font-bold text-gray-800 dark:text-white">₱{toNumber(getTotal())}</span> </div> */}
                                    <div style={{ maxWidth: "86rem" }} className=" z-20 container fixed bottom-0 py-0 items-center grid grid-cols-6" >

                                        <div className="flex col-span-5 justify-end border-t-2 bg-white dark:bg-gray-700 shadow-lg">

                                            <div className="flex items-center w-full"> <i className="fa fa-arrow-left text-sm pr-2"></i>


                                                <input id="CheckAll" className=" mr-3 dark:bg-gray-600 dark:border-white" type="checkbox" onChange={(e) => { checkAll(e) }} />

                                                <span onClick={() => { deleteCartItem(`[${selectedCartIDs}]`) }} className="cursor-pointer text-md font-medium text-blue-500">Delete Selected</span> </div>
                                            {/* <div className="bg-white border border-gray-500 w-auto h-10 px-3 rounded-lg my-3 text-gray-600" onClick={() => { }}
                                            >Cancel</div> */}
                                            <div className="flex justify-center items-center "> <span className="text-sm font-medium text-gray-400 mr-1">Total:</span> <span className="text-lg font-bold text-gray-800 dark:text-white">₱{toNumber(getTotal())}</span> </div>
                                            <button className="bg-blue-600 w-auto h-10 px-3 rounded-lg m-3 text-white" onClick={() => convertTocheckOut()}
                                            >Checkout</button>
                                        </div>
                                    </div>
                                </div>

                                :

                                null
                            }
                        </div>
                    }
                    {userInfo.showCheckoutModal ? (
                        <>
                            <div className="justify-center pt-10  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                <div className="relative w-auto mx-auto  max-w-7xl">
                                    {/*content*/}
                                    <div className="mx-auto w-screen bg-gray-100 dark:bg-gray-600  dark:text-white shadow-lg rounded-lg md:max-w-6xl">

                                        <div className="w-full ">
                                            <div className="p-5 w-full">
                                                {/* <p>{selectedItem.length}</p> */}
                                                {/* <button className='bg-blue-500 text-white p-2' onClick={() => { console.log(selectedItemLength) }}>Check selected</button> */}
                                                <div className=' p-2  border-black border-2'> <span className=' font-semibold'>Your Address: </span>
                                                    <span className=' underline'>{defaultAddress}</span> </div>

                                                {!showModal ?
                                                    <div className=' flex align-middle h-96'>
                                                        <CircularLoading />
                                                    </div> :
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
                                                        {userInfo.checkoutList.map((product, index) => {
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
                                                                    <td className=' text-green-500 font-bold text-xl p-3' colSpan={1}>{calculateShiing(product.distance)}</td>
                                                                </tr>
                                                                <tr className='border-2'>
                                                                    <td colSpan={3}></td>
                                                                    <td colSpan={1}> Total:</td>
                                                                    <td className=' text-yellow-600 font-bold text-xl p-3' colSpan={1}>{checkOutIndividualTotal(product.children, calculateShiing(product.distance))}</td>
                                                                </tr>

                                                                {/* </tr> */}

                                                            </tbody>
                                                        })}

                                                        <tfoot className=" border-4">
                                                            <tr>
                                                                <td colSpan={3}></td>
                                                                <td colSpan={1}>Grand Total:</td>
                                                                <td className=' text-red-500 font-bold text-2xl border border-double p-5 mt-2  border-black' colSpan={1}>{toNumber(getCheckOutTotal())}</td>
                                                            </tr>
                                                        </tfoot>

                                                    </table>}
                                            </div>

                                        </div>
                                        {/*footer*/}
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                            <button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => { props.setCheckModalOff(), router.reload() }}
                                            >
                                                Close
                                            </button>
                                            <button
                                                className="bg-blue-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => console.log(postOrder(userInfo.checkoutList))}
                                            >
                                                Place Order
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : null}
                    {/* CART END */}

                </div>

            </NavBar >

            <Footer />
        </div >
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
    setCheckoutList: setCheckoutList,
    postOrder: postOrder,
    setCheckModalOff: setCheckModalOff
}



export default connect(mapStateToProps, mapDispatchToProps)(Cart);

