import React from 'react'

import styles from "./Form.module.css";

import ReCAPTCHA from "react-google-recaptcha";
import {useState, useEffect} from "react"

const url = "http://localhost:3000/user"

const Form = (user) => {

    const [users, setUsers] = useState([])

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [assunto, setAssunto] = useState("")
    const [message, setMessage] = useState("")

    const [error, setError] = useState(null)

    
    useEffect(() => {
  
      async function fetchData() {
        try {
          const res = await fetch(url)
  
          const data = await res.json()
  
          setUsers(data)
        } catch (error) {
          setError("Houve algum erro ao carregar os dados!")
        }
      }
  
      fetchData()
    }, [])
  
    const handleSubmit = async (e) => {
      e.preventDefault()
  
      const user = {
        name,
        email,
        assunto,
        message
      }
  
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
  
      const addedUser = await res.json()
  
      setUsers((prevUsers) => [...prevUsers, addedUser])
  
      setName("")
      setEmail("")
      setAssunto("")
      setMessage("")
    
    };  

    

  return (
    <div>
        <div className={styles.form}>
        <h1>FALE CONOSCO</h1>
        <form onSubmit={handleSubmit}>
            <div className={styles.input_group}>
              <div className={styles.input_box}>
                <label>
                    <input
                        type="text"
                        name='name'
                        maxLength='30'
                        required
                        placeholder='Nome'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
              </div>
              <div className={styles.input_box}>
                <label>
                    <input
                        type="email"
                        name='email'
                        maxLength="40"
                        required
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
              </div>
              </div>
              <div className={styles.input_box}>
                <label>
                    <input
                          type="text"
                          name='assunto'
                          maxLength="50"
                          required
                          placeholder='Assunto'
                          value={assunto}
                          onChange={(e) => setAssunto(e.target.value)}
                    />
                </label>
              </div>
              <div className={styles.input_box}>
                <label>
                    <textarea
                          name='message'
                          maxLength="200"
                          required
                          placeholder='Mensagem'
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                    />
                </label>
              </div>
            
            <div className={styles.captcha}>
            <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            />
        </div>
            <input className={styles.btn} type="submit" value="Enviar" />
            {!error && <p>{error}</p>}
        <ul>{users.map((user) => (
          <li key={user.id}>
            {user.name} <br/>
            {user.email} <br/>
            {user.assunto} <br/>
            {user.message} <br/>
          </li>
        ))}</ul>
        </form>
    </div>
    </div>
  )
}

export default Form