import React from 'react';

//import onlineIcon from '../../icons/onlineIcon.png';

import './styles.css';

const TextContainer = ({ users }) => (
  <div className="text-container">
    <div>
      <h6>People currently chatting:</h6>
      <div className="activeContainer">
        <div>
          {users &&
            <>
              {users.map(({name}) => (
                <div key={name} className="activeItem">
                  {name}
                  {/* <img alt="Online Icon" src={}/> */}
                </div>
              ))}
            </>
          }
        </div>
      </div>
    </div>
  </div>
);

export default TextContainer;