import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Mail, Lock } from "react-feather"
import Loader from '../components/Loader'
import axios from 'axios'

import Input from "../components/Input"
import Button from "../components/Button"
import Alert from "../components/Alert"
import toast from 'react-hot-toast';

export default function LoginForm({ onSubmit }) {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")
	const [loading, setLoading] = useState("")

	// const handleSubmit = async e => {
	// 	e.preventDefault()
	// 	setLoading(true)
	// 	const resp = await onSubmit({email, password})
	// 	setLoading(false)
	// 	if (resp.status == "error") {
	// 		setError(resp.message)
	// 	}
	// }
	const navigate= useNavigate();

	const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://odoo-repo-2.onrender.com/api/v1/user/signin", {
        email,
        password
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      })
      console.log("Sigin Successfull", response.data);
      toast.success(response.data.message);
      //localStorage.setItem("user", JSON.stringify(response.data.token));
      localStorage.setItem("userToken", JSON.stringify({
        token: response.data.token,
        user: response.data.user
      }));


      navigate("/")
    } catch (error) {
      if(error.response) {
        setError(error.response.data.errors || "Error in Signin")
      }
    }
  }

	useEffect(() => {
		return () => {
			setLoading(false)
		}
	}, [])

	return (
		<form
			className="flex items-center flex-col space-y-2"
			onSubmit={handleSubmit}
		>
			<Input 
				value={email}
				onChange={e => setEmail(e.target.value)}
				icon={<Mail width={20} height={20} />}
				type="email" placeholder="Email" required />
			<Input 
				value={password}
				icon={<Lock width={20} height={20} />}
				onChange={e => setPassword(e.target.value)}
				type="password" placeholder="Password" required />

			{error && <Alert heading="Error!" body={error} danger />}

			<Button 
				className="w-full !mt-6 !text-base !rounded-full" 
				type="submit"
				disabled={loading}
			>
				{loading ? <Loader /> : "Login"}
			</Button>
				
			<Link to="/register">
				<Button link>
					Create an account
				</Button>
			</Link>
		</form>
	)
}