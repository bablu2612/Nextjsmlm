import NumberFormat from 'react-number-format';
import { FaTrash,FaEdit } from "react-icons/fa";

const AutoshipvariantDetails=({datas,Add,Sub,data,deleteautoship})=>{
    return(
        <>
        <div className="col-md-4">
            <div className="cart-product-details">
                {datas?.product?.name}{` ${datas?.variant !== null ? ` - ${datas?.variant?.name}` : ''}`} X {datas?.product_quantity}
            </div>
        </div>
        <div className="col-md-4 qty-sec">
            <div className="main-qty-sec">
                <div className="box">
                    <div id="qty">
                        <button type="button"
                            data-qty={datas?.product_quantity}
                            data-product_id={datas?.product?.id}
                            data-variant_id={+datas?.variant?.id}
                            data-order_id={data?.id}
                            className="sub"
                            onClick={(e) => { Sub(e) }}>-</button>
                        <input
                            name={`${datas?.variant?.id},${null}`}
                            type="text"
                            value={datas?.product_quantity}
                            readOnly
                        />
                        <button type="button"
                            data-qty={datas?.product_quantity}
                            data-product_id={datas?.product?.id}
                            data-variant_id={+datas?.variant?.id}
                            data-order_id={data?.id}
                            data-max_qty={datas?.variant?.quantity}
                            className="add"
                            className="add" value={datas?.product_quantity} onClick={(e) => { Add(e) }}>+</button>
                    </div>
                </div>
                <div className="delete">
                    <FaTrash onClick={()=>{deleteautoship(datas?.product?.id, +datas?.variant?.id)}} />
                </div>
            </div>
        </div>

        <div className="col-md-4">
            <div className="cart-product-details">
                <NumberFormat value={parseFloat(datas?.variant?.autoship_cost_price * datas?.product_quantity).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} />

            </div>
        </div>
    </>
    )
}
export default AutoshipvariantDetails;