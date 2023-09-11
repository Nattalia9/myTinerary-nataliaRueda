import React, { useRef }from 'react'
import './style.css'
import { BsKey } from "react-icons/bs";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaGoogle } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { signIn } from "../../redux/actions/userActions.js";
import { useNavigate } from 'react-router-dom';

export default function FormSignIn() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useRef(null)
  const password = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    const aux = [email, password];
    if (aux.some((campo) => !campo.current.value)) {
      alert("All fields are required");
    } else {
      const body = {
        email: email.current.value,
        password: password.current.value,
      };
      dispatch(signIn(body)).then((response) => {
        if(response.payload.user){
          navigate("/")
        }
      });
    }
  };

  return (
    <div className="container-fluid bg-img bgm">
      <div className="mountain">
        <div className="f-grayt">
          <div className="container font">
            <div className="row justify-content-center rep">
              <div className="col-md-6 pt-5 thn">
                <h2 className='text-center mb-4'>Create account</h2>
                <div className="sociahl d-flex gap-2 justify-content-center">
                  <span className='btn-red' title="Google"><FaGoogle className="" /></span>
                  <span className='btn-red' title="Facebook"><FaFacebookF className="" /></span>
                </div>
                <p className='text-center pt-2'>or use your email for registration:</p>
                <form className="form-background p-4 bgn text-center" autoComplete="off" onSubmit={handleSubmit} >
                  <div className="input-group d-flex mb-3">
                    <div className="input-group-prepend d-flex ">
                      <span className='input-group-text d-flex justify-content-center align-items-center '>
                        <MdOutlineAlternateEmail className="iconn-i" />
                      </span>
                      </div>
                    <input type="email" name="email" className="form-controoll" placeholder="Email" ref={email}/>
                  </div>
                  <div className="input-group d-flex mb-3">
                    <div className="input-group-prepend d-flex ">
                      <span className='input-group-text d-flex justify-content-center align-items-center '>
                        {/* <SlLock className="iconn-i" /> */}
                        <BsKey className="iconn-i" />
                      </span>
                      </div>
                    <input type="password" name="password" className="form-controoll" placeholder="Password" ref={password}/>
                  </div>
                  <button className="btn-signup mt-4">Sign up</button>
                </form>          
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>   
  )
}
