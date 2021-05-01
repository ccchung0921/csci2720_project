import React from 'react';
import {Bar} from 'react-chartjs-2';
import moment from 'moment'
import useWindowDimensions from '../hook/useWindowDimensions'

const Chart = ({graphData,title}) =>{
    const {width} = useWindowDimensions();
    const hourLabels = [];
    for (let i = 0 ; i < 10 ; ++i){
        const now = new Date(Date.now());
        const previousHour = now.setHours(now.getHours() - (i+1))
        const formatPrevious = moment(previousHour).format('HH:')
        const formatDate = formatPrevious.concat('00')
        hourLabels.push(formatDate);
    }
    const data = {
        labels: hourLabels,
        datasets: [
          {
            label: '# of hours',
            data : graphData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
    
      const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };

      return(
        <div className="my-2" style={{width: width*0.7}}>
            <div style={{fontSize:20}} className="font-weight-bold text-center">{title}</div>
            <Bar data={data} options={options} />
        </div>
      )
}

export default Chart;