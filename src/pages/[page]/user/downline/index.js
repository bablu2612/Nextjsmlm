import Head from "next/head";
import { useEffect, useState } from "react";
import Leftnav from "../../../../Components/Leftnav";
import api from '../../../../api/Apis'
import Tree from 'react-d3-tree';
// import Tree from 'react-tree-graph';
// import 'react-tree-graph/dist/style.css'
import moment from "moment"

import React from 'react';
import { Label } from "semantic-ui-react";
import { FaUser,FaEnvelope, FaPhoneAlt} from "react-icons/fa";
import ListView from "../Components/Downline/ListView";
import NumberFormat from 'react-number-format';

const Downline = () => {
  const [state, setState] = useState([])
  const [viewtype, setViewtype] = useState('list')

  useEffect(() => {
    const token = localStorage.getItem('Token') ? localStorage.getItem('Token') : '';
    api.getDownlineUsers(token).then(res => {
      setState(res?.data);
    })
  }, []);
  
  let Downline_data = {
    name: state[`level0`]?.user?.first_name,
    id: state[`level0`]?.id,
    attributes: {
      email: state[`level0`]?.user.email,
      date_joined: state[`level0`]?.user.date_joined,
      orders_count: state[`level0`]?.user.orders_count,
      total_sales: state[`level0`]?.user.total_sales,
      user_rank: state[`level0`]?.user.user_rank,
    },
    children: [],
  }

  function pushdownlinedata(data_downline, child) {
    data_downline?.push({
      name: child.user.first_name,
      id: child?.id,
      attributes: {
        email: child.user.email,
        date_joined: child.user.date_joined,
        orders_count: child.user.orders_count,
        total_sales: child.user.total_sales,
        user_rank: child.user.user_rank,

      },
      children: [],
    })
  }
  for (let i = 1; i < 5; i++) {
    state[`level${i}`]?.map((child, index) => {
      if (i === 1) {
        if (+Downline_data.id === +child?.parent) {
          pushdownlinedata(Downline_data?.children, child)
        }
      }
      else {
        Downline_data?.children?.map((child_in_child, index1) => {
          if (+child?.parent === +child_in_child?.id) {
            pushdownlinedata(Downline_data?.children[index1]?.children, child)
          }
          Downline_data?.children[index1]?.children.map((child_in_child1, index2) => {
            if (+child_in_child1?.id === +child?.parent) {
              pushdownlinedata(Downline_data?.children[index1]?.children[index2]?.children, child)

            }
            Downline_data?.children[index1]?.children[index2]?.children.map((child_in_child2, index3) => {
              if (+child_in_child2?.id === +child?.parent) {
                pushdownlinedata(Downline_data?.children[index1]?.children[index2]?.children[index3]?.children, child)
              }
            })
          })
        })
      }
    })
  }

  const renderRectSvgNode = ({ nodeDatum, toggleNode }) => (
    <g>
      <rect width="100" height="100" x="-50" y="-0" onClick={toggleNode} >
      </rect>
      <FaUser />

              
      <text fill="black" strokeWidth="1" x="20">
        {nodeDatum.name} <br />

      </text>
      <text fill="black" strokeWidth="1" x="20" dy="20" >
        {nodeDatum.attributes?.user_rank}

      </text>
     
                 
      {nodeDatum.attributes?.date_joined && (<>
        <text fill="black" x="20" dy="60" strokeWidth="1">
          Date Joined: 
          {moment(nodeDatum.attributes?.date_joined).format('MM/DD/YYYY')}

           {/* {nodeDatum.attributes?.date_joined} */}
        </text>
        <text fill="black" x="20" dy="80" strokeWidth="1">

          Total Order: {nodeDatum.attributes?.orders_count}<br />
        </text>

        <text fill="black" x="20" dy="100" strokeWidth="1">

          Total Sales:{nodeDatum.attributes?.total_sales === null ? 
          
          <NumberFormat
          value={parseFloat(0).toFixed(2)}
          displayType={'text'} thousandSeparator={true} prefix={'$'}
          renderText={value =>  value } />
          
          : 
          
          <NumberFormat
                        value={parseFloat(+nodeDatum.attributes?.total_sales).toFixed(2)}
                        displayType={'text'} thousandSeparator={true} prefix={'$'}
                        renderText={value =>  value } />
            //  `$ ${+nodeDatum.attributes?.total_sales.toFixed(2)}`
            //  +nodeDatum.attributes?.total_sales.toFixed(2)
          }
         
        </text>



      </>)}
    </g>
  );

  return (<>
    <Head>
      <title>Downline</title>
    </Head>
    <div className="mainorder-detail-sec">
      <div className="container">
        <div className="row">
          <Leftnav />
          <div className="col-md-9 dashboard-main">
            <h3 className="title">Downline </h3>
            <div className="groups tabs">
            <ul className="tabs">
              <li 
              className={`col-md-6 ${viewtype === 'list' ? 'active' : ''}`}
              onClick={()=>{
                setViewtype('list')
              }}
              
              >
                <button>ListView</button></li>
              <li 
              //className="col-md-6"
              className={`col-md-6 ${viewtype === 'tree' ? 'active' : ''}`}

              onClick={()=>{
                setViewtype('tree')
              }}
              ><button>Tree View</button></li>
            </ul>
            {viewtype==='tree'?
            <div id="treeWrapper" className="tree" style={{ width: '50em', height: '20em' }}>
              {Downline_data &&
                <Tree
                  rootNodeClassName="node__root"
                  branchNodeClassName="node__branch"
                  leafNodeClassName="node__leaf"
                  pathFunc="step"
                  orientation='vertical'
                  translate={false}
                  nodeSize={{ x: 180, y: 300 }}
                  renderCustomNodeElement={renderRectSvgNode}
                  data={Downline_data}


                />

              }

            </div>
            :
            <div className="lavel-box">
              {state &&
           <ListView state={state} setState={()=>{setState}} />
              }
            </div>
            }
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
}
export default Downline;