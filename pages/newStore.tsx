import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import localForage from "localforage";
import Link from "next/link";
import { signOut } from "../redux/actions/main";
import { showVariation, showVariationOption, newProductUpload } from "../redux/actions/product"
import { importStore } from "../redux/actions/store"
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { connect } from "react-redux";
import NewImage from '../components/newProductComponents/uploadFile';
import StoreBranches from '../components/newProductComponents/storeBranches';
import LoggedUser from "../components/loggedUser";

const newStore = (props) => {
    const { product, setProduct } = props;
    const cref = useRef(null);
    const router = useRouter();
    const [selectedID, setSelectedID] = useState(`Basic information`);
    const [scrollY, setScrollY] = useState(0);
    const [backSession, setBackSession] = useState(false);
    const [userDetails, setUserDetails] = useState([]);
    const [smProfile, setSmProfile] = useState('');
    const [branches, setBranches] = useState([]);
    const [storeName, setStoreName] = useState('');
    const [description, setDescription] = useState('');


    const [variation, setVariation] = useState('');

    const [variationPrice, setVariationPrice] = useState([]);

    const [branchName, setBranchName] = useState('');
    const [branchAddress, setBranchAddress] = useState(null);


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
        // if (scrollY >= 1501 || scrollY >= 3400) { setSelectedID("Shipping") }
        // if (scrollY > 3501) { setSelectedID("Others") }
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
                                <h1 className=" text-lg text-gray-400 ">{`> Stores`}</h1>
                                <h1 className=" text-lg text-gray-400  pl-2">{`> New Store`}</h1>
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
                        <div className="max-w-full sm:pb-0 pb-6 ">
                            <div className="grid grid-cols-8 pb-6 max-w-full">
                                <div className="sm:col-span-1 col-span-8 text-gray-600 text-sm self-center">
                                    Store Name:
                                </div>
                                <input onChange={(e) => { setStoreName(e.target.value) }} className="sm:col-span-7 col-span-8 shadow appearance-none border rounded max-w-full py-2 px-3 text-grey-darker" type="text" placeholder=" Store Name" />
                            </div>
                            {/* <div className="grid grid-cols-8 pb-6 max-w-full">
                                <div className="sm:col-span-1 col-span-8  text-gray-600 text-sm ">
                                    Description:
                                </div>
                                <textarea onChange={(e) => { setDescription(e.target.value) }} className="resize-none sm:col-span-7 col-span-8 max-w-full shadow h-96 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"></textarea>
                            </div> */}
                            {/* <div className="grid grid-cols-8 pb-6 max-w-full">
                                <div className="sm:col-span-1 col-span-8 text-gray-600 text-sm self-center">
                                    Package Weight:
                                </div>
                                <input className="sm:col-span-7 col-span-8 shadow appearance-none border rounded w-1/2 py-2 px-3 text-grey-darker" type="number" min="0" pattern="[0-9]*" placeholder="Weight(Kg)" />
                            </div> */}
                            <div className="grid grid-cols-5 sm:w-8/12">
                                <div className="col-span-1 text-gray-600 text-sm">
                                    Image/ Logo:
                                </div>
                                <div className="col-span-4 mb-4 grid sm:grid-cols-8 xl:grid-cols-8 grid-cols-2 sm:gap-x-24 gap-x-24 sm:gap-y-2 items-center pb-4 w-full">
                                    <label className="col-span-1 items-center justify-center self-center tracking-wide cursor-pointer">
                                        <input onChange={(e) => onFileChange(e)} type='file' className="hidden" accept="image/png, image/gif, image/jpeg" />
                                        <div style={{ backgroundImage: `url(${imageUrl})` }} className="border-dotted bg-cover bg-no-repeat bg-center border-2 flex items-center border-blue-400 w-20 h-20 justify-items-center ">
                                            {imageUrl ? null : <span className="border  border-blue-400 items-center  rounded-full text-2xl font-light text-blue-400 text-center w-10 h-10 m-auto ">
                                                +
                                            </span>}

                                        </div>
                                        <span className="flex self-center text-center items-center align-middle text-xs w-max mx-2.5 my-2">Upload Photo</span>

                                    </label>
                                </div>
                            </div>
                            {/* <div className="grid grid-cols-5 sm:w-8/12">
                                <div className="col-span-1 text-gray-600 text-sm">
                                    Galleries:
                                </div>
                                <NewImage items={galleriesUrl} onGalleriesChange={onGalleriesChange} />
                            </div> */}

                            <div className="grid grid-cols-8 pb-6 max-w-full">
                                {/* <div className="col-span-1 text-gray-600 text-sm ">
                                    Category:
                                </div> */}
                                {/* <div className="w-auto col-span-7 items-center justify-center self-center">
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

                                </div> */}
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
                            {/* <li onClick={(e) => scrollToForm('Shipping', e.target['innerText'])} className={`text-theme-blue cursor-pointer pl-6 border-l-4 py-2 ${selectedID == 'Shipping' ? `border-theme-blue` : null
                                }`}>
                                Shipping
                            </li>
                            <li onClick={(e) => scrollToForm('Others', e.target['innerText'])} className={`text-theme-blue cursor-pointer pl-6 border-l-4 py-2 ${selectedID == 'Others' ? `border-theme-blue` : null
                                }`}>
                                Others
                            </li> */}
                        </ul>
                    </div>
                    {/* SIDE MENU END */}

                    {/* SALES INFORMATION BLOCK START */}
                    <div id="Sales" className="bg-white p-14 col-span-6 shadow-md text-black w-full">
                        <h1 className="text-xl text-gray-700 font-semibold pb-5">Branches</h1>
                        <div className=" col-span-3 sm:pl-6 pl-3 sm:pt-4 pt-4 w-auto sm:pb-0 pb-6">
                            {/* <h1>{product.variationsEnabled}</h1> */}


                            <div>
                                <div className="grid grid-cols-5 pb-6 sm:w-full">
                                    {/* <div className="col-span-1 text-gray-600 text-sm">
                                            Variation <br /> Name
                                        </div>

                                        <input onChange={(e) => { setVariation(e.target.value) }} className="sm:col-span-4 border-4 col-span-4 shadow appearance-none rounded max-w-full py-2 px-3 text-grey-darker text-center" type="text" placeholder="Variation Name (Color, Flavor, Style etc.)" /> */}

                                    <div className="col-span-1 my-4 py-2 px-3 text-gray-600 text-sm">
                                        List
                                    </div>
                                    <div className="sm:col-span-4 col-span-4  mt-3">
                                        {variationList.map((item, index) => {
                                            return <div key={index} className="grid grid-cols-12">
                                                {/* <div className="col-span-1 my-4 py-2 px-3 text-gray-600 text-sm">
                                                    {index + 1}
                                                </div> */}
                                                <input
                                                    // value={item}
                                                    onChange={(e) => setBranchName(e.target.value)}
                                                    className="col-span-5 shadow appearance-none border rounded w-full max-w-full mb-2 py-2 px-3 text-grey-darker text-center" type="text" placeholder="Branch Name" />
                                                <div className="col-span-1 my-4 py-2 px-3 text-gray-600 text-sm">

                                                </div>
                                                <div className="col-span-6 shadow appearance-none border border-black rounded w-full max-w-full mb-2 py-2 px-3 text-grey-darker text-center">
                                                    <GooglePlacesAutocomplete
                                                        apiKey={process.env.GOOGLE__MAP_ID}
                                                        apiOptions={{ region: 'ph' }}
                                                        selectProps={{
                                                            branchAddress,
                                                            onChange: setBranchAddress,
                                                            // onkeyup: disableButton,
                                                            placeholder: 'Municipality, Province or City, Brgy,',
                                                        }}

                                                    />
                                                </div>
                                                {/* {index != 0 ?
                                                    <div onClick={() => handleRemoveClick(index)} className="cursor-pointer border border-blue-400  rounded-full text-sm flex items-center align-middle justify-center object-center font-light text-blue-400 w-6 h-6 m-auto">X</div>
                                                    : null
                                                } */}
                                            </div>
                                        })
                                        }
                                    </div>
                                    <div className="col-span-4">

                                    </div>
                                    <div onClick={() => { setBranches([...branches, { 'name': branchName, 'address': branchAddress.label }]) }} className=" col-span-1 rounded-md flex items-center bg-blue-400 justify-items-center cursor-pointer">
                                        <span className="place-items-center justify-items-center align-middle justify-center  items-center object-center text-xl font-light text-white text-center w-8 h-8 mx-auto my-1  ">
                                            ADD
                                        </span>
                                    </div>
                                </div>

                                <StoreBranches
                                    storeName={storeName}
                                    variationLists={variationList}
                                    image={image}
                                    varImags={varImags}
                                    branches={branches}
                                    // onFileChange={onFileChange}
                                    onVarImgChange={onVarImgChange}
                                    setVariations={setVariations}
                                    setVarPrices={setVarPrices}
                                    ref={cref}
                                />
                            </div>

                        </div>
                    </div>
                    {/* SALES INFORMATION BLOCK END */}


                </div>
                {/* STICKY FOOTER BLOCK */}
                <div style={{ maxWidth: "75.25rem" }} className="container ml-2 fixed bottom-0 mx-auto py-0 items-center grid grid-cols-6" >
                    <div className="flex col-span-5 justify-end border-t-2 bg-white shadow-lg">
                        <button className="bg-white border border-gray-500 w-auto h-10 px-3 rounded-lg my-3 text-gray-600" onClick={() => { }}
                        >Cancel</button>

                        <button className="bg-blue-600 w-auto h-10 px-3 rounded-lg m-3 text-white" onClick={() => props.importStore(
                            storeName,
                            'Wala',
                            branches

                        )}
                        >Add Store  </button>
                    </div>
                </div>
                {/* STICKY FOOTER END */}
            </main>

        </div >

    )
}

const mapStateToProps = state => ({
    userInfo: state.main,
    product: state.product,
    store: state.store
})

const mapDispatchToProps = {
    signOut: signOut,
    showVariation: showVariation,
    showVariationOption: showVariationOption,
    newProductUpload: newProductUpload,
    importStore: importStore
}

export default connect(mapStateToProps, mapDispatchToProps)(newStore)


