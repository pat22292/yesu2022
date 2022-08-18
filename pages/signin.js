// import { providers, signIn } from 'next-auth/client'
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import localForage from "localforage";
import CircularLoading from '../loading/circularLoading';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { isValidPhoneNumber } from 'react-phone-number-input'
import Input from 'react-phone-number-input/input';
// import NewWindow from 'react-new-window';
import Popout from 'react-popout';

import { providers, signOut, useSession, getSession } from 'next-auth/client'
import { useRouter } from 'next/router'

// import { homedir } from 'os'

import { connect } from "react-redux"
import { setInfo, register, login, registerSm, renewVcode, loginVcode } from "../redux/actions/main"
import Footer from "../Layouts/footer"
import Tooltip from "../components/tootTip"
// import { route } from 'next/dist/next-server/server/router';

function SignIn(props) {
    const inputRef = useRef();

    const [timeLeft, setTimeLeft] = useState(5);
    const { userInfo, setInfo } = props;
    const router = useRouter();
    const [popup, setPopUp] = useState(false);
    const [registered, setRegistered] = useState('');
    const [address, setAddress] = useState(null);
    const [value, setValue] = useState(null);
    const [session, loading] = useSession();
    const [image, setImage] = useState("");
    // const [userLoading, setUserLoading] = useState(1);
    const [imageName, setImageName] = useState("Choose file");
    const [userRegistered, setUserRegistered] = useState(userInfo.INFO);
    const [verficationCode, setVerificationCode] = useState('');
    const [eventLoading, setEventLoading] = useState(false);
    const [disButton, setDisButton] = useState(true);
    // const sessyawn = getSession()

    useEffect(() => {
        // props.sessyawn != null || undefined ? console.log(props.sessyawn.user.email) : null;
        // props.sessyawn != null || undefined ? setTimeout(() => {
        //     setUserLoading(0);
        // }, 5000) : null;
        localForage.getItem('mini-session').then(function (value) {
            const tok = value ? value['token'] : null;
            tok != null ? router.push('/') : null;
        }).catch(function (err) {
            console.log(err);
        });

        setRegistered(localStorage.getItem('registered'));
        if (timeLeft === 0) {
            // console.log("TIME LEFT IS 0");
            setTimeLeft(null)
        }

        if (!timeLeft) return;

        // save intervalId to clear the interval when the
        // component re-renders
        const intervalId = setInterval(() => {

            setTimeLeft(timeLeft - 1);
        }, 1000);

        // clear interval on re-render to avoid memory leaks
        return () => clearInterval(intervalId);

    }, [timeLeft]);



    const [contactNo, setContactNo] = useState();

    const checkNumber = () => {
        var con = contactNo ? contactNo : ''
        if (isValidPhoneNumber(con) != true) {
            // alert('Not a valid phone number');
            // setContactNo();
            disableButton();
            setDisButton(true);
        }
        else {
            disableButton();
        }

    }
    const onFileChange = (e) => {

        // Update the state
        setImage(e.target.files[0]);
        setImageName(e.target.files[0].name);

    };




    const setEmail = (eml) => {
        return eml;
    }

    const timeLoad = () => {
        if (localStorage.getItem('registered') == '200') {

            router.reload();
        }

    }
    const renewVcode = (email) => {
        if (timeLeft == 0) {
            props.renewVcode(email);

        }
    }

    const disableButton = () => {
        var checkVal = [address, value, contactNo].some((el) => {
            if (el == '' || el == null) {
                return true;
            }
            else {
                return false
            }
        });

        setDisButton(checkVal);
    }
    return (

        <div className={`${!session ? 'bg-theme-blue' : 'bg-gray-100'}`}>
            <Head>
                <title>Shupapy User | Best Boiler Plate for NextJS</title>
                <meta property="og:image" content="https://drive.google.com/thumbnail?id=1o9PQIe0vmxhCxvL9qY0NsWUUzXsWfjGh" key="ogimage" />
                {/* <meta property="og:site_name" content={siteName} key="ogsitename" /> */}
                {/* <meta property="og:title" content={`${router.query.name}`} key="ogtitle" /> */}
                {/* <meta property="og:description" content={"description"} key="ogdesc" /> */}
            </Head>
            <nav className={`bg-gray-100 shadow-lg z-50 md:block p-0 m-0`}>


                <div className="flex max-w-6xl mx-auto items-center pt-3 pb-3 col">

                    <div className="flex cursor-pointer" onClick={() => router.push('/')}>

                        {/* Shupapy Icon Start */}
                        <svg className="relative mr-6 w-28 h-14 text-white" version="1.2" baseProfile="tiny" id="Layer_1"
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


                    <div className="pl-4 pt">
                        <h1 className="text-2xl">Log in</h1>
                    </div>

                    {/* {sessyawn ? sessyawn.user.email : null} */}


                </div>
            </nav>
            {!session && <>
                <main className="container bg-contain bg-center bg-no-repeat max-w-6xl mx-auto items-center" style={{ backgroundImage: 'url(https://res.cloudinary.com/dhdn7ukv9/image/upload/v1623139234/shupapyjune_tbybez)', height: '680px' }}>


                    <div onClick={disableButton} onMouseOver={disableButton} className="relative grid m-0 grid-cols-2">

                        {/* <span className="col-span-1 hidden md:block">

                        </span> */}
                        <div className="row pt-16 px-9 sm:px-24 col-span-2 sm:col-start-2 col-start-1">

                            <div className="bg-white shadow-md rounded px-8 pt-6 mb-4 pb-4 ">
                                {/* <CircularLoading /> */}
                                <div className="mb-4">


                                    <label className="block text-grey-darker text-sm font-bold mb-2" >
                                        Email
                                    </label>
                                    <Tooltip tooltipText="Not available yet. login/ signin with google instead">
                                        <input className="cursor-not-allowed shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" type="text" placeholder="Email" disabled />
                                    </Tooltip>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-grey-darker text-sm font-bold mb-2">
                                        Password
                                    </label>
                                    <Tooltip tooltipText="Not available yet. login/ signin with google instead">
                                        <input disabled className="cursor-not-allowed shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="******************" />
                                    </Tooltip>
                                    <p className="text-red text-xs italic">Please choose a password.</p>
                                </div>


                                <button disabled onClick={props.login} className=" opacity-50 cursor-not-allowed w-full bg-blue hover:bg-blue-dark bg-theme-blue text-white  font-bold py-2 px-4 rounded" type="button">
                                    Sign In
                                </button>

                                <br></br>
                                <div className="flex items-center justify-between pt-2">
                                    <a className="text-sm text-blue hover:text-blue-darker" href="#">
                                        Forgot Password?
                                    </a>
                                    <a className="text-sm text-blue hover:text-blue-darker" href="#">
                                        SMS login
                                    </a>
                                </div>

                                <div className="separator py-2 opacity-50">OR</div>
                                <div className="py-1">
                                    <button className="flex bg-red-300 shadow-xl" onClick={() => setPopUp(true)}>

                                        {/* Google Icon Start */}
                                        <svg className="w-5 h-5 m-2" x="0px" y="0px" viewBox="0 0 512 512" >
                                            <path fill="#FBBB00" d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
C103.821,274.792,107.225,292.797,113.47,309.408z"/>
                                            <path fill="#518EF8" d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451
c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535
c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"/>
                                            <path fill="#28B446" d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512
c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771
c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"/>
                                            <path fill="#F14336" d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012
c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0
C318.115,0,375.068,22.126,419.404,58.936z"/>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                            <g>
                                            </g>
                                        </svg>
                                        {/* Google Icon End */}
                                        <p className="p-1 mr-4">
                                            Google
                                        </p>
                                    </button>
                                    {/* <button onClick={props.login}>Test</button> */}
                                </div>

                            </div>
                        </div>

                        {popup && !session ? (
                            <Popout url="exLink/google" onClosing={() => { setPopUp(false); timeLoad(); }}>
                            </Popout>

                        ) : null}




                    </div>



                </main>

            </>}
            {/* {session && console.log(session)} */}
            {
                session && <>
                    <main

                        className="container max-w-6xl mx-auto items-center">

                        {registered != '200' ?
                            <div className="bg-grey-lighter min-h-screen flex flex-col">
                                <div className="mx-auto pt-20 flex flex-col items-center justify-center px-2">

                                    {/* {userLoading == 0 ? */}

                                    <div className="bg-white px-6 py-4 shadow-xl text-black w-full">

                                        <div className="grid grid-cols-3 gap-2">

                                            <div className="text-center flex mb-8 col-span-3 justify-center">


                                                {session.user.image &&

                                                    <span className="m-2 h-14 w-14 rounded-full border-gray-200 border bg-contain bg-no-repeat" style={{ backgroundImage: `url(${session.user.image})` }}>
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
                                            >{session.user.name['first_name']}</p>
                                            <label className="flex self-center col-span-1 justify-center  text-grey-darker text-md" >
                                                Last Name
                                            </label>
                                            <p
                                                // onChange={() => null}
                                                // type="text"
                                                className="col-span-2 border border-grey-light w-full p-3 rounded"
                                            // name="fullname"
                                            >{session.user.name['last_name']}</p>
                                            <label className="flex self-center col-span-1 justify-center  text-grey-darker text-md" >
                                                Email
                                            </label>
                                            <p className="col-span-2 border border-grey-light w-full p-3 rounder">{setEmail(session.user.email)}</p>
                                            <label className="flex self-center col-span-1 justify-center  text-grey-darker text-md" >
                                                Address
                                                {/* {value ? value.label : null} */}
                                            </label>
                                            <input
                                                onChange={(e) => setAddress(e.target.value)}
                                                onKeyUp={disableButton}
                                                // onBlur={disableButton}
                                                // onClick={disableButton}
                                                type="text"
                                                autoComplete="off"
                                                className="col-span-2 border border-grey-light w-full p-3 rounded"
                                                name="password"
                                                placeholder="House/ Building No, Street etc." />
                                            <label className="flex self-center col-span-1 justify-center  text-grey-darker text-md" >

                                            </label>
                                            <div className="col-span-2 border border-grey-light rounded w-auto h py-3">
                                                <GooglePlacesAutocomplete
                                                    apiKey={process.env.GOOGLE__MAP_ID}
                                                    apiOptions={{ region: 'ph' }}
                                                    selectProps={{
                                                        value,
                                                        onChange: setValue,
                                                        onkeyup: disableButton,
                                                        placeholder: 'Municipality, Province or City, Brgy,',
                                                    }}

                                                />
                                            </div>
                                            {/* <input
                                            onChange={(e) => setAddress(e.target.value)}
                                            type="text"
                                            className="col-span-2 border border-grey-light w-full p-3 rounded"
                                            name="password"
                                            placeholder="address" /> */}
                                            <label className="flex self-center col-span-1 justify-center  text-grey-darker text-md" >
                                                Contact No.
                                            </label>
                                            <Input
                                                country="PH"
                                                defaultCountry="PH"
                                                autoComplete="off"
                                                placeholder="Phone Number (PH)"
                                                value={contactNo}
                                                className="col-span-2 border border-grey-light w-full p-3 rounded"
                                                onChange={setContactNo}
                                                // onBlur={checkNumber}
                                                onKeyUp={checkNumber}
                                                error={contactNo ? (isValidPhoneNumber(contactNo) ? undefined : 'Invalid phone number') : 'Phone number required'}
                                            />
                                            {/* <Input
                                            onChange={(e) => setContactNo(e.target.value)}
                                            className="col-span-2 border border-grey-light w-full p-3 rounded"
                                            placeholder="+639-- --- ----" /> */}
                                            {/* <label className="flex self-center col-span-1 justify-center  text-grey-darker text-md" >
                                            Picture
</label>
                                        <input className="col-span-2 my-2" type="file" onChange={onFileChange} /> */}
                                            {eventLoading == false ?
                                                <div className=" col-span-3 grid grid-cols-3 gap-2 ">
                                                    <button
                                                        type="submit"
                                                        onClick={async () => {


                                                            await
                                                                props.register(
                                                                    session.user.name['first_name'],
                                                                    session.user.name['last_name'],
                                                                    session.user.email,
                                                                    address,
                                                                    value.label,
                                                                    contactNo,
                                                                    image,
                                                                    session.user.image
                                                                );
                                                            await signOut();
                                                            await localStorage.setItem('registered', '');
                                                            router.reload();
                                                        }


                                                        }
                                                        disabled={disButton}
                                                        className=" disabled:cursor-not-allowed disabled:opacity-50 col-span-2 w-full text-center py-3 rounde bg-theme-blue text-white hover:bg-green-dark focus:outline-none "
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
                                                :
                                                <div>
                                                    <CircularLoading />

                                                </div>
                                            }
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
                            :
                            <div className="bg-grey-lighter min-h-screen flex flex-col">
                                <div className="mx-auto pt-20 flex flex-col items-center justify-center px-2">
                                    <div className="bg-white px-12 py-12 shadow-md text-black w-full">

                                        <div className="grid grid-cols-3 gap-2">

                                            <div className="text-center flex col-span-3 justify-center">


                                                {session.user.image &&

                                                    <span className="m-2 h-14 w-14 rounded-full border-gray-200 border bg-contain bg-no-repeat" style={{ backgroundImage: `url(${session.user.image})` }}>
                                                    </span>
                                                }


                                            </div>
                                            <span className="m-2 flex self-center justify-items-center justify-center col-span-3 text-gray-500 border-gray-200 bg-no-repeat">
                                                Hi, {session.user.email}
                                            </span>
                                            <span onChange={renewVcode(session.user.email)} className="m-2 flex self-center justify-items-center justify-center col-span-3 text-gray-500 border-gray-200 bg-no-repeat">
                                                {timeLeft}
                                            </span>


                                            <label className="col-span-3 text-center text-sm text-gray-500 flex self-center justify-center  text-grey-darker text-md" >
                                                Please enter your 4 PIN sent to your registered Mobile number.</label>

                                            <input
                                                onChange={(e) => setVerificationCode(e.target.value)}
                                                type="number"
                                                placeholder={`example: 4059`}
                                                className=" text-center flex justify-center col-span-3 border border-grey-light w-full p-3 rounded"
                                                name="fullname"
                                            />
                                            <label className="flex items-center col-span-3 mt-3">
                                                <input type="checkbox" className=" w-5 h-5 border border-grey-light checked:bg-blue-600 checked:border-transparent" />
                                                <span className="ml-2 text-gray-500 text-sm ">Remember this device.</span>
                                            </label>
                                            {eventLoading == false ?
                                                <div className="w-full col-span-3">
                                                    <button
                                                        type="submit"
                                                        onClick={async () => {
                                                            setEventLoading(true);
                                                            setTimeout(async () => {
                                                                await props.loginVcode(session.user.email.toString(), verficationCode.toString(), session.user.image);
                                                                await signOut();
                                                                router.reload();
                                                            }, 4000);


                                                            // userInfo.error == 'Invalid Verification Code.' ? alert(userInfo.error) : null;
                                                        }
                                                        }

                                                        className="m-1 disabled:opacity-50 disabled:cursor-not-allowed col-span-3 w-full text-center py-3 mt-4 rounded-full bg-theme-blue text-white hover:bg-green-dark focus:outline-none" disabled={timeLeft == null ? false : true}
                                                    >Continue</button>
                                                    {/* <p>{userInfo.error}</p> */}
                                                    <a
                                                        className="col-span-3"
                                                        href={`/api/auth/signout`}

                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            signOut()
                                                            localStorage.setItem('registered', '')
                                                        }}
                                                    >
                                                        <div className="m-1 relative text-center py-3 rounded-full bg-red-600 text-white hover:bg-green-dark focus:outline-none">

                                                            Cancel

                                                        </div>
                                                    </a>
                                                </div>
                                                :
                                                <div className="col-span-3 mt-6">
                                                    <CircularLoading />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }


                    </main>
                </>
            }

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
    register: register,
    login: login,
    registerSm: registerSm,
    renewVcode: renewVcode,
    loginVcode: loginVcode
}


export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

SignIn.getInitialProps = async (context) => {
    return {
        providers: await providers(context)
    }
}