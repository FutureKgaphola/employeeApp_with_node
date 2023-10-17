import logo from "../assets/future_logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../Dbconfig/dbconfig";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { Modal } from "antd";
import sendEmail from "../mailer/sendEmail";
import employee from "../assets/employee.jpg";

const SignUp = () => {
  function success() {
    const modal = Modal.success({
      title: "Success notification",
      content: "Administrator added succesful",
    });
    setTimeout(() => modal.destroy(), 5000);
  }
  function failure(message) {
    const modal = Modal.error({
      title: "Failure notification",
      content: message,
    });
    setTimeout(() => modal.destroy(), 5000);
  }
  var [email, setEmail] = useState("");
  var [pass, setpassword] = useState("");
  var [adminName, setAdmin] = useState("");

  const addAdmin = async (e) => {
    e.preventDefault();
    if (email !== "" && pass !== "" && adminName !== "") {
      const auth = getAuth();
      const data = {
        email: email,
        designation: "Administrator",
        adminName: adminName,
      };
      try {
        e.target.disabled = true;
        const result = await createUserWithEmailAndPassword(auth, email, pass);
        setDoc(doc(db, "Admins", result.user.uid.trim()), data)
          .then(() => {
            success();
            //setEmail("");
            setpassword("");
            //setAdmin("");
            e.target.disabled = false;
            //trigger backend to send email
            sendEmail(email, adminName);
          })
          .catch((err) => {
            console.log("not submitted");
            failure(String(err));
            e.target.disabled = false;
          });
      } catch (error) {
        e.target.disabled = false;
        console.log(error);
        failure(String(error));
      }
    }
  };
  return (
    <section className="vh-100" style={{ backgroundColor: "#ffffff" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src={employee}
                    alt="register form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form
                      onSubmit={(e) => {
                        addAdmin(e);
                      }}
                    >
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <img
                          src={logo}
                          alt={"logo"}
                          style={{ width: "50px", height: "50px" }}
                        />
                        <span className="h1 fw-bold mb-0">Employee App</span>
                      </div>

                      <h5
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Sign up for an account
                      </h5>

                      <div className="form-outline mb-4">
                        <input
                          onChange={(e) => {
                            setAdmin(e.target.value);
                          }}
                          value={adminName}
                          name="name"
                          type="text"
                          required
                          id="form2Example17"
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="form2Example17">
                          Admin Name
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          value={email}
                          type="email"
                          name="email"
                          required
                          id="emailfield"
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="emailfield">
                          Email address
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          onChange={(e) => {
                            setpassword(e.target.value);
                          }}
                          value={pass}
                          type="password"
                          required
                          id="form2Example27"
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="form2Example27">
                          Password
                        </label>
                      </div>
                      <p>{pass}</p>

                      <div className="pt-1 mb-4">
                        <button
                          type="submit"
                          className="btn btn-dark btn-lg btn-block"
                          href="/Home"
                        >
                          Signup
                        </button>
                      </div>

                      <Link to={"/"} className="small text-muted">
                        Back to login
                      </Link>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
