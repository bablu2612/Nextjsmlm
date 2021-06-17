import NumberFormat from "react-number-format"

const BundleRefund = ({ data_bundle, product_qty, is_autoship }) => {

    return (
        <>
            <div className="row">
                {data_bundle?.product_variant === null ?
                    <>
                        <div className="col-md-8">
                            <div className="cart-product-details">

                                {data_bundle?.product?.name} X {data_bundle?.quantity}
                                <div className="col-md-4 qty-sec" >
                                    <div className="main-qty-sec">
                                        <div className="box">
                                            <div id="qty">

                                                <input
                                                    name={`${data_bundle?.product},${data_bundle?.variant}`}
                                                    type="text"
                                                    className="product-qty"
                                                    value={product_qty}
                                                    readOnly
                                                />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="cart-product-details">

                                <NumberFormat value={parseFloat(data_bundle?.quantity * is_autoship === false ? data_bundle?.product?.cost_price : data_bundle?.product?.is_autoship).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} />
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className="col-md-8">
                            <div className="cart-product-details">

                                {data_bundle?.product?.name} {data_bundle?.product_variant?.name != '' && ('(' + data_bundle?.product_variant?.name + ')')} X {data_bundle?.quantity}
                                <div className="col-md-4 qty-sec" >
                                    <div className="main-qty-sec">
                                        <div className="box">
                                            <div id="qty">

                                                <input
                                                    name={`${data_bundle?.product},${data_bundle?.variant}`}
                                                    type="text"
                                                    className="product-qty"
                                                    value={product_qty}
                                                    readOnly
                                                />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <NumberFormat value={parseFloat(data_bundle?.quantity * is_autoship === false ? data_bundle?.product_variant?.cost_price : data_bundle?.product_variant?.is_autoship).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} />
                        </div>
                    </>
                }
            </div>

            {/* {data_bundle?.product_variant === null ?
                <tr>
                    <td>
                        {data_bundle?.product?.name} X {data_bundle?.quantity}
                    </td>
                    <td>
                        <input
                            name={`${data_bundle?.product},${data_bundle?.variant}`}
                            type="text"
                            className="product-qty"
                            value={product_qty}
                            readOnly
                        />
                    </td>
                    <td>

                        <NumberFormat value={parseFloat(data_bundle?.quantity * is_autoship === false ? data_bundle?.product?.cost_price : data_bundle?.product?.is_autoship).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} />

                    </td>
                </tr>
                :
                <tr>
                    <td>
                    {data_bundle?.product?.name} {data_bundle?.product_variant?.name != '' && ('(' + data_bundle?.product_variant?.name + ')')} X {data_bundle?.quantity}
                    </td>
                    <td>
                        <input
                            name={`${data_bundle?.product},${data_bundle?.variant}`}
                            type="text"
                            className="product-qty"
                            value={product_qty}
                            readOnly
                        />
                    </td>
                    <td>

                        <NumberFormat value={parseFloat(data_bundle?.quantity * is_autoship === false ? data_bundle?.product_variant?.cost_price : data_bundle?.product_variant?.is_autoship).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} />

                    </td>
                </tr>
            } */}
        </>
    )
}
export default BundleRefund;