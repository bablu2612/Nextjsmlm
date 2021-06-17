import Head from "next/head"
import { useEffect, useState } from "react";
import api from '../../../api/Apis'
import ReactPaginate from 'react-paginate';
import { useRouter } from "next/router";
import Link from "next/link";
import Leftnav from "../../../Components/Leftnav";
import { FaEye } from "react-icons/fa";
import { toast } from 'react-toastify';
import NProgress from 'nprogress'
import RefundOrder from "./Components/orders/RefundOrder";
import Reorder from "./Components/orders/Reorder";
import ViewOrderDetails from "./Components/orders/ViewOrderDetails";
import moment from "moment"
import HoverEye from "./Components/orders/hovercomponent";


const Order = () => {

    const [orderData, setOrderData] = useState()
    const [logintoken, setlogintoken] = useState()
    const [reload, setreload] = useState(false)
    const [orderid, setorderid] = useState()
    const [show, setShowreorder] = useState(false)
    const [showdetailsorder, setshowdetailsorder] = useState(false)

    //for pagenation
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState();
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0)

    useEffect(() => {
        const token = localStorage.getItem('Token') ? localStorage.getItem('Token') : '';
        setlogintoken(token)
        api.getUserOrder(token).then(res => {
            if (res?.data?.code === 1) {
                const slice = res?.data?.orders?.slice(offset, offset + perPage)
                setPageCount(Math.ceil(res?.data?.orders?.length / perPage))
                setOrderData(slice)
            }

        })
    }, [offset, reload, orderid]);
    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * perPage;
        setOffset(offset)
    };

    const router = useRouter()

    const Refund = (id) => {
        setorderid(id)

    }

    const Showreorder = (id) => {
        setShowreorder(true)
        setorderid(id)

    }

    return (<>
        <Head>
            <title>Order-list</title>
        </Head>
        <div className="mainorder-detail-sec">

            <div className="container">
                <div className="row">
                    <Leftnav />
                    <div className="col-md-9">
                        {showdetailsorder === true ?
                            <ViewOrderDetails orderid={orderid} setorderid={setorderid} setshowdetailsorder={setshowdetailsorder} />
                            :
                            show === true ?
                                <Reorder orderid={orderid} setShowreorder={setShowreorder} setorderid={setorderid} />
                                :
                                orderid !== undefined ?
                                    <RefundOrder orderid={orderid} setorderid={setorderid} />

                                    :

                                    <div className="container order-detail-page">
                                        {/* {console.log('here gorrect place')} */}
                                        <h3 className="title">Orders History</h3>
                                        {/* <div className="row">
                                            <div className="col-md-2 pro-name">order id</div>
                                            <div className="col-md-2 pro-name">order Date</div>
                                            <div className="col-md-2 pro-name">Status</div>
                                            <div className="col-md-6 pro-name text-center">Action</div>
                                        </div> */}
                                        <div className="order_table">
                                            <table className="commission-table">
                                                <thead>
                                                    <th>
                                                        Order Id
                                                 </th>
                                                    <th>
                                                        Order Date
                                                 </th>
                                                    <th>
                                                        Status
                                                  </th>
                                                    <th>
                                                        Actions
                                              </th>


                                                </thead>

                                                <tbody>

                                                    {orderData && orderData?.map((order_user, index) => {
                                                        return (
                                                            <tr>
                                                                <td>#{order_user?.id}</td>
                                                                <td>{moment(order_user?.created_at).format('MM/DD/YYYY')}</td>
                                                                <td>{order_user?.status}</td>
                                                                <td className="action-btn">

                                                                    <div className="title12"

                                                                        onClick={(e) => {


                                                                            setorderid(order_user?.id)

                                                                            setshowdetailsorder(true);
                                                                        }}
                                                                    >
                                                                        <HoverEye
                                                                            data="View order details"
                                                                            setorderid={() => { setorderid(order_user?.id) }}
                                                                            setshowdetailsorder={() => { setshowdetailsorder(true) }}
                                                                        />
                                                                    </div>




                                                                    {order_user?.status === 'completed' ?
                                                                        <>
                                                                            <button onClick={() => { Refund(order_user?.id) }}>Refund</button>
                                                                            {order_user?.is_autoship === "False" ?

                                                                                <button onClick={() => { Showreorder(order_user?.id) }}>Reorder</button>
                                                                                :
                                                                                <button className="disable">Reorder</button>
                                                                            }
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <button className="disable">Refund</button>

                                                                            {order_user?.is_autoship === "False" ?

                                                                                <button onClick={() => { Showreorder(order_user?.id) }}>Reorder</button>
                                                                                :
                                                                                <button className="disable">Reorder</button>
                                                                            }

                                                                        </>
                                                                    }
                                                                </td>

                                                            </tr>
                                                        )
                                                    })}

                                                </tbody>
                                            </table>
                                        </div>
                                        <ReactPaginate
                                            previousLabel={"prev"}
                                            nextLabel={"next"}
                                            breakLabel={"..."}
                                            breakClassName={"break-me"}
                                            pageCount={pageCount}
                                            marginPagesDisplayed={10}
                                            pageRangeDisplayed={10}
                                            onPageChange={handlePageClick}
                                            containerClassName={"pagination"}
                                            subContainerClassName={"pages pagination"}
                                            activeClassName={"active"} />
                                    </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default Order;