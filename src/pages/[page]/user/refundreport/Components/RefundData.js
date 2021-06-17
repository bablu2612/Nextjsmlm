import NumberFormat from "react-number-format";
import moment from "moment"

const RefundData = ({refundreportError,refundreport})=>{
console.log('refundreport',refundreport)
    return(
        <div className="refund-report-data">
                        <table className="commission-table">
                            <thead>
                                <th>
                                    Refund Id
                            </th>
                                <th>
                                    Date
                                   
                            </th>
                                <th>
                                   Order Id
                            </th>
                                <th>
                                    Product Name
                            </th>
                                <th>
                                    Amount
                            </th>
                                <th>
                                    Status
                                    
                            </th>
                             
                            </thead>
                            <tbody>

                                {/* { refundreportError !== '' ? <tr className="title_error"><td className="error-commision">{refundreportError}</td></tr> : */}
                                            {refundreportError ? <tr className="title_error"><td  colSpan="6" className="error-commision">{refundreportError}</td></tr>:

                                refundreport?.map((comision, index) => {
                    return (<>

                    
                        <tr>
                            <td >
                                RF{comision?.order_refund_id}
                            </td>
                            <td>{moment(comision?.created_at).format('MM/DD/YYYY')}</td>
                           
                           
                            <td>ORD{comision?.order_id}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                       

                            {
                                comision?.user_clawback_details.map((comisionprd, index1) => {
                                    return (
                                        <>
                                         <tr>
                                            
                                            <td></td>

                                            <td></td>
                                            <td></td>
                                            <td>
                                                {comisionprd?.product?.name}
                                            </td>
                                            <td >
                                                <NumberFormat
                                                    value={parseFloat(+comisionprd?.clawback_amount).toFixed(2)}
                                                    displayType={'text'} thousandSeparator={true} prefix={'$'}
                                                    renderText={value => <div> {value} </div>} />

                                            </td>
                                          <td>
                                              {comisionprd?.status}

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
                        </div>
    )
}

export default RefundData;