import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from 'next/image'
import img from '../Images/logo.jpg'
import { useRouter } from "next/router";
import { route } from "next/dist/next-server/server/router";
import Login from "../pages/[page]/login";
import Modal from '@material-ui/core/Modal';
import Signup from "../pages/[page]/signup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NextNProgress from 'nextjs-progressbar'
import Head from "next/head";
import NumberFormat from 'react-number-format';
import { FaShoppingCart, FaHeart, FaUser, FaSignOutAlt, FaBell } from "react-icons/fa";
import api from '../api/Apis'
const NavBar = props => {
    const [usernotifications, setUsernotification] = useState()
    useEffect(() => {
        const token = localStorage.getItem('Token') ? localStorage.getItem('Token') : '';
        api.GetUserNotifications(token).then(res => {
            setUsernotification(res?.data?.notifications)
        })
    }, [])
    const router = useRouter();
    const store = (router?.query?.page) ? router?.query?.page : 'us'

    const showlogin = () => {
        props.setoldpath(router.asPath)
        router.push(`/us/login`)
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary" key={1}  >
            <div className="custom-container" >
                {/* <NextNProgress
                    color="#29D"
                    startPosition="0.3"
                    stopDelayMs="200"
                    height="3"
                    options={{ easing: 'ease', speed: 500 }}
                /> */}
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                {/* Same as */}
                <div className="logo-img">
                    <Link className="nav-link" exact href="/">
                        <a>


                            MLM</a>
                    </Link>
                </div>
                <div className="collapse navbar-collapse header-menu">
                    <ul className="navbar-nav mr-auto" onClick={() => { props?.updatecartdata(true) }} >
                        <li className="nav-item" >
                            <Link className="nav-link" exact href="/" >
                                <a >Home</a>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" exact href={`/${store}/allProduct`}>
                                <a>All Products</a>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" exact href={`/${store}/cart/viewCart`}>
                                <a>
                                    <div className="icon-box">
                                        <FaShoppingCart />
                                        {props?.counts?.products?.length > 0 &&
                                            <span>{props?.counts?.products?.length > 0 ? props?.counts?.products?.length : 0}</span>

                                        }
                                        {/* <span>{props?.counts?.products?.length > 0 ? props?.counts?.products?.length : 0}</span> */}

                                        {/* {props?.counts?.products?.length > 0 && `<span>${props?.counts?.products?.length}</span>`} */}


                                    </div>
                                </a>
                            </Link>
                            <ul className="dropdown-menu">
                                {props?.counts?.products?.map((productdata, index) => {
                                    return (<>
                                        {productdata?.variant === null ?
                                            <>
                                                <li className="nav-item" key={index}>
                                                    <div className="cart-image">
                                                        {productdata?.product?.product_images[0]?.image && <img src={`${process.env.API_URL}${productdata.product?.product_images[0]?.image}`} />}
                                                    </div>
                                                    <div className="txt" key={index + 1}>
                                                        {productdata?.product.name} <br /> Qty:{productdata?.quantity} <br />

                                                        <NumberFormat value={parseFloat(props?.counts?.is_autoship_user === 'True' ? productdata?.product?.autoship_cost_price * productdata?.quantity : productdata?.product?.cost_price * productdata?.quantity).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} />
                                                    </div>
                                                </li>
                                            </>
                                            :
                                            <>
                                                <li className="nav-item">
                                                    <div className="cart-image">
                                                        {productdata?.product?.product_images[0]?.image && <img src={`${process.env.API_URL}${productdata.product?.product_images[0]?.image}`} />}
                                                    </div>
                                                    <div className="txt" key={index + 1}>
                                                        {productdata?.product.name}- {productdata?.variant?.name} <br /> Qty:{productdata?.quantity} <br />

                                                        {/* {productdata?.variant?.cost_price * productdata?.quantity} */}
                                                        <NumberFormat value={parseFloat(props?.counts?.is_autoship_user === 'True' ? productdata?.variant?.autoship_cost_price * productdata?.quantity : productdata?.variant?.cost_price * productdata?.quantity).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} />
                                                    </div>
                                                </li>
                                            </>
                                        }
                                    </>)
                                })}
                                <li className="btn-li">
                                    <Link className="nav-link" exact href={`/${store}/cart/viewCart`}>
                                        <a className="btn">View cart</a>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        {props.isLogin === true &&
                            <li className="nav-item">
                                <Link className="nav-link" exact href={`/${store}/wishlist/wishlist`}>
                                    <a>
                                        <div className="icon-box">
                                            <FaHeart />

                                            {props?.counts?.wishlist?.length > 0 &&
                                                <span>{props?.counts?.wishlist?.length > 0 ? props?.counts?.wishlist?.length : 0}</span>

                                            }

                                            {/* <span>{props?.counts?.wishlist?.length > 0 ? props?.counts?.wishlist?.length : 0}</span> */}
                                        </div>
                                    </a>
                                </Link>
                                <ul className="dropdown-menu">
                                    {props?.counts?.wishlist?.map((productdata, index) => {
                                        return (<>
                                            {productdata?.variant === null ?
                                                <>
                                                    <li className="nav-item" key={index}>
                                                        <div className="cart-image">
                                                            {productdata?.product?.product_images[0]?.image && <img src={`${process.env.API_URL}${productdata.product?.product_images[0]?.image}`} />}
                                                        </div>
                                                        <div className="txt" key={index + 1}>
                                                            {productdata?.product.name} <br /> Qty:{productdata?.product?.quantity} <br />

                                                            <NumberFormat value={parseFloat(props?.counts?.is_autoship_user === 'True' ? productdata?.product?.autoship_cost_price * productdata?.quantity : productdata?.product?.cost_price * productdata?.quantity).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} />
                                                        </div>
                                                    </li>
                                                </>
                                                :
                                                <>
                                                    <li className="nav-item">
                                                        <div className="cart-image">
                                                            {productdata?.variant?.product_variant_images[0]?.image && <img src={`${process.env.API_URL}${productdata.product?.product_images[0]?.image}`} />}
                                                        </div>
                                                        <div className="txt" key={index + 1}>
                                                            {productdata?.product.name}- {productdata?.variant?.name} <br /> Qty:{productdata?.variant?.quantity} <br />

                                                            {/* {productdata?.variant?.cost_price * productdata?.quantity} */}
                                                            <NumberFormat value={parseFloat(props?.counts?.is_autoship_user === 'True' ? productdata?.variant?.autoship_cost_price * productdata?.quantity : productdata?.variant?.cost_price * productdata?.quantity).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} />
                                                        </div>
                                                    </li>
                                                </>
                                            }
                                        </>)
                                    })}
                                    <li className="btn-li">
                                        <Link className="nav-link" exact href={`/${store}/wishlist/wishlist`}>
                                            <a className="btn">View Wishlist</a>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        }
                        <div>
                        </div>
                        {props.isLogin === true ?
                            <>
                                <li className="nav-item">
                                    <div className="locals">
                                        <div className="howar">
                                            <span>
                                                <Link className="nav-link" exact href={`/${store}/user/dashboard`}>
                                                    <a><FaUser /></a>
                                                </Link>
                                            </span>
                                        </div>
                                    </div>
                                </li>
                                <li className="bell_dropdowon dropdown notifications-menu">
                                    <div className="icon-box">
                                        <FaBell />

                                        {usernotifications?.length > 0 &&
                                            <span className="count label label-warning" id="quick-notifications-menu">{usernotifications?.length > 0 ? usernotifications?.length : 0}</span>

                                        }
                                        {/* <span className="count label label-warning" id="quick-notifications-menu">{usernotifications?.length > 0 ? usernotifications?.length : 0}</span> */}
                                    </div>
                                    <ul className="dropdown-menu cart-notification">
                                        {usernotifications?.map((notification, index) => {
                                            return (<>
                                                {notification?.table_name === "Order" ?
                                                    <li key={index} className="nav-item" onClick={() => {
                                                        router.push({
                                                            pathname: `/${store}/user/autoshiporder`,
                                                            query: { orderid: notification?.instance_id },
                                                        })
                                                    }}>
                                                        {notification?.action_performed}
                                                    </li>
                                                    :
                                                    <li>
                                                        {notification?.action_performed}
                                                    </li>
                                                }
                                            </>)
                                        })}

                                    </ul>
                                </li>
                                <li className="nav-item sing-out">
                                    <FaSignOutAlt onClick={props.handleLogout} />
                                </li>
                            </>
                            :
                            <li className="nav-item">
                                <input type="button" value="Login" onClick={showlogin} />
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}
export default NavBar;