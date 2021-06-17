
import Head from 'next/head'
import styles from '../../../styles/Home.module.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import icon from '../../../public/favicon.ico'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '../../api/Apis'
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import ProductListCategory from './product/productcategories/Components/ProductListCategory';
import NumberFormat from 'react-number-format';
import Cart from './cart/viewCart';
import Minicart from './cart/Minicart';

export default function allProduct(props) {
    const route = useRouter();
    const store = route.query.page;
    const [searchData, setserchData] = useState('');
    const [productqty, setQty] = useState(1);
    const [Logintoken, setToken] = useState()
    const [allcategory, setallcategory] = useState()
    const [costtype, setcosttype] = useState({ data: [{ id: '', value: '' }] })
    const[isauroshipuser,setauroshipuser] = useState()
    //for pagenation
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState();
    const [perPage] = useState(9);
    const [pageCount, setPageCount] = useState(0)
    console.log(store)
    useEffect(() => {
        const token = localStorage.getItem('Token') ? localStorage.getItem('Token') : null;
        setToken(token)
        {
            store &&
                api.getAllProduct(store).then(res => {
                    const slice = res?.data?.products?.slice(offset, offset + perPage)
                    setPageCount(Math.ceil(res?.data?.products?.length / perPage))
                    setData(slice)
                    setauroshipuser(res?.data?.is_autoship_user)
                })
                store &&
            api.getAllCategory(store).then(res => {
                setallcategory(res?.data?.categories)
            })
        }
    }, [store, offset,route.query.page]);
// change
    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * perPage;
        setOffset(offset)
    };
    // for search
    const fetchData = async () => {
        const req = await fetch(`${process.env.getAllProduct}?slug=${route?.query?.page ? route.query.page : 'us'}&search=${searchData}`);
        const productData = await req.json();
        const slice = productData.products?.slice(offset, offset + perPage)
        setPageCount(Math.ceil(productData.products?.length / perPage))
        setData(slice)
    };

    const handleClick = (event) => {
        event.preventDefault();
        fetchData();
    };
// search data in list of all product
    const setSearchData = (e) => {
        setserchData(e.target.value);
    }
    // for add to cart
    const addToCart = (e) => {
        let autoship = e.currentTarget.parentNode.parentNode.parentNode.querySelector('.form-select').value;
        const formData = { product_id: e.target.id, variant_id: null, token: Logintoken, quantity: productqty,is_autoship:autoship==='AutoShip'?true:false };
        api.addToCart(formData).then(res => {
            if (res?.data?.code === 0) {
                toast.error(res.data.message, {duration: 5})
                setQty(1)
            }
            else {
                props?.setshowminicart(Math.floor(Math.random() * 100))
                toast.success(res.data.message, {duration: 5})
                setQty(1)
            }
        })
    }

// increasse product qty of product
    const Add = (e) => {
        let a = e.currentTarget.parentNode.querySelector('.get').value;
        let max = e.currentTarget.parentNode.querySelector('.get').max;
        if (+(max) > 0 && +(a) < +(max)) {
            e.currentTarget.parentNode.querySelector('.get').value = +(a) + 1;
            setQty(+(a) + 1)
        }
    }
    // decrease product qty
    const Sub = (e) => {
        let a = e.currentTarget.parentNode.querySelector('.get').value;
        if (a > 1) {
            e.currentTarget.parentNode.querySelector('.get').value = +(a) - 1;
            setQty(+(a) - 1)

        }
    }
    return (<>
        <div className={styles.container}>
            <Head>
                <title>All Products</title>
            </Head>
            <main className={styles.main}>
                <div className="product_cat">
                    <ProductListCategory isauroshipuser={isauroshipuser} data={data} Add={Add} Sub={Sub} addToCart={addToCart}  setcosttype={setcosttype} costtype={costtype} allcategory={allcategory} categories="All Products" setSearchData={setSearchData} searchData={searchData} handleClick={handleClick} />
                    {data?.length > 0 &&
                        <ReactPaginate
                            previousLabel={"prev"}
                            nextLabel={"next"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"} />
                    }
                </div>
            </main>
        </div>

    </>)
}
