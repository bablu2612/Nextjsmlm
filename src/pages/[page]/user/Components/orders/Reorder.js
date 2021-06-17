
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import AddressList from '../../../checkout/addressList';
import api from '../../../../../api/Apis';
import NumberFormat from 'react-number-format';
import Leftnav from '../../../../../Components/Leftnav';

export default function Reorder({ orderid, setShowreorder, setorderid }) {
    const router = useRouter();
    const [data, setdata] = useState()
    const [Logintoken, setLogintoken] = useState()
    useEffect(() => {
        const token = localStorage.getItem('Token') ? localStorage.getItem('Token') : '';
        setLogintoken(token)
        const update_data = {
            token: token,
            order_id: orderid
        }
        api.GetOrderDetail(update_data).then(res => {
            setdata(res?.data?.orders)
        })
    }, [orderid]);
    // reorder
    const Reorder = () => {
        const reorderdata = {
            token: Logintoken,
            order_id: orderid
        }
        api.Reorderproducts(reorderdata).then(res => {
            if (res?.data?.code === 1) {
                router.push(`/${router.query.page}/checkout/addressList`)
            }
        })
    }
    return <>
        <Head>
            <title>Order Details</title>
        </Head>
        <h4 className="cstm-tittle">Order #{orderid}</h4>
        <div className="Cart_product order-detail-sec">
            <h4 className="tittle">Order details</h4>
            <div className="row">
                <div className="col-md-8"><div className="pro-name">Product</div></div>
                <div className="col-md-4"><div className="pro-name">Total</div></div>
            </div>
            {data?.order_details.map((datas) => {
                return (
                    <div className= {`row ${datas.product?.is_active === 'True' ? 'active' : 'not-active'}`}
                        
                    
                    >
                        <div className="col-md-8">
                            <div className="cart-product-details">
                                {datas.product?.name} X {datas.product_quantity}
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
                    Subtotal:
                    </div>
                <div className="col-md-4">
                    <NumberFormat value={parseFloat(data?.amount).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} />
                </div>
            </div>
            {data?.discount_amount > 0 &&
                <div className="row">
                    <div className="col-md-8">
                        Discount {`${data?.coupon_name !== undefined ? (data.coupon_name) : ''}`}:
                        </div>
                    <div className="col-md-4">
                        <NumberFormat value={parseFloat(data?.discount_amount).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} />
                    </div>
                </div>
            }
            <div className="row">
                <div className="col-md-8">
                    Total :
                        </div>
                <div className="col-md-4">
                    <NumberFormat value={parseFloat(data?.amount_paid).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} />
                </div>
            </div>
        </div>

        <div className="row order-cstm">
            <div className="col-md-6">
                <div className="thn-lft">
                    <h4>Billing Address</h4>
                    <div> {data?.billing_address?.first_name}</div><div>{data?.billing_address?.last_name}</div><div>
                        {data?.billing_address?.company_name}</div><div>{data?.billing_address?.state}</div><div>{data?.billing_address?.country} </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="thn-lft thn-rgt">
                    <h4>Shippping Address</h4>
                    <div> {data?.shipping_address?.first_name}</div><div>{data?.shipping_address?.last_name}</div><div>
                        {data?.shipping_address?.company_name}</div><div>{data?.shipping_address?.state}</div><div>{data?.shipping_address?.country} </div>
                </div>
            </div>


        </div>
        <div className="row btn-sec-cstm">
            <div className="col-md-6">
                <button className="re-order" onClick={() => {
                    setShowreorder(false)
                    setorderid()
                }}>Back</button>
            </div>
            <div className="col-md-6">
                <button className="re-order" onClick={Reorder}>Reorder</button>
            </div>
        </div>
    </>
}