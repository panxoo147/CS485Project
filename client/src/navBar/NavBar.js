import React from 'react';
import { Navbar,Nav,Form,Button,Collapse} from 'react-bootstrap';
import Login from '../login/LoginComponent'
import icon from './review.svg'

class NavBar extends React.Component {
  constructor(){
    
    super();

    this.state = {showLoginForm : false,open:false}
    
   
  }
  onClickLogin(e){
    this.setState({showLoginForm:!this.state.showLoginForm})
  }


  render(){
  return (
  <div style={{zIndex:11,minWidth:1050,position:"fixed",top:0,width:"100%"}}>
    
    <Navbar  bg="dark" variant="dark" style={{boxShadow:"0px 2px 8px #000000"}} >
            
    <Navbar.Brand href="/" >
      {<img
        src={icon}
        width="30"
        height="30"
        style={{marginRight:10}}
        
        className="d-inline-block align-top"
        alt="icon"
      />}
      Course Review
    </Navbar.Brand>


    <Nav className="mr-auto">
      <Nav.Link href="/course">Course List</Nav.Link>
    </Nav>
    
      
    <Form inline>
        <Button onClick={this.onClickLogin.bind(this)} variant="outline-info">Login</Button>
    </Form>

  </Navbar>
    <Collapse in={this.state.showLoginForm}>
          <div>
            <Login/>
          </div>
    </Collapse>
  </div>

  );}
}

export default NavBar;