import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import M from "materialize-css"
import { handleEnter } from '../../utils/handleEnter'
import "materialize-css/dist/css/materialize.min.css"
import { GoogleGenerativeAI } from "@google/generative-ai";
import MarkDown from "react-markdown"
import $ from "jquery"
import "../../index.css"

const genai = new GoogleGenerativeAI(process.env.REACT_APP_GENAI_KEY);

const Chatbot = ({user}) => {
   document.title = "AutoGenie - AI"
   const navigate = useNavigate()
   
   const [input, setInput] = useState("")
   const [input2, setInput2] = useState("")
   const [error, setError] = useState("")
   const [loading, setLoading] = useState(false)
   const [history, setHistory] = useState([])

   useEffect(() => {
      navigate(!user?.logged && "/")
   }, [user, navigate])
   useEffect(() => {
      M.AutoInit();
   }, [])
   useEffect(() => {
      const convo = $(".Chatbot-btn")
      convo.text(loading ? "cached" : "send")
      if (convo.text() === "cached")
         convo.addClass("chatbot-btn-rotate")
      return () => convo.removeClass("chatbot-btn-rotate")
   }, [loading])

   const handleSetHistory = (role, text) => {
      setHistory(prevHistory => [
         ...prevHistory, { role, parts: [{text}] }
      ]);
   }
   
   const generateContent = async() => {
      if (!input) {
         alert("Enter prompt to continue..")
         return
      }
      setLoading(true)
      try {
         const model = genai.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: "Your name is AutoGenie. Reply with your name when user calls you for the very first time."
         });
         const chat = model.startChat({
            history,
            generationConfig: {
            //   maxOutputTokens: 100,
            },
         });
      
         const txt = input
         setInput2(input)
         setInput("")
         handleSetHistory("user", txt)
         const result = await chat.sendMessage(txt);
         const response = result.response;
         const text = response.text();
         // console.log(text);
         handleSetHistory("model", text)
         setError(null)
         setLoading(false)
      } catch (err) {
         console.log(err)
         setLoading(false)
         alert("There is an error processign your request!")
      }
   }

   return (
      <div className="Chatbot container">
         <div className="message-text">
            { error }
         </div>
         <div className="data-container card-panel">
            { user?.acStatus === "Active" ?
               !input2 && <div className="dummyText">
                  <div className="dummy-intro">
                     <h3>Hello, {user?.email}</h3>
                  </div>
                  <h4>How can I help you?</h4>
               </div> :
               <h5 className="dummyText">Please activate the account to continue.</h5>
            }
            <div className="conversation">
               {history.map(({role, parts}, index) => (
                  <div
                     key={index}
                     className={`message ${role === 'user' ? 'user' : 'ai'}-message`}
                  >
                     <MarkDown>{parts[0].text}</MarkDown>
                  </div>
               ))}
            </div>
         </div>
         <div className="input-container" style={{pointerEvents:user?.acStatus === "Inactive"&&"none"}}>
            <i className="material-icons">attach_file</i>
            <input id="Chatbot-input" type="text" placeholder="Enter prompt.."
               value={input}
               onKeyDown={e => handleEnter(e, ".Chatbot-btn") }
               onChange={e => setInput(e.target.value) }
            />
            <i className="material-icons Chatbot-btn" type="button"
               onClick={ generateContent }
            >send</i>
         </div>
      </div>
   );
}
 
export default Chatbot;