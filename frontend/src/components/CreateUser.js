import React,{useState} from 'react'
import {Link, useNavigate } from 'react-router-dom';

const CreateUser = (props) => {


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobileNo] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();
      const users = {
        name,
        email,
        mobile
      };

      try {
        const response = await fetch("http://localhost:8085/api/manage/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(users),
        });
    
        if (response.ok) {
          alert("User has been added successfully");
          navigate("/");
        } else {
          throw new Error("Failed to add user");
        }
      } catch (error) {
        console.log(error.message);
      }
  }

  return (
    <>
      <div className="container">
      <div className="row my-5">
        <div className="col-md-10">
          <h2 style={{fontFamily : "cursive"}}>Add User</h2>
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
                <input type="tel" name="mobileNo" onChange={e => setMobileNo(e.target.value)} className="form-control" id="exampleNumber" value={mobile} required pattern="\d{10}" title="Please enter a 10-digit mobile number" />
            </div>
            <div className="row">
              <div className="col-md-10">
                  <button type="submit" className="btn btn-primary">Add new user</button>
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
  )
}

export default CreateUser
