import { defaultTo } from "lodash"
import NumberFormat from 'react-number-format';

const ProductRefund = ({ datas, product_qty }) => {
    return (
        <div className="row">
            <div className="col-md-8">
                <div className="cart-product-details">

                    {datas?.product?.name} {datas?.variant !== null && ('(' + datas?.variant.name + ')')} X {datas?.product_quantity}
                    <div className="col-md-4 qty-sec" >
                        <div className="main-qty-sec">
                            <div className="box">
                                <div id="qty">

                                    <input
                                        name={`${datas?.product},${datas?.variant}`}
                                        type="text"
                                        className="product-qty"
                                        value={datas?.product_quantity}
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
                        <NumberFormat value={parseFloat(datas?.price_per_unit * datas?.product_quantity).toFixed(2)}
             displayType={'text'}
                   thousandSeparator={true}
                   prefix={'$'}
             renderText={value => <div>{value}</div>} />
                </div>
            </div>
        </div>
        // <tr>
        //     <td>
        //         {datas?.product_name} {datas?.variant_name != '' && ('(' + datas?.variant_name + ')')} X {datas?.product_quantity}

        //     </td>
        //     <td>
        //         <input
        //             name={`${datas?.product},${datas?.variant}`}
        //             type="text"
        //             className="product-qty"
        //             value={datas?.product_quantity}
        //             readOnly
        //         />
        //     </td>
        //     <td>

        //         <NumberFormat value={parseFloat(datas?.price_per_unit * datas?.product_quantity).toFixed(2)}
        //             displayType={'text'}
        //             thousandSeparator={true}
        //             prefix={'$'}
        //             renderText={value => <div>{value}</div>} />
        //     </td>
        // </tr>

    )
}
export default ProductRefund;