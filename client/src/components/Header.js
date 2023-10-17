import { Link } from "react-router-dom";
import userProf from "../man.png";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Globals/AuthUserManager";
import { Modal } from "antd";

const Header = () => {

  const navigate = useNavigate();
  const { SetadminEmail, SetadminUid } = useContext(AuthContext);

  function failure(message) {
    const modal = Modal.error({
      title: "Failure notification",
      content: message,
    });
    setTimeout(() => modal.destroy(), 5000);
  }

  const SignOutAdmin=()=>{
  const auth = getAuth();
  signOut(auth).then(() => {
    SetadminEmail('');
    SetadminUid('');
    navigate(`/`);
  }).catch((error) => {

failure(String(error));
  });

  }
  return (
    <header>
      <div className="DataList">
        <img
          alt="icon"
          height={"30px"}
          width={"30px"}
          src={userProf}
          style={{
            alignSelf: "start",
            justifySelf: "start",
            margin: "5px",
            display: "flex",
            color: "white",
            backgroundColor: "#2b3452",
            borderRadius: "5px",
          }}
        />
        <Link to="/DataList" className="btn btn-primary btn-sm">
          Back Home
        </Link>
        <Link
          style={{ marginLeft: "5px" }}
          to="/Addemployee"
          className="btn btn-primary btn-sm"
        >
          Add Employee
        </Link>

        <button
        onClick={()=>SignOutAdmin()}
          style={{ marginLeft: "5px" }}
          className="btn btn-danger btn-sm"
        >
          Log out
        </button>

        <h2>Employee App</h2>
        <div className="container">
          <div className="row"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
