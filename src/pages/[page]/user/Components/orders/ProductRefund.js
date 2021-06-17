import { defaultTo } from "lodash"
import NumberFormat from 'react-number-format';

const ProductRefund = ({ datas, Add, Sub, register, product_qty }) => {

    return (
        <div className="row">
            <div className="col-md-8">
                <div className="cart-product-details">
                    <input
                        ref={register && register({ required: false })}
                        defaultValue={`${datas?.product},${datas?.variant},${product_qty}`}
                        type="checkbox" name="refundprod" />
                    {datas?.product_name} {datas?.variant_name != '' && ('(' + datas?.variant_name + ')')} X {datas?.product_quantity}
                    <div className="col-md-4 qty-sec" >
                        <div className="main-qty-sec">
                            <div className="box">
                                <div id="qty">
                                    <button type="button"
                                        id={product_qty}
                                        className="sub"
                                        onClick={(e) => { Sub(e, e.target.id, datas?.product) }}>-
                                    </button>
                                    <input
                                        name={`${datas?.product},${datas?.variant}`}
                                        type="text"
                                        className="product-qty"
                                        value={product_qty}
                                        ref={register && register({ required: false })}
                                        readOnly
                                    />
                                    <button type="button"
                                        id={product_qty}
                                        onClick={(e) => { Add(e, e.target.id, datas?.product, datas?.product_quantity) }}>+
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="cart-product-details">
                    <NumberFormat value={parseFloat(datas?.price_per_unit * datas?.product_quantity).toFixed(2)}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'$'}
                        renderText={value => <div>{value}</div>} />
                </div>
            </div>
        </div>

    )
}
export default ProductRefund;