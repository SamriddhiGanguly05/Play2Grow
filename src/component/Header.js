import React, { useState, useEffect, useContext, useRef } from "react";
import Axios from "axios";
import { AuthContext } from '../context/Auth';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import mascot from '../assets/mascot.png';
import avatar1 from '../assets/avatars/avatar_1.png';
import avatar2 from '../assets/avatars/avatar_2.png';
import avatar3 from '../assets/avatars/avatar_3.png';
import avatar4 from '../assets/avatars/avatar_4.png';
import avatar5 from '../assets/avatars/avatar_5.png';
import avatar6 from '../assets/avatars/avatar_6.png';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

const Header = () => {
  const tableRef = useRef(null);
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.uid;

  const userDetails = JSON.parse(localStorage.getItem('user_details') || '{}');
  const userAvatar = userDetails.avatar !== undefined ? avatars[userDetails.avatar] : mascot;

  const [aqData, setAQData] = useState({});
  const [ftData, setFTData] = useState({});
  const [ejData, setEJData] = useState({});
  const [bfData, setBFData] = useState({});
  const [mtData, setMTData] = useState({});
  const [bcData, setBCData] = useState({});

  const [average, setAverage] = useState(0);
  const [mtaverage, setMTAverage] = useState(0);
  const [btaverage, setBTAverage] = useState(0);

  const [alphaAverage, setAlphaAverage] = useState(0);
  const [betaAverage, setBetaAverage] = useState(0);
  const [gammaAverage, setGammaAverage] = useState(0);
  const [deltaAverage, setDeltaAverage] = useState(0);
  const [thethaAverage, setthethaAverage] = useState(0);

  useEffect(() => {
    if (currentUser?.email) {
      getAqData();
      getFTData();
      getEJData();

      getMTData();
      getBCData();
    }
  }, [currentUser]);

  const getAqData = () => {
    Axios.get(`https://fun-games-c4f99-default-rtdb.firebaseio.com/aqtest/${userId}.json`)
      .then((response) => setAQData(response.data || {}))
      .catch((error) => console.log(error));
  };

  const getFTData = () => {
    Axios.get(`https://fun-games-c4f99-default-rtdb.firebaseio.com/fingertapping/${userId}.json`)
      .then((response) => {
        const data = response.data || {};
        setFTData(data);
        const entries = Object.entries(data);
        const grandTotal = entries.reduce((acc, [_, value]) => acc + value.score, 0);
        setAverage(entries.length ? grandTotal / entries.length : 0);
      })
      .catch((error) => console.log(error));
  };

  const getEJData = () => {
    Axios.get(`https://fun-games-c4f99-default-rtdb.firebaseio.com/emojitest/${userId}.json`)
      .then((response) => setEJData(response.data || {}))
      .catch((error) => console.log(error));
  };


  const getMTData = () => {
    Axios.get(`https://fun-games-c4f99-default-rtdb.firebaseio.com/memorytest/${userId}.json`)
      .then((response) => {
        const data = response.data || {};
        setMTData(data);
        const entries = Object.entries(data);
        const grandTotal = entries.reduce((acc, [_, value]) => acc + value.total, 0);
        setMTAverage(entries.length ? grandTotal / entries.length : 0);
      })
      .catch((error) => console.log(error));
  };

  const getBCData = () => {
    Axios.get(`https://fun-games-c4f99-default-rtdb.firebaseio.com/Balltest/${userId}.json`)
      .then((response) => {
        const data = response.data || {};
        setBCData(data);
        const entries = Object.entries(data);
        const grandTotal = entries.reduce((acc, [_, value]) => acc + value.total, 0);
        setBTAverage(entries.length ? grandTotal / entries.length : 0);
      })
      .catch((error) => console.log(error));
  };

  const getLatestScore = (data) => {
    const entries = Object.values(data);
    if (entries.length === 0) return 0;
    return entries[entries.length - 1].score;
  };

  const aqScore = getLatestScore(aqData);
  const ejScore = getLatestScore(ejData);

  const chartData = {
    labels: ['AQ-10 (Score)', 'Finger Tapping (Avg)', 'Emoji Quiz (Score)', 'Memory Test (%)', 'Ball Clicker (%)'],
    datasets: [
      {
        label: 'Your Performance',
        data: [aqScore, average, ejScore, mtaverage, btaverage],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Game & Assessment Overview',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      }
    }
  };

  const pieData = {
    labels: ['Risk Indicators', 'No Risk Indicators'],
    datasets: [
      {
        data: [
          (aqData && Object.values(aqData).some(v => v.status !== 1) ? 1 : 0) +
          (average < 50 || average > 60 ? 1 : 0) +
          (ejData && Object.values(ejData).some(v => v.status !== 1) ? 1 : 0) +
          (mtaverage < 70 ? 1 : 0) +
          (btaverage < 70 ? 1 : 0),

          (aqData && Object.values(aqData).every(v => v.status === 1) ? 1 : 0) +
          (average >= 50 && average <= 60 ? 1 : 0) +
          (ejData && Object.values(ejData).every(v => v.status === 1) ? 1 : 0) +
          (mtaverage >= 70 ? 1 : 0) +
          (btaverage >= 70 ? 1 : 0)
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="row justify-content-start">
      <div className="col-lg-12 mb-4">
        <div className="border p-4 shadow d-flex flex-column h-100">
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between mb-3">
              <div className="d-flex align-items-start">
                <img src={userAvatar} alt="Avatar" style={{ height: '120px', marginRight: '20px', animation: 'float 3s ease-in-out infinite' }} />
                <h4 className="mb-4" style={{ alignSelf: 'center', fontFamily: "'Fredoka', sans-serif", fontSize: '1.5rem', color: '#535ac8' }}>
                  Hey, {currentUser?.displayName}!!
                  <br />
                  Welcome to your Autism Detector Dashboard! Have fun playing games and checking your progress. Let's learn and grow together!
                </h4>
              </div>
              <div className="d-flex justify-content-center mt-auto">
                <DownloadTableExcel
                  filename="users table"
                  sheet="users"
                  currentTableRef={tableRef.current}
                >
                  <button className="btn btn-sm btn-success">Export Result</button>
                </DownloadTableExcel>
              </div>
            </div>

            <div className="row mb-5">
              <div className="col-md-7">
                <div style={{ height: '300px', width: '100%' }}>
                  <Bar options={{ ...chartOptions, maintainAspectRatio: false }} data={chartData} />
                </div>
              </div>
              <div className="col-md-5">
                <div style={{ height: '300px', width: '100%', position: 'relative' }}>
                  <Pie data={pieData} options={{ maintainAspectRatio: false, plugins: { title: { display: true, text: 'Overall Risk Profile' } } }} />
                </div>
              </div>
            </div>

          </div>

          {Object.keys(ejData).length > 0 ? (
            <table className="table table-striped table-hover table-bordered border-primary" ref={tableRef}>
              <thead>
                <tr>
                  <th colSpan="4"><h6>Name: {currentUser?.displayName}</h6></th>
                </tr>
                <tr>
                  <th scope="col"><h6>Test Type</h6></th>
                  <th scope="col"><h6>Total Score</h6></th>
                  <th scope="col"><h6>Range (Non Autistic)</h6></th>
                  <th scope="col"><h6>Remark</h6></th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(aqData).map(([key, value]) => (
                  <tr key={key}>
                    <th scope="row">AQ -10</th>
                    <td>{value.score}</td>
                    <td>Less than 7</td>
                    <td>{value.status === 1 ? <span className="text-success">Non Autistic</span> : <span className="text-danger">Autistic</span>}</td>
                  </tr>
                ))}
                <tr>
                  <th scope="row">Finger Tapping</th>
                  <td>{average.toFixed(0)}</td>
                  <td>Between 50 to 60</td>
                  <td>{average >= 50 && average <= 60 ? <span className="text-success">Non Autistic</span> : <span className="text-danger">Autistic</span>}</td>
                </tr>
                {Object.entries(ejData).map(([key, value]) => (
                  <tr key={key}>
                    <th scope="row">Emoji Quiz</th>
                    <td>{value.score}</td>
                    <td>More than 4</td>
                    <td>{value.status === 1 ? <span className="text-success">Non Autistic</span> : <span className="text-danger">Autistic</span>}</td>
                  </tr>
                ))}
                <tr>
                  <th scope="row">Memory test</th>
                  <td>{mtaverage.toFixed(0)}%</td>
                  <td>More than 70%</td>
                  <td>{mtaverage >= 70 ? <span className="text-success">Non Autistic</span> : <span className="text-danger">Autistic</span>}</td>
                </tr>
                <tr>
                  <th scope="row">Ball Clicker test</th>
                  <td>{btaverage.toFixed(0)}%</td>
                  <td>More than 70%</td>
                  <td>{btaverage >= 70 ? <span className="text-success">Non Autistic</span> : <span className="text-danger">Autistic</span>}</td>
                </tr>

              </tbody>
            </table>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div >
  );
};

export default Header;
