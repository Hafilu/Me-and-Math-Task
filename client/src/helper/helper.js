import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from 'axios'
import { useEffect, useState } from "react";
 

export function attempts_Number(result){
    return result.filter(r => r !== undefined).length;
}

export function earnPoints_Number(result, answers, point){
    return result.map((element, i) => answers[i] === element).filter(i => i).map(i => point).reduce((prev, curr) => prev + curr, 0);
}

export function flagResult(totalPoints, earnPoints){
    return (totalPoints * 50 / 100) < earnPoints; /** earn 50% marks */
}
 
export function rightAnswers(earnPoints){
    return (earnPoints/10);  
}
 
/** chaeck user login*/
export function CheckUserExist({ children }) {
    const userId = useSelector(state => state.result.userId);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await axios.get('https://quiz-app-tan8.onrender.com/api/user');
          const usersData = response.data;
  
          // Check if the userId matches any registration number
          const userExists = usersData.some(user => user.registrationNumber === userId);
          setIsAuthenticated(userExists);
        } catch (error) {
          console.error('Error fetching users:', error.message);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchUsers();
    }, [userId]);
  
    if (isLoading) {
      // You can render a loading spinner or message here
      return null;
    }
  
    return isAuthenticated ? children : <Navigate to={'/'} replace={true} />;
  }
  
    

/** get server data */
export async function getServerData(url, callback){
    const data = await (await axios.get(url))?.data;
    console.log("data",data);
    return callback ? callback(data) : data;
}


/** post server data */
export async function postServerData(url, result, callback){
    const data = await (await axios.post(url, result))?.data;
    
    return callback ? callback(data) : data;
}
