import React, { useEffect, useState } from 'react'

import { Link, useNavigate } from "react-router-dom"
import { User, Mail, Lock } from "react-feather"
import axios from 'axios'
import toast from 'react-hot-toast';

import Input from "../components/Input"
import Button from "../components/Button"
import Alert from "../components/Alert"
import Loader from '../components/Loader'   

export default function RegisterForm({ onSubmit }) {
	const [firstname, setFirstName] = useState("")
	const [lastname, setLastName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)

	const navigate = useNavigate()

// 	const handleSubmit = async e => {
// 		e.preventDefault()
// 		if (password.length < 6) {
// 			setError("password must be atleast 6 characters")
// 			return
// 		}
// 		if (password !== confirmPassword) {
// 			setError("passwords don't match")
// 			return
// 		}
// 		setLoading(true)
// 		// const resp = await onSubmit({fullname, email, password, confirmPassword})
// 		const [firstname, ...rest] = fullname.trim().split(" ")
// const lastname = rest.join(" ") || " "

// const resp = await onSubmit({ firstname, lastname, email, password, confirmPassword });

// 		setLoading(false)
// 		if (resp.status == "error") {
// 			setError(resp.message)
// 		}
// 	}

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/v1/user/signup", {
        firstname,
        lastname,
        email,
        password,
      },{
        withCredentials: true,
        headers:{
          "Content-Type": "application/json"
        }
      })
      console.log("SignUp Successfully: ", response.data);
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      if(error.response) {
        setError(error.response.data.errors || "Error in Signup!!!");
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
			onSubmit={handleSubmit}
			className="flex items-center flex-col space-y-2"
			>
			<Input 
				value={firstname}
				icon={<User width={20} height={20} />}
				onChange={e => setFirstName(e.target.value)}
				type="text" placeholder="First Name" required />
			<Input 
				value={lastname}
				icon={<User width={20} height={20} />}
				onChange={e => setLastName(e.target.value)}
				type="text" placeholder="last Name" required />
			<Input 						
				value={email}
				icon={<Mail width={20} height={20} />}
				onChange={e => setEmail(e.target.value)}
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
				{loading ? <Loader /> : "Register"}
			</Button>
			
			<Link to="/login">
				<Button link>
					Already have an account?
				</Button>
			</Link>
		</form>
	)
}