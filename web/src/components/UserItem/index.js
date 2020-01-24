import React from 'react';

import './styles.css';

function UserItem({ user }){

  return (
    <li className="user-item">
    <header>
      <img src={user.avatar_url} alt={user.name}></img>
      <div className="user-info">
        <strong>{user.name}</strong>
        <span>{user.techs.join(', ')}</span>
      </div>
    </header>
    <p>{user.bio}</p>
    <a href= {`https://github.com/${user.github_username}`}>Acessar Perfil no GitHub</a>
  </li>
  );
}

export default UserItem;