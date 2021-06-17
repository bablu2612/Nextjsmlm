import { useState } from "react";
import NumberFormat from 'react-number-format';
import { FaTrash } from "react-icons/fa";

const Product = ({ is_autoship_user,Cart, index, setcosttype, costtype, setDelete, addToCart }) => {
// to checck product is selcted autoship or normal
  const objIndex = costtype?.data?.findIndex((obj => obj.id == Cart?.product?.id));
  let cost;
  cost=objIndex === -1?
  Cart?.product?.cost_price
  :
  objIndex?(costtype.data[objIndex].value === 'Normal')
  ?
  Cart?.product?.cost_price
  :
  (costtype.data[objIndex].value === 'AutoShip')
  ?
  Cart?.product?.autoship_cost_price
  :
  Cart?.product?.cost_price:(is_autoship_user==="True")
  ??
  Cart?.product?.autoship_cost_price
  return (<>
    <div className="row" key={index}>
      <div className="col-md-2">
        <div className="cart-image">
          {Cart?.product?.product_images[0]?.image && <img src={`${process.env.API_URL}${Cart?.product.product_images[0]?.image}`} />}
        </div>
      </div>
      <div className="col-md-2">
        <div className="cart-product-details">
          {Cart?.product?.name}
        </div>
      </div>
      <div className="col-md-2">
        <div className="cart-product-details">
          <div className="box">
            <div className="select">
              <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onChange={(e) => {
                const found = costtype.data.some(el => el.id === Cart?.product?.id);
                if (!found) {
                  setcosttype({ ...costtype, data: [...costtype.data, { "id": Cart?.product?.id, "value": e.target.value }] })
                }
                else {
                  const objIndex = costtype.data.findIndex((obj => obj.id == Cart?.product?.id));
                  costtype.data.splice(objIndex, 1);
                  setcosttype({ ...costtype, data: [...costtype.data, { "id": Cart?.product?.id, "value": e.target.value }] })
                }
              }}>
                <option value="Normal">Single</option>
                <option value="AutoShip" >AutoShip</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-2">
        <div className="cart-product-details">
          <div className="title"><NumberFormat value={parseFloat(cost).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div> {Cart?.is_autoship !== 'True' ? value  : `$${parseFloat(Cart?.product?.cost_price).toFixed(2) }` +' / $'+ parseFloat(Cart?.product?.autoship_cost_price).toFixed(2) +' Autoship'}</div>} /></div>
        </div>
      </div>

      <div className="col-md-2">
        <div className="pro-cart-table">
          <div className="Add_to_cart">
            <button disabled={Cart?.product?.is_stock_available === 'True' ? false : true} type="button" name={null} id={Cart?.product?.id} onClick={(e) => addToCart(e)}>Add To Cart</button>
          </div>

          <div className="cart-product-qty-del">
            <button className="dlt" >
              <FaTrash onClick={(e) => { setDelete(Cart?.product?.id,null) }} />
              </button>
          </div>
        </div>
      </div>
    </div>
  </>)
}
export default Product;