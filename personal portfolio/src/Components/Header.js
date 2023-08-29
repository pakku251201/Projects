import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Header = () => {
    let activeStyle ={
        color:'#FF8C00',
    }
  return (
    <div className='header'>
        <Navbar expands='lg' fixed="top">
            <Container>
                <Navbar.Brand style={{color:'#FF8C00', fontFamily:'optima, sans-serif', fontSize:30}}>Pratheek P Rao</Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse className="justify-content-end">
                    <Nav className='ml-auto' style={{color:'#FF8C00', fontFamily:'optima, sans-serif', fontSize:25}}>
                        <NavLink to="/" className="nav-link" style={({isActive}) => (isActive ? activeStyle:undefined)}>Home</NavLink>
                        <NavLink to="/project" className="nav-link" style={({isActive}) => (isActive ? activeStyle:undefined)}>Projects</NavLink>
                        <NavLink to="/about" className="nav-link" style={({isActive}) => (isActive ? activeStyle:undefined)}>About</NavLink>
                        <NavLink to="/contact" className="nav-link" style={({isActive}) => (isActive ? activeStyle:undefined)}>Contact</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default Header