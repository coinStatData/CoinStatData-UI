import React, { useRef } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import useResize from '../../hooks/useResize';
import { Link } from "react-router-dom";
import './style.css';

function NavBarComp(props) {

  const navRef = useRef(null);
  const { width, height } = useResize(navRef);

  return (
    <div ref={navRef} className="nav-outer-cont">
      <Navbar bg="dark" variant="dark">
        <Container className="nav-links-cont">
          <Link className="navbar-brand" to="/">
            <div className="nav-logo-title-cont">
              <img src="../../assets/csdLogo2.png" alt="" />
              <span>CoinStatData</span>
            </div>
          </Link>
          {width < 800 ? 
            (
              <NavDropdown title="Menu" className="custom-nav-dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item>
                  <Link className="drop-av-link" to="/">
                    <span>Home</span>
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link className="drop-av-link" to="/stat">
                    <span>Stat</span>
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link className="drop-nav-link" to="/optimization">
                    <span>Portfolio-Opt</span>
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link className="drop-nav-link" to="/chat">
                    <span>Chat-Room</span>
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item target="_blank" href="https://www.alienvogue.com">
                  <div className="drop-nav-link">
                    <span>Merchandise</span>
                  </div>
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Link className="nav-link" to="/stat">
                  <span>Stat</span>
                </Link>
                <Link className="nav-link" to="/optimization">
                  <span>Portfolio-Optimization</span>
                </Link>
                <a className="nav-link" target="_blank" href="https://www.alienvogue.com">
                  <span>Store</span>
                </a>
              </>
            )
          }
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBarComp;
