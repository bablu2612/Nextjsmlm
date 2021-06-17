import Link from "next/link";
import { useRouter } from "next/router";
import NumberFormat from 'react-number-format';
import LeftCategorySection from './LeftCategorySection'
const ProductListCategory = ({ isauroshipuser, data, addToCart, setcosttype, costtype, allcategory, categories, searchData, setSearchData, handleClick, Add, Sub }) => {
    const router = useRouter()
    return (<>
        <div className="container">
            <div className="row">
               
<LeftCategorySection categories={categories} setSearchData={setSearchData} searchData={searchData} allcategory={allcategory} router={router} handleClick={handleClick} />


                <div className="col-md-9">
                    <div className="right-side">
                        <h3 key={1}>{categories}</h3>
                        <h4>{data?.length === 0 || data === undefined && 'No product Found'}</h4>
                        <div className="cst-categorie-sec">
                            <div className="row">
                                {data && data?.map((productsData, index) => {
                                    const objIndex = costtype?.data?.findIndex((obj => +(obj.id) == +(productsData.id)));
                                    let cost;
                                    cost = objIndex === -1 ?
                                        productsData?.cost_price
                                        :
                                        objIndex ?
                                            costtype.data[objIndex].value === 'Normal'
                                                ?
                                                productsData?.cost_price
                                                :
                                                costtype.data[objIndex].value === 'AutoShip' ?
                                                    productsData.autoship_cost_price : ""
                                            :
                                            productsData.cost_price

                                        isauroshipuser == "True" ?
                                        cost = productsData.autoship_cost_price
                                        :
                                        ""

                                    // if (objIndex === -1) {
                                    //     cost = productsData?.cost_price;

                                    // }
                                    // else if (objIndex) {

                                    //     if (costtype.data[objIndex].value === 'Normal') {

                                    //         cost = productsData?.cost_price;

                                    //     }
                                    //     else if (costtype.data[objIndex].value === 'AutoShip') {

                                    //         cost = productsData.autoship_cost_price;

                                    //     }

                                    // }
                                    // else {
                                    //     cost = productsData.cost_price;

                                    // }
                                    // if(isauroshipuser == "True")
                                    // {
                                    //     cost = productsData.autoship_cost_price;

                                    // }

                                    return (<>
                                        <div className="col-md-4" key={index}>
                                            <div className="categories">
                                                <div>
                                                    <Link href={`/${router.query.page}/product/${productsData.name}/${productsData.id}`}>
                                                        <a> <img src={`${process.env.API_URL}/${productsData?.product_images[0]?.image}`} /></a>
                                                    </Link>
                                                    <Link href={`/${router.query.page}/product/${productsData.name}/${productsData.id}`}>
                                                        <a> <h1 className="title"> {productsData.name}</h1></a>
                                                    </Link>
                                                    {productsData?.has_variants === 'False' && <>
                                                        <div className="title pro-price"> <b>Price:</b>
                                                            <NumberFormat value={parseFloat(cost).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} />
                                                        </div>

                                                        <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
                                                            onChange={(e) => {
                                                                const found = costtype.data.some(el => el.id === productsData?.id);
                                                                if (!found) {
                                                                    setcosttype({ ...costtype, data: [...costtype.data, { "id": productsData?.id, "value": e.target.value }] })
                                                                }
                                                                else {
                                                                    const objIndex = costtype.data.findIndex((obj => obj.id == productsData?.id));
                                                                    costtype.data.splice(objIndex, 1);
                                                                    setcosttype({ ...costtype, data: [...costtype.data, { "id": productsData?.id, "value": e.target.value }] })
                                                                }
                                                            }}
                                                        >
                                                            <option value="Normal" >Single</option>
                                                            <option value="AutoShip" >AutoShip</option>
                                                            {/* <option value="AutoShip" selected={isauroshipuser !== "False" ? true : false}>AutoShip</option> */}
                                                        </select>
                                                    </>}
                                                    <div className="add-cart">
                                                        {productsData?.has_variants === 'False' ? <>
                                                            <div className="main-qty-sec">
                                                                <div className="box">
                                                                    <div id="qty">
                                                                        <button type="button" name={`${productsData?.id},${null}`} id={productsData?.id} className="sub" value={productsData?.quantity} onClick={(e) => { Sub(e) }}>-</button>
                                                                        <input
                                                                            name={`${productsData?.id},${null}`}
                                                                            type="text"
                                                                            className="get"
                                                                            defaultValue={1}

                                                                            list={productsData?.quantity}
                                                                            max={productsData?.quantity}
                                                                            readOnly
                                                                        />
                                                                        <button type="button" name={`${productsData?.id},${null}`} id={productsData?.id} className="add" value={productsData?.quantity} onClick={(e) => { Add(e) }}>+</button>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className={`Add_to_cart ${productsData?.is_stock_available === 'True' ? 'abc' : 'out-of-stock'}`}>
                                                                <button disabled={productsData.is_stock_available === 'True' ? false : true} type="button" id={productsData.id} onClick={(e) => addToCart(e)}>
                                                                    {productsData?.is_stock_available === 'True' ? 'Add To Cart' : 'Sold Out'}
                                                                </button>
                                                            </div>
                                                        </>
                                                            :
                                                            <div className="variant_exist">
                                                                <Link href={`/${router.query.page}/product/${productsData.name}/${productsData.id}`}>
                                                                    <a> <h1 className="title">view details</h1></a>
                                                                </Link>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>)
                                })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default ProductListCategory;