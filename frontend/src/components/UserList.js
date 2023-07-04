  import React,{useState,useEffect} from 'react';
  import Button from "./Button";
  import { Link, useNavigate } from 'react-router-dom';


  const UserList = () => {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
      fetch("http://localhost:8085/api/manage")
      .then((res) => {
        return res.json();
      }).then((resp) => {
        setUsers(resp);
      }).catch((err) => {
        console.log(err.message);
      })
  }, [])
    

  const handleEditUser = (id) => {
    navigate("/edit/user/" + id);
  }

  const handleDeleteUser = (userId) => {
    // Implement the logic to send an API request to delete the user
    fetch(`http://localhost:8085/api/manage/${userId}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Filter out the deleted user from the users array
        const updatedUsers = users.filter(user => user.id !== userId  );
        setUsers(updatedUsers);
      })
      .catch((err) => {
        console.log(`Failed to delete user with ID ${userId}: ${err.message}`);
      });
  };


    
    return (
      <div className="container">
        <div className="row my-5">
          <div className="col-md-10">
            <h2 style={{fontFamily : "cursive"}}>User List</h2>
          </div>
          <div className="col-md-2">
            <Link to="/create/user">
                <Button value = "Add User" class= "btn btn-primary"/>
            </Link>
          </div>
        <table className="table my-5">
          <thead>
              <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile Number</th>
              <th scope="col">Actions</th>
              </tr>
          </thead>
          <tbody>
                    
                { users && users.length > 0 ? (
                  users.map(user => (
                    <tr key = {user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.mobile}</td>
                        <td>
                              <button className="btn btn-transparent border-success" onClick={() => handleEditUser(user.id)}>Edit</button>                
                              <button className="btn btn-transparent border-danger ms-5" onClick={() => handleDeleteUser(user.id)}>Delete</button>                
                            
                        </td>
                    </tr>
                ))
                ) : (
                  <tr>
                    <td colSpan={4}>No Users Found</td>
                  </tr>
                )
                }
            
          </tbody>
        </table>
      </div>
      </div>
    )
  }

  export default UserList
