import { set } from "js-cookie";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Leftnav from "../../../Components/Leftnav";
import api from '../../../api/Apis'
import ProfileEdit from "./Components/Profile/ProfileEdit";
const Profile = () => {
    const { t } = useTranslation();
    const [changePasswardStatus, setchangePasswardStatus] = useState();
    const [profilepageData, setprofilepageData] = useState();
    const [passwordData, setpasswordData] = useState();
    const [changepasswordresponse, setresponsepassword] = useState();
    const { register, handleSubmit, watch, errors, getValues } = useForm();
    const [LoginToken, setLoginToken] = useState();
    const [editdetails, setEditDetails] = useState(false);
    const [reloaddata, setreloadData] = useState(false);

    const [commission_wallet, SetCommissionWallet] = useState()
    // for reset password
    const onSubmit = data => {
        const password = getValues("password");
        const confirmpassword = getValues('confirm_password');
        if (password !== confirmpassword) {
            setchangePasswardStatus('false')
        }
        else {
            setpasswordData(data)
            setchangePasswardStatus('true')
        }

    }
    // load profile page data
    useEffect(() => {
        const token = localStorage.getItem('Token') ? localStorage.getItem('Token') : '';
        setLoginToken(token)
        const formDataDelete = { old_password: passwordData?.old_password, token: token, new_password: passwordData?.password };
        {
            changePasswardStatus === 'true' && passwordData?.old_password ?

                api.changeUserPassword(formDataDelete).then(res => {
                    setresponsepassword(res.data.message);
                })
                :
                api.getProfilePageData(token).then(res => {
                    if (res?.data?.code === 1) {
                        setprofilepageData(res.data.user);
                        SetCommissionWallet(res.data.commission_wallet)
                    }
                })
        }
        api.getProfilePageData(token).then(res => {
            if (res?.data?.code === 1) {
                setprofilepageData(res.data.user);
                SetCommissionWallet(res.data.commission_wallet)
                setreloadData(false)
            }
        })
    }, [changePasswardStatus, reloaddata]);

    const router = useRouter();
    return (<>
        <Head>
            <title>Profile</title>
        </Head>
        <div className="mainorder-detail-sec">
            <div className="profile-page-main">
                <div className="container">
                    <div className="row">
                        <Leftnav />
                        <div className="col-md-9">
                            <div className="right-side">
                                <h3 className="title">Personal details</h3>
                                {editdetails === false ?

                                    <>
                                        <div className="pro-fil-user">

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label className="name"><strong>Name:</strong></label>
                                                    {profilepageData?.first_name && profilepageData.first_name} {profilepageData?.last_name && profilepageData.last_name}

                                                </div>
                                                <div className="col-md-6">
                                                    <label className="name"><strong>Email: </strong></label>

                                                    {profilepageData?.email && profilepageData.email}

                                                </div>
                                                <div className="col-md-6 userdetails">
                                                    <label className="name"><strong>Referral code:</strong></label>
                                                    {profilepageData?.userdetails[0]?.referral_code}

                                                </div>
                                            </div>
                                            <div className="wallet_data">
                                                <div className="Kaire_cash">
                                                    <lable className="kaire_lable"><strong>Kaire Cash: </strong></lable>
                                                    {profilepageData?.userdetails[0]?.kaire_cash}
                                                </div>
                                                <div className="commission_wallet">
                                                    <lable className="commission_wallet_lable"><strong>Commission Wallet: </strong></lable>
                                                    {commission_wallet}

                                                </div>
                                            </div>
                                        </div>

                                        <button type="button" className="btn btn-primary" onClick={() => { setEditDetails(true) }}  >Edit</button>


                                    </>
                                    :
                                    <ProfileEdit setreloadData={setreloadData} setEditDetails={setEditDetails} LoginToken={LoginToken} profilepageData={profilepageData} />
                                }
                                {changepasswordresponse && <h3 className="title">{changepasswordresponse}</h3>}
                                {changePasswardStatus === 'new' || changePasswardStatus === 'false' ? <>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <label htmlFor="exampleInputPassword1" className="form-label"> Old Password</label>
                                                <input type="password" className="form-control" name="old_password" id="exampleInputPassword2" ref={register({ required: true })} />
                                                {errors.old_password && <span>This field is required</span>}
                                            </div>
                                            <div className="col-md-4">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                                <input type="password" className="form-control" name="password" id="exampleInputPassword1"
                                                    ref={register({
                                                        required: "This field is required",
                                                        minLength: {
                                                            value: 8,
                                                            message: "Password must have at least 8 characters"
                                                        },
                                                        pattern: {
                                                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/,
                                                            message: "Enter secure password that includes atleast 1 upercase letter, 1 number"
                                                        }
                                                    })}
                                                />
                                                {errors.password && <span>{errors.password.message}</span>}
                                            </div>
                                            <div className="col-md-4">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                                                <input type="password" className="form-control" name="confirm_password" id="exampleInputPassword3" ref={register({ required: true })} />
                                                {errors.confirm_password && <span>This field is required</span>}
                                                {changePasswardStatus === "false" && <span>Password and confirm password not match</span>}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </div>
                                    </form>
                                </>
                                    :
                                    editdetails === false &&
                                    <button type="button" className="btn btn-primary" onClick={() => { setchangePasswardStatus('new') }}  >Change Password</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}
export default Profile;