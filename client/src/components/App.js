 
import '../styles/App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Quiz from './Quiz';
import Main from './Main';
import Result from './Result';
import { CheckUserExist } from '../helper/helper';
import ResultTable from './ResultTable';


/** react routes */
const router = createBrowserRouter([
  {
    path : '/',
    element : <Main></Main>
  },
  {
    path : '/quiz',
    element : <CheckUserExist><Quiz /></CheckUserExist>
  },
  {
    path : '/result',
    element : <CheckUserExist><Result /></CheckUserExist>
  },
  {
    path : '/leaderboard',
    element : <CheckUserExist><ResultTable/></CheckUserExist>
  },
])


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
