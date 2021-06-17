const RefundHistory = ({ refundHistoryData, data }) => {
    // console.log(data)
    return (
        <>
            <div className="container">
                <div className="Cart_product order-detail-sec">

                    {data?.status === "refund raised" ? <>
                        <h4 className="tittle">Order Refund History</h4>
                        <div className="row">
                            <div className="col-md-8"><div className="pro-name">Refund Status</div></div>
                            <div className="col-md-4"><div className="pro-name">Result</div></div>
                        </div></>
                        :
                        data?.status === "refund approved" ? <>
                            <h4 className="tittle">Order Refund History</h4>
                            <div className="row">
                                <div className="col-md-3"><div className="pro-name">Refund Status</div></div>
                                <div className="col-md-3"><div className="pro-name">Result</div></div>
                                <div className="col-md-3"><div className="pro-name">Refunded Amount</div></div>
                                <div className="col-md-3"><div className="pro-name">Refund Date </div></div>
                            </div></>
                            :
                            data?.status === "refund declined" ? <>
                                <h4 className="tittle">Order Refund History</h4>
                                <div className="row">
                                    <div className="col-md-3"><div className="pro-name">Refund Status</div></div>
                                    <div className="col-md-3"><div className="pro-name">Result</div></div>
                                    <div className="col-md-3"><div className="pro-name">Declined Reason</div></div>
                                    <div className="col-md-3"><div className="pro-name">Refund Date </div></div>
                                </div></>
                                :
                                ''
                    }
                    {refundHistoryData?.map(refundOrderData => {
                        console.log(refundOrderData?.decline_reason)
                        if (refundOrderData?.refund_status === "pending") {
                            return (
                                <>

                                    <div className="row">
                                        <div className="col-md-8">
                                            Refund Status for Product ID {refundOrderData?.id}
                                        </div>
                                        <div className="col-md-4">
                                            {refundOrderData?.refund_status}
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        else if (refundOrderData?.refund_status === "decline") {
                            return (
                                <>
                                    <div className="row">
                                        <div className="col-md-3">
                                            Refund Status for Product ID {refundOrderData?.id}
                                        </div>
                                        <div className="col-md-3">
                                            {refundOrderData?.refund_status}
                                        </div>
                                        <div className="col-md-3">
                                            {refundOrderData?.decline_reason}
                                        </div>
                                        <div className="col-md-3">
                                            {refundOrderData?.created_at.slice(0, 10)}<br />

                                        </div>
                                    </div>
                                </>
                            )
                        }
                        else if (refundOrderData?.refund_status === "full order") {
                            return (
                                <>
                                    <div className="row">
                                        <div className="col-md-3">
                                            Refund Status for Order ID {refundOrderData?.order}
                                        </div>
                                        <div className="col-md-3">
                                            {refundOrderData?.refund_status}
                                        </div>
                                        <div className="col-md-3">
                                            {refundOrderData?.refunded_amount}
                                        </div>
                                        <div className="col-md-3">
                                            {refundOrderData?.created_at.slice(0, 10)}<br />

                                        </div>
                                    </div>
                                </>
                            )
                        }

                        else if (refundOrderData?.refund_status === "full product") {
                            return (
                                <>
                                    <div className="row">
                                        <div className="col-md-3">
                                            Refund Status for Order ID {refundOrderData?.id}
                                        </div>
                                        <div className="col-md-3">
                                            {refundOrderData?.refund_status}
                                        </div>
                                        <div className="col-md-3">
                                            {refundOrderData?.refunded_amount}
                                        </div>
                                        <div className="col-md-3">
                                            {refundOrderData?.created_at.slice(0, 10)}<br />

                                        </div>
                                    </div>

                                </>
                            )
                        }

                        else if (refundOrderData?.refund_status === "partial") {
                            return (
                                <>
                                    <div className="row">
                                        <div className="col-md-3">
                                            Refund Status for Order ID {refundOrderData?.id}
                                        </div>
                                        <div className="col-md-3">
                                            {refundOrderData?.refund_status}
                                        </div>
                                        <div className="col-md-3">
                                            {refundOrderData?.refunded_amount}
                                        </div>
                                        <div className="col-md-3">
                                            {refundOrderData?.created_at.slice(0, 10)}<br />

                                        </div>
                                    </div>

                                </>
                            )
                        }
                        else if (refundOrderData?.refund_status === "full") {
                            return (
                                <>
                                    <div className="row">
                                        <div className="col-md-3">
                                            Refund Status for Order ID {refundOrderData?.id}
                                        </div>
                                        <div className="col-md-3">
                                            {refundOrderData?.refund_status}
                                        </div>
                                        <div className="col-md-3">
                                            {refundOrderData?.refunded_amount}
                                        </div>
                                        <div className="col-md-3">
                                            {refundOrderData?.created_at.slice(0, 10)}<br />

                                        </div>
                                    </div>

                                </>
                            )
                        }
                    })}
                </div>
            </div>
        </>
    )
}

export default RefundHistory;