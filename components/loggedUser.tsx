import { signOut } from "../redux/actions/main";
import { connect } from "react-redux"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import router from "next/router";
import localForage from "localforage";


const loggedUser = (props) => {

    const [userDetails, setUserDetails] = useState([]);
    const [backSession, setBackSession] = useState(false);
    const [smProfile, setSmProfile] = useState('');
    const [navHidden, setnavHidden] = useState(true);


    const handleNavHide = () => {
        setnavHidden(false);
    };
    const handleBodyClick = () => {
        setnavHidden(true);
    };

    useEffect(() => {
        localForage.getItem('mini-session').then(function (value) {

            value != null ? setBackSession(true) : setBackSession(false);

            setUserDetails(value['user']);
            setSmProfile(value['smProfileImage']);

        }).catch(function (err) {
            // console.log(err);
        });


    }, []);

    return (
        <div className="hidden md:block">
            <div className="flex right-0 items-center m-2 p-2">


                {backSession == true ?

                    < button onMouseOver={handleNavHide} className="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid" id="user-menu" aria-label="User menu" aria-haspopup="true">
                        <h1>{props.navStatus}</h1>
                        <img className="h-auto w-6 rounded-full bg-white" src={smProfile} alt="" />
                        <span className="px-2 rounded-md text-xs font-extralight text-black focus:outline-none focus:text-white focus:bg-gray-700">
                            {userDetails['first_name']}
                        </span>
                    </button>
                    :


                    <span className=" cursor-pointer rounded-md text-sm font-normal text-black focus:outline-none focus:text-blue-500 focus:bg-gray-700">
                        <Link href={{ pathname: '/signin' }}
                        >
                            Login
                        </Link>
                    </span>}




                <div className="origin-top-right  z-50 absolute right-auto lg:right-24 mt-32 w-48 rounded-md shadow-lg" hidden={navHidden}>
                    <div onMouseLeave={handleBodyClick} className="py-1 rounded-md bg-gray-100 shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">{`${userDetails['first_name']} ${userDetails['last_name']}`}</a>

                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</a>

                        <a onClick={async () => { await props.signOut(); router.reload(); }} className=" cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</a>
                    </div>
                </div>

            </div>
        </div >
    )
}

const mapStateToProps = state => ({
    userInfo: state.main
})

const mapDispatchToProps = {
    signOut: signOut
}


export default connect(mapStateToProps, mapDispatchToProps)(loggedUser)

