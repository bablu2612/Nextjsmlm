import NumberFormat from 'react-number-format';
import ReactPaginate from 'react-paginate';
import moment from "moment"

const FormData = ({ commissionData, commissionDataError,handlePageClick, pageCount }) => {
    let oldDate = ''
    return (
        <><table className="commission-table">
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
                                <td> {moment(comision?.created_at).format('MM/DD/YYYY')}</td>
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
                                    // comision?.user_name
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
                                oldDate =  comision?.created_at ;
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
                                                    value={parseFloat(comision?.commission_percentage).toFixed(2)}
                                                    displayType={'text'} thousandSeparator={true} prefix={''}
                                                    renderText={value => <div> {value} % </div>} />
                                            </td>
                                       
                                            <td >
                                                {comisionprd?.is_approved === false ?
                                                    'Pending' : 'Paid'
                                                }
                                            </td>
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
        {commissionDataError === undefined &&

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
        }
        </>
    )
}
export default FormData;