import React, { useState } from 'react'
import { signOut, getSession } from 'next-auth/client'
import { connect } from "react-redux"
import { setInfo, register, login, registerSm, renewVcode, loginVcode } from "../redux/actions/main"


function Register(props) {
    const [address, setAddress] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [image, setImage] = useState("");
    const [imageName, setImageName] = useState("Choose file");

    const setEmail = (eml) => {
        return eml;
    }
    const onFileChange = (e) => {

        // Update the state
        setImage(e.target.files[0]);
        setImageName(e.target.files[0].name);

    };
    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="mx-auto pt-20 flex flex-col items-center justify-center px-2">

                {/* {userLoading == 0 ? */}

                <div className="bg-white px-6 py-4 shadow-md text-black w-full">

                    <div className="grid grid-cols-3 gap-2">

                        <div className="text-center flex mb-8 col-span-3 justify-center">


                            {props.session.user.image &&

                                <span className="m-2 h-14 w-14 rounded-full border-gray-200 border bg-contain bg-no-repeat" style={{ backgroundImage: `url(${props.session.user.image})` }}>
                                </span>
                            }

                        </div>

                        {/* <h1 class="mb-8 text-3xl text-center">Sign up</h1> */}

                        <label className="col-span-1 flex self-center justify-center  text-grey-darker text-md" >
                            First Name
</label>

                        <p
                            // onChange={() => null}
                            // type="text"
                            className="col-span-2 border border-grey-light w-full p-3 rounded"
                        // name="fullname"
                        >{props.session.user.name['first_name']}</p>
                        <label className="flex self-center col-span-1 justify-center  text-grey-darker text-md" >
                            Last Name
</label>
                        <p
                            // onChange={() => null}
                            // type="text"
                            className="col-span-2 border border-grey-light w-full p-3 rounded"
                        // name="fullname"
                        >{props.session.user.name['last_name']}</p>
                        <label className="flex self-center col-span-1 justify-center  text-grey-darker text-md" >
                            Email
</label>
                        <p className="col-span-2 border border-grey-light w-full p-3 rounder">{setEmail(props.session.user.email)}</p>
                        <label className="flex self-center col-span-1 justify-center  text-grey-darker text-md" >
                            Address
</label>
                        <input
                            onChange={(e) => setAddress(e.target.value)}
                            type="text"
                            className="col-span-2 border border-grey-light w-full p-3 rounded"
                            name="password"
                            placeholder="address" />
                        <label className="flex self-center col-span-1 justify-center  text-grey-darker text-md" >
                            Contact No.
</label>

                        <input
                            // type="number"
                            onChange={(e) => setContactNo(e.target.value)}

                            // value={contactNo}
                            className="col-span-2 border border-grey-light w-full p-3 rounded"
                            // name="confirm_password"
                            placeholder="+639-- --- ----" />
                        <label className="flex self-center col-span-1 justify-center  text-grey-darker text-md" >
                            Picture
</label>
                        <input className="col-span-2 my-2" type="file" onChange={onFileChange} />
                        <button
                            type="submit"
                            onClick={() => props.register(
                                props.session.user.name['first_name'],
                                props.session.user.name['last_name'],
                                props.session.user.email,
                                address,
                                contactNo,
                                image
                            )}
                            className="col-span-2 w-full text-center py-3 rounde bg-theme-blue text-white hover:bg-green-dark focus:outline-none "
                        >Create Account</button>
                        <a
                            className="col-span-1"
                            href={`/api/auth/signout`}

                            onClick={(e) => {
                                e.preventDefault()
                                signOut()
                                localStorage.setItem('registered', '')
                            }}
                        >
                            <div className=" relative w-full text-center py-3 rounded bg-red-600 text-white hover:bg-green-dark focus:outline-none">

                                Cancel

</div>
                        </a>
                    </div>


                    <div className=" text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the
<a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Terms of Service
</a> and
<a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Privacy Policy
</a>

                    </div>
                </div>

                {/* // : (<SiginLoading />)} */}


            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    userInfo: state.main,
    error: state.error
})

const mapDispatchToProps = {
    setInfo: setInfo,
    register: register,
    login: login,
    registerSm: registerSm,
    renewVcode: renewVcode,
    loginVcode: loginVcode
}


export default connect(mapStateToProps, mapDispatchToProps)(Register);



export async function getServerSideProps(context) {
    return {
        props: {
            session: await getSession(context)
        }
    }
}