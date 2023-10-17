import logo from "../assets/future_logo.png";
import { useState } from "react";
import { Modal } from "antd";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import employee from "../assets/employee.jpg";

const Forgotpassword = () => {
  var [email, setEmail] = useState("");

  function success(message) {
    const modal = Modal.success({
      title: "Success notification",
      content: message,
    });
    setTimeout(() => modal.destroy(), 6000);
  }
  function failure(message) {
    const modal = Modal.error({
      title: "Failure notification",
      content: message,
    });
    setTimeout(() => modal.destroy(), 5000);
  }
  var forgotAction = (e, email) => {
    e.preventDefault();
    if (email !== "") {
      const auth = getAuth();
      sendPasswordResetEmail(auth, email)
        .then(() => {
          //setEmail('');
          success("Password reset link has been sent to : " + email);
        })
        .catch((err) => {
          setEmail("");
          failure(String(err));
        });
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
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem", height: "100%" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form
                      onSubmit={(e) => {
                        forgotAction(e, email);
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
                        Let's get your account back
                      </h5>

                      <div className="form-outline mb-4">
                        <input
                          required
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          value={email}
                          type="email"
                          id="form2Example17"
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="form2Example17">
                          Email address
                        </label>
                      </div>

                      <div className="pt-1 mb-4">
                        <button
                          type="submit"
                          className="btn btn-dark btn-lg btn-block"
                        >
                          Request Recovery
                        </button>
                      </div>
                      <p className="mb-2 pb-lg-2">
                        A reset link will be sent to the email you provide here.
                      </p>
                      <p className="mb-5 pb-lg-2">
                        ⚠️Reset link may not be deliverd to none existing email
                        in out database.
                      </p>
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

export default Forgotpassword;
