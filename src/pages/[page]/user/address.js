import Head from "next/head";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import Leftnav from "../../../Components/Leftnav";
import ReactPaginate from 'react-paginate';
import { FaTrash, FaPlus, FaEdit } from "react-icons/fa";

import api from '../../../api/Apis'
import AddressData from "./Components/Address/Address";
const UserAddress = () => {
    const [addressData, setaddressData] = useState();
    const [showaddress, Setshowaddress] = useState(false);
    const [addressDetails, setaddressDetails] = useState();
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState();
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0)
    const [logintoken, setToken] = useState();
    useEffect(() => {
        const token = localStorage.getItem('Token') ? localStorage.getItem('Token') : '';
        setToken(token)
        api.manageAddress(token).then(res => {
            if (res?.data?.code === 1) {
                const slice = res?.data?.addresses?.slice(offset, offset + perPage)
                setPageCount(Math.ceil(res?.data?.addresses?.length / perPage))
                setaddressData(slice)
            }
        })
    }, [offset]);
    // delete address
    const DeleteAddress = (e) => {
        const id = e.currentTarget.parentNode.value;
        const formDataD = { address_id: id };
        api.DeleteAddress(formDataD, logintoken).then(res => {
            api.manageAddress(logintoken).then(res => {
                if (res?.data?.code === 1) {
                    toast.success('address deleted successfully', {
                        duration: 1
                    })
                    setaddressData(res?.data?.addresses)
                    if (+localStorage.getItem('billingAddress') || +localStorage.getItem('shipAddress') == +id) {
                        localStorage.removeItem('billingAddress')
                        localStorage.removeItem('shipAddress')
                    }
                }
            })
        })
    }
    // onclick edit address this will be call
    const EditAddress = (id) => {

        const formData = { address_id: +id, token: logintoken };
        api.getAddressDetails(formData).then(res => {
            console.log(res.data)
            setaddressDetails(res?.data?.orders)
            Setshowaddress(true)
        })
    }
    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * perPage;
        setOffset(offset)
    };

    return (
        <div className="inner-div">
            <div className="mainorder-detail-sec">
                <div className="container">
                    <Head>
                        <title>Address list</title>
                    </Head>
                    <div className="row addres-page">
                        <Leftnav />
                        <div className="col-md-9">
                            {showaddress === true ?
                                <AddressData addressDetails={addressDetails} setaddressDetails={setaddressDetails} Setshowaddress={Setshowaddress} setaddressData={setaddressData} logintoken={logintoken} />
                                :
                                <>
                                    <h3 className="title">Addresses List</h3>
                                    <div className="row">
                                        < div className="button-top"><button className="add-address" onClick={() => { Setshowaddress(true) }}>Add <FaPlus /></button></div></div>
                                    <div className="container order-detail-page">
                                        <div className="add-address-sec">
                                            <div className="row">
                                                <div className="col-md-8 pro-name">
                                                    Addresses
                                            </div>
                                                <div className="col-md-4 pro-name">
                                                    Actions
                                            </div>
                                            </div>
                                        </div>
                                        {
                                            addressData?.map((address, index) => {
                                                return (
                                                    <>
                                                        <div className="row">
                                                            <div className="col-md-8">
                                                                <div className="" key={index}>
                                                                    <div className="checkout-addrees">
                                                                        <h5 className="tittle">
                                                                            {address?.first_name + " " + address?.last_name + ", " + addressData?.email + ", " + address?.street_address_1 + " " + address?.street_address_2 + ", " + address?.company_name + ", " + address?.city + ", " + address?.country + ", " + address?.phone_number + ", " + address?.postal_code}
                                                                        </h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <div className="button-parrt">
                                                                    <button type="button" value={address?.id} className="btn btn-primary">
                                                                        <FaTrash onClick={(e) => { DeleteAddress(e) }} />

                                                                    </button>
                                                                    <FaEdit onClick={(e) => { EditAddress(address?.id) }} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            })
                                        }
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
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserAddress