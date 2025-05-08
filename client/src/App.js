import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "reactstrap";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Profile from "./Components/Profile";
import Register from "./Components/Register";
import Login from "./Components/Login";
import WelcomePage from './Components/WelcomePage';
import { useSelector } from "react-redux";
import AddBook from "./Components/AddBook";
import FindLibraries from "./Components/FindLibraries";

const App = () => {
  const { user } = useSelector((state) => state.users);

  return (
    <Container fluid>
      <Router>
        <Row>
          {user ? <Header /> : null}
        </Row>
        <Row className="main">
        <Routes>
  <Route path="/" element={<WelcomePage />} />
  <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
  <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />
  <Route path="/add-book"  element={<AddBook />} />
  <Route path="/edit-book/:id" element={<AddBook />} />
  {/* <Route path="/find-libraries" element={<FindLibraries />} /> */}



</Routes>
        </Row>
        <Row>
          {user ? <Footer /> : null}
        </Row>
      </Router>
    </Container>
  );
};

export default App;