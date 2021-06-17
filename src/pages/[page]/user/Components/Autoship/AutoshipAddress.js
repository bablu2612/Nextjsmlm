import api from '../../../../../api/Apis';
const AutoshipAddress = ({ showaddresslist, getautoshiporder, addressdata, setshowdetails, alladdressData,showdetails,Logintoken,setshowaddressform }) => {
    // save billing address
    const saveShippingAddress = (id) => {
        const update_data = { 
            order_id: +showdetails,
            billing_address_id: +addressdata?.billing_address?.id,
            shipping_address_id: id
        }
        api.AddressUpdate(update_data, Logintoken).then(res => {
            if(res?.data?.code===1)
            {
                getautoshiporder()
                showaddresslist()
            }
        })
    }
    // save shipping address
    const saveBillingAddress = (id) => {
        const update_data = {
            order_id: +showdetails,
            billing_address_id: +id,
            shipping_address_id: +addressdata?.shipping_address?.id,
        }
        api.AddressUpdate(update_data, Logintoken).then(res => {
            if(res?.data?.code===1)
            {
                getautoshiporder()
                showaddresslist()
            }
        })

    }
    return (
        <>
            <div className="row order-cstm">
                <div className="col-md-6">
                    <div className="thn-lft raido-addres-sel">
                        <h4>Billing Address</h4>
                        {alladdressData?.addresses?.length > 0 ?
                            alladdressData?.addresses?.map((address, index) => {
                                return (
                                    <>
                                        <div className="radio-bnt" key={index}>
                                            {+addressdata?.billing_address?.id === +address?.id ?
                                                <input type="radio" name="addressBilling" value={address?.id} checked={+addressdata?.billing_address?.id === +address?.id} onClick={(e) => {
                                                    // saveShippingAddress(e.target.value)
                                                }} />
                                                :
                                                <input type="radio" name="addressBilling" value={address?.id} onClick={(e) => {
                                                    saveBillingAddress(+e.target.value)

                                                }} />
                                            }


                                            <div className="checkout-addrees">
                                                <h5 className="tittle">
                                                    {address?.first_name + " " + address?.last_name + ", " + address?.street_address_1 + " " + address?.street_address_2 + ", " + address?.company_name + ", " + address?.city + ", " + address?.country}
                                                </h5>
                                            </div>

                                        </div>
                                    </>
                                )
                            })


                            :
                            <>
                                <div> {addressdata?.billing_address?.first_name}</div><div>{addressdata?.billing_address?.last_name}</div><div>
                                    {addressdata?.billing_address?.company_name}</div><div>{addressdata?.billing_address?.state}</div><div>{addressdata?.billing_address?.country} </div>
                            </>
                        }
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="thn-lft thn-rgt raido-addres-sel">
                        <h4>Shipping Address</h4>
                        {alladdressData?.addresses?.length > 0 ?
                            alladdressData?.addresses?.map((address, index) => {
                                return (
                                    <>
                                        <div className="radio-bnt" key={index}>
                                            {+addressdata?.shipping_address?.id === address?.id ?
                                                <input type="radio" name="addressShip" value={address?.id} checked={+addressdata?.shipping_address?.id === +address?.id} onClick={(e) => {
                                                    // saveShippingAddress(e.target.value)
                                                }} />
                                                :
                                                <input type="radio" name="addressShip" value={address?.id} onClick={(e) => {
                                                    saveShippingAddress(+e.target.value)
                                                }} />
                                            }
                                            <div className="checkout-addrees">
                                                <h5 className="tittle">
                                                    {address?.first_name + " " + address?.last_name + ", " + address?.street_address_1 + " " + address?.street_address_2 + ", " + address?.company_name + ", " + address?.city + ", " + address?.country}
                                                </h5>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                            :
                            <>
                                <div> {addressdata?.shipping_address?.first_name}</div><div>{addressdata?.shipping_address?.last_name}</div><div>
                                    {addressdata?.shipping_address?.company_name}</div><div>{addressdata?.shipping_address?.state}</div><div>{addressdata?.shipping_address?.country} </div></>
                        }
                    </div>
                </div> 
                <div className="changeadress-button">
                <button className="back-button" onClick={() => { showaddresslist() }}>Change address</button>
                <button className="back-button" onClick={() => { setshowaddressform(true) }}>Add New</button>                
            </div>
                {/* <div className="backbutton">
                    <button className="back-button" onClick={() => { setshowdetails() }}>Back</button>
                </div> */}
            </div>
        </>
    )
}
export default AutoshipAddress;