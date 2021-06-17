
import Head from 'next/head'
import Layout from '../../../../Components/Layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import api from '../../../../api/Apis'
import Link from 'next/link';
import Popups from '../../../../Components/Popup';
import { toast } from 'react-toastify';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import '../../../../../styles/Home.module.css'
import NumberFormat from 'react-number-format';
import dynamic from 'next/dynamic'

export default function Product(props) {
  const router = useRouter()
  const { id, name, page } = router.query;
  const [productqty, setQty] = useState(1);
  const [addtocartmessage, setAddToCartMessage] = useState();
  const [product, setproduct] = useState();
  const [operation, setoperation] = useState();
  const [productvariantid, setproductvariantid] = useState();
  const [costtype, setcosttype] = useState()
  const [variantdetals, setvariantdetails] = useState();
  const [Logintoken, setToken] = useState()
  const [silksliderlimit, setsilksliderlimit] = useState();
  const [nav1, setNav1] = useState(null)
  const [nav2, setNav2] = useState(null)
  let slider1 = []
  let slider2 = []
  // For add to cart product/variant
  const addToCart = (e) => {
    setoperation('cart');
    let a = e.currentTarget.parentNode.parentNode.parentNode.querySelector('.form-select').value;
    const formData = { product_id: id, variant_id: productvariantid, token: Logintoken, quantity: productqty, is_autoship: a === 'AutoShip' ? true : false };
    api.addToCart(formData).then(res => {
      setoperation('');
      toast.success(res.data.message, {
        duration: 5
      })
      props?.setshowminicart(Math.floor(Math.random() * 100))

    })
  }
  // for add product to wishlist
  const addToWishList = (e) => {
    setoperation('wishlist');
    const formData = { product_id: id, variant_id: productvariantid, token: Logintoken, quantity: productqty };
    api.addToWishlist(formData).then(res => {
      if (res?.data?.code === 1) {
        props?.setupdatecartdata(true)
        setoperation('showpopup');
      }
      setAddToCartMessage(res?.data?.message)
    })
  }
  // slider-loading
  useEffect(() => {
    setNav1(slider1)
    setNav2(slider2)
    const token = localStorage.getItem('Token') ? localStorage.getItem('Token') : null;
    setToken(token)
    {
      id ?
        api.getProductByproductid(id).then(res => {
          setvariantdetails(res?.data?.products?.variants);
          setproduct(res?.data)
        })
        : ''
    }
  }, [id])

  // After seleting variant this will be called
  const switchVarient = (e) => {
    if (e.target.value !== 'Select varient') {
      setproductvariantid(e.target.value)
      api.getProductByvariantid(e.target.value).then(res => {
        setproduct(res?.data)
        setsilksliderlimit(Object.keys(res?.data?.products?.product_variant_images).length)
      })
    }
    else {
      api.getProductByproductid(id).then(res => {
        setvariantdetails(res?.data?.products?.variants);
        setproduct(res?.data)
        setproductvariantid()
      })
    }
  }
  return (<>
    <Layout>
      <Head>
        <title>{name}</title>

      </Head>
      <div className="product-sec-cstm">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h4 className="title"> </h4>
              <div className="Images_product">
                <div>
                  <div className="product-slider">
                    <Slider
                      asNavFor={nav2}
                      ref={slider => (slider1 = slider)}
                    >
                      {
                        product?.products?.product_images?.map((productDataimage, index) => (
                          <div>
                            <h3><img src={`${process.env.API_URL}/${productDataimage['image']}`} /></h3>
                          </div>
                        ))
                      }
                      {productvariantid !== undefined &&
                        product?.products?.product_variant_images?.map((productDataimage, index) => (
                          <div>
                            <h3><img src={`${process.env.API_URL}/${productDataimage['image']}`} /></h3>
                          </div>
                        ))
                      }
                    </Slider>
                  </div>
                  <div className="thumb-slider">
                    <Slider
                      asNavFor={nav1}
                      ref={slider => (slider2 = slider)}
                      slidesToShow={silksliderlimit >= 3 ? 3 : 1}
                      swipeToSlide={true}
                      focusOnSelect={true}
                    >
                      {
                        product?.products?.product_images?.map((productDataimage, index) => (
                          <div>
                            <h3><img src={`${process.env.API_URL}/${productDataimage['image']}`} /></h3>
                          </div>
                        ))
                      }
                      {productvariantid !== undefined &&
                        product?.products?.product_variant_images?.map((productDataimage, index) => (
                          <div>
                            <h3><img src={`${process.env.API_URL}/${productDataimage['image']}`} /></h3>
                          </div>
                        ))
                      }
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="Product_details">
                {product?.products?.name &&
                  <div>
                    <h1 className="title">{product?.product_name} {product?.products?.name}</h1>
                    <h3 className="title">{product?.products?.description}</h3>
                    {product?.products?.name && product?.products?.has_variants !== 'True' &&
                      <>
                        {costtype === 'AutoShip' ?
                          <div className="price"><b>Price</b>: <NumberFormat value={parseFloat(product?.products.autoship_cost_price).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} /></div>
                          :
                          <div className="title product-page-peice"> <b>Price:</b>   <NumberFormat value={parseFloat(product?.is_autoship_user === "True" ? product?.products.autoship_cost_price : product?.products.cost_price).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} /></div>
                        }

                        <div className="main-qty-sec">
                          <div className="box">
                            <div className="select">
                              <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onChange={(e) => { setcosttype(e.target.value) }}>
                                <option value="Normal" >Single</option>
                                {/* <option value="AutoShip" selected={product?.is_autoship_user === "True" ? true : false}>AutoShip</option> */}
                                <option value="AutoShip" >AutoShip</option>

                              </select>
                            </div>
                          </div>
                          <div className="box">
                            <span>Quantity:</span>
                            <div id="qty">
                              <button type="button" id="sub" className="sub" onClick={(e) => { setQty(productqty > 1 ? productqty - 1 : productqty) }}>-</button>
                              <input type="text" value={productqty} name="qty" onChange={(e) => { setQty(e.target.value) }} min="1" max={product?.products?.quantity} readOnly />
                              <button type="button" id="add" className="add" onClick={(e) => { setQty(productqty + 1) }}>+</button>
                            </div>
                          </div>
                        </div>
                      </>
                    }
                  </div>
                }

                {operation === 'showpopup' && <Popups message={addtocartmessage} />}
                {productvariantid || variantdetals?.length <= 0 ?
                  <>
                    {productvariantid !== undefined &&
                      <div className="select-variant-dropdown">
                        <p>Select Varient</p>
                        <div className="select">
                          <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onChange={(e) => { switchVarient(e) }}>
                            <option value="Select varient">Select varient</option>
                            {variantdetals?.map((productvariants, index) => {
                              return (<>
                                <option value={productvariants?.id} selected={productvariantid === productvariants?.id}>{productvariants?.name}</option>
                              </>)
                            })
                            }
                          </select>
                        </div>
                      </div>
                    }
                    <div className={`btn-sec Add_to_cart ${product?.products?.is_stock_available === 'True' ? '' : 'out-of-stock'}`} >
                      <div className="Add_to_cart"><button disabled={product?.products?.is_stock_available === 'True' ? false : true} type="button" id={product?.products?.id} onClick={(e) => addToCart(e)}>
                        {product?.products?.is_stock_available === 'True' ? 'Add To Cart' : 'Sold Out'}
                      </button></div>
                    </div>
                    {props.isLogin === true &&
                      <div className='btn-sec' >

                        <div className="Add_to_wishList"><button type="button" id={product?.products?.id} onClick={(e) => addToWishList(e)}>Add To WishList</button></div>
                      </div>
                    }
                  </>
                  : <div className="select-variant-dropdown">
                    <p>Select Varient</p>
                    <div className="select">
                      <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onChange={(e) => { switchVarient(e) }}>
                        <option value="Select varient">Select varient</option>
                        {variantdetals?.map((productvariants, index) => {
                          return (<>
                            <option value={productvariants?.id} selected={productvariantid === productvariants?.id}>{productvariants?.name}</option>
                          </>)
                        })
                        }
                      </select>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>

  </>

  )
}
