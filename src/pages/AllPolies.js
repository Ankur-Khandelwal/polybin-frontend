import React, {useState, useEffect} from 'react';
import axios from 'axios';

const AllPolies = () => {
  const [allPolysArray, setAllPolysArray] = useState([]);
  const [newExpiry, setNewExpiry] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/allpolies')
      .then((res) => {
        setAllPolysArray(res.data.allPolies.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  },[])

  const deletePoly = (slug) => {
    axios
      .post('http://localhost:8000/api/deletepoly/' + slug)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const updateExpiry = (slug, expiresIn) => {
    axios
      .post('http://localhost:8000/api/updateexpiry/' + slug, {expiresIn})
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      }); 
  }

  return (
    <div className='all-polies'>
      {allPolysArray.map((poly, index) => {
        return (
          <div className='poly-container' key={index}>
              <h4>{poly.title}</h4>
              <a href={'https://'+poly.link} target='_blank' rel="noreferrer">{poly.link}</a>
              <button onClick={()=>{deletePoly(poly.slug)}}>Delete Poly</button>
              <b>Current Expiry Time: {poly.expiryDuration}</b>
              <span>Select New Expiry: </span>
              <select id='expiresIn' onChange={(e)=>setNewExpiry(e.target.value)}>
                <option value='1 day'>1 day</option>
                <option value='10 minutes'>10 minutes</option>
                <option value='1 minute'>1 minute</option>
              </select>
              <button onClick={()=>{updateExpiry(poly.slug, newExpiry)}}>Update Expiry</button>
          </div>
        )})}
    </div>
  )
}

export default AllPolies;