import '../../styles/Home.module.css'
import styles from '../../styles/Home.module.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from '../Components/NavBar'
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router'
import Footer from '../Components/Footer';
import { Header } from '../Components/Header';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import '../../styles/globals.css'
import api from '../api/Apis'
import Head from 'next/head';
import { toast } from 'react-toastify';
import NumberFormat from 'react-number-format';
import cookieCutter from 'cookie-cutter'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Login from '../pages/[page]/login'
import { route } from 'next/dist/next-server/server/router';
import Minicart from './[page]/cart/Minicart';
import Router from 'next/router';

function MyApp({ Component, pageProps }) {
  const wrapperRef = useRef(null);
  const [isLogin, setisLogin] = useState();
  const [isLogout, setisLogout] = useState();
  const [oldpath, setoldpath] = useState();
  const [counts, setcounts] = useState()
  const [updatecartdata, setupdatecartdata] = useState(false)
  var randomstring = require("randomstring");
  const router = useRouter()
  const [showminicart, setshowminicart] = useState(false)
  const [showloader, setshowloader] = useState(true)

  // check current path and valiadte 

  if (router.pathname === '/[page]/login') {
    if (isLogin === true) {
      if (oldpath === '/') {
        router.push('/')
      }
      else {
        router.back()
      }

    }
  }
  if (router.pathname === '/[page]/signup') {
    if (isLogin === true) {
      router.back()
    }
  }

  // on click logout
  const handleLogout = e => {
    e.preventDefault();
    api.getAllCartProduct(isLogin).then(res => {
      setcounts(res?.data)

    })
    setisLogout(true);
  }
  useEffect(() => {
    {
      setisLogin(localStorage.getItem('Login') ? JSON.parse(localStorage.getItem('Login')) : false);



      const formdata = localStorage.getItem('Token') ? localStorage.getItem('Token') : '';

      if (formdata === '') {
        if (cookieCutter.get('sessionkey')?.length !== 16) {
          cookieCutter.set('sessionkey', randomstring.generate(16))

        }
      }

      isLogout == true &&
        api.logoutApi(formdata).then(res => {
          localStorage.removeItem('Token');
          localStorage.removeItem('address_id');

          setisLogin(false);
          localStorage.setItem('Login', false);

          setisLogout(false);
          router.push(`/`);


        })

      updatecartdata === true &&
        api.getAllCartProduct(formdata).then(res => {
          setcounts(res?.data)
          setupdatecartdata(false)

        })


      // formdata !== '' && isLogin===true && 
      // api.LoginCheck(formdata).then(res => {
      //  if(res?.data?.code === 0)
      //  {

      //    setisLogin(false) 
      //   //  setoldpath(router?.asPath)
      //     router.push(`/us/login`)


      //  }

      // })
    }

  }, [isLogout, updatecartdata]);

  Router.onRouteChangeStart = () => {
    setshowloader(true)

  };

  Router.onRouteChangeComplete = () => {
    setshowloader(false)

  };

  Router.onRouteChangeError = () => {
    setshowloader(true)

  };

  return (<>
    <NavBar setoldpath={setoldpath} handleLogout={handleLogout} isLogin={isLogin} setisLogin={setisLogin} counts={counts} updatecartdata={setupdatecartdata} />
    <Component setcounts={setcounts} setshowminicart={setshowminicart} setoldpath={setoldpath} oldpath={oldpath} setisLogin={setisLogin} isLogin={isLogin} {...pageProps} setupdatecartdata={setupdatecartdata} />
    <Minicart setcounts={setcounts} showminicart={showminicart} showminicart={showminicart} setshowminicart={setshowminicart} counts={counts} />
    <Footer showloader={showloader} />
  </>)
}

export default MyApp
