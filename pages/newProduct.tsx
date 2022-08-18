import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import localForage from "localforage";
import Link from "next/link";
import { signOut } from "../redux/actions/main";
import { showVariation, showVariationOption, newProductUpload } from "../redux/actions/product";
import { getStores } from "../redux/actions/store"


import { connect } from "react-redux";
import NewImage from '../components/newProductComponents/uploadFile';
import VariationOptionResult from '../components/newProductComponents/variationWithOption';
import AutoComplete from '../components/Autocomplete';
import LoggedUser from "../components/loggedUser";
// import { userInfo } from "os";

const newProduct = (props) => {
    const { product, setProduct } = props;
    const cref = useRef(null);
    const router = useRouter();
    const [selectedID, setSelectedID] = useState(`Basic information`);
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedStoreID, setSelectedStoreID] = useState(0);
    const [scrollY, setScrollY] = useState(0);
    const [backSession, setBackSession] = useState(false);
    const [userDetails, setUserDetails] = useState([]);
    const [smProfile, setSmProfile] = useState('');
    const [searching, setSearching] = useState(true);
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');


    const [variation, setVariation] = useState('');

    const [variationPrice, setVariationPrice] = useState([]);


    const [variationOptionName, setVariationOptionName] = useState('');
    const [variationList, setVariationList] = useState(['']);
    // const variationList = [];
    const [variationOptionList, setVariationOptionList] = useState([]);

    const [variationAll, setVariationAll] = useState([]);
    const [image, setImage] = useState("");
    const [galleries, setGalleries] = useState([]);
    const [galleriesUrl, setGalleriesUrl] = useState([]);
    const [varImags, setVarImages] = useState([]);
    // const [varImagesUrl, setVarImagesUrl] = useState([]);


    const [imageUrl, setImageUrl] = useState('');

    // const [varImags, setVarImages] = useState([]);
    // const [varImagesUrl, setVarImagesUrl] = useState([]);

    const [singlePrice, setSinglePrice] = useState(0);
    const onFileChange = (coverImg) => {
        setImageUrl(URL.createObjectURL(coverImg.target.files[0]));
        setImage(coverImg.target.files[0]);
        // console.log(coverImg);

    };

    const onGalleriesChange = (url, files) => {
        setGalleriesUrl(url);
        setGalleries(files);
    };

    const onVarImgChange = (varImgs, indx) => {
        const imgs = [...varImags];
        imgs[indx] = varImgs;
        setVarImages(imgs);
        // console.log(varImags);
    };

    const setVariations = (varIndx, optnIndx, price) => {
        var vvar = [];
        variationList.map((item, index) => {
            vvar[index] = {};
            variationOptionList.map((itm, indx) => {
                vvar[index][itm] = null;
            });
        });

        if (variationAll.length == 0) {
            // props.setTempVariation(vvar);
            setVariationAll(vvar);
        }
        else {

            const list = [...variationAll];
            list[varIndx][optnIndx] = price;
            setVariationAll(list);
            // props.setTempVariation(props.tempVariation);

        }
        console.log(variationAll);
    };

    function logit() {
        setScrollY(window.pageYOffset);
    };

    useEffect(() => {
        props.getStores();
        localForage.getItem('mini-session').then(function (value) {

            value != null ? setBackSession(true) : setBackSession(false);

            setUserDetails(value['user']);
            setSmProfile(value['smProfileImage']);

        }).catch(function (err) {
            // console.log(err);
        });
        function watchScroll() {
            window.addEventListener("scroll", logit);
        }
        watchScroll();
        return () => {
            window.removeEventListener("scroll", logit);
        };


    }, []);

    async function scrollToForm(id, sel) {
        await document.querySelector(`#${id}`).scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'start' });
        await setSelectedID(sel);
        // alert(selectedID);
    };

    const alertScroll = () => {
        if (scrollY < 599) { setSelectedID("Basic information") }
        if (scrollY >= 600 || scrollY >= 1500) { setSelectedID("Sales Information") }
        if (scrollY >= 1501 || scrollY >= 3400) { setSelectedID("Shipping") }
        if (scrollY > 3501) { setSelectedID("Others") }
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...variationList];
        list[index] = value;
        setVariationList(list);
        if (variationOptionList.length != 0) {
            cref.current.setFromOutside(variationList, variationOptionList);
        }
        setVariationAll([]);
    };

    const handleRemoveClick = index => {
        const list = [...variationList];
        list.splice(index, 1);
        setVariationList(list);
        cref.current.setFromOutside(variationList, variationOptionList);
        setVariationAll([]);
    };

    const addMotherVar = () => {
        setVariationList([...variationList, '']);
    };

    const handleOptionChange = async (e, index) => {
        const { name, value } = e.target;
        const list = [...variationOptionList];
        list[index] = value;
        await setVariationOptionList(list);
        await cref.current.setFromOutside(variationList, variationOptionList);
        setVariationAll([]);
    };

    const handleRemoveOption = (index) => {
        const list = [...variationOptionList];
        list.splice(index, 1);
        setVariationOptionList(list);
        cref.current.setFromOutside(variationList, variationOptionList);
        setVariationAll([]);
    };

    const addOptionVar = () => {
        setVariationOptionList([...variationOptionList, '']);
    };

    const setVarPrices = (e, index) => {

        const list = [...variationPrice];
        list[index] = e;
        setVariationPrice(list);

        console.log(variationPrice);
        // setVariationPrice(list);
    }

    return (
        <div onWheel={alertScroll} className="bg-gray-100">
            <Head>
                <title>Shupapy | Add new Product</title>
                <meta property="og:image" content="https://drive.google.com/thumbnail?id=1o9PQIe0vmxhCxvL9qY0NsWUUzXsWfjGh" key="ogimage" />

            </Head>
            <nav className={`fixed w-full bg-white shadow-sm z-50 md:block p-0 m-0 `}>

                <div className="mx-auto items-center">
                    <div className="flex justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="flex cursor-pointer" onClick={() => router.push('/')}>
                                {/* Shupapy Icon Start */}
                                <svg className=" pl-7 w-28 h14 text-white" version="1.2" baseProfile="tiny" id="Layer_1"
                                    x="0px" y="0px" viewBox="0 0 190 73">
                                    <path fill="none" strokeWidth="3" stroke="#004a9f" strokeMiterlimit="10" d="M155.7,23.5l-1.6-1.6l-2.8,2.8l-2.9-2.9l-2.8,2.9l-2.9-2.9l-2.5,2.6
	l-2.6-2.7l-2.8,2.8l-2.9-2.9l-2.7,2.7c0.9-7.5,6.5-13.3,13.3-13.3C149,11,154.5,16.4,155.7,23.5z"/>
                                    <path fill="#004a9f" d="M-2.6,18.2" />
                                    <polyline fill="#004a9f" points="30.9,2.3 30.9,55.6 40.4,55.6 40.4,2.3 35.6,2.3 " />
                                    <polyline fill="#004a9f" points="167.4,3.1 167.4,53.5 176.1,53.5 176.1,3.1 171.8,3.1 " />
                                    <path fill="#004a9f" d="M187.3,55.5l0.1-11.6h-3.5c-1.1,0-2,0.8-2,1.9l-0.1,9.7h2.8" />
                                    <polyline fill="#004a9f" points="160.7,32.9 188.5,32.9 188.5,23.2 160.7,23.2 160.7,28.1 " />
                                    <polyline fill="#004a9f" points="167.4,55.8 187.3,55.8 187.3,47.6 167.4,47.6 167.4,51.7 " />
                                    <polyline fill="#004a9f" points="45.6,28.7 45.6,47.8 52.6,47.8 52.6,28.7 49.1,28.7 " />
                                    <polyline fill="#004a9f" points="45.6,47 45.6,55.4 52.6,55.4 52.6,47 49.1,47 " />
                                    <polyline fill="#004a9f" points="46,32.9 84.7,32.9 84.7,27.1 46,27.1 46,30 " />
                                    <polyline fill="#004a9f" points="43,26 47,32.2 49.1,31.1 45.2,24.9 44.1,25.4 " />
                                    <polyline fill="#004a9f" points="45.6,47.2 77.7,47.2 77.7,41.2 45.6,41.2 45.6,44.2 " />
                                    <polyline fill="#004a9f" points="45.9,55.4 81.3,55.4 81.3,51.7 45.9,51.7 45.9,53.5 " />
                                    <polyline fill="#004a9f" points="63.7,44.6 63.7,30 62.8,30 62.8,44.6 63.2,44.6 " />
                                    <polyline fill="#004a9f" points="69,44.4 69,29.7 68.1,29.7 68.1,44.4 68.6,44.4 " />
                                    <polyline fill="#004a9f" points="58.1,44.6 58.1,30 57.1,30 57.1,44.6 57.7,44.6 " />
                                    <polyline fill="#004a9f" points="74,36.6 51.8,36.6 51.8,37.5 74,37.5 74,37 " />
                                    <ellipse fill="none" stroke="#004a9f" strokeWidth="8" strokeMiterlimit="10" cx="19.4" cy="37" rx="14" ry="15.4" />
                                    <path fill="#004a9f" d="M128.1,57.9L128.1,57.9z" />
                                    <polyline fill="#004a9f" points="95.7,71.7 95.7,21.6 86,21.6 86,71.7 90.8,71.7 " />
                                    <ellipse fill="none" stroke="#004a9f" strokeWidth="8" strokeMiterlimit="10" cx="106.9" cy="38.3" rx="14" ry="14" />
                                    <polygon fill="#004a9f" points="77.7,47.2 84.7,32.9 73.5,32.9 73.7,46.8 " />
                                    <ellipse fill="none" stroke="#004a9f" strokeWidth="3" strokeMiterlimit="10" cx="50.1" cy="59.2" rx="2.5" ry="2.3" />
                                    <ellipse fill="none" stroke="#004a9f" strokeWidth="3" strokeMiterlimit="10" cx="74.7" cy="59.2" rx="2.5" ry="2.3" />
                                    <ellipse fill="none" stroke="#004a9f" strokeMiterlimit="10" cx="43.4" cy="24.4" rx="1.2" ry="1.1" />
                                    <path fill="none" stroke="#004a9f" strokeWidth="3" strokeMiterlimit="10" d="M156.9,24.7l-1.2-1.2l-1.6-1.6l-2.8,2.8l-2.9-2.9l-2.8,2.9l-2.9-2.9
	l-2.5,2.6l-2.6-2.7l-2.8,2.8l-2.9-2.9l-3,3l-3.2-3v30.5c0,2.5,2.1,4.6,4.6,4.6h24.3c2.6,0,4.6-2,4.6-4.6V22L156.9,24.7z M142.5,51.8
	c-6.3,0-11.4-5.1-11.4-11.5c0-1.6,0.3-3.1,0.9-4.5c1.7-4.1,5.8-7,10.5-7s8.8,2.9,10.5,7c0.6,1.4,0.9,2.9,0.9,4.5
	C153.9,46.7,148.8,51.8,142.5,51.8z"/>
                                </svg>
                                {/* Shupapy Icon End */}
                            </div>
                            <div className="w-full flex  pt">
                                <h1 className=" text-lg text-gray-400 ">{`> My Products`}</h1>
                                <h1 className=" text-lg text-gray-400  pl-2">{`> New Product`}</h1>
                            </div>
                        </div>
                        <LoggedUser />
                        {/* Enter logged user here */}
                    </div>
                </div>
            </nav>

            <main style={{ maxWidth: "75rem" }} className="container mx-auto items-center">
                <div className="bg-grey-lighter grid grid-cols-7 pt-24 pb-20 sm:gap-x-20 sm:gap-y-4 gap-x-12 gap-y-2 mx-2">

                    {/* BASIC INFORMATION BLOCK START */}
                    <div id="Basic" className="bg-white sm:p-14 p-2 sm:col-span-6 col-span-7 shadow-md text-black w-full">
                        <h1 className="text-xl text-gray-700 font-semibold pb-5">Basic information</h1>
                        {/* <h1>{selectedStoreID}</h1> */}
                        {/* <button onClick={() => { console.log(props); }}>Test</button> */}
                        <div className="max-w-full sm:pb-0 pb-6 ">
                            <div className="grid grid-cols-8 pb-6 max-w-full">
                                <div className="sm:col-span-1 col-span-8 text-gray-600 text-sm self-center">
                                    Store:
                                </div>
                                <div className=" col-span-7">
                                    <AutoComplete options={props.mainStore.stores}
                                        value={selectedOption}
                                        onChange={setSelectedOption}
                                        id={setSelectedStoreID}
                                    />

                                </div>
                                {/* <input onChange={() => { }} className="sm:col-span-7 col-span-8 shadow appearance-none border rounded max-w-full py-2 px-3 text-grey-darker" type="text" placeholder="Seach Store Name..." />
                                <svg className="w-4 h-4 absolute left-2.5 top-3.5 z-50 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg> */}

                            </div>
                            <div className="grid grid-cols-8 pb-6 max-w-full">
                                <div className="sm:col-span-1 col-span-8 text-gray-600 text-sm self-center">
                                    Product Name:
                                </div>
                                <input onChange={(e) => { setProductName(e.target.value) }} className="sm:col-span-7 col-span-8 shadow appearance-none border rounded max-w-full py-2 px-3 text-grey-darker" type="text" placeholder="Product Name" />
                            </div>
                            <div className="grid grid-cols-8 pb-6 max-w-full">
                                <div className="sm:col-span-1 col-span-8  text-gray-600 text-sm ">
                                    Description:
                                </div>
                                <textarea onChange={(e) => { setDescription(e.target.value) }} className="resize-none sm:col-span-7 col-span-8 max-w-full shadow h-96 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"></textarea>
                            </div>
                            <div className="grid grid-cols-8 pb-6 max-w-full">
                                <div className="sm:col-span-1 col-span-8 text-gray-600 text-sm self-center">
                                    Package Weight:
                                </div>
                                <input className="sm:col-span-7 col-span-8 shadow appearance-none border rounded w-1/2 py-2 px-3 text-grey-darker" type="number" min="0" pattern="[0-9]*" placeholder="Weight(Kg)" />
                            </div>
                            <div className="grid grid-cols-5 sm:w-8/12">
                                <div className="col-span-1 text-gray-600 text-sm">
                                    Main Image:
                                </div>
                                <div className="col-span-4 mb-4 grid sm:grid-cols-8 xl:grid-cols-8 grid-cols-2 sm:gap-x-24 gap-x-24 sm:gap-y-2 items-center pb-4 w-full">
                                    <label className="col-span-1 items-center justify-center self-center tracking-wide cursor-pointer">
                                        <input onChange={(e) => onFileChange(e)} type='file' className="hidden" accept="image/png, image/gif, image/jpeg" />
                                        <div style={{ backgroundImage: `url(${imageUrl})` }} className="border-dotted bg-cover bg-no-repeat bg-center border-2 flex items-center border-blue-400 w-20 h-20 justify-items-center ">
                                            {imageUrl ? null : <span className="border  border-blue-400 items-center  rounded-full text-2xl font-light text-blue-400 text-center w-10 h-10 m-auto ">
                                                +
                                            </span>}

                                        </div>
                                        <span className="flex self-center text-center items-center align-middle text-xs w-max mx-2.5 my-2">Cover Photo</span>

                                    </label>
                                </div>
                            </div>
                            <div className="grid grid-cols-5 sm:w-8/12">
                                <div className="col-span-1 text-gray-600 text-sm">
                                    Galleries:
                                </div>
                                <NewImage items={galleriesUrl} onGalleriesChange={onGalleriesChange} />
                            </div>

                            <div className="grid grid-cols-8 pb-6 max-w-full">
                                <div className="col-span-1 text-gray-600 text-sm ">
                                    Category:
                                </div>
                                <div className="w-auto col-span-7 items-center justify-center self-center">
                                    <div className="w-full flex">
                                        <p className="text-sm font-medium text-gray-400">Shupipay</p>

                                        <svg className="relative  align-middle text-center w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5l7 7-7 7" />
                                        </svg>
                                        <p className="text-sm font-medium text-gray-400 pl-2">Food and Beverages</p>

                                        <svg className="relative  align-middle text-center w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5l7 7-7 7" />
                                        </svg>
                                        <p className="text-sm font-medium text-gray-400 pl-2">Pagkaen</p>

                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                    {/* BASIC INFORMATION BLOCK END */}

                    {/* SIDE MENU START */}
                    <div className="sm:block hidden xl:col-span-1 sm:col-span-1  text-black top-36">
                        <ul className="inline-block fixed">
                            <li onClick={(e) => { scrollToForm('Basic', e.target['innerText']) }} className={` text-theme-blue cursor-pointer pl-6 border-l-4 py-2 ${selectedID == 'Basic information' ? `border-theme-blue` : null
                                }`}>
                                Basic information
                            </li>
                            <li onClick={(e) => scrollToForm('Sales', e.target['innerText'])} className={`text-theme-blue cursor-pointer pl-6 border-l-4 py-2 ${selectedID == 'Sales Information' ? `border-theme-blue` : null
                                }`}>
                                Sales Information

                            </li>
                            <li onClick={(e) => scrollToForm('Shipping', e.target['innerText'])} className={`text-theme-blue cursor-pointer pl-6 border-l-4 py-2 ${selectedID == 'Shipping' ? `border-theme-blue` : null
                                }`}>
                                Shipping
                            </li>
                            <li onClick={(e) => scrollToForm('Others', e.target['innerText'])} className={`text-theme-blue cursor-pointer pl-6 border-l-4 py-2 ${selectedID == 'Others' ? `border-theme-blue` : null
                                }`}>
                                Others
                            </li>
                        </ul>
                    </div>
                    {/* SIDE MENU END */}

                    {/* SALES INFORMATION BLOCK START */}
                    <div id="Sales" className="bg-white p-14 col-span-6 shadow-md text-black w-full">
                        <h1 className="text-xl text-gray-700 font-semibold pb-5">Sales Information</h1>
                        <div className=" col-span-3 sm:pl-6 pl-3 sm:pt-4 pt-4 w-auto sm:pb-0 pb-6">
                            {/* <h1>{product.variationsEnabled}</h1> */}
                            {product.variationsEnabled != true ?
                                <div>
                                    <div className="grid grid-cols-8 pb-6 max-w-full">
                                        <div className="sm:col-span-1 col-span-8 text-gray-600 text-sm self-center">
                                            Price:
                                        </div>
                                        <input pattern="[0-9]*" type="number" onChange={(e) => setSinglePrice(parseFloat(e.target.value))} className="sm:col-span-7 col-span-8 shadow appearance-none border rounded w-1/2 py-2 px-3 text-grey-darker" placeholder="₱----.00" />
                                    </div>
                                    <div className="grid grid-cols-5 pb-6 sm:w-8/12">
                                        <div className="col-span-1 text-gray-600 text-sm ">
                                            Variation:
                                        </div>
                                        <div onClick={() => props.showVariation(true)} className="cursor-pointer w-full col-span-1">
                                            <div className="border-dotted border-2 flex items-center text-blue-400 border-blue-400 h-10 justify-items-center text-sm cursor-pointer text-center w-52 px-11">
                                                <span className=" text-sm flex items-center align-middle justify-center object-center font-light text-blue-400 w-full h-5 m-auto"> Enable Variation </span>
                                                <span className="border border-blue-400  rounded-full text-sm flex items-center align-middle justify-center object-center font-light text-blue-400 w-4 h-4 m-auto">
                                                    +
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div>
                                    <div className="grid grid-cols-5 pb-6 sm:w-8/12">
                                        <div className="col-span-1 text-gray-600 text-sm">
                                            Variation <br /> Name
                                        </div>

                                        <input onChange={(e) => { setVariation(e.target.value) }} className="sm:col-span-4 border-4 col-span-4 shadow appearance-none rounded max-w-full py-2 px-3 text-grey-darker text-center" type="text" placeholder="Variation Name (Color, Flavor, Style etc.)" />

                                        <div className="col-span-1 my-4 py-2 px-3 text-gray-600 text-sm">
                                            List
                                        </div>
                                        <div className="sm:col-span-4 col-span-4 w-full mt-3">
                                            {variationList.map((item, index) => {
                                                return <div key={index} className="grid grid-cols-10">
                                                    <div className="col-span-1 my-4 py-2 px-3 text-gray-600 text-sm">
                                                        {index + 1}
                                                    </div>
                                                    <input
                                                        // value={item}
                                                        onChange={(e) => handleInputChange(e, index)}
                                                        className=" col-span-8 shadow appearance-none border rounded w-full max-w-full mb-2 py-2 px-3 text-grey-darker text-center" type="text" placeholder="- " />
                                                    {index != 0 ?
                                                        <div onClick={() => handleRemoveClick(index)} className="cursor-pointer border border-blue-400  rounded-full text-sm flex items-center align-middle justify-center object-center font-light text-blue-400 w-6 h-6 m-auto">X</div>
                                                        : null
                                                    }
                                                </div>
                                            })
                                            }
                                        </div>
                                        <div className="col-span-1">

                                        </div>
                                        <div onClick={() => { addMotherVar() }} className=" col-span-4  border-dotted border-2 flex items-center border-blue-400 justify-items-center cursor-pointer">
                                            <span className="border border-blue-400 content-center place-items-center justify-items-center align-middle justify-center  items-center object-center  rounded-full text-xl font-light text-blue-400 text-center w-8 h-8 mx-auto my-2 ">
                                                +
                                            </span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-5 pb-6 sm:w-8/12">
                                        {product.variationsOptionEnabled != true ?
                                            <div className="grid grid-cols-5 col-span-5 pb-6 sm:w-full pt-5">
                                                <div className="col-span-1 text-sm text-gray-500">
                                                    Variation <br /> Option
                                                </div>
                                                <div onClick={() => { props.showVariationOption(true); setVariationOptionList(['']); }} className="cursor-pointer w-full col-span-1">
                                                    <div className="border-dotted border-2 flex items-center text-blue-400 border-blue-400 h-10 justify-items-center text-sm cursor-pointer text-center w-52 px-11">
                                                        <span className=" text-sm flex items-center align-middle justify-center object-center font-light text-blue-400 w-full h-5 m-auto"> Enable Option </span>
                                                        <span className="border border-blue-400  rounded-full text-sm flex items-center align-middle justify-center object-center font-light text-blue-400 w-4 h-4 m-auto">
                                                            +
                                                        </span>
                                                    </div>
                                                </div>

                                            </div>
                                            :
                                            <div className="grid grid-cols-5 col-span-5 pb-6 w-full">
                                                <div className="col-span-1 text-gray-600 text-sm">
                                                    Variation <br /> Option <br /> Name
                                                </div>

                                                <input onChange={(e) => { setVariationOptionName(e.target.value) }} className="sm:col-span-4 border-4 col-span-4 shadow appearance-none rounded max-w-full py-2 px-3 text-grey-darker text-center" type="text" placeholder="Variation Name (Color, Flavor, Style etc.)" />
                                                <div className="col-span-1 my-4 py-2 px-3 text-gray-600 text-sm">
                                                    List
                                                </div>
                                                <div className="sm:col-span-4 col-span-4 w-full mt-3">
                                                    {variationOptionList.map((item, index) => {
                                                        return <div key={index} className="grid grid-cols-10">
                                                            <div className="col-span-1 my-4 py-2 px-3 text-gray-600 text-sm">
                                                                {index + 1}
                                                            </div>
                                                            <input
                                                                // value={item}
                                                                onChange={e => handleOptionChange(e, index)}
                                                                className=" col-span-8 shadow appearance-none border rounded w-full max-w-full mb-2 py-2 px-3 text-grey-darker text-center" type="text" placeholder="- " />
                                                            {index != 0 ?
                                                                <div onClick={() => handleRemoveOption(index)} className="cursor-pointer col-span-1 border border-blue-400  rounded-full text-sm flex items-center align-middle justify-center object-center font-light text-blue-400 w-6 h-6 m-auto">X</div>
                                                                : null
                                                            }
                                                        </div>
                                                    })
                                                    }
                                                </div>
                                                <div className="col-span-1">

                                                </div>
                                                <div onClick={() => { addOptionVar() }} className=" col-span-4  border-dotted border-2 flex items-center border-blue-400 justify-items-center cursor-pointer">
                                                    <span className="border border-blue-400 content-center place-items-center justify-items-center align-middle justify-center  items-center object-center  rounded-full text-xl font-light text-blue-400 text-center w-8 h-8 mx-auto my-2 ">
                                                        +
                                                    </span>
                                                </div>
                                            </div>
                                        }

                                    </div>

                                    <VariationOptionResult
                                        productName={productName}
                                        description={description}
                                        variationName={variation}
                                        variationOptionName={variationOptionName}
                                        variationLists={variationList}
                                        variationOptionList={variationOptionList}
                                        variationAll={variationAll}
                                        image={image}
                                        varImags={varImags}
                                        // onFileChange={onFileChange}
                                        onVarImgChange={onVarImgChange}
                                        setVariations={setVariations}
                                        setVarPrices={setVarPrices}
                                        ref={cref}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                    {/* SALES INFORMATION BLOCK END */}
                    <div id="Shipping" className="bg-white p-14 col-span-6 shadow-md text-black w-full">
                        <h1 className="text-xl text-gray-700 font-semibold pb-5">Shipping</h1>
                        <p className=" text-justify">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut repudiandae nemo officiis obcaecati impedit ea molestias porro id itaque, magnam repellat reiciendis, asperiores repellendus pariatur fugit cupiditate ipsam quasi consequatur consectetur! Voluptas nostrum a laborum dolores, quidem corporis non! Iste voluptatum sit unde voluptates ab non quas quidem, eaque quisquam impedit nisi, illum hic quis, est repudiandae quo. Provident accusantium aperiam nulla quas, saepe repudiandae impedit animi? Dolorum corporis minima ex consequuntur ratione eum debitis laudantium officia numquam aliquam blanditiis repudiandae, fugiat doloremque velit accusamus alias illo labore nemo sed, vero harum inventore repellendus quibusdam explicabo! Praesentium nihil itaque enim repudiandae tempora magnam laudantium iusto, vel fugit animi blanditiis eligendi reiciendis saepe magni esse culpa amet facere sint dolor inventore earum corrupti tenetur ad? Distinctio qui quam pariatur sapiente minus harum corrupti delectus vel nihil laborum, ad tempore molestiae quisquam, repellendus quos facilis at similique. Aspernatur ipsum fugiat omnis cupiditate amet maiores inventore voluptate soluta atque eaque, magnam facere unde eum recusandae fuga, saepe excepturi dolorum nisi sit provident voluptatibus voluptatem? Molestiae laudantium magnam odio, repellat ex magni numquam minima sed facere tenetur. Molestiae eum excepturi sapiente corporis aliquid consectetur cupiditate, mollitia dignissimos provident cumque quae repellendus labore consequuntur consequatur fugiat! Alias labore quibusdam error voluptatum vero magnam praesentium earum, minima fugit officia maxime, id consequatur. Eos iure, impedit illo recusandae voluptates, accusamus aliquam qui sit est ad error perferendis numquam? Beatae, mollitia quia laboriosam corrupti excepturi animi soluta! Voluptatibus cum quidem iste eum earum aliquid quasi non. Soluta aspernatur voluptate, recusandae sapiente, eum dolore incidunt unde asperiores laudantium culpa iure quo et, doloremque adipisci. Dolores sed hic repudiandae, inventore pariatur quisquam placeat ex vel sapiente, doloribus ab enim! Corrupti modi ipsum rem odit beatae maiores tempora. Vel aperiam cupiditate officiis aspernatur quasi, sed corporis delectus iusto, culpa eum iure! Corporis, laboriosam sint voluptatem repellendus consequatur nam natus omnis labore optio ipsam at blanditiis praesentium hic quo vel veritatis magni? Repellat, quasi, debitis alias possimus dolores eius maxime exercitationem ad a, nostrum accusamus corporis repudiandae iure autem. Est blanditiis doloremque voluptate officia sint soluta tempora iure porro quam in? Quaerat amet necessitatibus reprehenderit, temporibus maiores eum ut fugit voluptatibus asperiores rem inventore, nihil quisquam officia odio laborum. Asperiores, tempore voluptate illo adipisci ducimus dolor sint, excepturi delectus iusto dolorem qui totam! Cumque sequi quibusdam cupiditate temporibus voluptatum amet fugit voluptatem voluptates aspernatur. Facere obcaecati iure quidem sit corporis eligendi eius laborum doloremque asperiores quam, odio facilis delectus, reiciendis numquam consectetur soluta? Nihil ea quaerat nam perspiciatis? Est minima dignissimos deserunt, ad doloremque laudantium ex iure reprehenderit et ullam alias saepe exercitationem fuga sunt voluptatibus mollitia? Beatae maiores dicta consequuntur officia nobis explicabo temporibus, facere autem repellat facilis mollitia quibusdam nihil laborum placeat soluta dolor ducimus id perferendis? Dolor dolorem, saepe placeat adipisci molestias deleniti nulla ut minima vel facere eligendi enim ullam quisquam dignissimos in iure recusandae explicabo corrupti cupiditate fugit asperiores necessitatibus. Vitae modi suscipit quos cum similique veniam rerum, officiis perferendis maiores. Aliquid fugiat autem vel inventore ducimus nostrum vero iure ratione soluta. Facilis quis nisi quibusdam ullam praesentium in laudantium quia! Perspiciatis ullam ipsa, eos ipsum nulla magni commodi itaque. Quasi nobis eaque possimus facere repellat nisi tempore ipsa deleniti aut. Sint officia voluptatibus in culpa ea dignissimos voluptatem dolore odit, earum sit dolorem, cupiditate unde error temporibus veritatis nam recusandae perspiciatis necessitatibus? Laudantium aspernatur maxime iure hic nobis modi, voluptates nemo accusantium reprehenderit! Beatae neque delectus, asperiores, obcaecati ad praesentium nihil ducimus sequi dolore enim quia suscipit eos ipsum vel ipsa temporibus nemo dolor! Provident incidunt inventore, hic sint at itaque et rerum, porro a dicta nam nihil laudantium consequatur, voluptate officia earum nisi! Soluta delectus ut dolor quod eaque voluptate nostrum commodi dolorem ad? Debitis in adipisci quod totam dolore quibusdam. Quisquam excepturi animi culpa voluptatibus dolores tenetur dolorem tempore ratione aspernatur qui. Optio quae fugiat ipsum voluptates, facere itaque. Perspiciatis repellendus eligendi dolorum omnis porro. Ipsum officia dolorem eveniet aliquid omnis, ipsa voluptatem esse! Hic nisi sed ipsum commodi voluptatum voluptatem? Voluptas possimus ab, reiciendis magnam odio labore ipsam eaque reprehenderit? Recusandae tempora accusamus corrupti placeat aliquid tenetur in optio quaerat, at soluta et, provident minima debitis magni quae repudiandae quos officiis ratione. Magnam eum, voluptatum ratione voluptate pariatur ad odit reprehenderit recusandae qui? Illo nulla ex, illum laudantium esse nemo fugit libero possimus delectus accusantium harum, mollitia adipisci explicabo! Consectetur iure alias repellendus optio eius! Veniam ut, rerum, ipsum perferendis voluptas harum incidunt molestiae ducimus voluptates dignissimos dolore autem a aut unde eveniet natus omnis suscipit aliquam error. Fugit doloribus ducimus libero porro animi soluta sunt iste magnam, ullam aliquid quo, unde eius, et obcaecati tempore similique! Assumenda magnam modi autem, blanditiis vero iusto expedita numquam dolorum similique beatae iure provident obcaecati. Voluptate, excepturi nemo, corrupti vel vero maxime officia esse doloribus quisquam temporibus impedit laudantium. Provident odit, facilis laudantium culpa numquam rerum sit fugiat suscipit quaerat laboriosam obcaecati repudiandae quibusdam placeat, porro ratione ut temporibus laborum itaque illum, voluptatibus perspiciatis nemo. Cumque quam exercitationem, magni eaque tenetur dolores aut ipsa voluptas libero odio explicabo nihil perspiciatis autem maiores. Aspernatur, sit deserunt amet, ducimus ullam unde magnam eos delectus quaerat ea asperiores, eveniet officiis vel et suscipit fugiat? Ea cupiditate perspiciatis, dolorem saepe ad eveniet harum quam voluptates! Aliquam ut assumenda sapiente debitis porro. Mollitia, et eveniet! Dicta est consequuntur nisi, quis quo praesentium, debitis officia eius qui vero dolorem sequi? Iusto, nulla? Beatae sit facilis, hic, repellendus ullam corporis aliquam a explicabo quidem et, aperiam unde veritatis autem enim est? Quam, odio enim veniam nobis nemo voluptatum sequi consequuntur labore hic nisi. Expedita, est autem velit enim quis id praesentium modi quae voluptas sit quisquam recusandae illum soluta ex saepe! Obcaecati architecto explicabo, pariatur fugiat aspernatur magnam ex doloremque quod optio ea dignissimos, tempora eveniet odio magni non, velit error hic temporibus qui labore! Dolor animi unde maxime, quidem quod doloribus facilis corrupti exercitationem quo repellendus earum impedit, fuga et alias laborum. Corporis, deserunt, fugit, sed culpa rem odit dignissimos cum sint ut reprehenderit saepe. Ex consequuntur dolor minima sed accusamus libero vitae sapiente, molestias illo eum quis voluptate eos, suscipit quia blanditiis necessitatibus error reiciendis natus velit. Non aut possimus hic veritatis cupiditate asperiores dolorum quaerat laborum inventore, eligendi velit harum adipisci nulla ullam qui? Possimus, dolore? Nam unde, sunt assumenda inventore a quidem dolore, quibusdam repudiandae sapiente quis explicabo aliquid libero accusamus molestias at ullam eum vero ab ratione. Consequatur recusandae inventore ad voluptatibus perspiciatis error nulla suscipit! Modi voluptate ea dolore earum nostrum fugit doloremque iure in, libero incidunt tempora assumenda provident veniam praesentium quia inventore officiis optio? Et cum dolore quisquam, nesciunt molestiae reprehenderit in sunt nihil quas natus ipsa facilis sapiente eum quidem beatae dolores exercitationem quo quos maxime possimus omnis commodi corrupti voluptates? Quod ipsa doloremque sunt quis temporibus neque quisquam beatae commodi! Saepe inventore autem consequatur quam velit in voluptates quisquam voluptatum pariatur, quos sequi illo tenetur beatae necessitatibus. Dicta adipisci libero fuga enim voluptates nobis nostrum minus, eveniet earum quaerat quo ad nihil facere odit veniam magni a! Autem voluptatum, quam odit blanditiis officiis deleniti est voluptas sunt nulla adipisci? Et sapiente minus esse, excepturi a recusandae dolorem, exercitationem, voluptatum necessitatibus repudiandae illum totam. Voluptates, expedita dolore. Aliquid dignissimos eos quam magni sed reprehenderit totam hic ex explicabo autem sint eveniet voluptas amet quibusdam illo tenetur fugit, velit molestias repudiandae consectetur nobis. Laudantium eveniet explicabo perferendis dolorem nostrum dolor numquam similique omnis id minus quisquam doloribus tempore voluptate sunt culpa autem suscipit, reprehenderit vitae incidunt? Ad suscipit deleniti aliquid cupiditate adipisci, possimus delectus eum odit magnam fugiat excepturi minus aut omnis aspernatur error inventore explicabo. Provident id nihil inventore nemo sapiente doloremque perspiciatis eos molestiae, cum sint impedit neque voluptate quaerat. Asperiores
                        </p>
                    </div>
                    <div id="Others" className="bg-white p-14 col-span-6 shadow-md text-black w-full">
                        <h1 className="text-xl text-gray-700 font-semibold pb-5">Others</h1>
                        <p className="text-justify">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim quod fugiat, asperiores maiores veniam vitae quidem iusto voluptatum doloremque perferendis quaerat consectetur. Ducimus distinctio quia esse rem ipsam unde cumque dicta asperiores aut. Iure dolore atque laudantium quasi unde voluptatem beatae soluta distinctio hic illum fuga labore accusamus dolor itaque, rem voluptates odio deleniti maiores id neque adipisci nemo omnis? Corrupti reiciendis, repellendus obcaecati minus, temporibus fugiat nisi iste quis quo nostrum dolor voluptate sit odit quasi amet inventore aliquid quidem mollitia culpa eaque dolores nam est. Commodi porro illo quia repellendus, molestiae quaerat consectetur delectus sapiente accusantium ea, magnam vitae debitis cum! Eum magnam deserunt ut incidunt, dolore odio officiis dignissimos praesentium commodi! Reiciendis minima quae quam ab odit delectus, consequatur illo asperiores suscipit magnam soluta deserunt modi exercitationem? Aliquid optio sapiente eius molestias reprehenderit quo voluptas ut, asperiores a culpa, illo quis earum recusandae rerum non totam saepe ex neque doloremque! Saepe fugiat illo natus tempora fuga autem ea architecto libero totam quos doloremque modi voluptas, rerum velit soluta eveniet quidem voluptatibus laborum similique quisquam a. Qui atque recusandae consequatur culpa cupiditate saepe. Ratione, id veniam. Alias magnam quaerat fuga minus, iure, suscipit maiores quasi praesentium temporibus odit pariatur atque animi aspernatur est, repudiandae ut iste velit. At iusto pariatur laudantium doloribus recusandae sunt nobis consequuntur laboriosam officiis! Accusamus eos minima iure commodi tempore, sapiente quisquam animi sit, eaque repellat nulla illum eum, earum atque labore aperiam ducimus quidem recusandae! Blanditiis laborum, ad magni dolore magnam corporis nihil, provident perferendis reiciendis iusto ipsam a? Quod consequuntur at, sit illo adipisci et vitae eaque modi eos iste incidunt commodi suscipit molestiae asperiores veniam laudantium corrupti accusamus aperiam minima repudiandae unde. Magni, dicta suscipit nisi dolorum harum nulla officiis quia. Libero qui aut quo minima repudiandae dolor, dolorum atque facilis id alias numquam corrupti odio vel aliquid nobis, illum consequatur voluptates reiciendis voluptatum accusantium, praesentium iste quas tempore. Blanditiis enim aperiam quae repudiandae perferendis doloribus quas natus possimus? Enim minima quae cupiditate culpa illum aut aperiam temporibus illo! Aperiam, quae rem nemo eum iste unde, asperiores pariatur doloribus vitae officia provident nihil, optio sunt fugit voluptate! Nesciunt, nobis eaque, nisi unde ratione minima possimus dolores adipisci repudiandae deserunt quis quisquam quasi debitis eveniet, quo obcaecati. Nobis dolor praesentium id corporis magni voluptatibus doloremque consequatur accusantium, excepturi illo tempore in alias non, ad hic, cupiditate amet veniam! Sequi labore illo a iure consectetur minus expedita possimus commodi quos, tempora sed sunt quas provident? Cumque consectetur ad blanditiis ipsam quos. Incidunt exercitationem perferendis veritatis voluptates dicta facilis? Harum aspernatur vel natus quod corporis aliquid illo adipisci fuga, minus, voluptatum exercitationem consequatur, magnam quae. Provident assumenda dolores quod aspernatur, eveniet animi reprehenderit at explicabo minima. Facilis sint animi recusandae tempore iste deserunt! Deserunt natus in assumenda illo sed necessitatibus, magnam nostrum reprehenderit totam labore sequi repudiandae tempora accusamus et ducimus illum placeat dolorem nulla maxime corporis eius corrupti delectus nam! Quidem, ratione assumenda! Non esse aliquam ea delectus blanditiis corrupti aperiam officiis omnis id ex quidem rem explicabo soluta animi, consequatur eum nobis cumque sed, nisi a molestias! Expedita consequatur eligendi, ducimus veniam delectus voluptate sint vero molestiae enim neque, quisquam optio. Quibusdam suscipit culpa tenetur iste quas neque, sequi commodi voluptatibus adipisci cupiditate totam ut veritatis soluta, veniam repudiandae officia debitis facere officiis exercitationem. Id, ut nulla? Aliquid sint perferendis eius maiores possimus, tempore id corporis reprehenderit officia delectus aspernatur, dicta dolorum expedita in corrupti a mollitia quia, praesentium blanditiis iste facilis! Rerum doloribus nulla aspernatur fugit, sed ipsum quod nesciunt quasi mollitia iure, eum ab nobis, ipsam error eius totam omnis reprehenderit voluptates! Magni, ex. Necessitatibus delectus laudantium ducimus saepe deleniti dolorum quisquam in perspiciatis officiis deserunt, a dolorem modi, esse suscipit aspernatur, minus exercitationem ipsam adipisci. Repellendus aperiam ad tenetur qui quisquam minus dolorem blanditiis, beatae, iste facere, mollitia sequi fugiat earum explicabo! Totam eaque soluta aperiam ratione vero, laborum est nihil quod, maxime dicta harum, quas tenetur repellendus modi similique enim ea vitae! Molestias sit, ex quam quasi ullam laudantium ratione deserunt, voluptatum ab nulla soluta modi eius harum, nam sapiente corporis recusandae? Veniam reiciendis incidunt eveniet iste, dolorem tempora. Doloribus consectetur eligendi laudantium tenetur minus eos in nihil. Debitis distinctio harum autem dicta reprehenderit facilis, eius voluptatibus! Placeat unde vitae natus fugiat commodi. Molestiae adipisci repudiandae voluptatem quia illum corporis voluptatum ullam provident officia cupiditate, cum, facilis in nesciunt soluta earum. Praesentium, quis vitae. Obcaecati aspernatur eaque facere praesentium? Sequi excepturi praesentium assumenda! Rerum sunt repudiandae fugiat nulla, molestiae similique nam culpa ipsam repellat nostrum. Expedita sapiente quos aliquam quae ea quo labore eum laudantium nemo, similique hic, ipsum nulla. Ipsum voluptate ullam, quo error esse suscipit fugit natus earum architecto temporibus quas eos at vel ea quisquam! Ratione nulla, inventore distinctio consequatur impedit tenetur reprehenderit ut ipsam cumque iusto perferendis dolore molestias magnam pariatur aliquid accusamus hic in voluptates iure officiis modi suscipit quod officia natus! Molestiae neque, consequatur voluptas non ipsa est debitis temporibus possimus aliquam rerum reprehenderit dolorem perferendis nisi tenetur. Accusamus tempore, neque eligendi dolores est dolorum, placeat dolor quod incidunt saepe possimus illum! Sequi aspernatur vitae cupiditate velit odit fugit recusandae repellendus nam quibusdam non beatae molestias deleniti sint, ex,
                        </p>
                    </div>
                </div>
                {/* STICKY FOOTER BLOCK */}
                <div style={{ maxWidth: "75.25rem" }} className="container ml-2 fixed bottom-0 mx-auto py-0 items-center grid grid-cols-6" >
                    <div className="flex col-span-5 justify-end border-t-2 bg-white shadow-lg">
                        <button className="bg-white border border-gray-500 w-auto h-10 px-3 rounded-lg my-3 text-gray-600" onClick={() => { }}
                        >Cancel</button>

                        <button className="bg-blue-600 w-auto h-10 px-3 rounded-lg m-3 text-white" onClick={async () => props.newProductUpload(
                            productName,
                            description,
                            singlePrice,
                            variation,
                            variationPrice,
                            variationOptionName,
                            variationList,
                            variationAll,
                            image,
                            galleries,
                            varImags,
                            selectedStoreID
                        )}
                        >Publish</button>
                    </div>
                </div>
                {/* STICKY FOOTER END */}
            </main >

        </div >

    )
}

const mapStateToProps = state => ({
    userInfo: state.main,
    product: state.product,
    mainStore: state.store
})

const mapDispatchToProps = {
    signOut: signOut,
    showVariation: showVariation,
    showVariationOption: showVariationOption,
    newProductUpload: newProductUpload,
    getStores: getStores
}

export default connect(mapStateToProps, mapDispatchToProps)(newProduct)


