import "../App.css";
import userProf from "../man.png";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import React, { useState } from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";
import iconform from "../firmworker.png";
import Header from "./Header";
import { useContext } from "react";
import { AuthContext } from "../Globals/AuthUserManager";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { doc, deleteDoc,setDoc } from "firebase/firestore";
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal, Space } from 'antd';
import { db } from "../Dbconfig/dbconfig";

const DataList = () => {
  const { confirm } = Modal;
  const navigate = useNavigate();
  function success(message) {
    const modal = Modal.success({
      title: "Success notification",
      content: message,
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
  const showDeleteConfirm = (itemid) => {
    confirm({
      title: 'Are you sure delete this item?',
      icon: <ExclamationCircleFilled />,
      content: 'Employee about to be removed.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteDoc(doc(db, "Employees", itemid)).then(() => {
      revalidator.revalidate();
      success("Employee removed succesful");
    }).catch((err) => {
      failure(String(err));
    });
      },
      onCancel() {
        
      },
    });
  };
  const { adminEmail, adminUid } = useContext(AuthContext);
  useEffect(() => {
    if (
      adminEmail === "" ||
      adminUid === "" ||
      typeof adminEmail === "undefined" ||
      typeof adminUid === "undefined"
    ) {
      navigate(`/`);
    }
  }, []);

  const [position, setposition] = useState("");
  const [Name, setName] = useState("");
  const [Surname, setSurname] = useState("");
  const [emailUser, setEmail] = useState("");
  const [phone, setphone] = useState("");
  const [uId, setUid] = useState([]);
  let [iserror, setMessage] = useState("");

  const dropmenu = [
    {
      id: 1,
      optn: "CEO",
    },
    {
      id: 2,
      optn: "Manager",
    },
    {
      id: 3,
      optn: "Intern",
    },
    {
      id: 4,
      optn: "CFO",
    },
    {
      id: 5,
      optn: "Other",
    },
  ];

  var Updatedb = () => {
    const Poschoices = ["CEO", "Manager", "Intern", "CFO", "Other"];
    if (Surname.trim().length < 1) {
      setMessage("Please input a valid surname.");
    }
    if (Name.trim().length < 1) {
      setMessage("Please input a valid name.");
    }
    var re = /\S+@\S+\.\S+/;
    if (emailUser.trim().length < 1 || re.test(emailUser.trim()) === false) {
      setMessage("Please input a valid email.");
    }
    if (position.trim().length < 1) {
      setMessage("Select a valid employee position.");
    }
    let result = /^\d+$/.test(phone.trim());
    if (phone.trim().length !== 10 || result === false) {
      setMessage("Input valid phone umber of 10 digits.");
    }
    if (Poschoices.includes(position.trim()) === false) {
      setMessage(
        "Invalid manual position entered. Please Select from the given"
      );
    }

    if (
      Surname.trim().length > 0 &&
      Name.trim().length > 0 &&
      emailUser.trim().length > 0 &&
      re.test(emailUser.trim()) === true &&
      position.trim().length > 0 &&
      phone.trim().length === 10 &&
      result === true &&
      Poschoices.includes(position.trim()) === true
    ) {
      setMessage("");

      var submition = {
        name: Name,
        surname: Surname,
        Position: position,
        email: emailUser,
        phone: phone,
        profile_img: "default image assigned",
        edit: "",
        delete: "",
      };
      
      setDoc(doc(db, 'Employees', uId.trim()), submition, { merge: true }).then(() => {
        setOpenModal(false);
        success("Updated succesful");
        revalidator.revalidate();
    }).catch((err) => {
        failure(String(err));
    });

      
    }
  };
  const [openModal, setOpenModal] = useState(false);

  var empdata = useLoaderData();
  const dataemp=[];
  empdata.forEach((doc) => {
   dataemp.push({id:(doc.id),...doc.data()});
 });
  const revalidator = useRevalidator();
  var actionClose = () => {
    setOpenModal(false);
  };
  var handleDelete = (itemid) => {
    showDeleteConfirm(itemid);
  };
  var handleUpdate = (rowData) => {
    setOpenModal(true);
    setUid(rowData.id);
    setposition(rowData.Position);
    setName(rowData.name);
    setSurname(rowData.surname);
    setEmail(rowData.email);
    setphone(rowData.phone);
  };
  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (pages, sizePerPage) {},
    onSizePerPageChange: function (pages, sizePerPage) {},
  });
  const columns = [
    { dataField: "id", text: "ID", sort: true, filter: textFilter() },

    { dataField: "name", text: "Name", sort: true, filter: textFilter() },

    { dataField: "surname", text: "surname", sort: true, filter: textFilter() },
    
    {
      dataField: "Position",
      text: "Position",
      sort: true,
      filter: textFilter(),
    },
    { dataField: "email", text: "Email", sort: true, filter: textFilter() },
    { dataField: "phone", text: "Phone", sort: true },
    {
      dataField: "profile_img",
      text: "Image",
      editable: false,
      formatter: (cellContent, row) => (
        <div>
          <img
            className="logo"
            src={userProf}
            height="45px"
            width="45px"
            alt="dummy employee"
          />
        </div>
      ),
    },
    // all your columns and data
    {
      dataField: "edit",
      text: "Update",
      editable: false,
      formatter: (cellContent, row) => (
        <button
          className="btn btn-success btn-xs"
          onClick={() => handleUpdate(row)}
        >
          Update
        </button>
      ),
    },
    {
      dataField: "delete",
      text: "Remove",
      editable: false,
      formatter: (cellContent, row) => (
        <button
          className="btn btn-danger btn-xs"
          onClick={() => handleDelete(row.id)}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    
<div style={{width:'100%'}}>
      <Header />
      <div className="DataList container">
        {dataemp && dataemp.length > 0 ? (
          <Space wrap>
          <BootstrapTable
            pagination={pagination}
            filter={filterFactory()}
            bootstrap4
            keyField="id"
            columns={columns}
            data={dataemp}
          />
          </Space>
        ) : (
          "Loading..."
        )}
        {openModal && (
          <div>
            {
              <div className="Modal">
                <div>
                  <button
                    style={{ margin: "5px" }}
                    type="button"
                    onClick={() => actionClose()}
                    className="btn btn-danger"
                  >
                    close
                  </button>
                  <div className="container text-center">
                    <div className="row">
                      <div className="col-lg-6">
                        <img
                          style={{ height: "100%", width: "100%" }}
                          alt="someImage"
                          src={iconform}
                        />
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <input
                            type="text"
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="form-control"
                            name="inputname"
                            placeholder="someone's name"
                          />

                          <input
                            type="text"
                            onChange={(e) => setSurname(e.target.value)}
                            value={Surname}
                            required
                            className="form-control"
                            name="inputsurname"
                            placeholder="someone's surname"
                          />

                          <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={emailUser}
                            required
                            className="form-control"
                            name="inputemail"
                            placeholder="name@example.com"
                          />

                          <input
                            type="tel"
                            onChange={(e) => setphone(e.target.value)}
                            value={phone}
                            maxLength="10"
                            required
                            className="form-control"
                            name="inputphone"
                            placeholder="071 000 0000"
                          />

                          <input
                            type="text"
                            required
                            readOnly
                            value={position}
                            onChange={(e) => {
                              setposition(e.target.value);
                            }}
                            className="form-control"
                            name="inputpos"
                            placeholder="employee Position"
                          />
                          <div
                            className="dropdown"
                            style={{ textAlign: "start", margin: "5px" }}
                          >
                            <h5 defaultValue>Employee Position</h5>
                            <select
                              multiple={true}
                              value={position}
                              id="dropdownMenu2"
                              onChange={(e) => setposition(e.target.value)}
                              className="form-select"
                              aria-label="Default select example"
                            >
                              {dropmenu.map((item) => (
                                <option key={item.id} value={item.optn}>
                                  {item.optn}
                                </option>
                              ))}
                            </select>
                            <button
                              style={{ marginLeft: "5px" }}
                              type="button"
                              onClick={() => Updatedb()}
                              className="btn btn-success"
                            >
                              save
                            </button>
                          </div>

                          {iserror && <p>{iserror}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        )}
      </div>
    </div>
    
    
  );
};

export default DataList;
