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



    return (

        <div className="h-screen m-auto flex flex-wrap content-center" >
            <h1>This is for CODE</h1>
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