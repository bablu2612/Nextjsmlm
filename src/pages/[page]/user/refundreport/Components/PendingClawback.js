import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import api from '../../../../../api/Apis'
const PendingClawback = ({pendingrefundreport}) => {

    const [offset, setOffset] = useState(0);
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0)
    const [pendingdata,setpendingData]=useState()

useEffect(() => {
    
       
    const token = localStorage.getItem('Token') ? localStorage.getItem('Token') : '';
        api.GetRefundReport(token).then(res => {
            if(res?.data?.code===1)
            {
                if(+res?.data?.refund_data.length > 0)
                {
                    const slice = res?.data?.pending_clawbacks?.slice(offset, offset + perPage)
                    setPageCount(Math.ceil(res?.data?.pending_clawbacks?.length / perPage))
                    setpendingData(slice)
                }
                else{
                }
              
            }
            
            
        })
  
},[offset])


const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * perPage;
    setOffset(offset)
};
    return (
        <div className="pending-report-section">
        <div className="pendingclawback">
            <h3 className="title">Pending Refunds</h3>
            <br />
            <div className="row heading-pending-report">
                <div className="col-md-4 order-id">
                    Order ID
                            </div>
                <div className="col-md-4 amount-heading">
                    Amount
                            </div>
                <div className="col-md-4 status-heading">
                    Status
                            </div>

            </div>
            {pendingdata !== undefined &&
                pendingdata?.map((pendingreport, index) => {
                    return (
                        <>
                            <div className="row dynamic-data">
                                <div className="col-md-4 dynamic-ord">
                                    ORD{pendingreport?.order}
                                </div>
                                <div className="col-md-4 dynamic-amount">

                                    $ {pendingreport?.clawback_amount}

                                </div>
                                <div className="col-md-4 dynamic-status">

                                    {pendingreport?.status}

                                </div>

                            </div>
                        </>
                    )
                })
            }
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
    )
}

export default PendingClawback;