import NumberFormat from 'react-number-format';

const Product = ({ is_autoship, Cart, deleteproduct, index, register, Add, Sub, updateqty, setcosttype, costtype, swithtoautoship }) => {
  //check product is selected to autoship or normal

  const objIndex = costtype?.data?.findIndex((obj => +(obj.id) == +(Cart?.product?.id)));
  let cost;
  cost = objIndex === -1 ?
    Cart?.is_autoship === 'True' ? Cart?.product?.autoship_cost_price : Cart?.product?.cost_price
    :
    objIndex ?
      costtype.data[objIndex].value === 'Normal' ?
        Cart?.product?.cost_price
        :
        costtype.data[objIndex].value === 'AutoShip' ?
          Cart?.product?.autoship_cost_price : ""
      :
      Cart?.is_autoship === 'True' ? Cart?.product?.autoship_cost_price : Cart?.product?.cost_price

  is_autoship === 'True' ?
    cost = Cart?.product?.autoship_cost_price
    :
    ""

  // if (objIndex === -1) {
  //   // cost = Cart?.product?.cost_price;
  //   if (Cart?.is_autoship === 'True') {
  //     cost = Cart?.product?.cost_price;

  //   }
  //   else {
  //     cost = Cart?.product?.cost_price;

  //   }
  // }
  // else if (objIndex) {
  //   if (costtype.data[objIndex].value === 'Normal') {
  //     cost = Cart?.product?.cost_price;
  //   }
  //   else if (costtype.data[objIndex].value === 'AutoShip') {
  //     cost = Cart?.product?.cost_price;
  //   }
  // }
  // else {
  //   // cost = Cart?.product?.cost_price;
  //   if (Cart?.is_autoship === 'True') {
  //     cost = Cart?.product?.cost_price;

  //   }
  //   else {
  //     cost = Cart?.product?.cost_price;

  //   }
  // }
  // if (is_autoship === 'True') {
  //   cost = Cart?.product?.autoship_cost_price;

  // }
  return (<>

    <div className="mini-cart" key={index}>
      <div className="min-cat-uppper">

        <div className="cart-image">
          {Cart?.product?.product_images[0]?.image && <img src={`${process.env.API_URL}${Cart?.product.product_images[0]?.image}`} />}
        </div>
        <div className="mini-cart-des">
          <div className="cart-product-details">
            {Cart?.product?.name}

          </div>

          <div className="main-qty-sec">
            <div className="box">
              <div id="qty">
                <button type="button" name={`${Cart?.product?.id},${null}`} id={Cart?.product?.id} className="sub" value={Cart?.quantity} onClick={(e) => { Sub(e) }}>-</button>
                <input
                  name={`${Cart?.product?.id},${null}`}
                  type="text"
                  ref={register &&
                    register({
                      valueAsNumber: true,
                    })
                  }
                  value={+(updateqty?.id) === +(Cart?.product?.id) ? +(updateqty.value) : Cart?.quantity}

                />
                <button type="button" name={`${Cart?.product?.id},${null}`} id={Cart?.product?.id} data-value={Cart?.product?.quantity} className="add" value={Cart?.quantity} onClick={(e) => { Add(e) }}>+</button>
              </div>
            </div>
          </div>


          <div className="cart-product-details">
            <p className="title">
              {is_autoship === "True" ? <NumberFormat value={parseFloat(cost * Cart?.quantity).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div> {Cart?.is_autoship !== 'True' ? value : `$${parseFloat(Cart?.product?.autoship_cost_price * Cart?.quantity).toFixed(2)}` + ' / $' + parseFloat(Cart?.product?.autoship_cost_price * Cart?.quantity).toFixed(2) + ' Autoship'}</div>} />
                : <NumberFormat value={parseFloat(cost * Cart?.quantity).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div> {Cart?.is_autoship !== 'True' ? value : `$${parseFloat(Cart?.product?.cost_price * Cart?.quantity).toFixed(2)}` + ' / $' + parseFloat(Cart?.product?.autoship_cost_price * Cart?.quantity).toFixed(2) + ' Autoship'}</div>} />}
              {/* <NumberFormat value={parseFloat(cost * Cart?.quantity).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div> {Cart?.is_autoship !== 'True' ? value : `$${parseFloat(Cart?.product?.autoship_cost_price * Cart?.quantity).toFixed(2)}` + ' / $' + parseFloat(Cart?.product?.autoship_cost_price * Cart?.quantity).toFixed(2) + ' Autoship'}</div>} /> */}
            </p>
          </div>

          <div className="cart-product-details">
            <div className="box">
              <div className="select">
                <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
                  data-product-id={Cart?.product?.id}
                  data-product-qty={Cart?.quantity}
                  data-variant-id={null}
                  onChange={(e) => {
                    const found = costtype.data.some(el => el.id === Cart?.product?.id);
                    if (!found) {
                      setcosttype({ ...costtype, data: [...costtype.data, { "id": Cart?.product?.id, "value": e.target.value, "variant_id": null }] })

                    }
                    else {
                      const objIndex = costtype.data.findIndex((obj => obj.id == Cart?.product?.id));
                      costtype.data.splice(objIndex, 1);

                      setcosttype({ ...costtype, data: [...costtype.data, { "id": Cart?.product?.id, "value": e.target.value, "variant_id": null }] })
                    }
                    swithtoautoship(e)

                  }}
                >
                  <option value="Normal" >Single</option>
                  <option value="AutoShip" selected={Cart?.is_autoship === 'True' ? true : false} >AutoShip</option>
                  {/* <option value="AutoShip"  >AutoShip</option> */}

                </select>
              </div>
            </div>
          </div>


        </div>
      </div>

      <div className="cart-product-qty-del">
        <button id={Cart?.product?.id} data-value={Cart?.variant?.id} onClick={(e) => { deleteproduct(e) }} className="dlt" >X</button>
      </div>

    </div>
  </>)
}
export default Product;