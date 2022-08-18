import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";

import { connect } from "react-redux";
import { showVariation, showVariationOption } from "../../redux/actions/product"
import { blockInvalidChar } from "../../function/numbersOnly";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';


const variationOptionResult = (props, ref) => {
    // const [varList, setVarList] = useState(props.variationLists);
    // const [varOptionList, setVarOptionList] = useState(props.variationOptionList);
    const [imageUrl, setImageUrl] = useState('');

    // const [varImags, setVarImages] = useState([]);
    const [varImagesUrl, setVarImagesUrl] = useState([]);

    const variationOption = props.product.variationsOptionEnabled;
    // const count = Object.keys(props.variationOptionList).length;

    useImperativeHandle(ref, () => ({
        setFromOutside(varList, varOptionList) {
            varList.map((item, index) => {
                varOptionList.map((itm, indx) => {
                    document.getElementById(`PRICE-${index}${indx}`)["value"] = '';
                    // console.log(`PRICE-${index}${indx}`);
                });
            });
        }
    }), [])

    // const onFileChange = (e: any) => {
    //     setImageUrl(URL.createObjectURL(e.target.files[0]));
    //     props.onFileChange(e.target.files[0]);

    // };

    const onVarImgChange = (e: any, indx) => {
        const imgsURL = [...varImagesUrl];
        imgsURL[indx] = URL.createObjectURL(e.target.files[0]);
        setVarImagesUrl(imgsURL);
        props.onVarImgChange(e.target.files[0], indx)
    };

    const setVariation = (varIndx, optnIndx, price) => {
        props.setVariations(varIndx, optnIndx, { 'Price': price, "status": "available" });
    }

    const _setVarPrices = (e, index) => {

        props.setVarPrices(e, index);
    }
    return (
        <div className="grid grid-cols-8 pb-6 sm:w-11/12">
            {/* <div className="col-span-1 text-gray-600 text-sm">
                Main Image:
            </div>
            <div className="col-span-7 mb-4 grid sm:grid-cols-8 xl:grid-cols-8 grid-cols-2 sm:gap-x-24 gap-x-24 sm:gap-y-2 items-center pb-4 w-full">
                <label className="col-span-1 items-center justify-center self-center tracking-wide cursor-pointer">
                    <input onChange={(e) => onFileChange(e)} type='file' className="hidden" accept="image/png, image/gif, image/jpeg" />
                    <div style={{ backgroundImage: `url(${imageUrl})` }} className="border-dotted bg-cover bg-no-repeat bg-center border-2 flex items-center border-blue-400 w-20 h-20 justify-items-center ">
                        {imageUrl ? null : <span className="border  border-blue-400 items-center  rounded-full text-2xl font-light text-blue-400 text-center w-10 h-10 m-auto ">
                            +
                        </span>}

                    </div>
                    <span className="flex self-center text-center items-center align-middle text-xs w-max mx-2.5 my-2">Main</span>

                </label>
            </div> */}
            {/* {props.variationLists != null ?
                <div className="col-span-1 text-gray-600 text-sm">
                    Variation Images:
                </div>
                : null}
            {props.variationLists != null ?
                <div className="col-span-7 grid sm:grid-cols-8 xl:grid-cols-8 grid-cols-2 sm:gap-x-24 gap-x-24 sm:gap-y-2 items-center pb-4 w-full">

                    {props.variationLists.map((item, index) => {
                        return <label key={index} className="w-auto col-span-1 items-center justify-center self-center tracking-wide cursor-pointer">
                            <input onChange={(e) => { onVarImgChange(e, index) }} type='file' className="hidden relative h-96 w-96 z-50" accept="image/png, image/gif, image/jpeg" />

                            <div style={{ backgroundImage: `url(${varImagesUrl[index]})` }} className="border-dotted border-2 flex items-center border-blue-400 w-20 h-20 justify-items-center bg-cover bg-no-repeat bg-center">

                                {varImagesUrl[index] ? null :
                                    <span className="border border-blue-400 items-center rounded-full text-2xl font-light text-blue-400 text-center w-10 h-10 m-auto ">
                                        +
                                    </span>
                                }
                            </div>
                            <span className="flex self-center text-center items-center align-middle text-xs w-max mx-2.5 my-2">{item}</span>

                        </label>
                    })}
                </div>
                : null
            } */}

            <div className="col-span-1 text-gray-600 ">
                Branch Informations:
            </div>
            {/* <button onClick={deletePrices}>Delete</button> */}
            <div className="col-span-7">
                {/* <div onClick={() => { props._showVariation(false); props._showVariationOption(false) }} className="cursor-pointer border float-right border-blue-400  rounded-full text-sm flex items-center align-middle justify-center object-center font-light text-blue-400 w-5 h-5 m-auto">X</div> */}
                <br />
                <table className="text-sm border text-gray-500 text-center w-full">
                    <thead>
                        <tr>
                            <th className="border w-3/12 text-base font-normal p-4">Branch Name</th>
                            {variationOption ?
                                <th className="border w-3/12 text-base font-normal p-4">{props.variationOptionName}</th>
                                : null}
                            <th className="border w-5/12 text-base font-normal p-4">Google Map Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.branches.map((item, index) => {
                            return <tr key={index}>
                                <td className="border-b text-center py-4">{`${item.name}`}</td>
                                <td className="border-b text-center py-4">{`${item.address}`}</td>
                                {/* {variationOption ?
                                    <td>
                                        <table className="w-full border-2  text-gray-800 items-center text-center object-center">
                                            <tbody>
                                                {props.variationOptionList.map((optn, indx) => {
                                                    return <tr key={indx}><td className={` ${indx != (count - 1) ? ' border-b' : null} text-center py-2 w-full`}>{`${props.variationOptionList[indx]}`}</td></tr>
                                                })}
                                            </tbody>
                                        </table>
                                    </td>
                                    : null} */}


                                {/* {variationOption ? null : <td className="border text-center p-2">
                                    <GooglePlacesAutocomplete
                                        apiKey={process.env.GOOGLE__MAP_ID}
                                        apiOptions={{ region: 'ph' }}
                                        selectProps={{
                                            // value,
                                            onChange: (e) => _setVarPrices(e.target.value, index),
                                            // onkeyup: disableButton,
                                            placeholder: 'Municipality, Province or City, Brgy,',
                                        }}

                                    />
                              
                                </td>} */}
                            </tr>
                        })}

                    </tbody>
                </table>
                {/* <button className="bg-blue-600 w-14 h-10 rounded-xl mt-5 float-right z-50 text-white" onClick={() => props.newProductUpload(
                    props.productName,
                    props.description,
                    props.variationName,
                    props.variationOptionName,
                    props.variationLists,
                    variationAll,
                    image,
                    varImags)}>Done</button> */}
            </div>
        </div>

    )
}



const mapStateToProps = state => ({
    product: state.product,
})

const mapDispatchToProps = {
    _showVariation: showVariation,
    _showVariationOption: showVariationOption
}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(forwardRef(variationOptionResult))