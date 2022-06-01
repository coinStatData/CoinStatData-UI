import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { Link } from "react-router-dom";
import './style.css';

function NavBarComp() {

  return (
    <div className="">
      <Navbar bg="dark" variant="dark">
        <Container>
         <Link className="navbar-brand" to="/">CoinStatData</Link>
          <Nav className="me-auto">
            <Link className="nav-link" to="/features">Features</Link>
            <Link className="nav-link" to="/donate">Donate</Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBarComp;
