import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../../../api/Apis'
import PayPal from '../../Paypal/paypal';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

export default function Address({ logintoken, setaddressData, setAddresstype, addressDetails, addressType, addresstype, saveBillingAddress, saveShippingAddress }) {
    const { register, handleSubmit, watch, errors } = useForm();
    const [data_address, setdata] = useState();
    const [addresstypes, setAddresstypes] = useState();
    const [shipaddress, setshipaddress] = useState();

    const [countryError, setCountryError] = useState()
    const [stateError, setStateError] = useState()
    const [country, setCountry] = useState();
    const [state, setState] = useState()

    if (addressDetails?.country && addressDetails?.state && country === undefined && state === undefined) {

        setCountry(addressDetails.country);
        setState(addressDetails?.state)
    }
    const handleCountryStateError = () => {
        setAddresstypes('new')

        if (country === undefined && countryError === undefined) {

            setCountryError("Please Select The Country")
        }
        if (state === undefined && stateError === undefined) {

            setStateError("Please Select The State")
        }
    }

    //save address
    const onSubmit = data => {

        if (country !== undefined && state !== undefined) {
            data.country = country
            data.state = state
            const formData = { data: data, token: logintoken, address_type: addresstypes };
            api.saveAddress(formData).then(res => {
                if (res?.data?.code === 1) {
                    if (data?.address_type === 'shipping' && data?.shipping_address_is_same === 'false') {
                        localStorage.setItem('shippingAddress', +res.data.new_address_id);
                        saveShippingAddress(+res.data.new_address_id)
                    }
                    else if (data?.address_type === 'billing' && data?.shipping_address_is_same === false) {
                        localStorage.setItem('billingAddress', +res.data.new_address_id);
                        saveBillingAddress(+res.data.new_address_id)
                    }
                    else if (data?.address_type === 'billing' && data?.shipping_address_is_same === true) {
                        localStorage.setItem('billingAddress', +res.data.new_address_id);
                        saveBillingAddress(+res.data.new_address_id)
                        localStorage.setItem('shippingAddress', +res.data.new_address_id);
                        saveShippingAddress(+res.data.new_address_id)
                    }
                }
                if (res?.data?.code === 1) {
                    api.manageAddress(logintoken).then(res => {
                        setAddresstype('existing')
                        setaddressData(res?.data)
                    })
                }
            })
        }
    }
    return <>
        <Head>
            <title>Address setup</title>
        </Head>
        <br /><br /><br />
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <br /><br />  <br /><br />
                {/* <h3 className="response message">{responsedata && responsedata}</h3> */}
                <h3>{addresstype}</h3>
                <input type="hidden" className="form-control" name="address_type" id="addresstype" aria-describedby="nameHelp"
                    ref={register({ required: "This field is required" })}
                    value={addresstype}
                />
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">First Name</label>
                    <input type="text" className="form-control" name="first_name" id="first_name" aria-describedby="nameHelp"
                        ref={register({ required: "This field is required" })}
                        value={addressDetails?.first_name}
                    />
                    {errors.last_name && <span>{errors.last_name?.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Last Name</label>
                    <input type="text" className="form-control" name="last_name" id="l_name" aria-describedby="nameHelp"
                        ref={register({ required: "This field is required" })}
                        value={addressDetails?.last_name}
                    />
                    {errors.last_name && <span>{errors.last_name?.message}</span>}
                </div>
                <div className="mb-6">
                    <label htmlFor="exampleInputEmail1" className="form-label">Company Name</label>
                    <input type="text" className="form-control" name="company_name"
                        value={addressDetails?.company_name}
                        ref={register({ required: "This field is required" })} />
                    {errors.company_name && <span>{errors.company_name?.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Address</label>
                    <textarea type="textarea" className="form-control" name="street_address_1" id="billing_address"
                        value={addressDetails?.street_address_1}
                        aria-describedby="billing_addressHelp"
                        ref={register({ required: "This field is required" })}
                    />
                    {errors.street_address_1 && <span>{errors.street_address_1?.message}</span>}
                </div>
                <div className="mb-3" style={{ display: "none" }}>
                    <label htmlFor="exampleInputEmail1" className="form-label">Shiping Address</label>
                    <textarea type="textarea" className="form-control" name="street_address_2" id="shiping_address"
                        value={addressDetails?.street_address_2}
                        aria-describedby="shiping_addressHelp"
                        value="null"
                        ref={register({ required: "This field is required" })}
                    />
                    {errors.street_address_2 && <span>{errors.street_address_2?.message}</span>}
                </div>

                <div className="mb-6">
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

                {country && <div className="mb-6">
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
                </div>}

                <div className="mb-6">
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

                <div className="mb-6">
                    <label htmlFor="exampleInputEmail1" className="form-label">Postal Code</label>
                    <input type="text" className="form-control" name="postal_code"
                        value={addressDetails?.postal_code}
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
                    {errors.postal_code && <span>{errors.postal_code?.message}</span>}
                </div>
                <div className="mb-6">
                    <label htmlFor="exampleInputEmail1" className="form-label">Contact number</label>
                    <input type="text" className="form-control" name="phone_number"
                        value={addressDetails?.phone_number}
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
                    {errors.phone_number && <span>{errors.phone_number?.message}</span>}
                </div>
                {addresstype === 'billing' ?
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="shipping_address_is_same" name="shipping_address_is_same"
                            ref={register({ required: false })}
                        />
                        <label className="form-check-label" for="exampleCheck1"  >
                            same for shipping Address?
                     </label>
                    </div>
                    :
                    <input type="hidden" className="form-control" name="shipping_address_is_same" id="shipping_address_is_same" aria-describedby="nameHelp"
                        ref={register({ required: "This field is required" })}
                        value={false}
                    />
                }
                <button type="submit" className="btn btn-primary" onClick={() => handleCountryStateError()}  >Next</button>
            </form>
        </div>
        {/* {data_address1 && <PayPal checkoutData={data_address1}/>}
        <PayPal checkoutData={data_address1}/> */}
    </>
}