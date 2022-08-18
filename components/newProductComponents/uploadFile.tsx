import { useState } from "react"


const uploadFile = ({ items, onGalleriesChange }) => {
    // let items = ['Cover Photo', 'Image 1', 'Image 2', 'Image 3', 'Image 4', 'Image 5', 'Image 6'];
    // console.log(items);
    const [galleries, setGalleries] = useState([]);



    const onGalleriesChanges = (e: any) => {
        const files = e.target.files;
        const newFilesURL = [];
        const newFiles = [];
        for (let i = 0; i < files.length; i++) {
            newFilesURL.push(...galleries, URL.createObjectURL(files[i]));
            newFiles.push(...galleries, files[i]);
        }
        // console.log(newFilesURL);
        onGalleriesChange(newFilesURL, newFiles);
    };

    const UploadImage = ({ title }) => {
        {

            return (

                <label className="w-auto col-span-1 items-center justify-center self-center tracking-wide cursor-pointer">
                    <input type='file' className="hidden relative h-96 w-96 z-50" multiple accept="image/png, image/gif, image/jpeg" />
                    <div style={{ backgroundImage: `url(${title})` }} className="border-dotted border-2 flex items-center border-blue-400 w-20 h-20 justify-items-center bg-cover bg-no-repeat bg-center">
                        {/* <span className="border border-blue-400 items-center  rounded-full text-2xl font-light text-blue-400 text-center w-10 h-10 m-auto ">
                            +
                        </span> */}
                    </div>
                    <span className="flex self-center text-center items-center align-middle text-xs w-max mx-2.5 my-2"></span>
                    {/* {title} */}
                </label>
            )
        }
    }

    return (
        <div>
            <div className="col-span-2 grid sm:grid-cols-8 xl:grid-cols-8 grid-cols-2 sm:gap-x-24 gap-x-24 sm:gap-y-2 items-center pb-4 w-full">

                {items.length > 0 ? null :
                    <label className="w-auto col-span-1 items-center justify-center self-center tracking-wide cursor-pointer">
                        <input onChange={(e) => onGalleriesChanges(e)} type='file' className="hidden relative h-96 w-96 z-50" multiple accept="image/png, image/gif, image/jpeg" />
                        <div className="border-dotted border-2 flex items-center border-blue-400 w-20 h-20 justify-items-center ">
                            <span className="border border-blue-400 items-center  rounded-full text-2xl font-light text-blue-400 text-center w-10 h-10 m-auto ">
                                +
                            </span>
                        </div>
                        <span className="flex self-center text-center items-center align-middle text-xs w-max mx-2.5 my-2">Galleries</span>
                    </label>
                }




                {items.map((item, index) => {
                    return < UploadImage key={index} title={item} />
                })}



            </div>
        </div >
    )
}


export default uploadFile;