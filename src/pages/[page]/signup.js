import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import api from '../../api/Apis'
// import { toast } from 'react-nextjs-toast'
import Link from "next/link";
import { toast } from 'react-toastify';

const Signup = (props) => {
    const [confirmPassword, setconfirmPassword] = useState();
    const router = useRouter()
    const { register, handleSubmit, watch, errors, getValues } = useForm();
    // to signup user
    const onSubmit = data => {
        const password = getValues("password");
        const confirmpassword = getValues('confirm_password');
        if (password !== confirmpassword) {
            setconfirmPassword('false')
        }
        else {
            api.signUp(data).then(res => {
                if (res?.data?.code === 1) {toast.success(res.data.message, {duration: 5})
                    // router.push('/')
                  const data_sign=  {"email":data.email,"password":data.password}
                  api.LoginUser(data_sign).then(res => {
                    if (res?.data?.code == 1) {
                        props.setisLogin(true);
                        localStorage.setItem('Login', true);
                        localStorage.setItem('Token', res.data.token);
                        toast('Successfully Login', {duration: 5,type: "success",})
                        router.push(props?.oldpath)
                    }
                })
                }
                else {
                    toast.error(res.data.message, {duration: 5})
                }
            })
        }
    }
    


    return (<>
        <Head>
            <title>Signup</title>
        </Head>
        <div className="container">
        {props?.isLogin!==true &&

            <form className="signupform main-sign-frm" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="title">Signup</h1>
                {/* <h3 className="response message">{responsedata && responsedata}</h3> */}
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">First Name*</label>
                    <input type="text" className="form-control" name="first_name" id="f_name" aria-describedby="nameHelp"
                        ref={register({
                            required: "This field is required",
                            minLength: {
                                value: 3,
                                message: "Enter minimum 3 charector"
                            },
                        })}
                    />
                    {errors.first_name && <span>{errors.first_name.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Last Name*</label>
                    <input type="text" className="form-control" name="last_name" id="l_name" aria-describedby="nameHelp"
                        ref={register({
                            required: "This field is required",
                            minLength: {
                                value: 3,
                                message: "Enter minimum 3 charector"
                            },
                        })}

                    />
                    {errors.last_name && <span>{errors.last_name.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address*</label>
                    <input type="text" className="form-control" name="email" id="email" aria-describedby="emailnoHelp" ref={register({
                        required: "This field is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                        }
                    })} />
                    {errors.email && <span>{errors.email.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Country code *</label>
                    <input type="text" className="form-control" name="country_code" id="country_code" aria-describedby="emailnoHelp" ref={register({
                        required: "This field is required",
                        pattern: {
                            value: /^[0-9]/,
                            message: "Enter only number"
                        }
                    })} />
                    {errors.country_code && <span>{errors.country_code.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Phone Number*</label>
                    <input type="text" className="form-control" name="phone_no" id="phone_no" aria-describedby="emailnoHelp" ref={
                        register({
                            required: "This field is required",
                            pattern: {
                                value: /^[0-9]/,
                                message: "Enter only number"
                            },
                            minLength: {
                                value: 5,
                                message: "Enter minimum 5 digit"
                            },
                            maxLength: {
                                value: 10,
                                message: "Phone number not longer then 10 digit"
                            },
                        })} />
                    {errors.phone_no && <span>{errors.phone_no.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password*</label>
                    <input type="password" name="password" className="form-control" id="password" ref={register({
                        required: "This field is required",
                        minLength: {
                            value: 8,
                            message: "Password must have at least 8 characters"
                        },
                        pattern: {
                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/,
                            message: "Enter secure password that includes atleast 1 upercase letter, 1 number"
                        }
                    })} />
                    {errors?.password && <span>{errors.password?.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">confirm Password*</label>
                    <input type="password" className="form-control" name="confirm_password" id="exampleInputPassword3" ref={register({ required: true })} />
                    {errors.confirm_password && <span>This field is required</span>}
                    {confirmPassword === "false" && <span>Password and confirm password not match</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Referral code</label>
                    <input type="text" className="form-control" name="referral_code" id="referral_code" aria-describedby="emailnoHelp" 
                    ref={register({ required: false })}
                     />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="Terms-Condition" name="termscondition" ref={register({ required: true })} />
                    <label className="form-check-label" for="exampleCheck1"  >
                        I agree to the
                       <Link className="nav-link" exact href={`/${router.query.page}/termscondition`}  >
                            <a > Terms and Conditions</a>
                        </Link>
                    </label>
                    {errors.termscondition && <span><br />This field  is required</span>}
                </div>
                <button type="submit" className="btn btn-primary"  >Signup</button>
            </form>
}
        </div>

    </>);
}

export default Signup;

