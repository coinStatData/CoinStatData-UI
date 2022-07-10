import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { Link } from "react-router-dom";
import './style.css';

function NavBarComp() {

  return (
    <div className="nav-outer-cont">
      <Navbar bg="dark" variant="dark">
        <Container>
         <Link className="navbar-brand" to="/">
            <div className="nav-logo-title-cont">
              <img src="../../assets/csdLogo2.png" alt="" />
              <span>CoinStatData</span>
            </div>
          </Link>
          <Nav className="me-auto">
            <Link className="nav-link" to="/stat"><span>Stat</span></Link>
            <Link className="nav-link" to="/optimization"><span>Portfolio-Optimization</span></Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBarComp;
