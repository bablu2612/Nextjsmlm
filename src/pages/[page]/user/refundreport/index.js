import Head from "next/head";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Leftnav from "../../../../Components/Leftnav";

import * as React from 'react';

import Moment from 'moment';
import ReactPaginate from 'react-paginate';
import NumberFormat from 'react-number-format';
import PendingClawback from "./Components/PendingClawback";
import moment from "moment"
import RefundFilterForm from "./Components/RefundFilterForm";
import RefundData from "./Components/RefundData";
import api from "../../../../api/Apis";

const RefundReport = () => {
    const [refundreport, setrefundreport] = useState()
    const [refundreportError, setrefundreportError] = useState('')
    const [pendingrefundreport, Setpendingrefundreport] = useState()

    const [LoginToken, setLoginToken] = useState()
    const { register, handleSubmit, errors } = useForm();
    const [value, setValue] = useState([null, null]);
    const [iscustomdate, IsCustomdate] = useState('month')


    const [offset, setOffset] = useState(0);
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0)


    useEffect(() => {
        const token = localStorage.getItem('Token') ? localStorage.getItem('Token') : '';
        setLoginToken(token)
        api.GetRefundReport(token).then(res => {
            if (res?.data?.code === 1) {
                if (+res?.data?.refund_data.length > 0) {
                    const slice = res?.data?.refund_data?.slice(offset, offset + perPage)
                    setPageCount(Math.ceil(res?.data?.refund_data?.length / perPage))
                    setrefundreport(slice)
                    Setpendingrefundreport(res?.data?.pending_clawbacks)
                }
                else {
                    setrefundreportError('Data Not Found')
                }

            }


        })

    }, [offset]);

    const onSubmit = data => {

        if (iscustomdate === 'custom') {
            let daterange = convert(value);
            daterange = daterange.split(" - ");
            const from_date = Moment(daterange[0]).format('YYYY-MM-DD');
            const til_date = Moment(daterange[1]).format('YYYY-MM-DD');
            data.from_date = from_date
            data.til_date = til_date
        }


        api.GetRefundReportFilter(data, LoginToken).then(res => {
            const slice = res?.data?.refund_data?.slice(offset, offset + perPage)
            setPageCount(Math.ceil(res?.data?.refund_data?.length / perPage))
            setrefundreport(slice)
            Setpendingrefundreport(res?.data?.pending_clawbacks)
            if(res?.data?.refund_data?.length >=0)
            {
                setrefundreportError('')
            }
            
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
            <title>refund report</title>
        </Head>
        <div className="mainorder-detail-sec refund-report section">
            <div className="container">
                <div className="row">
                    <Leftnav />
                    <div className="col-md-9 dashboard-main">

                        <RefundFilterForm
                            register={register}
                            handleSubmit={handleSubmit}
                            IsCustomdate={IsCustomdate}
                            iscustomdate={iscustomdate}
                            value={value}
                            setValue={setValue}
                            onSubmit={onSubmit}
                        />

                        <RefundData
                            refundreportError={refundreportError}

                            refundreport={refundreport}
                        />
{refundreportError=== undefined &&

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
                       



                        {/* <PendingClawback pendingrefundreport={pendingrefundreport} /> */}

                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default RefundReport;