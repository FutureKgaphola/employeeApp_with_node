import { useState } from "react";
import {Form, redirect,useActionData} from 'react-router-dom';
import Header from "./Header";
import { Modal } from "antd";
import { db } from "../Dbconfig/dbconfig";
import { collection, addDoc } from "firebase/firestore"; 
import sendEmail from "../mailer/sendEmail";

export async function Addemployeeaction({request}){
    
    function success() {
        const modal = Modal.success({
          title: "Success notification",
          content: "Employee added succesful",
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
    const Poschoices=['CEO','Manager','Intern','CFO','Other'];
    const data=await request.formData()
    const submition={name:data.get('inputname'),'surname':data.get('inputsurname'),'Position':data.get('inputpos'),
    email:data.get('inputemail'),phone:data.get('inputphone'),'profile_img':"default image assigned","edit": "",
    "delete": ""};
    if(data.get('inputsurname').trim().length<1)
    {
        return {errorsur:'Please input a valid surname.'}
    }
    if(data.get('inputname').trim().length<1)
    {
        return {errorname:'Please input a valid name.'}
    }
    var re = /\S+@\S+\.\S+/;
    if(data.get('inputemail').trim().length<1 || re.test(data.get('inputemail').trim())===false)
    {
        return {errorname:'Please input a valid email.'}
    }
    if(data.get('inputpos').trim().length<1)
    {
        return {errorpos:'Select a valid employee position.'}
    }
    let result = /^\d+$/.test(data.get('inputphone').trim());
    if(data.get('inputphone').trim().length!==10 || result===false)
    {
        return {errorphone:'Input valid phone umber of 10 digits.'}
    }
    if(Poschoices.includes(data.get('inputpos').trim())===false)
    {
        return {errorposmanual:'Invalid manual position entered. Please Select from the given'}
    }
    else{
        addDoc(collection(db, "Employees"), submition).then(() => {
            success();
            sendEmail(data.get('inputemail').trim().toLowerCase(),data.get('inputname').trim().toLowerCase());
        })
        .catch((err) => {  
          console.log("not submitted");
          failure(String(err));
        });

        return redirect('/DataList');
    }
}

const Addemployee = () => {
    const dataError=useActionData();
    const [position,setposition]=useState([]);
    const dropmenu=[
        {
            'id':1,
            'optn': 'CEO'
        },
        {
            'id':2,
            'optn': 'Manager'
        },
        {
            'id':3,
            'optn': 'Intern'
        },
        {
            'id':4,
            'optn': 'CFO'
        },
        {
            'id':5,
            'optn': 'Other'
        }
    ];

    return ( 
        <div>
            <Header/>
            <div className="DataList">
                <div className="container">
                    <div className="row">
                            
                        <div className="col-lg-4">

                            </div>

                                <div className="col-lg-4">
                                    
                                    <Form id="addform" method="post" action="/Addemployee">
                                        <div className="mb-3">
                                            
                                            <input type="text" required className="form-control" name="inputname" placeholder="someone's name"/>
                                            
                                            <input type="text" required className="form-control" name="inputsurname" placeholder="someone's surname"/>
                                        
                                            <input type="email" required className="form-control" name="inputemail" placeholder="name@example.com"/>
                                            
                                            <input type="tel" maxLength='10' required className="form-control" name="inputphone" placeholder="071 000 0000"/>

                                            <input type="text" required readOnly value={position} onChange={(e)=>{setposition(e.target.value)}} className="form-control" name="inputpos" placeholder="employee Position"/>
                                            <div className="dropdown" style={{textAlign:"start",margin:"5px"}}>
                                            <h5 defaultValue>Employee Position</h5>
                                            <select multiple={true} value={position} id="dropdownMenu2"
                                            onChange={(e)=>setposition(e.target.value)} className="form-select" aria-label="Default select example">
                                                
                                                {
                                                    dropmenu.map((item)=>(
                                                        
                                                        <option key={item.id} value={item.optn}>{item.optn}</option> 
                                                    ))
                                                }
                                 
                                            </select>
                                                <button style={{marginLeft:"5px"}} 
                                                type="submit"
                                                className="btn btn-success"
                                                >save</button>
                                                
                                            </div>

                                        </div>
                                    </Form>
                                {dataError && dataError.errorpos && <p>{dataError.errorpos}</p>}
                                {dataError && dataError.errorphone && <p>{dataError.errorphone}</p>}
                                {dataError && dataError.errorposmanual && <p>{dataError.errorposmanual}</p>}
                                {dataError && dataError.errorsur && <p>{dataError.errorsur}</p>}
                                {dataError && dataError.errorname && <p>{dataError.errorname}</p>}
                                </div>

                            <div className="col-lg-4">

                        </div>
                    </div>
                </div>
            </div>

        </div>
        
     );
}
 
export default Addemployee;