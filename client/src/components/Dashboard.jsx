import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import deleteAccount from '../utils/deleteAccount'
import axios from 'axios'

const Dashboard = ({user, setUser}) => {
   document.title = "AutoGenie - Dashboard"
   const [proposal, setProposal] = useState({})
   const navigate = useNavigate()
   
   useEffect(() => {
      navigate(!user?.logged && "/")
   }, [user, navigate])
   useEffect(() => {
      user && axios.get(`${process.env.REACT_APP_PROPOSAL || "/api/v1/proposal"}/${user?._id}`)
         .then(res => {
            setProposal(res.data)
         })
         .catch(console.log)
   }, [user])

   return (
      <div className="Dashboard">
         <div className="dashboard-header">
            <h4>Welcome, {user && user.email}</h4>
            <h5>User dashboard</h5>
         </div>
         <hr />
         <div className="dashboard-body">
            <div className="dashboard-account">
               <h6>Account: </h6><span>{ user && user.email }</span>
               <div className={`account-status status-${user?.acStatus === "Active" ? "live" : "drop"}`}>
                  <b>{user?.acStatus === "Active" ? "LIVE" : "DROP"}</b>
               </div>
            </div>
            <div className="plans">
               <div className={`plan-1 plan-each status-${user?.acStatus === "Active" ? "live" : "drop"}`}>
                  <i className="material-icons">account_circle</i>
                  <h5>{user?.acStatus ?? "-"}</h5>
                  <p>Account</p>
               </div>
               <div className="plan-3 plan-each">
                  <i className="material-icons">checklist_rtl</i>
                  <h5>{proposal?.proposed ?? "-"}</h5>
                  <p>Proposals proposed</p>
               </div>
               <div className="plan-4 plan-each">
                  <i className="material-icons">done_all</i>
                  <h5>{proposal?.approved ?? "-"}</h5>
                  <p>Proposals approved</p>
               </div>
            </div>
            <hr />
            <div className="ai-link">
               <div className="get-started">
                  <i className="material-icons">star</i>
                  <h5>Get started</h5>
               </div>
               <Link to="/ai">Personalize with AI</Link>
            </div>
            <hr />
            <div className="danger-zone">
               <div className="start-danger">
                  <i className="material-icons">warning</i>
                  <h5>Danger zone</h5>
               </div>
               <div className="danger-delete">
                  <button className="btn red account-delete-btn"
                     onClick={e => deleteAccount(user._id, setUser)}
                  >Delete my account</button>
               </div>
            </div>
         </div>
      </div>
   );
}
 
export default Dashboard;