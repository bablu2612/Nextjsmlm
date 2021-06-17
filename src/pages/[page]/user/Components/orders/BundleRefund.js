import NumberFormat from "react-number-format"

const BundleRefund = ({ bundle_id, data_bundle, order_refund_variant, register, Add, Sub, product_qty, is_autoship }) => {
    const objIndex = order_refund_variant?.findIndex((obj => obj?.product_id === +data_bundle?.product?.id))
    const objIndex12 = order_refund_variant?.findIndex((obj => +obj?.bundle_id === +bundle_id && +obj?.product_id === +data_bundle?.product?.id));
    if (objIndex12 >= 0) {
        if (data_bundle?.product_variant === null) {
            const objIndex = order_refund_variant?.findIndex((obj => +obj?.bundle_id === +bundle_id && +obj?.product_id === +data_bundle?.product?.id));
            product_qty = (+order_refund_variant[objIndex]?.product_id === +data_bundle?.product?.id) ? order_refund_variant[objIndex]?.qty : data_bundle?.quantity
        }
        else {
            const objIndex = order_refund_variant?.findIndex((obj => +obj?.bundle_id === +bundle_id && +obj?.product_id === +data_bundle?.product?.id));
            if (objIndex >= 0) {
                product_qty = (+order_refund_variant[objIndex]?.product_id === +data_bundle?.product?.id) ? order_refund_variant[objIndex]?.qty : ata_bundle?.quantity
            }
        }
    }
    else {
        product_qty = data_bundle?.quantity;
    }
    return (
        <>
            <div className="row">
                {data_bundle?.product_variant === null ?
                    <>
                        <div className="col-md-8">
                            <div className="cart-product-details">
                                <input
                                    ref={register && register({ required: false })}
                                    defaultValue={`${data_bundle?.product?.id},${data_bundle?.variant},${product_qty}`}
                                    type="checkbox" name="refundprod" />
                                {data_bundle?.product?.name} X {data_bundle?.quantity}
                                <div className="col-md-4 qty-sec" >
                                    <div className="main-qty-sec">
                                        <div className="box">
                                            <div id="qty">
                                                <button type="button" className="sub" onClick={(e) => { Sub(e, product_qty, +data_bundle?.product?.id, 'variant_refund', bundle_id) }}>-</button>
                                                <input
                                                    name={`${data_bundle?.product},${data_bundle?.variant}`}
                                                    type="text"
                                                    className="product-qty"
                                                    value={product_qty}
                                                    ref={register && register({ required: false })}
                                                    readOnly
                                                />
                                                <button type="button" onClick={(e) => { Add(e, product_qty, data_bundle?.product?.id, data_bundle?.quantity, 'variant_refund', bundle_id) }}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="cart-product-details">
                                {/* <NumberFormat value={parseFloat(is_autoship===true?+data_bundle?.product?.autoship_cost_price +data_bundle?.quantity:+data_bundle?.product?.cost_price +data_bundle?.quantity).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} />  */}
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className="col-md-8">
                            <div className="cart-product-details">
                                <input
                                    ref={register && register({ required: false })}
                                    defaultValue={`${data_bundle?.product.id},${data_bundle?.product_variant?.id},${product_qty}`}
                                    type="checkbox" name="refundprod" />
                                {data_bundle?.product?.name} {data_bundle?.product_variant?.name != '' && ('(' + data_bundle?.product_variant?.name + ')')} X {data_bundle?.quantity}
                                <div className="col-md-4 qty-sec" >
                                    <div className="main-qty-sec">
                                        <div className="box">
                                            <div id="qty">
                                                <button type="button" className="sub" onClick={(e) => { Sub(e, product_qty, +data_bundle?.product?.id, 'variant_refund', bundle_id) }}>-</button>
                                                <input
                                                    name={`${data_bundle?.product},${data_bundle?.variant}`}
                                                    type="text"
                                                    className="product-qty"
                                                    value={product_qty}
                                                    ref={register && register({ required: false })}
                                                    readOnly
                                                />
                                                <button type="button" onClick={(e) => { Add(e, product_qty, data_bundle?.product?.id, data_bundle?.quantity, 'variant_refund', bundle_id) }}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            {/* <div className="cart-product-details">
                                <NumberFormat
                                    value={parseFloat(is_autoship === true ? +data_bundle?.product_variant?.autoship_cost_price + data_bundle?.quantity : +data_bundle?.product_variant?.cost_price + data_bundle?.quantity).toFixed(2)}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                    renderText={value => <div>{value}</div>} />
                            </div> */}
                        </div>
                    </>
                }
            </div>
        </>
    )
}
export default BundleRefund;