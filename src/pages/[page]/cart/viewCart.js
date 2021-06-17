import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from '../../../api/Apis'
import Product from "./Components/ProductComponext";
import Variant from "./Components/VariantComponents";
import { toast } from 'react-toastify';
import NumberFormat from 'react-number-format';
import cookieCutter from 'cookie-cutter'

export default function Cart(props) {
  const [cartdata, setCartData] = useState();
  const [qty, setqty] = useState();
  const [updateqty, setupdateqty] = useState({ id: '', value: '' });
  const [setdelete, setDelete] = useState();
  const [setdeletemessage, setDeleteMessage] = useState();
  const [variantid, setvariantid] = useState();
  const [logintoken, setToken] = useState();
  const [costtype, setcosttype] = useState({ data: [{ id: '', value: '' }] })
  const [is_autoship, setis_autoship] = useState()
  const route = useRouter();
  const { register, handleSubmit, errors } = useForm();

  //delete product from cart
  const deleteproduct = (productId, variantId) => {
    const formDataDelete = { product_id: productId, variant_id: variantId, token: logintoken };
    api.deleteProductFromAddToCart(formDataDelete).then(res => {
      setDeleteMessage(res.data)
      if (res?.data?.code === 1) {
        toast.success('Product deleted', {
          duration: 5
        })
      }
      api.getAllCartProduct(logintoken).then(res => {
        setCartData(res?.data)
        props?.setcounts(res?.data)

      })
    })
  }
  useEffect(() => {
    const token = localStorage.getItem('Token') ? localStorage.getItem('Token') : '';
    setToken(token)
    api.getAllCartProduct(token).then(res => {
      setCartData(res?.data)
      setis_autoship(res?.data?.is_autoship_user)
      props?.setcounts(res?.data)



    })
  }, []);

  // cart total
  let total = 0;
  cartdata?.products?.forEach((cart) => {
    if (cartdata?.is_autoship_user === 'True') {
      total = (cart.variant ? +(cart.variant.autoship_cost_price * cart.quantity) : +(cart.product.autoship_cost_price * cart.quantity)) + total;

    }
    else if (cart.is_autoship === "True") {
      total = (cart.variant ? +(cart.variant.cost_price * cart.quantity) : +(cart.product.cost_price * cart.quantity)) + total;

    }
    else {
      total = (cart.variant ? +(cart.variant.cost_price * cart.quantity) : +(cart.product.cost_price * cart.quantity)) + total;

    }
  });

  //on click checkout check is already login or not
  const Validatelogin = (e) => {

    if (logintoken) {

      route.push(`/${route.query.page}/checkout/addressList`)
    }
    else {

      route.push(`/${route.query.page}/login`)
    }
  }
  //increase product qty
  const Add = (e) => {
    let is_auto_ship = e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.form-select').value;
    if (+(e.target.value) >= 0 && +(e.target.value) < +(e?.target?.dataset?.value)) {
      const data_update = e?.target?.name.split(',')
      const datas = {
        product_id: +(data_update[0]),
        variant_id: +(data_update[1]),
        quantity: +(e.target.value) + 1,
        cookie_id: cookieCutter.get('sessionkey'),
        is_autoship: is_auto_ship === 'AutoShip' ? true : false
      }
      const update_data = {
        token: logintoken,
        datas: datas
      }
      api.updateCart(update_data).then(res => {
        toast.success(res.data.message, {
          duration: 5
        })
        api.getAllCartProduct(logintoken).then(res => {
          setCartData(res?.data)

        })
      })
    }
  }
  //descrease product qty
  const Sub = (e) => {
    let is_auto_ship = e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.form-select').value;

    const data_update = e?.target?.name.split(',')
    const datas = {
      product_id: +(data_update[0]),
      variant_id: +(data_update[1]),
      quantity: +(e.target.value) > 0 ? (+(e.target.value) - 1) : +(e.target.value),
      cookie_id: cookieCutter.get('sessionkey'),
      is_autoship: is_auto_ship === 'AutoShip' ? true : false

    }
    const update_data = {
      token: logintoken,
      datas: datas
    }
    api.updateCart(update_data).then(res => {
      toast.success(res.data.message, {
        duration: 5
      })
      api.getAllCartProduct(logintoken).then(res => {
        setCartData(res?.data)
      })
    })
  }
  //Switch product to normal to autoship or autoship to normal
  const swithtoautoship = (e) => {
    let qty = e.currentTarget.getAttribute('data-product-qty')
    let variant_id = e.currentTarget.getAttribute('data-variant-id')
    let product_id = e.currentTarget.getAttribute('data-product-id')
    let types = e.currentTarget.value

    const datas = {
      product_id: +(product_id),
      variant_id: variant_id,
      quantity: +(qty),
      cookie_id: cookieCutter.get('sessionkey'),
      is_autoship: types === 'AutoShip' ? true : false

    }
    const update_data = {
      token: logintoken,
      datas: datas
    }
    api.updateCart(update_data).then(res => {
      toast.success(res.data.message, {
        duration: 5
      })
      api.getAllCartProduct(logintoken).then(res => {
        setCartData(res?.data)
      })
    })

  }
  
  return (<>
    <Head>
      <title>Cart</title>
     
    </Head>
    <div className="cart-sec">
      <div className="container">
        <div className="cart-heading">
          <h1 className="title"> Cart Item </h1>
        </div>
        <div className="Cart_product">
          {cartdata?.products &&
            <div className="row">
              <div className="col-md-2"><div className="pro-name">Product image</div></div>
              <div className="col-md-2"><div className="pro-name">product name</div></div>
              <div className="col-md-2"><div className="pro-name">Variation</div></div>
              <div className="col-md-2"><div className="pro-name">Quantity</div></div>
              <div className="col-md-2"><div className="pro-name">Price</div></div>
              <div className="col-md-2"><div className="pro-name">Action</div></div>
            </div>
          }
          
          {cartdata?.message && <h3 className="title">{cartdata.message}</h3>}
          {
            cartdata?.products?.map((Cart, index) => {
              return (<>
                {Cart?.variant === null ?
                  <Product is_autoship={is_autoship} swithtoautoship={swithtoautoship} Cart={Cart} setcosttype={setcosttype} setupdateqty={setupdateqty} register={register} deleteproduct={deleteproduct} index={index} Add={Add} Sub={Sub} updateqty={updateqty} costtype={costtype} />
                  :
                  <Variant is_autoship={is_autoship} swithtoautoship={swithtoautoship} Cart={Cart} setcosttype={setcosttype} register={register} deleteproduct={deleteproduct} index={index} Add={Add} Sub={Sub} updateqty={updateqty} costtype={costtype} setupdateqty={setupdateqty} />
                }
              </>)
            })
          }
          <br /><br />
          {cartdata?.message !== 'Cart is empty' &&
            <div className="checkout-btn">
              <div className="row">

                <div className="col-md-4">
                  <ul>
                    <li><strong>Sub-total:</strong><NumberFormat value={parseFloat(total).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} /></li>
                    <li><strong>Total:</strong><NumberFormat value={parseFloat(total).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} /></li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <button type="button" className="btn btn-primary" onClick={(e) => { Validatelogin(e) }} >Checkout</button>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>

  </>);
}

