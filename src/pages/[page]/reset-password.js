import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from '../../api/Apis'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
const Login = props => {
    const router = useRouter()
    const [reset_error, seterror] = useState();
    const { register, handleSubmit, errors } = useForm();
    // for reset password
    const onSubmit = data => {
        api.Reset_password(data,null).then(res => {
            if (res?.data?.status === 'OK') {
                toast('Password reset link sent on your email', {duration: 5,type: "success",})
                router.back()
            }
            else
            {
                seterror(res?.data?.email[0])
            }
        })
    }
    
    return (<>
        <Head>
            <title>Reset Password</title>
        </Head>
        <div className="container">
            {props?.isLogin !== true &&

                <form className="signupform main-sign-frm" onSubmit={handleSubmit(onSubmit)}>

                    <h1 className="title">Reset Password</h1>

                    {reset_error && <span className="error">{reset_error}</span>}
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="text" className="form-control" ref={register({
                            required: 'Enter email',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "invalid email address "
                            }

                        })} name="email" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        {errors.email?.message && <span>{errors.email.message}</span>}
                    </div>
                    
                    <div className="sign-up-bnt">
                        <button type="submit" className="btn btn-primary" >Reset</button>
                        <button type="button" className="btn btn-primary sigup" onClick={(e) => {router.push(`/${router?.query?.page}/signup`)}} >signup</button>
                    </div>
                </form>
            }
        </div>
    </>);
}

export default Login;