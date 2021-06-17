import { FaUser, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { useEffect, useState } from 'react';
import NumberFormat from "react-number-format";
// import Moment from "react-moment";
import moment from "moment"

const ListView = ({ state, setState }) => {
    const [level2, setLevel2] = useState()
    const [level3, setLevel3] = useState()
    const [level4, setLevel4] = useState()

    const ShowNextLevel = (id, level) => {

        if (level === 1) {
            setLevel2()
            setLevel3()
            setLevel4()
        }
        if (level === 2) {
            setLevel3()
            setLevel4()
        }
        if (level === 3) {

            setLevel4()
        }




        let setdata = true;
        if (+level === 1) {
            if (level2?.length > 0) {
                const objIndex = level2?.findIndex((obj => Number(obj.parent) == Number(id)));
                if (objIndex >= 0) {
                    setdata = false
                    setLevel2()
                }

            }

        }
        if (+level === 2) {
            if (level3?.length > 0) {
                const objIndex = level3?.findIndex((obj => Number(obj.parent) == Number(id)));
                if (objIndex >= 0) {
                    setdata = false
                    setLevel3()
                }
            }

        }
        if (+level === 3) {
            if (level4?.length > 0) {
                const objIndex = level4?.findIndex((obj => Number(obj.parent) == Number(id)));
                if (objIndex >= 0) {
                    setdata = false
                    setLevel4()
                }
            }

        }

        let nextlevelData = [];

        {
            setdata === true &&

            state[`level${level + 1}`]?.map((downlineList, index) => {
                if (+id === +downlineList?.parent) {
                    nextlevelData.push(downlineList)


                    if (+level === 1)
                        setLevel2(nextlevelData)
                    if (+level === 2)
                        setLevel3(nextlevelData)
                    if (+level === 3)
                        setLevel4(nextlevelData)
                }
            })

        }

    }

    const listviewdata = (downlineList,level) => {

    //  const date = Moment(downlineList?.user?.date_joined).format('MM-DD-YYYY');
    //  console.log('date',)
        return (
            <div className="row"

                onClick={() => { ShowNextLevel(downlineList?.id, level) }

                }>
                <div className="col-md-6">
                    <div className="box">
                        <FaUser />
                        <div className="icons">
                            <FaEnvelope />
                            <FaPhoneAlt />
                        </div>

                        <div className="first_name">
                            <h3>{downlineList?.user?.first_name}</h3>
                        </div>
                        <div className="user_rank">
                            <h3>{downlineList?.user?.user_rank}</h3>
                        </div>
                        <div className="data">Date Joined : <strong> 
                            {/* {downlineList?.user?.date_joined} */}
                            {moment(downlineList?.user?.date_joined).format('MM/DD/YYYY')}

                            </strong></div>
                        <div className="data">Total Order : <strong>{downlineList?.user?.orders_count}</strong></div>
                        <div className="data">Total Sales : <strong>
                            {+downlineList?.user?.total_sales > 0 ?
                            //  downlineList?.user?.total_sales 
                             <NumberFormat
                             value={parseFloat(+downlineList?.user?.total_sales).toFixed(2)}
                             displayType={'text'} thousandSeparator={true} prefix={'$'}
                             renderText={value => <div> {value} </div>} />
                             : 
                             <NumberFormat
                             value={parseFloat(0).toFixed(2)}
                             displayType={'text'} thousandSeparator={true} prefix={'$'}
                             renderText={value => <div> {value} </div>} />
                             }
                            
                            </strong></div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
            <div className="row">
                <div className="col-md-3">
                    <div className="Level">
                        <h2>Level1</h2>
                        {state &&
                            state['level1']?.map((downlineList, index) => {
                                return (listviewdata(downlineList,1))
                            })
                        }
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="Level">
                        <h2>Level2</h2>
                        {level2 &&
                            level2?.map((downlineList, index) => {
                                return (listviewdata(downlineList,2))
                            })
                        }
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="Level">
                        <h2>Level3</h2>
                        {level3 &&
                            level3?.map((downlineList, index) => {
                                return (listviewdata(downlineList,3))
                            })
                        }
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="Level">
                        <h2>Level4</h2>
                        {level4 &&
                            level4?.map((downlineList, index) => {
                                return (listviewdata(downlineList,4))
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )

}
export default ListView;