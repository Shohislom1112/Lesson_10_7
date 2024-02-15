import React from 'react';
import "../styles/style.scss"

const Login = () => {
  return <div className='input'>
    <input type="text" id='inputt'className='search' placeholder='Name'  />
    <input type="text " id='inputt' className='search' placeholder='LastName' />
    <button className='button'> Log In </button>
     </div>;
};

export default Login;
