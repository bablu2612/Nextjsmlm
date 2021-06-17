import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from '../../../../api/Apis'
const Discount = ({ paidamount, kairecash, kairecashval, setdiscount_amount, setpaidamount, discount_amount1, reviewshow, setToken, logintoken, setcopanerror, setshipamount, setcoupon }) => {

    const { register, handleSubmit } = useForm();

    useEffect(() => {
        const token = localStorage.getItem('Token') ? localStorage.getItem('Token') : '';
        setToken(token)
        if (localStorage.getItem('coupon_name')?.length > 0) {
            const data_coupon = { "coupon": localStorage.getItem('coupon_name'), "token": token }
            onSubmit(data_coupon)

        }
    }, [])
    //on click applay discount coupon method call
    const onSubmit = data => {
        let orderdata;
        if (localStorage.getItem('coupon_name')?.length > 0) {
            orderdata = data
            logintoken = data?.token
        }
        else {
            orderdata = {
                "coupon": data.coupon_id,
            }

        }
        //varify coupon is valid or not
        api.varifyCopan(orderdata, logintoken).then(res => {
            let discount_amount = 0;
            if (res?.data?.code === 1) {
                localStorage.setItem('coupon_name', res.data.coupon_details?.code)

                if (res.data.coupon_details?.discount_type === 1) {
                    reviewshow['discount_amount'] = res?.data?.coupon_details.discount_amount;

                    reviewshow['coupon_id'] = res?.data?.coupon_details.id;
                    setdiscount_amount(reviewshow['discount_amount'])

                }
                else {
                    let coupon_per = res?.data?.coupon_details.discount_percent
                    let limit = res?.data?.coupon_details.limit
                    let discounted_amount = (reviewshow['amount'] * coupon_per) / 100
                    if (discounted_amount > limit) {
                        reviewshow['discount_amount'] = limit;
                    }
                    else {
                        reviewshow['discount_amount'] = discounted_amount;
                    }
                    setdiscount_amount(reviewshow['discount_amount'])
                }
                setcopanerror('')

                
                if (res?.data?.coupon_details.free_shipping === true) {
                    reviewshow['shipping_amount'] = 0 
                }
                setshipamount(reviewshow['shipping_amount'])

                let amountayed = (reviewshow['amount'] - reviewshow['discount_amount']) < 0 ? 0 : (reviewshow['amount'] - reviewshow['discount_amount'])
                let finalamount = amountayed + reviewshow['tax_amount'] + reviewshow['shipping_amount']
                kairecash === true ? setpaidamount(finalamount - kairecashval) : setpaidamount(finalamount)

                // if (kairecash === true) {
                //     setpaidamount(finalamount - kairecashval)

                // }
                // else {
                //     setpaidamount(finalamount)

                // }
               
                if (paidamount >= 0) {
                    let amountayed = paidamount - reviewshow['discount_amount'] < 0 ? 0 : (paidamount - reviewshow['discount_amount'])
                    setpaidamount(amountayed)

                }
                setcoupon(res?.data?.coupon_details)
            }
            else {
                setcopanerror(res?.data?.message)
            }
        })
    }
    return (<>
        {discount_amount1 ? '' :
            <div className="apply-coupn">
                <div className="row">
                    <div className="col-md-12">
                        <form className="signupform" onSubmit={handleSubmit(onSubmit)}>

                            <input type="text" className="form-control" name="coupon_id" placeholder="coupon" id="coupon_id" ref={register({ required: false })} />
                            <button type="submit" className="btn btn-primary"  >Apply</button>
                        </form>
                    </div>
                </div>
            </div>
        }
    </>)
}
export default Discount;