import React, { useEffect } from 'react'
import '../styles/Result.css';
import { Link } from 'react-router-dom';
import { attempts_Number, earnPoints_Number, flagResult, rightAnswers } from '../helper/helper';


/** import actions  */
import { resetAllAction } from '../redux/question_reducer';
import { resetResultAction } from '../redux/result_reducer';
import { useDispatch, useSelector } from 'react-redux';
import { usePublishResult } from '../hooks/setResult';

export default function Result() {

    
    const dispatch = useDispatch()
    const { questions : { queue ,answers}, result : { result, userId}}  = useSelector(state => state)

    const totalPoints = queue[userId-1].length * 10; 
    const attempts = attempts_Number(result);
    const earnPoints = earnPoints_Number(result, answers[userId-1], 10)
    const flag = flagResult(totalPoints, earnPoints)
    const correct = rightAnswers(earnPoints)
    console.log("ans and result in reslt",answers,result);
    /** store user result */
    
        usePublishResult({ 
        result, 
        username : userId,
        attempts,
        points: earnPoints,
        achived : flag ? "Passed" : "Failed" });

    
  
    

    function onRestart(){
        dispatch(resetAllAction())
        dispatch(resetResultAction())
    }


  return (
    <div className='container'>
        <h1 className='title text-light'>Quiz Application</h1>

        <div className='result flex-center'>
            <div className='flex'>
                <span>Roll Number</span>
                <span className='bold'>{userId || ""}</span>
            </div>
            <div className='flex'>
                <span>Total Quiz Points : </span>
                <span className='bold'>{totalPoints || 0}</span>
            </div>
            <div className='flex'>
                <span>Total Questions : </span>
                <span className='bold'>{ queue[userId-1].length || 0}</span>
            </div>
            <div className='flex'>
                <span>Questions Answered : </span>
                <span className='bold'>{attempts || 0}</span>
            </div>
            <div className='flex'>
                <span>Correct Answers : </span>
                <span className='bold'>{correct || 0}</span>
            </div>
            <div className='flex'>
                <span>Total Earn Points : </span>
                <span className='bold'>{earnPoints || 0}</span>
            </div>
            <div className='flex'>
                <span>Quiz Result</span>
                <span style={{ color : `${flag ? "#2aff95" : "#ff2a66" }` }} className='bold'>{flag ? "Passed" : "Failed"}</span>
            </div>
        </div>

        <div className="result-btn">
            <Link className='btn prev' to={'/'} onClick={onRestart}>Restart</Link>
            <Link className='btn prev' to={'/leaderboard'}  >Leaderboard</Link>
        </div>

        
       
    </div>
  )
}