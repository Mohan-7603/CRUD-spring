import React, { useState, useEffect } from 'react';
import { useNavigate, useParams,Link } from 'react-router-dom';

const EditUser = () => {
  const { userid } = useParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    if (userid) {
      fetch(`http://localhost:8085/api/manage/${userid}`)
        .then((res) => res.json())
        .then((resp) => {
          setName(resp.name);
          setEmail(resp.email);
          setMobile(resp.mobile);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [userid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      name,
      email,
      mobile
    };

    fetch(`http://localhost:8085/api/manage/update/user/${userid}`,{
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        alert('Updated successfully');
        navigate('/');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <div className="container">
        <div className="row my-5">
          <div className="col-md-10">
            <h2 style={{ fontFamily: 'cursive' }}>Edit User</h2>
          </div>
          <form className='custom-table my-5' onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputName" className="form-label">Name</label>
                <input type="text" name='name' onChange={e => setName(e.target.value)}  className="form-control" id="exampleInputName" value={name} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleEmail" className="form-label">Email</label>
                <input type = "email" name='email'  onChange={e => setEmail(e.target.value)}  className="form-control" id="exampleEmail" value={email} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleNumber" className="form-label">Mobile Number</label>
                <input type = "number" name='mobileNo'  onChange={e => setMobile(e.target.value)}  className="form-control" id="exampleNumber" value={mobile} required/>
            </div>
            <div className="row">
              <div className="col-md-10">
                  <button type="submit" className="btn btn-primary">Update user</button>
              </div>
              <div className="col-md-2">
                  <Link to = "/">
                      <button type='button' className="btn btn-primary">Back</button>
                  </Link>
              </div>
            </div>
        </form>
        </div>
      </div>
    </>
  );
};

export default EditUser;
