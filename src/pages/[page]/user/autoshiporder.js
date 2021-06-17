import Head from "next/head"
import { useEffect, useRef, useState } from "react";
import api from '../../../api/Apis'
import ReactPaginate from 'react-paginate';
import { useRouter } from "next/router";
import Link from "next/link";
import Leftnav from "../../../Components/Leftnav";
import AutoShipOrderDetails from "./Components/Autoship/AutoShipOrderDetails";
import Moment from 'react-moment';
import { moment } from 'moment';
import { toast } from 'react-toastify';
import { FaTrash, FaEdit } from "react-icons/fa";
// import moment from "moment"


const AutoShipOrder = () => {
    const [orderData, setOrderData] = useState()
    //for pagenation
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState();
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0)
    const [showdetails, setshowdetails] = useState()
    const [Logintoken, setLogintoken] = useState()
    const router = useRouter()

    // load autohip page data
    useEffect(() => {
        const token = localStorage.getItem('Token') ? localStorage.getItem('Token') : '';
        setLogintoken(token)
        if (router?.query?.orderid) {
            setshowdetails(router?.query?.orderid)
        }
        api.AutoshipOrderHistory(token).then(res => {
            if (res?.data?.code === 1) {
                const slice = res?.data?.orders?.slice(offset, offset + perPage)
                setPageCount(Math.ceil(res?.data?.orders?.length / perPage))
                setOrderData(slice)
            }
        })
    }, [offset, router?.query?.orderid]);
    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * perPage;
        setOffset(offset)
    };
    // Skip order
    const skiporder = (id) => {
        const formDataD = { order_id: id };
        api.AutoshipSkip(formDataD, Logintoken).then(res => {
            if (res?.data?.code === 1) {
                toast.success('Order skip successfully', {
                    duration: 1
                })

                api.AutoshipOrderHistory(Logintoken).then(res => {
                    if (res?.data?.code === 1) {
                        const slice = res?.data?.orders?.slice(offset, offset + perPage)
                        setPageCount(Math.ceil(res?.data?.orders?.length / perPage))
                        setOrderData(slice)
                    }
                })
            }
        })
    }
    // Delete order
    const deleteorder = (id) => {
        const formDataD = { order_id: id };
        api.AutoshipDelete(formDataD, Logintoken).then(res => {
            if (res?.data?.code === 1) {
                toast.success('Order deleted successfully', {
                    duration: 1
                })
            }
            api.AutoshipOrderHistory(Logintoken).then(res => {
                if (res?.data?.code === 1) {
                    const slice = res?.data?.orders?.slice(offset, offset + perPage)
                    setPageCount(Math.ceil(res?.data?.orders?.length / perPage))
                    setOrderData(slice)
                }
            })
        })
    }
    return (<>
        <Head>
            <title>auto-ship-order</title>
        </Head>
        <div className="mainorder-detail-sec">
            <div className="container">
                <div className="row">
                    <Leftnav />
                    {showdetails !== undefined ?
                        <AutoShipOrderDetails showdetails={showdetails} setshowdetails={setshowdetails} />
                        :
                        <div className="col-md-9">
                            <div className="container order-detail-page">
                                <h3 className="title">AutoShip Orders</h3>
                                {/* <div className="row">
                                    <div className="col-md-2 pro-name">Order id</div>
                                    <div className="col-md-2 pro-name">Order Date</div>
                                    <div className="col-md-2 pro-name">Upcoming date</div>
                                    <div className="col-md-2 pro-name action-text">Action</div>
                                </div> */}




                                <div className="auto-ship-order-table">
                                    <table className="commission-table">
                                        <thead>
                                            <th>
                                                Order Id
                                                 </th>
                                            <th>
                                                Order Date
                                                 </th>
                                            <th>
                                                Upcoming Date
                                                  </th>
                                            <th>
                                                Actions
                                              </th>


                                        </thead>

                                        <tbody>

                                            {orderData && orderData?.map((order_user, index) => {
                                                const moment = require('moment')
                                                let startDate = moment(moment().toDate());
                                                let endDate = moment(order_user?.next_shipping_date);
                                                // Function call 
                                                let datePending = Math.abs(endDate.diff(startDate, 'days'))
                                                return (
                                                    <tr>
                                                        <td>#{order_user?.order?.id}</td>
                                                        {/* <td>{order_user?.created_at}</td> */}
                                                        <td>{moment(order_user?.created_att).format('MM/DD/YYYY')}</td>
                                                        <td>{moment(order_user?.next_shipping_date).format('MM/DD/YYYY')}</td>

                                                        {/* <td>{order_user?.next_shipping_date}</td> */}
                                                        <td className="autoship-action">
                                                            <FaEdit onClick={() => { setshowdetails(order_user?.order?.id) }} />
                                                            {datePending < 5 ?

                                                                <button>skip</button>

                                                                :

                                                                <button onClick={() => { skiporder(order_user?.order?.id) }}>skip</button>

                                                            }

                                                            <FaTrash onClick={() => { deleteorder(order_user?.order?.id) }} />

                                                        </td>

                                                    </tr>
                                                )
                                            })}

                                        </tbody>
                                    </table>
                                </div>

                                {/* {orderData && orderData?.map((order_user, index) => {
                                    const moment = require('moment')
                                    let startDate = moment(moment().toDate());
                                    let endDate = moment(order_user?.next_shipping_date);
                                    // Function call 
                                    let datePending = Math.abs(endDate.diff(startDate, 'days'))
                                    return (
                                        <div className="row">
                                            <div className="col-md-2">#{order_user?.order?.id}</div>
                                            <div className="col-md-2">{order_user?.created_at}</div>
                                            <div className="col-md-2">{order_user?.next_shipping_date}</div>
                                            <div className="col-md-2 edit">
                                                <FaEdit onClick={() => { setshowdetails(order_user?.order?.id) }} />
                                            </div>
                                            {datePending < 5 ?
                                                <div className="col-md-2 skip-false">
                                                    <button>skip</button>
                                                </div>
                                                :
                                                <div className="col-md-2 skip-true">
                                                    <button onClick={() => { skiporder(order_user?.order?.id) }}>skip</button>
                                                </div>
                                            }
                                            <div className="col-md-2 delete-autoship-order">
                                                <FaTrash onClick={() => { deleteorder(order_user?.order?.id) }} />
                                            </div>
                                        </div>
                                    )
                                })} */}

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
                        </div>
                    }

                </div>
            </div>
        </div>
    </>)
}
export default AutoShipOrder;