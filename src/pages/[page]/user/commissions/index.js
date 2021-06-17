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
import Form from "./Components/Form";
import FormData from "./Components/FormData";
import GraphicalCommission from "./Components/GraphicalCommission";



const Commission = () => {
    const [LoginToken, setLoginToken] = useState()
    const { register, handleSubmit, errors } = useForm();
    const [value, setValue] = useState([null, null]);
    const [iscustomdate, IsCustomdate] = useState('month')
    const [viewtype, setViewtype] = useState('list')

    const [offset, setOffset] = useState(0);
    const [data, setData] = useState();
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0)
    const [commissionData, setcommissionData] = useState()
    const [commissionDataError, setcommissionDataError] = useState()
    const [filterdata, setfilterdata] = useState()

    useEffect(() => {
        const token = localStorage.getItem('Token') ? localStorage.getItem('Token') : '';
        setLoginToken(token)
        {filterdata === undefined && 
        api.GetCommissionReport(token, 'month').then(res => {

            const slice = res?.data?.commissions_data?.slice(offset, offset + perPage)
            setPageCount(Math.ceil(res?.data?.commissions_data?.length / perPage))
            setcommissionData(slice)
            if (res?.data?.code === 1) {
                setcommissionDataError(res?.data?.message)
            }
            // setcommissionData(res?.data)

        })
    }
    }, [offset]);

    const onSubmit = data => {
        setfilterdata(data)
        if (iscustomdate === 'custom') {
            let daterange = convert(value);
            daterange = daterange.split(" - ");
            const from_date = Moment(daterange[0]).format('YYYY-MM-DD');
            const til_date = Moment(daterange[1]).format('YYYY-MM-DD');
            data.from_date = from_date
            data.til_date = til_date
        }
        api.GetCommissionsFilter(data, LoginToken).then(res => {
            const slice = res?.data?.commissions_data?.slice(offset, offset + perPage)
            setPageCount(Math.ceil(res?.data?.commissions_data?.length / perPage))
            setcommissionData(slice)
            if (res?.data?.code === 1) {
                setcommissionDataError(res?.data?.message)
            }
            if (res?.data?.code === 0) {
                setcommissionDataError()
            }
        })

    }

    const convert = dateRange =>
        dateRange.map(date => new Intl.DateTimeFormat('en-US').format(new Date(date)))
            .join(" - ")
    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * perPage;
        if(filterdata !== undefined)
        {
        FilterData(filterdata,offset)
        }
        setOffset(offset)
        
    };



    const FilterData = (data,offset) => {
        setfilterdata(data)
        if (iscustomdate === 'custom') {
            let daterange = convert(value);
            daterange = daterange.split(" - ");
            const from_date = Moment(daterange[0]).format('YYYY-MM-DD');
            const til_date = Moment(daterange[1]).format('YYYY-MM-DD');
            data.from_date = from_date
            data.til_date = til_date
        }
        api.GetCommissionsFilter(data, LoginToken).then(res => {
            const slice = res?.data?.commissions_data?.slice(offset, offset + perPage)
            setPageCount(Math.ceil(res?.data?.commissions_data?.length / perPage))
            setcommissionData(slice)
            if (res?.data?.code === 1) {
                setcommissionDataError(res?.data?.message)
            }
            if (res?.data?.code === 0) {
                setcommissionDataError()
            }
        })

    }
    return (<>
        <Head>
            <title>Commission</title>
        </Head>
        <div className="mainorder-detail-sec">
            <div className="container">
                <div className="row">
                    <Leftnav />
                    <div className="col-md-9 dashboard-main">

                        <Form value={value} setValue={setValue} iscustomdate={iscustomdate} register={register} IsCustomdate={IsCustomdate} handleSubmit={handleSubmit} onSubmit={onSubmit} />
                        <div className="groups tabs">
                            <ul className="tabs">
                                <li
                                    className={`col-md-6 ${viewtype === 'list' ? 'active' : ''}`}
                                    onClick={() => {
                                        setViewtype('list')
                                    }}

                                >
                                    <button>List View</button></li>
                                <li
                                    //className="col-md-6"
                                    className={`col-md-6 ${viewtype === 'graphical' ? 'active' : ''}`}

                                    onClick={() => {
                                        setViewtype('graphical')
                                    }}
                                ><button>Graphical View</button></li>
                            </ul>
                        </div>
                        {viewtype === "graphical" ?
                            <div className="graphical-rep-commission">
                                <GraphicalCommission
                                iscustomdate={iscustomdate}
                                />
                            </div>


                            :


                            <div className="comission-data-table">
                                <FormData commissionDataError={commissionDataError} handlePageClick={handlePageClick} pageCount={pageCount} commissionData={commissionData} />

                            </div>

                        }
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Commission;