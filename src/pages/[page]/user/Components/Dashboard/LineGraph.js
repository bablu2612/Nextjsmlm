import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
const LineGraph = ({ linedata,filter }) => {
    const [datas,setdata]=useState()
    let newDate = new Date()
    let month_raw = newDate.getMonth() + 1;
    console.log('month_raw',month_raw)


    let dateonly = []
    let commsionfinvalue = []

    let curdate = ''
    let total_commission = 0
    
    if(filter==='month')
    {
        linedata?.map((data, index) => {

            if (data?.updated_at !== curdate && +index > 0) {
                dateonly.push(curdate,)
                commsionfinvalue.push(total_commission,)
                curdate = data?.updated_at
                total_commission = 0
                
            }
    
            if (index === 0) {
                curdate = data?.updated_at
                const month_no=data.updated_at.split('-');
            }
            if (data?.updated_at === curdate) {
                total_commission += data.bonus_value
    
            }
            if (index === +linedata.length - 1) {
                dateonly.push(curdate,)
                commsionfinvalue.push(total_commission,)
    
            }
        })
    }
if(filter === 'year')
{


    let  Year = [
        {month:"Jan", commission:0},
        {month:"Feb", commission:0},
        {month:"Mar", commission:0},
        {month:"April", commission:0},
        {month:"May", commission:0},
        {month:"June", commission:0},
        {month:"July", commission:0},
        {month:"Aug", commission:0},
        {month:"Sep", commission:0},
        {month:"Oct", commission:0},
        {month:"Nov", commission:0},
        {month:"Dec", commission:0}
      
    ];


    let month_no=[];

    linedata?.map((data, index) => {
        if (data?.created_at !== curdate && +index > 0) {
            const objIndex = Year.findIndex((obj => obj.month == curdate));
            Year[objIndex].commission=total_commission;
            curdate = data?.created_at
            total_commission = 0 
        }

        if (index === 0) {
            curdate = data?.created_at
             month_no=data.updated_at.split('-');
           
        }
        if (data?.created_at === curdate) {
            total_commission += data.bonus_value

        }
        if (index === +linedata.length - 1) {
            const objIndex = Year.findIndex((obj => obj.month == curdate));
            Year[objIndex].commission=total_commission;
        }
    })

    for(let i=0;i< +month_raw; i++)
    {
        dateonly.push(Year[i]?.month,)
        commsionfinvalue.push(Year[i]?.commission,)
    } 

}
    const data = {
        labels:
            dateonly,
        // [
        //     'Jan', 'Feb', 'March', 'April', 'May', 'June', 'July','Aug','Sept','Oct','Nov','Dec'

        // ],
        datasets: [
            {
                label: 'Total Commission',
                fill: false,
                lineTension: 0.8,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 5,
                pointHitRadius: 10,
                data: commsionfinvalue
                //  [65, 59, 80, 81, 56, 55, 40]
            }
        ]
    };

    return (
        <div>
            {/* <h2>Line Graph</h2> */}
            <Line
                data={data}
                width={500}
                height={300}
            />
        </div>
    )
}

export default LineGraph;