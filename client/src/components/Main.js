import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import "../styles/Main.css"
import { setUserId } from '../redux/result_reducer'
import { useDispatch, useSelector } from 'react-redux'

const Main = () => {
    
    const inputRef = useRef(null)
    const dispatch = useDispatch()
    const user = useSelector((state)=> state.userId)

    function startQuiz(){
       
        if(inputRef.current?.value){
            
            dispatch(setUserId(inputRef.current?.value))
        }
    }

  return (
    <div className='container-main'>
        <h1 className='title text-light'>Quiz Application</h1>

        <ol>
            <li>You will be asked 5 questions one after another.</li>
            <li>10 points is awarded for the correct answer.</li>
            <li>Each question has three options. You can choose only one options.</li>
            <li>You can review and change answers before the quiz finish.</li>
            <li>The result will be declared at the end of the quiz.</li>
        </ol>

        <form id="form">
            <input ref={inputRef} className="userid" type="text" placeholder='Roll Number*' />
        </form>

        { !user && <div className='message'>Please enter your roll number to start the quiz</div>}


        <div className='start'>
            <Link className='btn' to={'quiz'} onClick={startQuiz}>Start Quiz</Link>
        </div>

    </div>
  )
}

export default Main
