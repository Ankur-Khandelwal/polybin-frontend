import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactLoading from 'react-loading';
import './pages.css';

const PolyView = () => {
  const [poly, setPoly] = useState({});
  const [polyContent, setPolyContent] = useState('');
  const [linkExists, setLinkExists] = useState(false);
  const [encryption, setEncryption] = useState(false);
  const [enteredKey, setEnteredKey] = useState('');
  const [loading, setLoading] = useState(true);
  const [ipArray, setIpArray] = useState([]);
  const { slug } = useParams();

  const decryptPoly = async () => {
    try {
      const url = 'https://classify-web.herokuapp.com/api/decrypt';
      const jsonData = JSON.stringify({ 
          data: poly.content, key: enteredKey
      });
      setLoading(true);
      let response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json;charset=utf-8'
          },
          body: jsonData
      });
      const result = await response.json();
      setLoading(false);
      setPolyContent(result.result);
    } catch (error) {
        console.error(error);
    }
  }

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/poly/' + slug)
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        if(res.status !== 404) {
          console.log('Inside it');
          console.log(res.data.poly.content);
          if(res.data.isUrl) window.location.href = res.data.poly.content;
          setLinkExists(true);
          setPoly(res.data.poly);
          setPolyContent(res.data.poly.content);
          if(res.data.poly.key!=='') {
            setEncryption(true);
          }
          let sortedIps = res.data.poly.ipArray.sort((a,b)=>{
            return b.time - a.time;
          })
          setIpArray(sortedIps);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(poly.link);
    alert('Link copied to clipboard');
  }

  return loading ?
  <ReactLoading type='bars' color='#000' height={'5%'} width={'5%'}/> :
  linkExists ? (
    <div className="polyview">
      <div className="poly-area-container-1">
        <div className="poly-area">
          <h2>{poly.title}</h2>
          <pre className='poly-content'>{polyContent}</pre>
          {encryption ? (
            <div className='decryption-window'>
              <p style={{color:'red'}}>This Poly is Encrypted</p>
              <span>Only Correct Key will show Correct Poly: </span>
              <input type='text' onChange={(e)=>{setEnteredKey(e.target.value)}}/>
              <button className='decrypt-button' onClick={()=>decryptPoly()}>Decrypt</button>
          </div>
          ):(<></>)}
        </div>
        <div className="poly-detais">
          <div className="poly-link">
          <b>Link to this Poly:</b> 
          &nbsp;&nbsp;&nbsp;
          <span style={{padding: '5px', border: '1px solid black'}}>{poly.link}</span>
          &nbsp;&nbsp;&nbsp;
          <button onClick={()=>{copyLink()}}>Copy Link</button>
          </div>
          <div className="createdBy">
            <b>Created by:</b>
            &nbsp;&nbsp;&nbsp;
            <span>{poly.createdBy || 'Anonymous'}</span>
          </div>
          <div className="visibility">
            <b>Visibility:</b>
            &nbsp;&nbsp;&nbsp;
            <span>{poly.visibility}</span>
          </div>
          <div className="expiresIn">
            <b>Expires In:</b>
            &nbsp;&nbsp;&nbsp;
            <span>{poly.expiryDuration}</span>
          </div>
        </div>
      </div>
      <div className='polyIps'>
        <h3>Recently accessed by:</h3>
        {ipArray.map((ip, index)=>{
          return (
            <div key={index} className='ip'>
              <span><b>ip </b>{ip.ip}</span>&nbsp;
              <span><b>time </b>{ip.time}</span>
            </div>
          )
        })}
      </div>
    </div>
  ) : (<h1 style={{color: 'red', alignSelf: 'center'}}>This Poly Link has EXPIRED :(</h1>);
};

export default PolyView;
