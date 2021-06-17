import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../../../../api/Apis';
import { toast } from 'react-toastify';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

export default function AddressAutoship({ logintoken, showaddresslist, setshowaddressform, showdetails, getautoshiporder, alladdressData, setalladdressData, setaddressData, addressDetails, Setshowaddress, setaddressDetails }) {
    const { register, handleSubmit, watch, errors } = useForm();
    const [data_address, setdata] = useState();
    const [countryError, setCountryError] = useState()
    const [stateError, setStateError] = useState()
    const [country, setCountry] = useState();
    const [state, setState] = useState()

    if (addressDetails?.country && addressDetails?.state && country === undefined && state === undefined) {

        setCountry(addressDetails.country);
        setState(addressDetails?.state)
    }
    const handleCountryStateError = () => {


        if (country === undefined && countryError === undefined) {

            setCountryError("Please Select The Country")
        }
        if (state === undefined && stateError === undefined) {

            setStateError("Please Select The State")
        }
    }

    const onSubmit = data => {

        if (country !== undefined && state !== undefined) {
            data.country = country
            data.state = state
            //update_address
            if (+data?.address_id > 0) {
                const formData = { data: data, token: logintoken };
                api.UpdateAddress(formData).then(res => {
                    if (res?.data?.code === 1) {
                        toast.success('Address updated successfully', {
                            duration: 1
                        })
                        const update_data = {
                            order_id: +showdetails,
                            billing_address_id: +res.data.address_id,
                            shipping_address_id: +res.data.address_id
                        }
                        api.AddressUpdate(update_data, logintoken).then(res => {
                            getautoshiporder()
                            showaddresslist()
                            setshowaddressform(false)
                        })
                    }
                })
            }
            else {
                const formData = { data: data, token: logintoken };
                api.saveAddress(formData).then(res => {
                    if (res?.data?.code === 1) {
                        toast.success('Address added successfully', {
                            duration: 1
                        })
                        const update_data = {
                            order_id: +showdetails,
                            billing_address_id: +res.data.address_id,
                            shipping_address_id: +res.data.address_id
                        }
                        api.AddressUpdate(update_data, logintoken).then(res => {
                            if (alladdressData?.addresses?.length > 0) {
                                getautoshiporder()
                                showaddresslist()
                            }
                            else {
                                getautoshiporder()
                                // showaddresslist()

                                setalladdressData([])
                            }
                            setshowaddressform(false)

                        })
                    }
                })
            }
        }
    }
    return <>
        <Head>
            <title>Address setup</title>
        </Head>
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3 className="title">Address</h3>

                {addressDetails?.id &&
                    <input type="hidden" className="form-control" name="address_id" id="address_id" aria-describedby="nameHelp"

                        ref={register({ required: "This field is required" })}
                        value={addressDetails?.id}
                    />
                }
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">First Name</label>
                    <input type="text" className="form-control" name="first_name" id="first_name" aria-describedby="nameHelp"
                        ref={register({ required: "This field is required" })}
                        defaultValue={addressDetails?.first_name}
                    />
                    {errors.last_name && <span className="error">{errors.last_name?.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Last Name</label>
                    <input type="text" className="form-control" name="last_name" id="l_name" aria-describedby="nameHelp"
                        ref={register({ required: "This field is required" })}
                        defaultValue={addressDetails?.last_name}
                    />
                    {errors.last_name && <span className="error">{errors.last_name?.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Company Name</label>
                    <input type="text" className="form-control" name="company_name"
                        defaultValue={addressDetails?.company_name}
                        ref={register({ required: "This field is required" })} />
                    {errors.company_name && <span className="error">{errors.company_name?.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Address</label>
                    <textarea type="textarea" className="form-control" name="street_address_1" id="billing_address"
                        defaultValue={addressDetails?.street_address_1}
                        aria-describedby="billing_addressHelp"
                        ref={register({ required: "This field is required" })}
                    />
                    {errors.street_address_1 && <span className="error">{errors.street_address_1?.message}</span>}
                </div>
                <div className="mb-3" style={{ display: "none" }}>
                    <label htmlFor="exampleInputEmail1" className="form-label">Shiping Address</label>
                    <textarea type="textarea" className="form-control" name="street_address_2" id="shiping_address"
                        defaultValue={addressDetails?.street_address_2}
                        aria-describedby="shiping_addressHelp"
                        defaultValue="null"
                        ref={register({ required: "This field is required" })}
                    />
                    {errors.street_address_2 && <span className="error">{errors.street_address_2?.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Country</label>
                    <div className="select">
                        <CountryDropdown
                            value={country}
                            name="country"
                            valueType="short"
                            onChange={(val) => setCountry(val)} />
                    </div>
                    {country === undefined && <span className="error">{countryError}</span>}
                </div>

                {country && <><div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">State</label>
                    <div className="select">
                        <RegionDropdown
                            country={country}
                            value={state}
                            name="state"
                            valueType="full"
                            defaultOptionLabel="Select State"
                            countryValueType="short"
                            onChange={(val) => setState(val)} />
                    </div>
                    {state === undefined && <span className="error">{stateError}</span>}
                </div>
                </>}

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">City</label>
                    <div >
                        <input
                            type="text"
                            name="city"
                            defaultValue={addressDetails?.city}
                            placeholder="please enter your city"
                            ref={register({ required: "This field is required" })}
                        />
                    </div>
                    {errors.city && <span className="error">{errors.city?.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Postal Code</label>
                    <input type="text" className="form-control" name="postal_code"
                        defaultValue={addressDetails?.postal_code}
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
                                    value: 8,
                                    message: "Postal Code not longer then 8 digit"
                                },
                            })
                        } />
                    {errors.postal_code && <span className="error">{errors.postal_code?.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Contact number</label>
                    <input type="text" className="form-control" name="phone_number"
                        defaultValue={addressDetails?.phone_number}
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
                    {errors.phone_number && <span className="error">{errors.phone_number?.message}</span>}
                </div>
                <div className="cstm-btns-sec">
                    <button type="button" className="Save-back" onClick={() => {
                        setshowaddressform(false)
                    }} >Back</button>
                    <button type="submit" onClick={() => handleCountryStateError()} className="Save-address">Save</button>
                </div>
            </form>
        </div>

    </>
}