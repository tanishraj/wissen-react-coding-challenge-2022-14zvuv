import axios from 'axios';
import React, { useState } from 'react';

const Users = () => {
  const [userList, setuserList] = useState([]);

  const fetchData = () => {
    axios.get('https://reqres.in/api/users').then((res) => {
      console.log('Hellooooooo', res.data.data);
      setuserList(res.data.data);
    });
  };

  return (
    <div>
      <h1>User Lists</h1>

      <button onClick={fetchData}>Fetch Button</button>

      {userList.length ? (
        <div>
          <table border="1">
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((item) => (
                <tr key={item.id}>
                  <th>
                    <img src={item.avatar} alt={item.first_name} />
                  </th>
                  <th>
                    {item.first_name} {item.last_name}
                  </th>
                  <th>{item.email}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="controls">No Reacords Found.</div>
      )}
    </div>
  );
};

export default Users;
