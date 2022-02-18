import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';
import axios from 'axios';
import './pages.css';

const Home = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [expiresIn, setExpiresIn] = useState('1 day');
  const [encryption, setEncryption] = useState('No');
  const [key, setKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const createPoly = () => {
    if(content==='') {
      setError('Please enter some content');
      return;
    }
    const data = {title, content, visibility, expiresIn, encryption, key};
    setLoading(true);
    axios.post('http://localhost:8000/api/createpoly', data)
      .then(res => {
        setLoading(false);
        navigate('/poly/' + res.data.poly.slug);
      })
      .catch(err => {
        setLoading(false);
        setError(err.response.data.error);
        console.log(err);
      });
  }
  return (
    <div className='home'>
      <div className='poly-area-container'>
        <div className='poly-area'>
          <h3 className='polybin'>Paste your Poly here</h3>
          <textarea className='input-area' rows="20" cols="100" onInput={(e)=>setContent(e.target.value)}></textarea><br/>
        </div>
        <div className='poly-details'>
          <div className='title'>
            <span>Enter Title</span>
            &nbsp;&nbsp;&nbsp;
            <input type='text' className='title-input' onChange={(e)=>setTitle(e.target.value)}/>
          </div>
          {/* <div className='visibility'>
            <span>Select visibility</span>
            &nbsp;&nbsp;&nbsp;
            <select id='visibility' onChange={(e)=>setVisibility(e.target.value)}>
              <option value='public'>Public</option>
              <option value='private'>Private</option>
              <option value='unlisted'>Unlisted</option>
            </select>
          </div> */}
          <div className='encryption'>
            <span>Do you want to encrypt this Poly with a Key?</span>
            &nbsp;&nbsp;&nbsp;
            <select id='encryption' onChange={(e)=>setEncryption(e.target.value)}>
              <option value='no'>No</option>
              <option value='yes'>Yes</option>
            </select>
          </div>
          {encryption === 'yes' 
          &&
          <div className='key'>
              <span>Enter Key</span>
              &nbsp;&nbsp;&nbsp;
              <input type='text' className='key-input' onChange={(e)=>setKey(e.target.value)}/>
          </div>
          }
          <div className='expiresIn'>
          <span>Expires In</span>
          &nbsp;&nbsp;&nbsp;
            <select id='expiresIn' onChange={(e)=>setExpiresIn(e.target.value)}>
              <option value='1 day'>1 day</option>
              <option value='10 minutes'>10 minutes</option>
              <option value='1 minute'>1 minute</option>
            </select>
          </div>      
          <button onClick={()=>createPoly()}>Create Poly Link</button>
        </div>
      </div>
      {<p className='error'>{error}</p>}
      <div className='loading'>{loading && <ReactLoading type='bars' color='#000' height={'1%'} width={'10%'}/>}</div>
    </div>
  )
}

export default Home;