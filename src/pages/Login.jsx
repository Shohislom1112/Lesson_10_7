import React from 'react';
import "../styles/style.scss"

const Login = () => {
  return <div className='input'>
    <input type="text" id='inputt'className='search' placeholder='Name'  /><br />
    <br /><input type="text " id='inputt' className='search' placeholder='LastName' />
 <br /><br />
    <button className='buttonnn'> Log In </button>
     </div>;
};

export default Login;
