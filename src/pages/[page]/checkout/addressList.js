import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Address from './Components/Address'
import api from '../../../api/Apis'
import Review from "./Components/Review";
import NumberFormat from 'react-number-format';
import PayPal from "../Paypal/paypal";

export default function AddressList(props) {
    const [billingaddress, saveBillingAddress] = useState();
    const [shippingaddress, saveShippingAddress] = useState();
    const [addresstype, setAddresstype] = useState();
    const [addressData, setaddressData] = useState();
    const [logintoken, setToken] = useState();
    const [reviewshow, setreviewshow] = useState();
    const [addressDetails, setaddressDetails] = useState();
    const router = useRouter();
    //show list of product and load all required data
    useEffect(() => {
        const token = localStorage.getItem('Token') ? localStorage.getItem('Token') : '';
        setToken(token)
        api.manageAddress(token).then(res => {
            if (res?.data?.code === 0) {
                setAddresstype('new');
            }
            if (res?.data?.code === 1) {
                if (+localStorage.getItem('shippingAddress')?.length > 0 && +localStorage.getItem('billingAddress')?.length <= 0) {
                    saveShippingAddress(+localStorage.getItem('shippingAddress'))
                    localStorage.setItem('billingAddress', +res?.data?.addresses[0]?.id);
                }
                else if (+localStorage.getItem('billingAddress')?.length > 0 && +localStorage.getItem('shippingAddress')?.length <= 0) {
                    localStorage.setItem('shippingAddress', +res?.data?.addresses[0]?.id);
                    saveBillingAddress(+localStorage.getItem('billingAddress'))
                }
                else if (+localStorage.getItem('billingAddress')?.length > 0 && +localStorage.getItem('shippingAddress')?.length > 0) {
                    saveBillingAddress(+localStorage.getItem('billingAddress'))
                    saveShippingAddress(+localStorage.getItem('shippingAddress'))
                }
                else {
                    localStorage.setItem('billingAddress', +res?.data?.addresses[0]?.id);
                    localStorage.setItem('shippingAddress', +res?.data?.addresses[0]?.id);
                    saveBillingAddress(+res?.data?.addresses[0]?.id)
                    saveShippingAddress(+res?.data?.addresses[0]?.id)
                }
            }
            setaddressData(res?.data)
        })
        ShowReviewPage(token);
    }, []);

//review section method
    const ShowReviewPage = (token) => {
        api.getAllCartProduct(token).then(res => {
            let productId;
            let variant_id;
            let product_qty;
            let is_autoship;
            let total = 0;
            let totalBounus = 0;
            let products = [];
            const cartdata = res?.data;
            cartdata?.products?.map((cart) => {
                if(cartdata?.is_autoship_user === 'True')
                {
                    total = (cart.variant ? +(cart.variant.autoship_cost_price * cart.quantity) : +(cart.product.autoship_cost_price * cart.quantity)) + total;
                    totalBounus=(cart.variant ? +(cart.variant.bonus_value) : +(cart.product.bonus_value))+ totalBounus
                    is_autoship = cart.is_autoship === "True" ? true : false
                }

               else if (cart.is_autoship === "True") {
                    total = (cart.variant ? +(cart.variant.cost_price * cart.quantity) : +(cart.product.cost_price * cart.quantity)) + total;
                    totalBounus=(cart.variant ? +(cart.variant.bonus_value) : +(cart.product.bonus_value))+ totalBounus
                    is_autoship=true
                }
                else {
                    total = (cart.variant ? +(cart.variant.cost_price * cart.quantity) : +(cart.product.cost_price * cart.quantity)) + total;
                    totalBounus=(cart.variant ? +(cart.variant.bonus_value) : +(cart.product.bonus_value))+ totalBounus
                    is_autoship=false
                }

                productId = cart?.product.id;
                product_qty = cart.quantity;
                variant_id = cart?.variant?.id ? cart.variant.id : '';
                products.push({ product_id: parseInt(productId), quantity: parseInt(product_qty), variant_id: parseInt(variant_id),is_autoship: is_autoship })
            });
            const orderdata = {
                "shipping_address_id": parseInt(billingaddress),
                "amount": parseFloat(total, 2),
                "subamount": parseFloat(total, 2),
                "bonus_value":totalBounus,
                "tax_amount": 0,
                "shipping_amount": 0,
                "gross_total": parseFloat(total , 2),
                "coupon_id": null,
                "discount_amount": "00.00",
                "amount_paid": parseFloat(total, 2),
                "sku": "umb-20",
                "products": products,
                "is_autoship": false
            }
            setreviewshow(orderdata);
        })
    }
    return (<>
        {
            <>
                <Head>
                    <title>Add List</title>
                </Head>
                <div className="container checkout-main">
                    <h1 className="title">CHECKOUT</h1>
                    {/* <h4 className="title">{addressData?.message && addressData.message}</h4> */}
                    <h4 className="title">Billing address</h4>
                    {
                        addressData?.addresses?.map((address, index) => {
                            return (
                                <>
                                    <div className="radio-bnt" key={index}>
                                        {billingaddress === address?.id ?
                                            <input type="radio" name="billingaddress" value={address?.id} checked={+billingaddress === +address?.id} onClick={(e) => {
                                                saveBillingAddress(e.target.value)
                                                localStorage.setItem('billingAddress', e.target.value);
                                            }} />
                                            :
                                            <input type="radio" name="billingaddress" value={address?.id} onClick={(e) => {
                                                saveBillingAddress(e.target.value)
                                                localStorage.setItem('billingAddress', e.target.value);
                                            }} />
                                        }
                                        <div className="checkout-addrees">
                                            <h5 className="tittle">
                                                {address?.first_name + " " + address?.last_name + ", " + address?.street_address_1 + " " + address?.street_address_2 + ", " + address?.company_name + ", " + address?.city + ", " + address?.country}
                                            </h5>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                    <button type="button" className="btn btn-primary" onClick={(e) => { setAddresstype('billing') }}   >Add New</button>
                    <h4 className="title">Shipping address</h4>
                    {
                        addressData?.addresses?.map((address, index) => {
                            return (
                                <>
                                    <div className="radio-bnt" key={index}>
                                        {shippingaddress === address?.id ?
                                            <input type="radio" name="addressShip" value={address?.id} checked={+shippingaddress === +address?.id} onClick={(e) => {
                                                saveShippingAddress(e.target.value)
                                                localStorage.setItem('shippingAddress', e.target.value);
                                            }} />
                                            :
                                            <input type="radio" name="addressShip" value={address?.id} onClick={(e) => {
                                                saveShippingAddress(e.target.value)
                                                localStorage.setItem('shippingAddress', e.target.value);
                                            }} />
                                        }
                                        <div className="checkout-addrees">
                                            <h5 className="tittle">
                                                {address?.first_name + " " + address?.last_name + ", " + address?.street_address_1 + " " + address?.street_address_2 + ", " + address?.company_name + ", " + address?.city + ", " + address?.country}
                                            </h5>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                     {/* <PayPal /> */}
                    <button type="button" className="btn btn-primary" onClick={(e) => { setAddresstype('shipping') }}   >Add New</button>
                    {addresstype === 'shipping' && <Address saveBillingAddress={saveBillingAddress} saveShippingAddress={saveShippingAddress} addresstype={addresstype} logintoken={logintoken} setaddressData={setaddressData} setAddresstype={setAddresstype} addressDetails={addressDetails} />}
                    {addresstype === 'billing' && <Address saveBillingAddress={saveBillingAddress} saveShippingAddress={saveShippingAddress} addresstype={addresstype} logintoken={logintoken} setaddressData={setaddressData} setAddresstype={setAddresstype} addressDetails={addressDetails} />}
                    {reviewshow === undefined ? '' :
                        <Review reviewshow={reviewshow} ShowReviewPage={ShowReviewPage} setcounts={props?.setcounts}/>
                    }
                </div></>
        }</>)
}