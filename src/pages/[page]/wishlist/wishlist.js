import { event } from "jquery";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import api from '../../../api/Apis'
import Product from "./Components/ProductComponext";
import Variant from "./Components/VariantComponents";
import { toast } from 'react-toastify';
import NumberFormat from 'react-number-format';

export default function Cart({ cartDetails, setupdatecartdata }) {
  const [cartdata, setCartData] = useState();
  const [setdelete1, setDelete1] = useState();
  const [setdeletemessage, setDeleteMessage] = useState();
  const [wishlistmessage, setwishlistmessage] = useState()
  const [costtype, setcosttype] = useState({ data: [{ id: '', value: '' }] })
  const [logintoken, setToken] = useState();
  const [is_autoship_user, setis_autoship_user] = useState();


  const route = useRouter();
  // load wishlist page data
  useEffect(() => {
    const token = localStorage.getItem('Token') ? localStorage.getItem('Token') : '';
    setToken(token)
    const formDataDelete = { product_id: setdelete1, token: token };
    {
      setdelete1 ?
        api.deleteProductFromwishlist(formDataDelete).then(res => {
          api.getAllWishListProduct(token).then(res => {
            setCartData(res.data)
            setis_autoship_user(res?.data?.is_autoship_user)
            if (res?.data?.code === 0) {
              setwishlistmessage(res.data.message)
            }
          })
        })
        :
        api.getAllWishListProduct(token).then(res => {
          setCartData(res?.data)
          setis_autoship_user(res?.data?.is_autoship_user)
          if (res?.data?.code === 0) {
            setwishlistmessage(res.data.message)
          }
        })
    }
  }, [setdelete1]);
  // delete product from wishlist
  const setDelete = (productId, variantId) => {
    const formDataDelete = { product_id: productId, variant_id: variantId, token: logintoken };
    api.deleteProductFromwishlist(formDataDelete).then(res => {
      if (res?.data?.code === 1) {
        toast.success('Product deleted From Wishlist', {
          duration: 5
        })
      }
      api.getAllWishListProduct(logintoken).then(res => {
        setCartData(res.data)
        setupdatecartdata(true)

        if (res?.data?.code === 0) {

          setwishlistmessage(res.data.message)
        }
      })
    })
  }
  // Add to cart product from wishlist
  const addToCart = (e) => {
    let autoship = e.currentTarget.parentNode.parentNode.parentNode.parentNode.querySelector('.form-select').value;
    const formData = { product_id: +(e.target.id), variant_id: +(e?.target?.dataset?.value) ? +(e?.target?.dataset?.value) : null, token: logintoken, quantity: 1, is_autoship: autoship === 'AutoShip' ? true : false };
    api.addToCart(formData).then(res => {
      toast.success(res.data.message, {
        duration: 5
      })
    })
  }
  return (<>
    <Head>
      <title>WishList</title>
    </Head>
    <div className="container">
      <div className="cart-sec">
        <div className="cart-heading">
          <h1 className="title"> WishList Item </h1>
        </div>
        <div className="Cart_product">
          {cartdata?.wishlist &&
            <div className="row">
              <div className="col-md-2"><div>Product image</div></div>
              <div className="col-md-2"><div>product name</div></div>
              <div className="col-md-2"><div>Variation</div></div>
              <div className="col-md-2"><div>Price</div></div>
              <div className="col-md-4"><div>Action</div></div>
            </div>
          }
          {wishlistmessage && <h4 className="title">{wishlistmessage}</h4>}
          {
            cartdata?.wishlist?.map((Cart, index) => {
              return (<>
                {Cart?.variant === null ?
                  <Product is_autoship_user={is_autoship_user} Cart={Cart} setcosttype={setcosttype} index={index} costtype={costtype} setDelete={setDelete} addToCart={addToCart} />
                  :
                  <Variant is_autoship_user={is_autoship_user} Cart={Cart} setcosttype={setcosttype} index={index} costtype={costtype} setDelete={setDelete} addToCart={addToCart} />
                }
              </>)
            })
          }
        </div>
      </div>
    </div>
  </>);
}

