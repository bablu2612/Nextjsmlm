import Link from 'next/link';
import { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import ReactPaginate from 'react-paginate';
import api from '../../../../../api/Apis';

const Commission =() => {
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState();
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0)
    const [commissionData, setcommissionData] = useState()
    const [commissionDataError, setcommissionDataError] = useState()

    
    useEffect(() => {
        const token = localStorage.getItem('Token') ? localStorage.getItem('Token') : '';
        // api.GetCommissionReport(token, 'week').then(res => {
            // api.GetCommissionsApproved(token, 'week').then(res => {
                api.GetDashboardCommissions('week', token).then(res => {
                    if(res?.data?.code===1)
                    {
                        const slice = res?.data?.commissions_data?.slice(offset, offset + perPage)
                        setPageCount(Math.ceil(res?.data?.commissions_data?.length / perPage))
                        setcommissionData(slice)
                    }
                    if (+res?.data?.commissions_data?.length === 0) {
                        setcommissionDataError("No data found!")
                    }
                   })
       
    }, [offset]);

    let oldDate = '';

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * perPage;
        setOffset(offset)
    };
    return (
        <>
            <div className="dashboard-commsion-header">
                <div className="left-data-dashboard">
                    This Week's Commissions
            </div>
                <div className="right-data-dashboard">
                    <Link href={`/us/user/commissions`}>
                   <a> View All</a>
                   </Link>
            </div>
            </div>
            <div className ="headingData">
                Commissions for this week
            </div>
            <div className="comistion-table-data">
            <table className="commission-table">
                <thead>
                    <th>
                        Name
                            </th>
                    <th>
                        Order Info
                            </th>
                    <th>
                        Product Info
                            </th>
                    <th>
                        Price
                            </th>
                    <th>
                        Bonusable Volume
                            </th>
                            <th>
                        Commission
                            </th>
                    <th>
                        Status
                            </th>
                   
                </thead>
                <tbody>
                    {commissionDataError && <tr className="title_error"><td  colSpan="7" className="error-commision">{commissionDataError}</td></tr>}
                    {commissionData?.map((comision, index) => {


                        return (<>
                            {oldDate !== comision?.created_at &&
                                <tr className="date">
                                    <td>{comision?.created_at}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                   
                                </tr>
                            }
                            <tr>
                                <td >
                                    {
                                        comision?.for_order?.user?.first_name
                                    }
                                </td>
                                <td >
                                    ORD{comision?.for_order?.id}
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>


                            {/* {
                                oldDate =  +index > 0 ? comision?.created_at : ''
                                    
                        } */}
                            {

                                comision?.user_commission_detail.map((comisionprd, index1) => {
                                    oldDate = comision?.created_at;
                                    return (
                                        <>
                                            <tr>
                                                {/* {index1 !== 0 && <>
                                                <td></td>

                                                <td></td>

                                            </>} */}
                                                <td></td>

                                                <td></td>
                                                <td>
                                                    {comisionprd?.product?.name}
                                                </td>
                                                <td >
                                                    {/* {comisionprd?.price_per_unit} */}
                                                    <NumberFormat
                                                        value={parseFloat(+comisionprd?.price_per_unit * +comisionprd?.product_quantity).toFixed(2)}
                                                        displayType={'text'} thousandSeparator={true} prefix={'$'}
                                                        renderText={value => <div> {value} </div>} />

                                                </td>
                                                <td >
                                                    {/* {comisionprd?.product_bonus_value} */}
                                                    <NumberFormat
                                                        value={parseFloat(comisionprd?.product_bonus_value).toFixed(2)}
                                                        displayType={'text'} thousandSeparator={true} prefix={'$'}
                                                        renderText={value => <div> BV {value} </div>} />
                                                </td>
                                                <td >
                                                    {/* {comisionprd?.commission} */}
                                                    <NumberFormat
                                                        value={parseFloat(+comisionprd?.commission).toFixed(2)}
                                                        displayType={'text'} thousandSeparator={true} prefix={'$'}
                                                        renderText={value => <div> {value} </div>} />-
                                                         <NumberFormat
                                                        value={parseFloat(15).toFixed(2)}
                                                        displayType={'text'} thousandSeparator={true} prefix={''}
                                                        renderText={value => <div> {value} % </div>} />
                                                </td>
                                                <td>Pending</td>
                                            </tr>
                                        </>
                                    )
                                })

                            }




                        </>)


                    })

                    }
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
        </>
    )

}
export default Commission;