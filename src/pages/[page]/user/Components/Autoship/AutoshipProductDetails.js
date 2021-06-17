import NumberFormat from 'react-number-format';
import { FaTrash, FaEdit } from "react-icons/fa";
import api from '../../../../../api/Apis';
import { useEffect, useState } from 'react';
const AutoshipProductDetails = ({ datas, Add, Sub, data, deleteautoship, Logintoken }) => {
    return (
        <>
            <div className="col-md-4">
                <div className="cart-product-details">
                    {datas?.product?.name} X {datas?.product_quantity}
                </div>
            </div>
            <div className="col-md-4 qty-sec" >
                <div className="main-qty-sec">
                    <div className="box">
                        <div id="qty">
                            <button type="button"
                                data-qty={datas?.product_quantity}
                                data-product_id={datas?.product?.id}
                                data-variant_id={null}
                                data-order_id={data?.id}
                                className="sub"
                                onClick={(e) => { Sub(e) }}>-</button>
                            <input
                                name={`${datas?.product?.id},${null}`}
                                type="text"
                                value={datas?.product_quantity}
                                readOnly
                            />
                            <button type="button"
                                data-qty={datas?.product_quantity}
                                data-product_id={datas?.product?.id}
                                data-variant_id={null}
                                data-order_id={data?.id}
                                data-max_qty={+datas?.product?.quantity}
                                className="add"
                                value={datas?.product_quantity} onClick={(e) => { Add(e) }}>+</button>
                        </div>
                    </div>
                    <div className="delete">
                        <FaTrash onClick={() => { deleteautoship(datas?.product?.id, null) }} />
                    </div>
                </div>

            </div>

            <div className="col-md-4">
                <div className="cart-product-details">
                    <NumberFormat value={parseFloat(+datas?.product?.autoship_cost_price * +datas?.product_quantity).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} />
                </div>
            </div>
        </>
    )
}
export default AutoshipProductDetails;