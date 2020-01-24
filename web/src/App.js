import React, { useState ,useEffect } from 'react';
import api from './services/api';

import './global.css';
import './app.css';
import './Sidebar.css';
import './Main.css';

import UserForm from './components/UserForm';
import UserItem from './components/UserItem';


function App() {
  const [users, setUsers] = useState([]);


  useEffect(() =>{
    async function loadUsers(){
      const res = await api.get('/users');
      
      setUsers(res.data);
    }

    loadUsers();
  }, []);

  async function handleAddUser(data){

    const res = await api.post('/users', data)
  
    setUsers([... users, res.data]);
  }

  return ( 
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <UserForm onSubmit={handleAddUser} />
      </aside>
      <main>
        <ul>
          {users.map(user => (
            <UserItem key={user._id} user= {user}/>
          ))}
          
        </ul>
      </main>
    </div>
  );
}

export default App;
