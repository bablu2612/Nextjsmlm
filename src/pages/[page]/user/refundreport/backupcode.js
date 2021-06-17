import Head from "next/head";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Leftnav from "../../../../Components/Leftnav";
import api from '../../../../api/Apis'
import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import DateRangePicker from '@material-ui/lab/DateRangePicker';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import Box from '@material-ui/core/Box';
import MobileDateRangePicker from '@material-ui/lab/MobileDateRangePicker';
import Moment from 'moment';
import ReactPaginate from 'react-paginate';
import NumberFormat from 'react-number-format';



const Commission = () => {
    const [refundreport, setrefundreport] = useState()
    const [LoginToken, setLoginToken] = useState()
    const { register, handleSubmit, errors } = useForm();
    const [value, setValue] = useState([null, null]);
    const [iscustomdate, IsCustomdate] = useState(false)
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState();
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0)

    useEffect(() => {
        const token = localStorage.getItem('Token') ? localStorage.getItem('Token') : '';
        setLoginToken(token)
        api.GetCommissionReport(token).then(res => {

            const slice = res?.data?.commissions_data?.slice(offset, offset + perPage)
            setPageCount(Math.ceil(res?.data?.commissions_data?.length / perPage))
            setrefundreport(slice)

            // setrefundreport(res?.data)

        })
    }, [offset]);

    const onSubmit = data => {
        let daterange = convert(value);
        daterange = daterange.split(" - ");
        const from_date = Moment(daterange[0]).format('YYYY-MM-DD');
        const til_date = Moment(daterange[1]).format('YYYY-MM-DD');
        data.from_date = from_date
        data.til_date = til_date

        
        console.log('daterange in correct format', data)
        api.GetCommissionsFilter(data, LoginToken).then(res => {
            const slice = res?.data?.commissions_data?.slice(offset, offset + perPage)
            setPageCount(Math.ceil(res?.data?.commissions_data?.length / perPage))
            setrefundreport(slice)
        })

    }

    const convert = dateRange =>
        dateRange.map(date => new Intl.DateTimeFormat('en-US').format(new Date(date)))
            .join(" - ")


    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * perPage;
        setOffset(offset)
    };
    return (<>
        <Head>
            <title>Commission</title>
        </Head>
        <div className="mainorder-detail-sec">
            <div className="container">
                <div className="row">
                    <Leftnav />
                    <div className="col-md-9 dashboard-main">
                        <h3 className="title">Commission page</h3>
                        <form className="signupform main-sign-frm" onSubmit={handleSubmit(onSubmit)}>
                            <div className="row Custom_filter">
                                <div className="date_range_filter">
                                    Date Range: <input type="radio"
                                        ref={register({
                                            required: true,
                                        })}
                                        onClick={() => {
                                            IsCustomdate(false)
                                        }}
                                        name="filter_by_date" value="week" /> This Week
                                      <input
                                        ref={register({
                                            required: true,
                                        })}
                                        onClick={() => {
                                            IsCustomdate(false)
                                        }}
                                        type="radio" name="filter_by_date" value="month" /> This Month
                                      <input
                                        ref={register({
                                            required: true,
                                        })}
                                        type="radio" name="filter_by_date" value="custom"
                                        onClick={() => {
                                            IsCustomdate(true)
                                        }}
                                    /> Custom Date
                            </div>
                                {iscustomdate === true &&
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <MobileDateRangePicker
                                            startText="from"
                                            endText="end"
                                            value={value}
                                            maxDate={new Date()}
                                            onChange={(newValue, value) => {
                                                setValue(newValue);
                                                console.log('value', value)

                                            }}
                                            renderInput={(startProps, endProps) => (
                                                <React.Fragment>
                                                    <TextField {...startProps} variant="standard"

                                                    />
                                                    <Box sx={{ mx: 2 }}> to </Box>
                                                    <TextField {...endProps} variant="standard" />
                                                </React.Fragment>
                                            )}
                                        />
                                    </LocalizationProvider>
                                }
                            </div>
                            <div className="order_id_filter">
                                Order Id :<input type="text" name="order_id"
                                    ref={register({
                                        required: false,
                                    })}
                                />
                            </div>
                            <div className="Status">
                                Status :
                              <select
                                    ref={register({
                                        required: false,
                                    })}
                                    name="status"
                                    className="form-select form-select-lg mb-3"
                                    aria-label=".form-select-lg example"
                                >
                                    <option value="All" >All</option>
                                    <option value="Pending" >Pending</option>
                                    <option value="Paid" >Paid</option>
                                </select>
                            </div>

                            <div className="get_commision">
                                <button type="submit">Get Refunds</button>

                            </div>
                        </form>

                        <div className="row">
                            <div className="col-md-2">
                                Refunds ID
                            </div>
                            <div className="col-md-2">
                                Date        
                            </div>
                            <div className="col-md-2">
                                Order ID
                            </div>
                            <div className="col-md-2">
                                Product Name
                            </div>
                            <div className="col-md-2">
                                Amount
                            </div>
                            <div className="col-md-2">
                                Status
                            </div>
                        </div>
                        {refundreport?.map((refunddata, index) => {
                            return (<>
                                <div className="row">
                                    <div className="col-md-2">
                                        {refunddata?.created_at}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-2">
                                        {
                                            refunddata?.user_name
                                        }
                                    </div>
                                    <div className="col-md-1">
                                        ORD{refunddata?.for_order}
                                    </div>
                                    {
                                        refunddata?.user_commission_detail.map((refunddata, index1) => {
                                            return (
                                                <>
                                                    {index1 !== 0 && <>
                                                        <div className="col-md-2">
                                                        </div>
                                                        <div className="col-md-1">
                                                        </div>
                                                    </>}

                                                    <div className="col-md-2">
                                                        {refunddata?.product?.name}
                                                    </div>
                                                    <div className="col-md-2">
                                                        {/* {refunddata?.price_per_unit} */}
                                                        <NumberFormat
                                                            value={parseFloat(+refunddata?.price_per_unit * +refunddata?.product_quantity).toFixed(2)}
                                                            displayType={'text'} thousandSeparator={true} prefix={'$'}
                                                            renderText={value => <div> {value} </div>} />

                                                    </div>
                                                   
                                                    <div className="col-md-1">
                                                        {refunddata?.is_approved === false ?
                                                            'Pending' : 'Paid'
                                                        }
                                                    </div>
                                                </>
                                            )
                                        })
                                    }

                                </div>
                            </>)

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
            </div>
        </div>
    </>)
}

export default Commission;