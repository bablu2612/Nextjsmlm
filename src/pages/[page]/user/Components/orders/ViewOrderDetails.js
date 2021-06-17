

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import api from '../../../../../api/Apis';
import NumberFormat from 'react-number-format';
import { useForm } from 'react-hook-form';
import NProgress from 'nprogress'
import { toast } from 'react-toastify';
import BundleRefund from './vieworder/BundleRefund';
import ProductRefund from './vieworder/ProductRefund';
import RefundHistory from './refundhistory';

export default function ViewOrderDetails({ orderid, setorderid, setshowdetailsorder }) {
    const router = useRouter();
    const [data, setdata] = useState()
    const [refundHistoryData, setRefundHistoryData] = useState()
    const [Logintoken, setLogintoken] = useState()
    const [BundleData, setBundleData] = useState()

    useEffect(() => {
        const token = localStorage.getItem('Token') ? localStorage.getItem('Token') : '';
        setLogintoken(token)
        const update_data = {
            token: token,
            order_id: orderid
        }
        api.GetOrderDetail(update_data).then(res => {
            if (res?.data.code === 1) {
                setdata(res?.data?.orders)
            }
        })

        api.GetRefundHistory(orderid, token).then(res => {
            if (res?.data.code === 1) {
                console.log('datatoken', res?.data?.refund_details)
                setRefundHistoryData(res?.data?.refund_details)
            }
        })

    }, [orderid]);
    const Backfromhere = (e) => {

        setorderid()
        setshowdetailsorder(false)
    }
    let product_qty;

    return (<>
        <Head>
            <title>Order Details</title>
        </Head>
        <div className="container">
            <h4 className="cstm-tittle">Order #{orderid}</h4>
            <div className="Cart_product order-detail-sec">
                <h4 className="tittle">Order details</h4>
                <div className="row">
                    <div className="col-md-8"><div className="pro-name left-prd-heading"><div className="product-head">Product </div></div></div>
                    
                    <div className="col-md-2"><div className="pro-name">Total</div></div>
                </div>
                {/* <table>
                    <thead><th>Product</th><th>Qty</th><th>Total</th></thead>
                    <tbody> */}

                   
                {data?.order_details.map((datas) => {
                    // setBundleData()
                    let is_variant;

                    try {
                        is_variant = JSON.parse(datas?.metadata)
                    }
                    catch {
                        is_variant = ''
                    }
                    const product_type = is_variant[0]?.fields?.product_type
                    if (product_type === 'Bundle') {
                        api.GetBundleProduct(datas?.product, Logintoken).then(res => {
                            const datassss = res?.data?.bundle_data;
                            if (BundleData === undefined) {
                                setBundleData(datassss)
                            }
                        })
                    }
                    return (
                        <>
                            {product_type === 'Bundle' ?
                                <div className="bundle-product">
                                    <h1 className="title">{datas?.product_name}</h1>
                                    {BundleData?.map((data_bundle, index) => {

                                        return <BundleRefund
                                            BundleData={BundleData}
                                            data_bundle={data_bundle}
                                            product_qty={data_bundle.quantity}
                                            is_autoship={datas?.is_autoship}

                                        />
                                    })}
                                </div>
                                :
                                <ProductRefund datas={datas} product_qty={product_qty} />
                            }
                        </>)
                })
                }
                 {/* </tbody>
                </table> */}
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
            {refundHistoryData && <RefundHistory data={data} refundHistoryData={refundHistoryData} />}
            <div className="row">
                <div className="col-md-6">
                    <button className="re-order" onClick={(e) => {
                        Backfromhere()
                    }} >Back</button>
                </div>

            </div>
        </div>
    </>)
}