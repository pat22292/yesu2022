import { useState, useEffect } from 'react'
import NewWindow from 'react-new-window'
import { signOut, getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { connect } from "react-redux"
import { checkEmail, renewVcode } from "../redux/actions/main"
import CircularLoading from '../loading/circularLoading';
import { Beforeunload } from 'react-beforeunload';


function CheckEmail(props) {

    const { userInfo, setInfo } = props;
    const router = useRouter();

    const cancelRegistration = async () => {
        await signOut();
        window.close();
    }
    const continueLogin = async () => {

    }

    useEffect(() => {
        //  props.sessyawn != null || undefined ? props.checkEmail(props.sessyawn.user.email) : null;

        props.sessyawn != null || undefined ? props.checkEmail(props.sessyawn.user.email) : null;

    }, []);
    const myFunction = () => {


        // var txt;
        var r = confirm("You don't have an account yet? continue to registration?");
        if (r == true) {



            // txt = "You pressed OK!";
            setTimeout(() => { window.close(); }, 2000);
        } else {
            cancelRegistration();
        }
    }
    if (userInfo.registered == 0) { myFunction(); }
    if (userInfo.registered == 1) {
        localStorage.setItem('registered', '200');
        setTimeout(() => {
            window.close();
        }, 4000);
        // props.renewVcode(props.sessyawn.user.email);
        // localStorage.setItem("remebered", "true");
        // localStorage.setItem("registered", userInfo.INFO);
        // alert('This email already been registered.');
        // if (userInfo.INFO == 200) { window.close(); }
    }
    // window.addEventListener("beforeunload", (ev) => {
    //     ev.preventDefault();
    //     return ev.returnValue = 'Are you sure you want to close?';
    // });

    return (

        <div className="h-screen m-auto flex flex-wrap content-center" >
            {userInfo.registered == 2 ?
                (<Beforeunload onBeforeunload={(e) => e.preventDefault()} />) : (null)
            }


            <div className="row items-center text-center m-auto">
                {/* <div>
                    {userInfo.registered}
                </div> */}
                <div>
                    <img className="w-12 h-12 rounded-full object-center m-auto" src={`${props.sessyawn ? props.sessyawn.user.image : null}`} alt="" />

                </div>
                <p className="my-5 font-light">
                    Checking email:
                    <br></br>
                    {props.sessyawn ? props.sessyawn.user.email : null}

                    <br></br>

                    Please don't close this window.

                </p>
                {/* <p onChange={(e) => {alert(e.tar)}}>{userInfo.registered}</p> */}
                <div className="m-auto w-full">
                    <CircularLoading />
                </div>
            </div>

        </div>

    )

}
const mapStateToProps = state => ({
    userInfo: state.main,
    error: state.error
})

const mapDispatchToProps = {

    checkEmail: checkEmail,
    renewVcode: renewVcode
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckEmail);

export async function getServerSideProps(context) {
    return {
        props: {
            sessyawn: await getSession(context)
        }
    }
}