import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import api from '../../../../../api/Apis';
import NumberFormat from 'react-number-format';
import { useForm } from 'react-hook-form';
import NProgress from 'nprogress'
import { toast } from 'react-toastify';
import BundleRefund from './BundleRefund';
import ProductRefund from './ProductRefund';

export default function RefundOrder({ orderid, setorderid }) {
    const router = useRouter();
    const [data, setdata] = useState()
    const [Logintoken, setLogintoken] = useState()
    const [order_refund, setorder_refund] = useState([])
    const [order_refund_variant, setorder_refund_variant] = useState([])
    const [BundleData, setBundleData] = useState()

    useEffect(() => {
        const token = localStorage.getItem('Token') ? localStorage.getItem('Token') : '';
        setLogintoken(token)
        const update_data = {
            token: token,
            order_id: orderid
        }
        api.GetOrderDetailForRefund(update_data).then(res => {
            if (res?.data.code === 1) {
                setdata(res?.data?.orders)
            }
        })
    }, [orderid]);

    // add product qty on refund time
    const Add = (e, qty, product_id, max_qty, type, bundle_id) => {
        if (type === 'variant_refund') {
            if (qty < max_qty) {
                const objIndex = order_refund_variant.findIndex((obj => obj.product_id == product_id && obj.bundle_id == bundle_id));
                if (objIndex !== -1) {
                    const data = order_refund_variant[objIndex].qty = +order_refund_variant[objIndex].qty + 1
                    order_refund_variant.splice(objIndex, 1);
                    setorder_refund_variant([...order_refund_variant, { product_id: product_id, qty: data, bundle_id: bundle_id }])
                }
                else {
                    setorder_refund_variant([...order_refund_variant, { product_id: product_id, qty: qty + 1, bundle_id: bundle_id }])
                }
            }
            else {
                toast.error('Refund quantity should be atleast 1', {
                    duration: 1
                })
            }
        }
        else {
            if (qty < max_qty) {
                const objIndex = order_refund.findIndex((obj => obj.product_id == product_id));
                if (objIndex !== -1) {
                    const data = order_refund[objIndex].qty + 1
                    order_refund.splice(objIndex, 1);
                    setorder_refund([...order_refund, { product_id: product_id, qty: data }])
                }
                else {
                    setorder_refund([...order_refund, { product_id: product_id, qty: qty + 1 }])
                }
            }
            else {
                toast.error('Max qty is already selected', { hideProgressBar: true, duration: 1 })
            }
        }
    }

    // substract product qty during refund
    const Sub = (e, qty, product_id, type, bundle_id) => {
        if (type === 'variant_refund') {
            if (qty > 1) {
                const objIndex = order_refund_variant.findIndex((obj => obj.product_id == product_id && obj.bundle_id == bundle_id));
                if (objIndex !== -1) {

                    const data = order_refund_variant[objIndex].qty = +order_refund_variant[objIndex].qty - 1

                    order_refund_variant.splice(objIndex, 1);

                    setorder_refund_variant([...order_refund_variant, { product_id: product_id, qty: data, bundle_id: bundle_id }])
                }
                else {
                    setorder_refund_variant([...order_refund_variant, { product_id: product_id, qty: qty - 1, bundle_id: bundle_id }])
                }
            }
            else {
                toast.error('Refund quantity should be atleast 1', { hideProgressBar: true, duration: 1 })
            }
        }
        else {
            console.log('current_qty', qty)
            if (qty > 1) {
                const objIndex = order_refund.findIndex((obj => obj.product_id == product_id));
                if (objIndex !== -1) {
                    const data = order_refund[objIndex].qty = +order_refund[objIndex].qty - 1
                    order_refund.splice(objIndex, 1);
                    setorder_refund([...order_refund, { product_id: product_id, qty: data }])
                }
                else {
                    setorder_refund([...order_refund, { product_id: product_id, qty: qty - 1 }])
                }
            }
            else {
                toast.error('Refund quantity should be atleast 1', { hideProgressBar: true, duration: 1 })
            }
        }
    }
    const { register, handleSubmit, errors } = useForm({
        mode: "all"
    });

    // onclik refund this will be execute
    const onSubmit = data => {
        let data_refnd = [];
        if (Array.isArray(data?.refundprod) === false && data?.refundprod != '') {
            const data_refunds = data?.refundprod.split(',');
            data_refnd.push({ product_id: +data_refunds[0], variant_id: data_refunds[1] !== "null" ? +data_refunds[1] : null, quantity: +data_refunds[2] })

        }
        else if (Array.isArray(data?.refundprod) === true) {
            data?.refundprod?.map((refunddata) => {
                const data_refunds = refunddata.split(',');
                data_refnd.push({ product_id: +data_refunds[0], variant_id: data_refunds[1] !== "null" ? +data_refunds[1] : null, quantity: +data_refunds[2] })
            })
        }
        const final_data = {
            order_id: +orderid,
            reason: data?.refund,
            products: data_refnd
        }
        // const data1={"order_id":157,"reason":"rdtg","products":[{"product_id":25,"variant_id":null,"quantity":1}]}
        {
            data_refnd.length >= 1 ?
                api.RefundOrder(final_data, Logintoken).then(res => {
                    if (res?.data?.code === 1) {
                        NProgress.done()
                        toast.success(res?.data?.message, { hideProgressBar: true, duration: 1 })
                        setorderid()
                    }
                })
                :
                toast.error('Select atleast one product before refund request.', { hideProgressBar: true, duration: 1 })
        }
    }
    let product_qty;
    return (<>
        <Head>
            <title>Order Details</title>
        </Head>
        <div className="container">
            <form className="refund" onSubmit={handleSubmit(onSubmit)}>
                <h4 className="cstm-tittle">Order #{orderid}</h4>
                <div className="Cart_product order-detail-sec">
                    <h4 className="tittle">Order details</h4>
                    <div className="row">
                        <div className="col-md-8"><div className="pro-name">Product</div></div>
                        <div className="col-md-4"><div className="pro-name">Total</div></div>
                    </div>
                    {data?.order_details.map((datas) => {
                        // setBundleData()
                        let is_variant;
                        const objIndex = order_refund?.findIndex((obj => obj?.product_id == datas?.product));
                        product_qty = (order_refund[objIndex]?.product_id === datas?.product) ? (order_refund[objIndex]?.qty) : (datas?.product_quantity)
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

                                            return <BundleRefund bundle_id={datas?.product}
                                                is_autoship={datas?.is_autoship}
                                                order_refund_variant={order_refund_variant}
                                                order_refund={order_refund}
                                                BundleData={BundleData}
                                                data_bundle={data_bundle}
                                                register={register}
                                                Add={Add}
                                                Sub={Sub}
                                                product_qty={data_bundle.quantity} />
                                        })}
                                    </div>
                                    :
                                    <ProductRefund datas={datas} Add={Add} Sub={Sub} register={register} product_qty={product_qty} />
                                }
                            </>)
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
                    <div className="col-md-12">
                        <div className="thn-lft">
                            <h4>Reason For Refund</h4>
                            <textarea name="refund"
                                ref={register({ required: "Please enter reason" })}
                                placeholder="Please add your message here...."
                                className="refund-message-box">
                            </textarea>
                            {errors?.refund && <span className="error">{errors.refund?.message}</span>}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <button className="re-order" onClick={() => { setorderid() }} >Back</button>
                    </div>
                    <div className="col-md-6">
                        <button type="submit" className="re-order">Refund</button>
                    </div>
                </div>
            </form>
        </div>
    </>)
}