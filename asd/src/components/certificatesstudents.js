import React, { useState } from "react";
// import displaycertificate from "./displaycertificate";
import NewWindow from 'react-new-window';


function Certificatesstudents(props){

    const studentname=props.studentid;
        const certificateid=props.id;
        const adminid = props.admin;
        const [edited,setEdited]  = useState(false);
       
       function update(){
           const point = document.getElementById("points").value ;
           const comment = document.getElementById("comments").value ;
           fetch(`http://localhost:8000/admin/${adminid}/${studentname}/updatecertificate/${certificateid}`,{
            
            method:"POST",
            headers:{
              'Content-Type':'application/json',
              Authorization:'Bearer '+localStorage.getItem('token')+ ' '+localStorage.getItem('user')
            },
            body:JSON.stringify({
                points:point,
                comments:comment
          
    
              })
            }).then(r=>{console.log(r);
                setEdited(false);
            }).catch(err=>console.log(err));
              
            
        }
        
    


        function edit(){
            setEdited(true);
        }

        function opencertificate(link){
            window.open(link);
        }
        function clicking(event){
            event.preventDefault();
            handleclick();
        }
    function handleclick(){
     
     fetch(`http://localhost:8000/certificates/admin/${adminid}/${studentname}/viewcertificates/${certificateid}`, {
            
        headers:{
            
          Authorization:'Bearer '+localStorage.getItem('token')+' '+ localStorage.getItem('user')
        }})
        .then(res=>res.json())
        .then(result=>{
           console.log(result);
             opencertificate(result.link);
        } ).catch(err=>{
            console.log(err);
        });
    
return;
    
    }
    return <div>
        {edited === false ?<div>
            <h5>Title :{props.title}</h5>
        <h6>Category :{props.category}</h6>
        <p>points:{props.points}</p>
        {/* <input value={props.comments}/> */}
        <p>Comments:{props.comments}</p>
        <button onClick={clicking}>View Certificate</button>
        <button onClick={edit}>edit</button>
        </div>: <div>
        <h5>Title :{props.title}</h5>
        <h6>Category :{props.category}</h6>
        {/* <p>points:{props.points}</p> */}
        <input id="points"/>
        
        <input id="comments" />
        <button onClick={clicking}>View Certificate</button>
        <button onClick={update}>update</button>
        
            </div>}
       
        {/* <p></p> */}
        
        {/* <img src={path+props.filepath}></img> */}
        
        
        </div>
}

export default Certificatesstudents;