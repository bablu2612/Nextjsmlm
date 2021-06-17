import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import api from '../../../api/Apis'
import Product from "./Components/MiniCart/ProductComponext";
import Variant from "./Components/MiniCart/VariantComponents";
import { toast } from 'react-toastify';
import NumberFormat from 'react-number-format';
import cookieCutter from 'cookie-cutter'

export default function Minicart(props) {
  const wrapperRef = useRef(null);

  const [cartdata, setCartData] = useState();
  const [qty, setqty] = useState();
  const [updateqty, setupdateqty] = useState({ id: '', value: '' });
  const [setdelete, setDelete] = useState();
  const [setdeletemessage, setDeleteMessage] = useState();
  const [variantid, setvariantid] = useState();
  const [logintoken, setToken] = useState();
  const [costtype, setcosttype] = useState({ data: [{ id: '', value: '' }] })
  const route = useRouter();
  const { register, handleSubmit, errors } = useForm();
  const [is_autoship, setis_autoship] = useState()

  //delete product from minicart
  const deleteproduct = (e) => {
    const formDataDelete = { product_id: e?.target?.id, variant_id: e?.target?.dataset?.value, token: logintoken };
    api.deleteProductFromAddToCart(formDataDelete).then(res => {
      setDeleteMessage(res.data)
      if (res?.data?.code === 1) {
        toast.success('Product deleted', {
          duration: 5
        })
      }
      api.getAllCartProduct(logintoken).then(res => {
        setCartData(res?.data)
      })
    })
  }
  useEffect(() => {

    const token = localStorage.getItem('Token') ? localStorage.getItem('Token') : '';
    setToken(token)
    api.getAllCartProduct(token).then(res => {
      setCartData(res?.data)
      props?.setcounts(res?.data)
      setis_autoship(res?.data?.is_autoship_user)

    })
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };

  }, [props?.showminicart]);

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

  //onclick checkout validate user login or not.
  const Validatelogin = (e) => {
    props?.setshowminicart(false)

    if (logintoken) {
      route.push(`/${route.query.page}/checkout/addressList`)
    }
    else {
      route.push(`/${route.query.page}/login`)
    }
  }

  //add qty of product in mini cart
  const Add = (e) => {
    let is_auto_ship = e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.form-select').value;

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
  //subtract qty of product from minicart.

  const Sub = (e) => {
    let is_auto_ship = e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.form-select').value;

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
  //close minicart
  const closeminicart = () => {
    props.setshowminicart(false)

  }
  //click outside of minicart
  const handleClickOutside = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      props?.setshowminicart(false)

    }
  };

  //switch product from autoship to norma and normal to autoship
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
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    </Head>


    {props?.showminicart !== false ?
      <div className="mini-cart-sec" ref={wrapperRef}>

        <div className="container">
          <div className="cart-heading">
            <h1 className="title" >Cart Item </h1>
            <button onClick={closeminicart}>X</button>
          </div>
          <div className="Cart_product">
            {cartdata?.message && <h3 className="title">{cartdata.message}</h3>}

            <div className="mini-cart-sc">
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
            </div>
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
      :
      <div className="mini-root-div" onClick={() => { props.setshowminicart(true) }}>
        <div onClick={() => { props.setshowminicart(true) }} className="fa fa-shopping-cart">
          {/* <span>{props?.counts?.products?.length >0 ? props?.counts?.products?.length : 0}</span> */}
          {props?.counts?.products?.length > 0 &&
            <span>{props?.counts?.products?.length > 0 ? props?.counts?.products?.length : 0}</span>

          }

        </div> </div>
    }

  </>);
}

