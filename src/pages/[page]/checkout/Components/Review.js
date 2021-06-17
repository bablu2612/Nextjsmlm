import Head from "next/head"
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import api from '../../../../api/Apis'
import Discount from "./Discount";
import NumberFormat from 'react-number-format';
import { FaTrash } from "react-icons/fa";
import Hover from "../../cart/hovercomponent";
import cookieCutter from 'cookie-cutter'
import { toast } from 'react-toastify';

const Review = ({ reviewshow, ShowReviewPage, setcounts }) => {
    const router = useRouter();
    const [logintoken, setToken] = useState();
    const [discount_amount1, setdiscount_amount] = useState();
    const [paidamount, setpaidamount] = useState();
    const [shipamount, setshipamount] = useState();
    const [copanerror, setcopanerror] = useState();
    const [cartdata, setCartData] = useState();
    const [coupon, setcoupon] = useState();
    const [costtype, setcosttype] = useState({ data: [{ id: '', value: '' }] })
    const [kairecash, setkairecash] = useState(false);
    const [kairecashamout, setkairecashamout] = useState();
    const [kairecashamoutmain, setkairecashamoutmain] = useState(0);
    const [autoshipis, setautoshipis] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('Token') ? localStorage.getItem('Token') : '';
        api.getAllCartProduct(token).then(res => {
            setCartData(res?.data)
            setcounts(res?.data)
            setkairecashamoutmain(res?.data?.available_kaire)
            const objIndex = res?.data?.products?.findIndex((obj => obj.is_autoship == 'True'));
            if (objIndex !== -1) {
                setautoshipis(true)
            }
        })
    }, []);

    const swithtoautoship = (e) => {
        let qty = e.currentTarget.getAttribute('data-product-qty')
        let variant_id = e.currentTarget.getAttribute('data-variant-id')
        let product_id = e.currentTarget.getAttribute('data-product-id')
        let types = e.currentTarget.value
    
        const datas = {
          product_id: +(product_id),
          variant_id: variant_id,
          quantity: +(qty),
          cookie_id: cookieCutter.get('sessionkey'),
          is_autoship: types === 'AutoShip' ? true : false
    
        }
        const update_data = {
          token: logintoken,
          datas: datas
        }
        api.updateCart(update_data).then(res => {
          toast.success(res.data.message, {
            duration: 5
          })
          api.getAllCartProduct(logintoken).then(res => {
            setCartData(res?.data)
          })
        })
    
      }

    //Place/Create order

    const placerorder = (e) => {
        let payamount = reviewshow.amount - reviewshow.discount_amount < 0 ? 0 : reviewshow.amount - reviewshow.discount_amount
        payamount = payamount + reviewshow.shipping_amount + reviewshow.tax_amount
        // console.log(payamount)
        // // payamount = kairecash===true ?? +payamount - +cartdata?.available_kaire
        // // console.log('here',cartdata?.available_kaire,'payamount',payamount)

        if (kairecash === true) {
            payamount = payamount - (+cartdata?.available_kaire)
        }
        const orderdata = {
            "shipping_address_id": parseFloat(localStorage.getItem('shippingAddress'), 2),
            "billing_address_id": parseFloat(localStorage.getItem('billingAddress'), 2),
            "amount": parseFloat(reviewshow.amount, 2),
            "tax_amount": reviewshow.tax_amount,
            "shipping_amount": reviewshow.shipping_amount,
            "gross_total": parseFloat(payamount, 2),
            "coupon_id": parseInt(reviewshow.coupon_id),
            "discount_amount": reviewshow.discount_amount,
            "amount_paid": parseFloat(payamount, 2),
            "sku": "umb-20",
            "products": reviewshow.products,
            "is_autoship": autoshipis,
            "kaire_cash_used": kairecash === true ? cartdata?.available_kaire : '',
            "is_kaire_cash_used": kairecash,
            "order_total_bv": reviewshow?.bonus_value
        }
        api.CreateOrder(orderdata, logintoken).then(res => {
            if (res?.data?.code === 1) {
                setcounts()
                localStorage.removeItem('coupon_name')
                localStorage.removeItem('shippingAddress')
                localStorage.removeItem('billingAddress')
                router.push({
                    pathname: `/${router.query.page}/order/thankYou`,
                    query: { orderid: res?.data.order_id }
                });
            }
        })
    }
    // remove coupon
    const removecoupon = () => {
        localStorage.removeItem('coupon_name')
        setdiscount_amount()
        if (kairecash === true) {
            reviewshow.amount - kairecashamoutmain > 0 ? cartdata.available_kaire = kairecashamoutmain : cartdata.available_kaire = reviewshow.amount
            setpaidamount(reviewshow.amount - kairecashamoutmain >= 0 ? reviewshow.amount - kairecashamoutmain : 0)
        }
        else {
            setpaidamount()
        }
        setcoupon()
        ShowReviewPage(logintoken)
    }
    const applayKaireCash = (e) => {
        if (e.target.checked === true) {
            if (discount_amount1) {
                let total_amount = paidamount - cartdata?.available_kaire;
                if (+total_amount >= 0) {
                    setpaidamount(paidamount - cartdata?.available_kaire)
                }
                else {
                    setpaidamount(0)
                    cartdata.available_kaire = paidamount
                }
                setkairecash(e.target.checked)
            }
            else {
                let total_amount = reviewshow?.subamount - cartdata?.available_kaire;
                if (+total_amount >= 0) {
                    setpaidamount(total_amount)
                }
                else {
                    setpaidamount(0)
                    cartdata.available_kaire = reviewshow?.subamount
                }
                setkairecash(e.target.checked)
            }
        }
        else {
            discount_amount1 !== undefined ? setpaidamount(reviewshow?.amount - discount_amount1) : setpaidamount(reviewshow?.subamount)
            //     if (discount_amount1 !== undefined) {
            //     // setpaidamount(paidamount + cartdata?.available_kaire)
            //     setpaidamount(reviewshow?.amount - discount_amount1)

            // }
            // else
            // {
            //     setpaidamount(reviewshow?.subamount)
            // }
            setkairecash(e.target.checked)
        }

    }
    // console.log(cartdata)
    return (<>
        <Head>
            <title>Review-Page</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        </Head>
        <br /><br />
        <div className="container order-detail-page" >
            <br /><br />
            <div className="coupam-enter">
                <Discount paidamount={paidamount} kairecashval={cartdata?.available_kaire} kairecash={kairecash} setdiscount_amount={setdiscount_amount} setpaidamount={setpaidamount} discount_amount1={discount_amount1} reviewshow={reviewshow} setToken={setToken} logintoken={logintoken} setcopanerror={setcopanerror} setshipamount={setshipamount} setcoupon={setcoupon} />
            </div>
            {reviewshow?.amount > 500 &&
                <div className="kairecassh">
                    <div className="row">
                        <div className="col-md-4">
                            <input type="checkbox" name="kaire_cash" onChange={(e) => { applayKaireCash(e) }} />
                        </div>
                        <div className="col-md-4">
                            Kaire Cash
                         </div>
                        <div className="col-md-4">
                            <NumberFormat value={parseFloat(kairecashamoutmain > 0 ? kairecashamoutmain : cartdata?.available_kaire).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div> {value} </div>} />
                        </div>
                    </div>
                </div>
            }
            <h1>Order Details</h1>
            {copanerror && <h4 className="title">{copanerror}</h4>}
            {discount_amount1 && <h4 className="title">{coupon?.name} Coupon Added  <button className="dlt" onClick={(e) => { removecoupon(e) }} >
                <FaTrash onClick={(e) => { { removecoupon(e) } }} />
            </button></h4>}
            <div className="Cart_product">
                <div className="row">
                    <div className="col-md-4"><div className="pro-name">product name</div></div>
                    <div className="col-md-2"><div className="pro-name">Quantity</div></div>
                    <div className="col-md-2"><div className="pro-name">Variation</div></div>
                    <div className="col-md-2"><div className="pro-name">Price</div></div>
                    <div className="col-md-2"><div className="pro-name">Details</div></div>
                </div>
                {
                    cartdata?.products?.map((Cart, index) => {

                        return (<>
                            {Cart?.variant === null ?
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="cart-product-details">
                                            {Cart?.product?.name}
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="cart-product-details">
                                            {Cart?.quantity}
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="cart-product-details">
                                            <div className="box">
                                                <div className="select" >
                                                    <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
                                                        data-product-id={Cart?.product?.id}
                                                        data-product-qty={Cart?.quantity}
                                                        data-variant-id={null}

                                                        onChange={(e) => {
                                                            const found = costtype.data.some(el => el.id === Cart?.product?.id);
                                                            if (!found) {
                                                                setcosttype({ ...costtype, data: [...costtype.data, { "id": Cart?.product?.id, "value": e.target.value, "variant_id": null }] })

                                                            }
                                                            else {
                                                                const objIndex = costtype.data.findIndex((obj => obj.id == Cart?.product?.id));
                                                                costtype.data.splice(objIndex, 1);

                                                                setcosttype({ ...costtype, data: [...costtype.data, { "id": Cart?.product?.id, "value": e.target.value, "variant_id": null }] })
                                                            }
                                                            swithtoautoship(e)

                                                        }
                                                        }

                                                        defaultValue={Cart?.is_autoship === 'True' ? "AutoShip" : "Normal"}
                                                    >
                                                        <option value="Normal" >Single</option>
                                                        <option value="AutoShip"  >AutoShip</option>
                                                        {/* <option value="AutoShip" selected={is_autoship==='True'?true:false} >AutoShip</option> */}

                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="cart-product-details">

                                            {cartdata?.is_autoship_user === "True" ?

                                                <NumberFormat
                                                    value={parseFloat(Cart?.product?.autoship_cost_price * Cart?.quantity).toFixed(2)}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    prefix={'$'}
                                                    renderText={value => <div> {Cart?.is_autoship !== 'True' ? value : `$${parseFloat(Cart?.product?.autoship_cost_price * Cart?.quantity).toFixed(2)}` + ' / $' + parseFloat(Cart?.product?.autoship_cost_price * Cart?.quantity).toFixed(2) + ' Autoship'}</div>} />
                                                :


                                                <NumberFormat value={parseFloat(cartdata?.is_autoship_user === 'True' ? Cart?.product?.autoship_cost_price * Cart?.quantity : Cart?.product?.cost_price * Cart?.quantity).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div> {Cart?.is_autoship !== 'True' ? value : `$${parseFloat(Cart?.product?.cost_price * Cart?.quantity).toFixed(2)}` + ' / $' + parseFloat(Cart?.product?.autoship_cost_price * Cart?.quantity).toFixed(2) + ' Autoship'}</div>} />
                                            }



                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="cart-product-details">
                                            {cartdata?.is_autoship_user === "True" ?
                                                <div className="title">
                                                    <Hover data="Autoship is activated" />
                                                </div>
                                                :
                                                <div className="title">
                                                    <Hover data="Autoship is deactivated" />
                                                </div>
                                            }

                                        </div>
                                    </div>
                                </div>
                                :

                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="cart-product-details">
                                            {Cart?.product?.name}({Cart?.variant?.name})
                                         </div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="cart-product-details">
                                            {Cart?.quantity}
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                                <div className="cart-product-details">
                                                    <div className="box">
                                                        <div className="select">
                                                            <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
                                                                data-product-id={Cart?.product?.id}
                                                                data-product-qty={Cart?.quantity}
                                                                data-variant-id={+Cart?.variant?.id}
                                                                onChange={(e) => {
                                                                    const found = costtype.data.some(el => el.id === Cart?.variant?.id);
                                                                    if (!found) {
                                                                        setcosttype({ ...costtype, data: [...costtype.data, { "id": Cart?.variant?.id, "value": e.target.value }] })
                                                                    }
                                                                    else {
                                                                        const objIndex = costtype.data.findIndex((obj => obj.id == Cart?.variant?.id));
                                                                        costtype.data.splice(objIndex, 1);
                                                                        setcosttype({ ...costtype, data: [...costtype.data, { "id": Cart?.variant?.id, "value": e.target.value }] })
                                                                    }
                                                                    swithtoautoship(e)
                                                                }}
                                                                defaultValue={Cart?.is_autoship === 'True' ? "AutoShip" : "Normal"}
                                                            >
                                                                <option value="Normal">Single</option>
                                                                <option value="AutoShip"  >AutoShip</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                    <div className="col-md-2">
                                        <div className="cart-product-details">
                                            <NumberFormat value={parseFloat(cartdata?.is_autoship_user === 'True' ? Cart?.variant?.autoship_cost_price * Cart?.quantity : Cart?.variant?.cost_price * Cart?.quantity).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value =>
                                                <div>
                                                    {Cart?.is_autoship !== 'True' ? value :
                                                        '$' +
                                                        parseFloat(Cart?.variant?.autoship_cost_price * Cart?.quantity).toFixed(2)
                                                        +
                                                        ' / $' + parseFloat(Cart?.variant?.autoship_cost_price * Cart?.quantity).toFixed(2) + ' Autoship'}
                                                </div>} />
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="cart-product-details">
                                            <Hover data="Autoship is activated" />
                                        </div>
                                    </div>

                                </div>
                            }
                        </>)
                    })
                }
            </div>

            <div className="row">
                {coupon?.name && <>
                    <span className="Discount"><strong>Coupon Name:</strong>{coupon?.name}</span>
                    <span className="Discount"><strong>Discount Amount:</strong>
                        {discount_amount1 ?
                            <NumberFormat value={parseFloat(discount_amount1).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} />
                            :
                            <NumberFormat value={parseFloat(reviewshow?.discount_amount).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} />
                        }
                    </span>
                </>
                }
                <span className="Total"><strong>Sub-total:</strong><NumberFormat value={parseFloat(reviewshow?.subamount).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} /></span>
                {kairecash === true &&
                    <span className="Total"><strong>Kaire Cash:</strong><NumberFormat value={parseFloat(cartdata?.available_kaire).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} /></span>
                }
                <span className="amount_paid"><strong>Total:</strong> {paidamount >= 0 ?
                    <NumberFormat value={parseFloat(paidamount).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} />
                    :
                    <NumberFormat value={parseFloat(reviewshow?.amount).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} />
                }</span>
            </div>
        </div>
        <div className="coupam-enter">
            <div className="apply-coupn">
                <button type="button" className="btn btn-primary" onClick={(e) => { placerorder(e) }}  >Place order</button>
            </div>
        </div>
    </>)
}
export default Review;