import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setIsUserLoggedIn } from '../reducer/usersSlice';
import { useNavigate } from 'react-router-dom';

import axios from "axios";

import './login.scss';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userLogin, setUserLogin] = useState({username: "", password: ""});
    const [errorBorder, setErrorBorder] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

// перевірка логіна
    const handleLogin = async (e) => {
        e.preventDefault();

        // валідація полів логіна та паролю
        if (userLogin.username.trim() === '' || userLogin.password.trim() === '') {
          setErrorBorder(true);
          setErrorMessage(() => {
            return <p className='login_not_found'>Username or password fields are empty</p>;
          });
          return;
        }

        try {
          const response = await axios.post('https://technical-task-api.icapgroupgmbh.com/api/login/', userLogin);
           
          if(response.status === 200){
            if(userLogin.username.length === 0 && userLogin.password.length === 0){
                 return false;
            }
                dispatch(setIsUserLoggedIn(true));
                setErrorBorder(false);
                setUserLogin({username: "", password: ""});
                setErrorMessage("");
                navigate('/table')
                
          }else{
                setErrorMessage(() => {
                  setErrorBorder(true);  
                  return <p className='login_not_found'>Login not found</p>;
                });
          }
          }catch(error){
                console.error("Error during login:", error);
          }finally {
               setErrorMessage(false);
          }
}    
// Запис логіна і паролю в обєкт
const changeLogin = (e) => {
      const {name, value} = e.target;
      setUserLogin((prevValue) => ({
            ...prevValue,
            [name]: value
      }));
      
};

    return (
        <div className="login-form">
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <div  className={`form-group ${errorBorder ? 'error_border_login' : ''}`}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={userLogin.username }
              onChange={changeLogin}
              
            />
          </div>
          <div className={`form-group ${errorBorder ? 'error_border_login' : ''}`}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={userLogin.password}
              onChange={changeLogin}
              
            />
            {errorMessage}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
}
export default Login;