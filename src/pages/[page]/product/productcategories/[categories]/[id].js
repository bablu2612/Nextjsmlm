
import Head from 'next/head'
import Layout from '../../../../../Components/Layout'
import { useRouter } from 'next/router'
import Link from 'next/link';
import { route } from 'next/dist/next-server/server/router';
import { useEffect, useState } from 'react';
import api from '../../../../../api/Apis'
import styles from '../../../../../../styles/Home.module.css'
import ReactPaginate from 'react-paginate';
import ProductListCategory from '../Components/ProductListCategory';
import { toast } from 'react-toastify';
import NumberFormat from 'react-number-format';
import cookieCutter from 'cookie-cutter'
import Minicart from '../../../cart/Minicart';

export default function AllProduct(props) {
  const router = useRouter()
  const { id, categories, page } = router.query;
  const [searchData, setserchData] = useState('');
  const [Logintoken, setToken] = useState()
  const [productqty, setQty] = useState(1);
  const [allcategory, setallcategory] = useState()
  const [costtype, setcosttype] = useState({data:[{id: '', value: ''}]})
  const[isauroshipuser,setauroshipuser] = useState()
  // for pagenation
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(6);
  const [pageCount, setPageCount] = useState(0)
  useEffect(() => {
    {
      const token = localStorage.getItem('Token') ? localStorage.getItem('Token') : null;
      setToken(token)
      id &&
        api.getProductByCategories(id).then(res => {
          const slice = res?.data?.products?.slice(offset, offset + perPage)
          setPageCount(Math.ceil(res?.data?.products?.length / perPage))
          setData(slice)
          setauroshipuser(res?.data?.is_autoship_user)
        })
      // get all category
      api.getAllCategory(page).then(res => {
        setallcategory(res?.data?.categories)
      })

    }
  }, [id, offset]);
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * perPage;
    setOffset(offset)
  };
  //for filter data
  const fetchData = async () => {
    const req = await fetch(`${process.env.getproductsbycategory}?category_id=${router?.query?.id ? router.query.id : 'us'}&search=${searchData}`);
    const productData = await req.json();
    const slice = productData.products?.slice(offset, offset + perPage)
    setPageCount(Math.ceil(productData.products?.length / perPage))
    setData(slice)
  };
  const handleClick = (event) => {
    event.preventDefault();
    fetchData();
  };
// seraching data 
  const setSearchData = (e) => {
    setserchData(e.target.value);

  }
// Add to cart
  const addToCart = (e) => {
    let a = e.currentTarget.parentNode.parentNode.parentNode.querySelector('.form-select').value;
    const formData = { product_id: e.target.id, variant_id: null, token: Logintoken, quantity: productqty ,is_autoship:a==='AutoShip'?true:false };
    api.addToCart(formData).then(res => {
      if (res?.data?.code === 0) {
        toast.error(res.data.message, {
            duration: 5
        })
    }
    else {
        toast.success(res.data.message, {
            duration: 5
        })
        props?.setshowminicart(Math.floor(Math.random() * 100))
    }
    })
  }



const Add=(e)=>{
  let a = e.currentTarget.parentNode.querySelector('.get').value;
  let max = e.currentTarget.parentNode.querySelector('.get').max;
  if(+(max)>0 && +(a)<+(max))
  {
  e.currentTarget.parentNode.querySelector('.get').value=+(a)+1;
  setQty(+(a) + 1)

  }
  }
  const Sub=(e)=>{
    let a = e.currentTarget.parentNode.querySelector('.get').value;
    if(a>1)
    {
    e.currentTarget.parentNode.querySelector('.get').value=+(a)-1;
                setQty(+(a) + 1)
    }
  }
  return (
    <div className={styles.container}>
    <Head>
        <title>{categories}</title>
    </Head>    
    <main className={styles.main}>
        <hr />
        <div className="product_cat">
               <ProductListCategory isauroshipuser={isauroshipuser} Add={Add} Sub={Sub} data={data} addToCart={addToCart}  setcosttype={setcosttype} costtype={costtype} allcategory={allcategory}  categories={categories} setSearchData={setSearchData} searchData={searchData} handleClick={handleClick} />
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
        </div>
    </main>
</div>
   
  )
}



