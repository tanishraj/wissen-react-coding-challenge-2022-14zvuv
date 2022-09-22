import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://reqres.in/api/login';

const FormControls = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setError('');
    if (email && password && termsAndConditions) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [email, password, termsAndConditions]);

  const signin = (e) => {
    e.preventDefault();
    axios
      .post(API_URL, { email, password })
      .then((res) => {
        console.log('Login successful', res);
        sessionStorage.setItem('token', res.data.token);
        navigate('/users');
      })
      .catch((err) => {
        setError(err?.response?.data?.error);
      });
  };

  return (
    <div>
      <div className="controls">
        <label>
          <div>Email:</div>
          <input
            className="inputText"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>

      <div className="controls">
        <label>
          <div>Password:</div>
          <input
            className="inputText"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>

      <div className="controls">
        <label className="tAndC">
          <input
            type="checkbox"
            value={termsAndConditions}
            onChange={(e) => {
              setTermsAndConditions(!termsAndConditions);
            }}
          />
          By creating and logging into an account, you are agreeing with our{' '}
          <strong>Terms &amp; Conditions</strong> and{' '}
          <strong>Privacy Policies</strong>.
        </label>
      </div>

      <div className="controls">
        <button className="signinButton" disabled={!isValid} onClick={signin}>
          Sign in
        </button>
      </div>

      {error && <div className="controls error">{error}</div>}
    </div>
  );
};

export default FormControls;
