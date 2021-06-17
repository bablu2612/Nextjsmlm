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
    const [data_sign, setdata] = useState();
    const [loginError, setloginError] = useState();
    const { register, handleSubmit, errors } = useForm();
    // login user
    const onSubmit = data => {
        setdata(data)
    }
    useEffect(() => {
        {
            data_sign &&
                api.LoginUser(data_sign).then(res => {
                    if (res?.data?.code == 1) {
                        props.setisLogin(true);
                        localStorage.setItem('Login', true);
                        localStorage.setItem('Token', res.data.token);
                        toast('Successfully Login', { duration: 5, type: "success", })
                        api.getAllCartProduct(res.data.token).then(res => {
                            props.setcounts(res?.data)

                        })
                        if (props.oldpath === '/') {
                            router.push('/')
                        }
                        else {
                            router.push(`${props.oldpath}`)
                        }

                    }
                    else {
                        setloginError(res?.data?.message);
                        toast.error(res?.data?.message, { duration: 5 })
                    }
                })
        }
    }, [data_sign]);

    // on click signup link
    const handleOpen = (e) => {
        router.push(`/${router?.query?.page}/signup`)
    };

    return (<>
        <Head>
            <title>Login</title>
        </Head>
        <div className="container">
            {props?.isLogin !== true &&
                <form className="signupform main-sign-frm" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="title">Login</h1>

                    <div className="loginError"> {loginError && loginError}</div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="text" className="form-control" ref={register({
                            required: true,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "invalid email address"
                            }
                        })} name="email" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        {errors.email?.message && <span>{errors.email.message}</span>}{errors.email && <span>Enter Email</span>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" id="exampleInputPassword1" ref={register({ required: true })} />
                        {errors.password && <span>Password This field is required</span>}
                    </div>

                    <div className="forgot password">
                        <Link className="nav-link" exact href="/page/reset-password">
                            <a>Forgot Password</a>
                        </Link>
                    </div>

                    <div className="sign-up-bnt">
                        <button type="button" className="btn btn-primary sigup" onClick={(e) => { router.push(`/${router?.query?.page}/signup`) }}>Signup</button>
                        <button type="submit" className="btn btn-primary login"  >Login</button>
                    </div>

                </form>
            }
        </div>
    </>);
}

export default Login;