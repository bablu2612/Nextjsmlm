import { useForm } from "react-hook-form";
import api from "../../../../../api/Apis";
import { ToastContainer, toast } from 'react-toastify';

const ProfileEdit = ({ profilepageData, LoginToken, setEditDetails, setreloadData }) => {

    const { register, handleSubmit, watch, errors, getValues } = useForm();
    // for reset password
    const onSubmit = data => {
        api.ProfileUpdate(data, LoginToken).then(res => {
            setEditDetails(false)
            setreloadData(true)
            if(res?.data?.code===1)
            {
                
                toast(res?.data?.message, {duration: 5,type: "success",})

            }
        })
    }
    return (
        <div className="update-details">

            <h4 className="update-profile">Update </h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-md-4">
                        <label htmlFor="exampleInputPassword1" className="form-label"> First Name</label>
                        <input type="text"
                            defaultValue={profilepageData?.first_name}
                            className="form-control" name="first_name" id="exampleInputPassword2" ref={register({ required: true })} />
                        {errors.first_name && <span>This field is required</span>}
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="exampleInputPassword1" className="form-label">Last Name</label>
                        <input type="text"
                            defaultValue={profilepageData?.last_name}

                            className="form-control" name="last_name" id="exampleInputPassword1"
                            ref={register({
                                required: "This field is required",
                                // minLength: {
                                //     value: 8,
                                //     message: "Password must have at least 8 characters"
                                // }

                            })}
                        />
                        {errors.last_name && <span>{errors.last_name.message}</span>}
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="exampleInputPassword1" className="form-label">Phone Number</label>
                        <input type="text"
                            defaultValue={profilepageData?.userdetails[0]?.phone_number}


                            className="form-control" name="phone_number" id="exampleInputPassword1"
                            ref={
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
                                })}
                        />
                        {errors.phone_number && <span>{errors.phone_number.message}</span>}
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="exampleInputPassword1" className="form-label">Referral Code</label>
                        <input type="text"

                            defaultValue={profilepageData?.userdetails[0]?.referral_code}

                            className="form-control" name="referral_code" id="referral_code" ref={register({ required: true })} />
                        {errors.referral_code && <span>This field is required</span>}
                    </div>
                </div>
                <div className="row">
                    <button type="submit" className="btn btn-primary">Update Details</button>
                </div>
            </form>
        </div>

    )
}
export default ProfileEdit;