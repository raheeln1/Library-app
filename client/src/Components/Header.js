import { Navbar, Nav, NavItem } from "reactstrap";
import bookslogo from "../Images/bookslogo.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Features/UsersSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async() => {
    dispatch(logout())
    await new Promise((resolve)=> setTimeout(resolve,100))
    navigate("/login");
}

 
  return (
    <>
      <Navbar className="header">
        <Nav>
          <NavItem>
            <Link>
              <img src={bookslogo} className="logo" alt=""/>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/home">Home</Link>
          </NavItem>
          <NavItem>
            <Link to="/profile">Profile</Link>
          </NavItem>
          <NavItem>
          <Link onClick={handleLogout}>Logout</Link>
          </NavItem>
         
          {/* <NavItem>
        <Link to="/find-libraries">Find Nearby Libraries
        </Link>
        </NavItem> */}
        <NavItem>
        <Link to="/add-book">add-book
        </Link>
        </NavItem>
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
