import Head from "next/head";
import { useEffect, useState } from "react";
import Leftnav from "../../../Components/Leftnav";
import api from '../../../api/Apis'
import React from 'react';
import { Label } from "semantic-ui-react";
import ListView from "./Components/Downline/ListView";
import { FaUser, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

import PieCharts from "./Components/Dashboard/ReactD3PieChart";
import LineGraph from "./Components/Dashboard/LineGraph";

import { GrDiamond } from "react-icons/gr";
import Commission from "./Components/Dashboard/Commission";
import NumberFormat from "react-number-format";

import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import Box from '@material-ui/core/Box';
import MobileDateRangePicker from '@material-ui/lab/MobileDateRangePicker';
import { useForm } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import FilterCommissionForm from "./Components/Dashboard/FilterCommissionForm";
import Link from "next/link";
const Dashboard = () => {
  const [profileData, setProfileData] = useState()
  const [value, setValue] = useState([null, null]);
  const [iscustomdate, IsCustomdate] = useState('month')
  const [linedata, setLineData] = useState()

  useEffect(() => {
    const token = localStorage.getItem('Token') ? localStorage.getItem('Token') : '';
    api.GetMyProfileDetails(token).then(res => {
      if (res?.data?.code === 1) {
        setProfileData(res?.data)
      }
      if (res?.data?.code === 0) {
        setProfileData(res?.data)
      }

    })
    api.GetDashboardCommissions(iscustomdate, token).then(res => {
      if (res?.data?.code === 1) {
        setLineData(res?.data?.commissions_data)
      }


    })

  }, [iscustomdate]);
  const { register, handleSubmit, errors } = useForm();



  const onSubmit = data => {
    // let daterange = convert(value);
    // daterange = daterange.split(" - ");
    // const from_date = Moment(daterange[0]).format('YYYY-MM-DD');
    // const til_date = Moment(daterange[1]).format('YYYY-MM-DD');
    // data.from_date = from_date
    // data.til_date = til_date

    // console.log('daterange in correct format', data)
    // api.GetCommissionsFilter(data, LoginToken).then(res => {
    //     const slice = res?.data?.commissions_data?.slice(offset, offset + perPage)
    //     setPageCount(Math.ceil(res?.data?.commissions_data?.length / perPage))
    //     setcommissionData(slice)
    // })


  }
  const convert = dateRange =>
    new Intl.DateTimeFormat('en-US').format(new Date(dateRange))

  return (<>
    <Head>
      <title>Dashboard</title>
    </Head>
    <div className="mainorder-detail-sec dashboad-deails">
      <div className="container">
        <div className="row">
          <Leftnav />
          <div className="col-md-9 dashboard-main">
            <h3 className="title">Dashboard</h3>
            <div className="row">
              <div className="col-md-3">
                <div className="leftsec">
                  <div className="usericon-a">
                    <div className="usericon">
                      <FaUser />
                    </div>
                    <div className="user-Reser">
                      <h5 className="title">{profileData?.user_data?.first_name} {profileData?.user_data?.last_name}</h5>
                    </div>


                    <div className="icons">

                      <Link className="nav-link" href={`mailto:${profileData?.user_data?.email}`}>
                        <a><FaEnvelope /></a>
                      </Link>
                      <Link className="nav-link" href={`callto:${profileData?.user_data?.userdetails[0]?.phone_number}`}>
                        <a><FaPhoneAlt /></a>
                      </Link>

                    </div>
                  </div>

                  <div className="deatis-info">
                    <div className="dt-jned"><span>Date Joined : </span>
                      {profileData?.user_data?.date_joined}
                      {/* {new Intl.DateTimeFormat('en-US').format(new Date(profileData?.user_data?.userdetails[0]?.created_at))}
                    {Moment(profileData?.user_data?.userdetails[0]?.created_at).format('YYYY-MM-DD')} */}
                    </div>
                    <div className="dt-jned"><span>Referal Code : </span> {profileData?.user_data?.userdetails[0]?.referral_code}</div>
                    <div className="dt-jned"><span>Referal URL :  </span>Demourl</div>
                    <div className="dt-jned"><span>Autoship Activated :  </span> {profileData?.user_data?.userdetails[0]?.is_autoship_user}</div>


                  </div>
                  <div className="current-part">
                    <div className="currentrank">
                      <div className="current-rank-left">
                        <h3 className="title1-heading">Paid as rank:</h3>
                        <h3 className="title1 ">{profileData?.user_data?.userdetails[0]?.paid_as_rank}
                        </h3>

                      </div>
                      <div className="current-rank-right">
                        <h3 className="title1-heading">Qualified as rank:</h3>

                        <h3 className="title1 ">{profileData?.user_data?.userdetails[0]?.qualified_as_rank}
                        </h3>
                      </div>

                    </div>
                  </div>
                  <div className="Distributor row">
                    <GrDiamond />

                  </div><br /><br />
                  <div className="total_sale">
                    <div className="Toal-Sale"><strong>Total Sales : </strong>

                      <NumberFormat
                        value={parseFloat(profileData?.total_sales).toFixed(2)}
                        displayType={'text'} thousandSeparator={true} prefix={'$'}
                        renderText={value => <div> {value} </div>} />
                    </div>
                    <div className="Toal-commission"><strong>Total Commissions : </strong>

                      <NumberFormat
                        value={parseFloat(profileData?.total_commission).toFixed(2)}
                        displayType={'text'} thousandSeparator={true} prefix={'$'}
                        renderText={value => <div> {value} </div>} />
                    </div>

                  </div>


                  <div className="active-block">
                    <h3 className="title_a">Achieve Below to Upgrade Rank</h3>

                    <p className={`${+profileData?.pgv >= 50 ? 'check' : 'not-check'}`}>{`PQV >= 50`}</p>
                    <p className={`${+profileData?.pqv >= 750 ? 'check' : 'not-check'}`}>{`PGV >= 750`}</p>
                    <p className={`${profileData?.user_data?.userdetails[0]?.is_autoship_user === "True" ? 'check' : 'not-check'}`}>Autoship Active</p>
                    <p className="not-check">Membership</p>

                  </div>

                </div>
                <div className="DownlineStatic">
                  <h3 className="title_1">Downline Statistics</h3>

                  <div className="filleddata">
                    <div class="total-main-now">
                      <div className="data-sts">Total </div>
                      <div className="data-sts"> {profileData?.total_count} </div>
                    </div>
                    <div class="total-main-now">
                      <div className="data-sts">Level1 </div>
                      <div className="data-sts"> {profileData?.level1_count} </div>
                    </div>
                    <div class="total-main-now">
                      <div className="data-sts">Level2 </div>
                      <div className="data-sts"> {profileData?.level2_count} </div>
                    </div>
                    <div class="total-main-now">
                      <div className="data-sts">Level3 </div>
                      <div className="data-sts"> {profileData?.level3_count} </div>
                    </div>
                    <div class="total-main-now">
                      <div className="data-sts">Level4 </div>
                      <div className="data-sts"> {profileData?.level4_count} </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-9 statis_datas">

                <div className="top-head-commission">
                  <div className="left-commison-sec">
                    <span>Total sales :  </span><NumberFormat
                      value={parseFloat(profileData?.total_sales).toFixed(2)}
                      displayType={'text'} thousandSeparator={true} prefix={'$'}
                      renderText={value => <div> {value} </div>} />
                  </div>
                  <div className="right-commison-sec">
                    Rank as per sale : {profileData?.rank_as_per_sales}th
  </div>
                </div>
                <div className="main-top">
                  <FilterCommissionForm
                    value={value}
                    setValue={setValue}
                    iscustomdate={iscustomdate}
                    register={register}
                    IsCustomdate={IsCustomdate}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit} />
                  <div className="chart-main">

                    <div className="chart-PieCharts">
                      {iscustomdate &&
                        <LineGraph linedata={linedata} filter={iscustomdate} />
                      }
                    </div>
                    {/* <div className="chart-LineGraph">

                      <PieCharts />
                    </div> */}
                  </div>

                </div>


                <div className="commsion-weekly-dashboard">
                  <Commission />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
}
export default Dashboard;