import Link from "next/link";

const LeftCategorySection=({setSearchData,searchData,allcategory,router,handleClick})=>{

    return(
        <div className="col-md-3">
        <div className="left-side">
            <div className="search">
                <input type="text" placeholder="Search.." name="search" value={searchData} onChange={(e) => setSearchData(e)} />
                <button onClick={handleClick}>Search</button>
            </div>
            <ul>
                <li className={router?.query?.categories ? '' : 'active'}>
                    <Link href={`/${router?.query?.page}/allProduct`}>
                        <a>All Products</a>
                    </Link>
                </li>
                {allcategory?.map((category, index) => {
                    return (
                        <li className={`${router?.query?.categories === category?.name && 'active'}`} key={index}>
                            <Link href={`/${router?.query?.page}/product/productcategories/${category?.name}/${category?.id}`}>
                                <a> {category?.name}</a>
                            </Link>
                        </li>
                    )
                })
                }


            </ul>
        </div>
    </div>
    )
}

export default LeftCategorySection;
