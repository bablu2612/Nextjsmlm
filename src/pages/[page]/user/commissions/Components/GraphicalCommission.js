import { useEffect, useState } from "react";
import api from "../../../../../api/Apis";
import GraphicalView from "./GraphicalView";

const GraphicalCommission = ({iscustomdate}) => {
    const [linedata, setLineData] = useState()

    useEffect(() => {
        const token = localStorage.getItem('Token') ? localStorage.getItem('Token') : '';
        api.GetDashboardCommissions('month', token).then(res => {
            if (res?.data?.code === 1) {
              setLineData(res?.data?.commissions_data)
            }
        })
      
    }, []);
    return (
        <GraphicalView 
        filter={iscustomdate}
        linedata={linedata} />

    )

}

export default GraphicalCommission;