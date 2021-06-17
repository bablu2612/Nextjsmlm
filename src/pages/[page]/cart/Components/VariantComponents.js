import NumberFormat from 'react-number-format';
import { FaTrash } from "react-icons/fa";
import Hover from '../hovercomponent';

const Variant = ({ is_autoship, Cart, deleteproduct, index, register, Add, Sub, updateqty, setcosttype, costtype, swithtoautoship }) => {
  //check product is selected to autoship or normal

  const objIndex = costtype?.data?.findIndex((obj => +(obj.id) == +(Cart?.variant?.id)));
  let cost;

  cost = objIndex === -1 ?
    Cart?.is_autoship === 'True' ? Cart?.variant?.autoship_cost_price : Cart?.variant?.cost_price
    :
    objIndex ?
      costtype.data[objIndex].value === 'Normal' ?
        Cart?.variant?.cost_price
        :
        costtype.data[objIndex].value === 'AutoShip' ?
          Cart?.variant?.autoship_cost_price : ""
      :
      Cart?.is_autoship === 'True' ? Cart?.variant?.autoship_cost_price : Cart?.variant?.cost_price

  is_autoship === 'True' ?
    cost = Cart?.variant?.autoship_cost_price
    :
    ""

  // if (objIndex === -1) {
  //   if (Cart?.is_autoship === 'True') {
  //     cost = Cart?.variant?.cost_price;

  //   }
  //   else {
  //     cost = Cart?.variant?.cost_price;

  //   }
  // }
  // else if (objIndex) {
  //   if (costtype.data[objIndex].value === 'Normal') {
  //     cost = Cart?.variant?.cost_price;
  //   }
  //   else if (costtype.data[objIndex].value === 'AutoShip') {
  //     cost = Cart?.variant?.cost_price;
  //   }
  // }
  // else {
  //   // cost = Cart?.variant?.cost_price;
  //   if (Cart?.is_autoship === 'True') {
  //     cost = Cart?.variant?.cost_price;

  //   }
  //   else {
  //     cost = Cart?.variant?.cost_price;

  //   }
  // }
  // if(is_autoship==='True')
  // {
  //   cost = Cart?.variant?.autoship_cost_price;

  // }
  return (<>
    <div className="row" key={index}>
      <div className="col-md-2">
        <div className="cart-image">
          {Cart?.variant?.product_variant_images[0]?.image && <img src={`${process.env.API_URL}${Cart?.variant.product_variant_images[0]?.image}`} />}</div>
      </div>
      <div className="col-md-2">
        <div className="cart-product-details">
          {Cart?.product?.name}({Cart?.variant?.name})
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
          <div className="main-qty-sec">
            <div className="box">
              <div id="qty">
                <button type="button" name={`${Cart?.product?.id},${Cart?.variant?.id}`} data-value={Cart?.variant?.quantity} id={Cart?.variant?.id} className="sub" value={Cart?.quantity} onClick={(e) => { Sub(e) }}>-</button>
                <input
                  name={`${Cart?.product?.id},${Cart?.variant?.id}`}
                  type="text"
                  ref={register &&
                    register({
                      valueAsNumber: true,
                    })
                  }
                  value={+(updateqty?.id) === +(Cart?.variant?.id) ? +(updateqty.value) : Cart?.quantity}
                  min={1}
                  max={Cart?.variant?.quantity}
                />
                <button type="button" name={`${Cart?.product?.id},${Cart?.variant?.id}`} data-value={Cart?.variant?.quantity} id={Cart?.variant?.id} className="add" value={Cart?.quantity} onClick={(e) => { Add(e) }}>+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-2">
        <div className="cart-product-details">
          <div className="title">

            {is_autoship === "True" ? <NumberFormat value={parseFloat(cost * Cart?.quantity).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div> {Cart?.is_autoship !== 'True' ? value : `$${parseFloat(Cart?.variant?.autoship_cost_price * Cart?.quantity).toFixed(2)}` + ' / $' + parseFloat(Cart?.variant?.autoship_cost_price * Cart?.quantity).toFixed(2) + ' Autoship'}</div>} />
              : <NumberFormat value={parseFloat(cost * Cart?.quantity).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div> {Cart?.is_autoship !== 'True' ? value : `$${parseFloat(Cart?.variant?.cost_price * Cart?.quantity).toFixed(2)}` + ' / $' + parseFloat(Cart?.variant?.autoship_cost_price * Cart?.quantity).toFixed(2) + ' Autoship'}</div>} />}


          </div>
          {is_autoship === "True" ?
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

      <div className="col-md-1">
        <div className="cart-product-qty-del">
          <button className="dlt" >
            <FaTrash onClick={(e) => { deleteproduct(Cart?.product?.id, Cart?.variant?.id) }} />
          </button>
        </div>
      </div>
    </div>
  </>)
}
export default Variant;