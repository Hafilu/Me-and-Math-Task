import React, { useEffect, useState } from 'react';
import { getServerData } from '../helper/helper';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetAllAction } from '../redux/question_reducer';
import { resetResultAction } from '../redux/result_reducer';

export default function ResultTable() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getServerData('https://quiz-app-tan8.onrender.com/api/result', (res) => {
      // Sort data based on points in descending order
      const sortedData = res.sort((a, b) => b.points - a.points);
      setData(sortedData);
    });
  }, []);

  function onRestart() {
    dispatch(resetAllAction());
    dispatch(resetResultAction());
  }

  return (
    <div className="container">
      <h2 className="title text-light">Quiz Leaderboard</h2>
      <table>
        <thead className="table-header">
          <tr className="table-row">
            <td>Roll Number</td>
            <td>Answered</td>
            <td>Earn Points</td>
            <td>Result</td>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && <div className="warning">No Data Found</div>}
          {data.map((v, i) => (
            <tr className="table-body" key={i}>
              <td>{v?.username || ''}</td>
              <td>{v?.attempts || 0}</td>
              <td>{v?.points || 0}</td>
              <td>{v?.achived || ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="start">
        <Link className="btn" to={'/'} onClick={onRestart}>
          Restart
        </Link>
      </div>
    </div>
  );
}
