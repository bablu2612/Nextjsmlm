import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import icon from '../../public/favicon.ico'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Link from 'next/link';
import { useRouter } from 'next/router';
import api from '../api/Apis'
import { useEffect, useState } from 'react';
import '../../styles/Home.module.css'

export default function Index() {
  const route = useRouter();
  const store = "us";
  const [homePageData, sethomePageData] = useState();
  useEffect(() => {
    api.getBanners(store).then(res => {
      sethomePageData(res?.data)
    })
  }, []);
  return (<>
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <link rel="icon" href={icon} />
      </Head>
      {/* <h1>{homePageData.error && homePageData.error}</h1> */}
        <div className="banner-sec" style={{ backgroundImage: "url(https://commandconcept-qa.csdevhub.com//media/stores/2021/05/17/imgpsh_fullsize_anim.png)" }}>
        
                 
          <div className="custom-container">
            <div className="row">
              <div className="col-md-4">
                <div className="banner-left-content">
                  <p><span>live</span><span>live</span><span>live</span></p>
                 

                </div>
              </div>
              <div className="col-md-4">
                <div className="banner-img">
                  {homePageData?.banners && homePageData.banners?.map((bannerData, index) => {
                    return (
                      <div className="home-crousal" key={index}>
                        <img src={`${process.env.API_URL}${bannerData.banner_image}`} />
                      </div>
                    );
                  })
                  }
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="banner-right-content">
                  <h3>Full Spectram & THC-Free</h3>
                  <p>ProMED CBD's Advanced Farming System (AFS)
                  provides the very best CBD products to consumers. EVERY product can be traced back to the exact location on our farm through laser etched LOT/BATCH numbers. </p>
                  <div className="btns">
                    <a className="btn" href="#" >About Us</a>
                    <a className="btn" href="#" >About Us </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="product_cat home-pro-main">
          <div className="container">
          
            {homePageData?.message && homePageData.message}
            {homePageData?.categories && homePageData?.categories.map((categorieData, index) => {
              return (<>
                <div className="row">
                  <div className="col-md-6" key={index}>
                  <Link href={`${store}/product/productcategories/${categorieData.name}/${categorieData.id}`}>
                        <a>{categorieData.name}</a>
                      </Link>
                    <p>Category description</p>
                  </div>
                  <div className="col-md-6" key={index + 20}>
                    <div className="img" ><img src={`${process.env.API_URL}${categorieData.background_image}`} />
                    </div>
                  </div>
                </div>
              </>)
            })
            }

          </div>
        </div>
    </div>
  </>)
}
