import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import AddressList from '../checkout/addressList';
import api from '../../../api/Apis'
import NumberFormat from 'react-number-format';
export default function ThankYou() {
    const router = useRouter();
    const [data, setdata] = useState()
    //get data by id and show related details
    useEffect(() => {
        const token = localStorage.getItem('Token') ? localStorage.getItem('Token') : '';
        const update_data = {
            token: token,
            order_id: router?.query?.orderid
        }
        api.GetOrderDetail(update_data).then(res => {
            setdata(res?.data?.orders)
        })
    }, [router?.query?.orderid]);
    return <>
        <Head>
            <title>ThankYou</title>
        </Head>
        <div className="thnku-sec">
            <div className="container">

                <h2>ThankYou </h2>
                <div className="thnkyou-page">
                    <h3>Your order has been placed successfully</h3>
                    <h3>your order id {router?.query?.orderid}</h3>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="thn-lft">
                            <h4>Billing Address</h4>
                            <div> {data?.billing_address?.first_name}</div><div>{data?.billing_address?.last_name}</div><div>
                                {data?.billing_address?.company_name}</div><div>{data?.billing_address?.state}</div><div>{data?.billing_address?.country} </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="thn-rgt">
                            <h4>Shipping Address</h4>
                            <div> {data?.shipping_address?.first_name}</div><div>{data?.shipping_address?.last_name}</div><div>
                                {data?.shipping_address?.company_name}</div><div>{data?.shipping_address?.state}</div><div>{data?.shipping_address?.country} </div>
                        </div>
                    </div>
                </div>
                <div className="Cart_product">
                    <h4 className="tittle">Order details</h4>
                    <div className="row">
                        <div className="col-md-4"><div className="pro-name">product name</div></div>
                        {/* <div className="col-md-3"><div className="pro-name">Price</div></div> */}
                        <div className="col-md-4"><div className="pro-name">Quantity</div></div>
                        <div className="col-md-4"><div className="pro-name">Price</div></div>
                    </div>
                    {data?.order_details.map((datas) => {

                        return (
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="cart-product-details">
                                        {datas?.product.name}
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="cart-product-details">
                                        {datas.product_quantity}
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="cart-product-details">
                                        <NumberFormat value={parseFloat(datas.price_per_unit * datas.product_quantity).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    }
                    <div className="row">
                        <div className="col-md-8">
                        </div>
                        <div className="col-md-4">
                            <span className="Total"><strong>Total:</strong>
                                <NumberFormat value={parseFloat(data?.amount).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} />
                            </span>
                            {data?.discount_amount > 0 &&
                                <span className="Total"><strong>Discount :</strong>
                                    <NumberFormat value={parseFloat(data?.discount_amount).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} />
                                </span>
                            }
                            <span className="amount_paid"><strong>Amount:</strong>
                                <NumberFormat value={parseFloat(data?.amount_paid).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} />

                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}