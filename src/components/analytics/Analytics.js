import React, {useEffect, useState} from "react";
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import AnalyticsService from "../../services/AnalyticsService";
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,  // Register the PointElement
  Title,
  Tooltip,
  Legend
);



const Analytics = () => {


    const [countData, setCountData] = useState([])
    const [trendsData, setTrendsData] = useState([])
    const [activityData, setActivityData] = useState([])



    const getCountData = () => {
        AnalyticsService.getAnalyticsCount().then(data => {
            setCountData(data);
        });
    }

    const getTrendsData = () => {
        AnalyticsService.getAnalyticsTredns().then(data => {
            setTrendsData(data);
        });
    }

    const getActivityData = () => {
        AnalyticsService.getAnalyticsActivity().then(data => {
            setActivityData(data);
        });
    }



    // console.log('pppppp', trendsData);

    useEffect(() => {
        getCountData();
        getTrendsData();
        getActivityData();
    }, []);

 


      const chartData = {
        labels: ['Total Users', 'New Users', 'Active Users'],
        datasets: [
          {
            label: 'User Count',
            data: [countData.totalUsers, countData.newUsers, countData.activeUsers],
            backgroundColor: ['#FF5733', '#33FF57', '#3357FF'],
          },
        ],
      }
      const labels = trendsData.map((trend) => new Date(trend.signUpDate).toLocaleDateString());
      const data = trendsData.map((trend) => trend._count.signUpDate);
    
      const trendsData1 = {
        labels: labels,
        datasets: [
          {
            label: 'User Sign-Ups',
            data: data,
            fill: false,
            borderColor: '#FF5733',
            tension: 0.1,
          },
        ],
      };
    
      const labels1 = activityData.map((activity) => `User ${activity.userId}`);
      const loginCounts = activityData.map((activity) => activity.loginCount);
      const engagementScores = activityData.map((activity) => activity.engagementScore);
    

      const chartData1 = {
        labels: labels,
        datasets: [
          {
            label: 'Login Count',
            data: loginCounts,
            backgroundColor: '#FF5733',
            yAxisID: 'y',
          },
          {
            label: 'Engagement Score',
            data: engagementScores,
            backgroundColor: '#33FF57',
            yAxisID: 'y1',
          },
        ],
      };

    return (
        <div className='main-content'>

            <div className="line-chart1">
                <p> Analytics Count </p>
                <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'User Counts' } } }} />;
            </div>
            <div className="line-chart1">
                <p> Analytics Trends </p>
                <Line data={trendsData1} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'User Sign-Up Trends' } } }} />;
            </div>

            <div className="line-chart1">
                <p> Analytics Activity </p>
                    <Bar
                        data={chartData1}
                        options={{
                        responsive: true,
                        plugins: { legend: { position: 'top' }, title: { display: true, text: 'User Activity' } },
                        scales: {
                            y: { beginAtZero: true },
                            y1: {
                            position: 'right',
                            beginAtZero: true,
                            },
                        },
                        }}
                    />
            </div>
        </div>
    )

}

export default Analytics;
