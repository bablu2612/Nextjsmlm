import NumberFormat from 'react-number-format';
import { FaTrash } from "react-icons/fa";

const Variant = ({ is_autoship_user,Cart, setcosttype,setDelete,costtype,addToCart }) => {
  // to checck product is selcted autoship or normal
  const objIndex = costtype?.data?.findIndex((obj => obj.id == Cart?.variant?.id));
  let cost;
  cost=objIndex === -1?
  Cart?.variant?.cost_price
  :
  objIndex?(costtype.data[objIndex].value === 'Normal')
  ?
  Cart?.variant?.cost_price
  :
  (costtype.data[objIndex].value === 'AutoShip')
  ?
  Cart?.variant?.autoship_cost_price
  :
  Cart?.variant?.cost_price:(is_autoship_user==="True")
  ??
  Cart?.variant?.autoship_cost_price
  return (<>
    <div className="row" key={1}>
      <div className="col-md-2">
        <div className="cart-image">
          {Cart?.variant?.product_variant_images[0]?.image && <img src={`${process.env.API_URL}${Cart?.variant.product_variant_images[0]?.image}`} />}</div>
      </div>
      <div className="col-md-2">
        <div className="cart-product-details">
         {Cart?.variant?.name}
        </div>
      </div>
      <div className="col-md-2">
        <div className="cart-product-details">
          <div className="box">
            <div className="select">
              <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
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
              }}
              >
                <option value="Normal">Single</option>
                <option value="AutoShip" >AutoShip</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-2">
        <div className="cart-product-details">
          <NumberFormat value={parseFloat(cost).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} />
        </div>
      </div>
    
      <div className="col-md-2">
        <div className="pro-cart-table">
      <div className="Add_to_cart">
        <button disabled={Cart?.variant?.is_stock_available === 'True' ? false : true} data-value={Cart?.variant?.id} type="button" name={Cart?.variant?.id} id={Cart?.product?.id} onClick={(e) => addToCart(e)}>Add To Cart</button>
        </div>
        <div className="cart-product-qty-del">
          <button  className="dlt" >
            <FaTrash onClick={(e) => { setDelete(Cart?.product?.id,Cart?.variant?.id) }} />
            </button>
        </div>
        </div>
      </div>
    </div>
  </>)
}
export default Variant;