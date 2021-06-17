import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NumberFormat from 'react-number-format';
import api from '../../../../../api/Apis';
import AutoshipProductDetails from "./AutoshipProductDetails";
import AutoshipvariantDetails from './AutoshipVariantDetails'
import faker from 'faker'
import _ from 'lodash'
import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import AutoshipAddress from "./AutoshipAddress";
import AddressData from "../Address/Address";
import AddressAutoship from "./AddressAutoship";
import { toast } from 'react-toastify';

const AutoShipOrderDetails = ({ showdetails, setshowdetails }) => {
    const router = useRouter();
    const [data, setdata] = useState()
    const [addressdata, setaddressdata] = useState()
    const [alladdressData, setalladdressData] = useState();
    const [dataall, setdataall] = useState([])
    const [showproducts, addtolistshow] = useState(false)
    const [showaddressform, setshowaddressform] = useState(false)
    const [Logintoken, setLogintoken] = useState()
    useEffect(() => {
        const token = localStorage.getItem('Token') ? localStorage.getItem('Token') : '';
        setLogintoken(token)
        setshowdetails(showdetails)
        const update_data = {
            token: token,
            order_id: +showdetails
        }
        api.AutoshipOrderbyid(update_data).then(res => {
            setdata(res?.data?.orders)
            if (res?.data?.addresses) {
                setaddressdata(res?.data?.addresses[0])
            }
        })

        api.getAllProduct('us').then(res => {
            setdataall(res?.data?.products)
        })
    }, [showdetails]);
    let total = 0;


    const Add = (e) => {
        let product_quantity = e.currentTarget.getAttribute('data-qty')
        let product_id = e.currentTarget.getAttribute('data-product_id')
        let varient_id = e.currentTarget.getAttribute('data-variant_id')
        let order_id = e.currentTarget.getAttribute('data-order_id')
        let max_qty = e.currentTarget.getAttribute('data-max_qty')

        if (product_quantity > 0 && +product_quantity < +max_qty) {
            const update_data = {
                order_id: +order_id,
                product_id: +product_id,
                variant_id: varient_id,
                quantity: +product_quantity + 1
            }
            api.AutoshipUpdate(update_data, Logintoken).then(res => {
                const update_data = {
                    token: Logintoken,
                    order_id: +showdetails
                }
                api.AutoshipOrderbyid(update_data).then(res => {
                    setdata(res?.data?.orders)

                })
            })
        }
    }
    const Sub = (e) => {
        let product_quantity = e.currentTarget.getAttribute('data-qty')
        let product_id = e.currentTarget.getAttribute('data-product_id')
        let varient_id = e.currentTarget.getAttribute('data-variant_id')
        let order_id = e.currentTarget.getAttribute('data-order_id')
        if (product_quantity > 1) {
            const update_data = {
                order_id: +order_id,
                product_id: +product_id,
                variant_id: varient_id,
                quantity: +product_quantity - 1
            }
            api.AutoshipUpdate(update_data, Logintoken).then(res => {
                const update_data = {
                    token: Logintoken,
                    order_id: +showdetails
                }
                api.AutoshipOrderbyid(update_data).then(res => {
                    setdata(res?.data?.orders)

                })

            })
        }

    }

// on select from from dropdown this method will be called
    const addtolist = (e, data) => {
        const data_add = data?.value[0]?.split(' ')
        const update_data = {
            order_id: +showdetails,
            product_id: +data_add[0],
            variant_id: +data_add[1],
            quantity: 1
        }
        api.AutoshipProductUpateproduct(update_data, Logintoken).then(res => {
            if (res?.data?.code === 1) {
                toast.success('Product added successfully', {
                    duration: 1
                })
            }
            const update_data = {
                token: Logintoken,
                order_id: +showdetails
            }
            api.AutoshipOrderbyid(update_data).then(res => {
                setdata(res?.data?.orders)
            })
            addtolistshow(false)
        })
    }

// delete from from autoship order
    const deleteautoship = (product_id, variant_id) => {
        const update_data = {
            order_id: +showdetails,
            product_id: +product_id,
            variant_id: variant_id
        }
        api.AutoshipProductDelete(update_data, Logintoken).then(res => {
            if (res?.data?.code === 1) {
                toast.success('Product removed successfully', {
                    duration: 1
                })
            }
            const update_data = {
                token: Logintoken,
                order_id: +showdetails
            }
            api.AutoshipOrderbyid(update_data).then(res => {
                setdata(res?.data?.orders)
            })

        })

    }
// display product in dropdown
    let stateOptions = []
    dataall?.map((state) => {
        if (state.variants?.length == 0) {
            stateOptions.push(
                {
                    key: state.id,
                    text: state.name,
                    value: `${state.id} ${null}`,
                    image: { avatar: true, src: `${process.env.API_URL}/${state?.product_images[0]?.image}` },
                })
        }
        else {
            state.variants.map((variantss) => {
                stateOptions.push(
                    {
                        key: variantss.id,
                        text: `${state.name} - ${variantss?.name} `,
                        value: `${state.id} ${+variantss.id}`,
                        image: { avatar: true, src: `${process.env.API_URL}/${variantss?.product_variant_images[0]?.image}` },

                    })
            })
        }
    })
    // onclik view address
    const showaddresslist = () => {
        api.manageAddress(Logintoken).then(res => {
            if (res?.data?.code === 1) {
                setalladdressData(res?.data)
            }
        })
    }
    // get autoship order by id
    const getautoshiporder = () => {
        const update_data = {
            token: Logintoken,
            order_id: +showdetails
        }
        api.AutoshipOrderbyid(update_data).then(res => {
            setdata(res?.data?.orders)
            setaddressdata(res?.data?.addresses[0])
        })
    }
    return (
        <div className="col-md-9">
            <div className="container order-detail-page">
                <div className="Cart_product order-detail-sec">
                    <h4 className="tittle">AutoShip Order Details</h4>
                    <AutoshipAddress getautoshiporder={getautoshiporder} showdetails={showdetails} Logintoken={Logintoken} showaddresslist={showaddresslist} addressdata={addressdata} setshowdetails={setshowdetails} alladdressData={alladdressData} setshowaddressform={setshowaddressform} showaddressform={showaddressform} />

                    {showaddressform === true &&
                        <AddressAutoship alladdressData={alladdressData} setalladdressData={setalladdressData} logintoken={Logintoken} showdetails={showdetails} showaddresslist={showaddresslist} setshowaddressform={setshowaddressform} getautoshiporder={getautoshiporder} />
                    }

                    <h4 className="tittle">Order Details</h4>
                    <div className="row">
                        <div className="col-md-4"><div className="pro-name">Product</div></div>
                        <div className="col-md-4"><div className="pro-name">Quantity</div></div>
                        <div className="col-md-4"><div className="pro-name">Total</div></div>
                    </div>
                    <button className="add-product-autoshiporder" onClick={() => { addtolistshow(true) }}>Add product</button>
                    {showproducts === true &&
                        stateOptions.length >= 1 &&
                        <Dropdown
                            fluid
                            multiple
                            placeholder='State'
                            search
                            selection
                            onChange={addtolist}
                            options={stateOptions}
                        />
                    }
                    {data?.autoship_order_details?.map((datas) => {
                        if (datas?.variant !== null) {
                            total = total + (+datas?.variant?.autoship_cost_price * +datas.product_quantity)
                        }
                        else {
                            total = total + (+datas?.product?.autoship_cost_price * +datas.product_quantity)
                        }
                        return (
                            <div className="row">
                                {datas?.variant !== null ?
                                    <AutoshipvariantDetails deleteautoship={deleteautoship} datas={datas} Sub={Sub} Add={Add} data={data} /> : <AutoshipProductDetails Logintoken={Logintoken}deleteautoship={deleteautoship} datas={datas} Sub={Sub} Add={Add} data={data} />
                                }
                            </div>
                        )
                    })
                    }
                    <div className="row">
                        <div className="col-md-8">
                            Subtotal:
                    </div>
                        <div className="col-md-4">
                            <NumberFormat value={parseFloat(total).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} />
                        </div>
                    </div>
                    {data?.discount_amount > 0 &&
                        <div className="row">
                            <div className="col-md-8">
                                Discount {`${data?.coupon_name !== undefined ? (data.coupon_name) : ''}`}:
                            </div>
                            <div className="col-md-4">
                                <NumberFormat value={parseFloat(data?.discount_amount).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} />
                            </div>
                        </div>
                    }
                    <div className="row">
                        <div className="col-md-8">
                            Total :
                        </div>
                        <div className="col-md-4">
                            <NumberFormat value={parseFloat(total).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="backbutton">
                <button className="back-button" onClick={() => { setshowdetails() }}>Back</button>
            </div>
        </div>
    )
}
export default AutoShipOrderDetails;

