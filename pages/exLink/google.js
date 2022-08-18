import { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/client'
import Head from 'next/head';
import { useRouter } from 'next/router'

const SignInPage = () => {
    const [session, loading] = useSession()
    const router = useRouter();
    <Head>
        <title>Shupapy Google Sign In</title>
        <meta property="og:image" content="https://drive.google.com/thumbnail?id=1o9PQIe0vmxhCxvL9qY0NsWUUzXsWfjGh" key="ogimage" />
        {/* <meta property="og:site_name" content={siteName} key="ogsitename" /> */}
        {/* <meta property="og:title" content={`${router.query.name}`} key="ogtitle" /> */}
        {/* <meta property="og:description" content={"description"} key="ogdesc" /> */}
    </Head>
    useEffect(() => {
        if (!loading && !session) void signIn('google')
        if (!loading && session) {

            router.push('/checkemail');            // window.close();

        }
        // console.log(session);
    }, [session, loading])

    return null
}

export default SignInPage