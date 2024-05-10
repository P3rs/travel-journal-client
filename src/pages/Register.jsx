// client/src/pages/Register.jsx 

import React from "react"; 
import Navbar from "../components/Navbar"; 
import "../styles/register.css"; 
import { 
	faPlusCircle 
} from "@fortawesome/free-solid-svg-icons"; 
import { 
	FontAwesomeIcon 
} from "@fortawesome/react-fontawesome"; 
import { 
	Link 
} from "react-router-dom"; 
import { 
	useState 
} from "react"; 
import { 
	useNavigate 
} from "react-router-dom"; 
import axios from "axios"; 

function Register() { 
	const navigate = useNavigate(); 

	const [file, setFile] = useState(""); 
	const [info, setInfo] = useState({}); 

	const handleChange = (e) => { 
		setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value })); 
	}; 

	const handleClick = async (e) => { 
		e.preventDefault();

		var newUser;

		if (file) {
			const data = new FormData();
			data.append("image", file);
			const uploadRes = await axios.post(
				"https://travel-journal-server.onrender.com/upload",
				data
			);
			const url = "https://travel-journal-server.onrender.com/uploads/" + uploadRes.data.id;

			newUser = {
				...info,
				profilePicture: url,
			};
		}
		else {
			newUser = {
				...info
			};
		}

		try {
			const response = await axios.post("https://travel-journal-server.onrender.com/api/users/register",
				newUser, {
				withcredentials: false
			});

			navigate("/login");
		}
		catch (err) {
			console.log(err);
		}
	}; 



	return ( 
		<div className="register"> 
			<Navbar /> 
			<div className="registerCard"> 
				<div className="center"> 
					<h1>Join Us</h1> 

					<form> 
						<div className="image"> 
							<img 
								src={ 
									file 
										? URL.createObjectURL(file) 
										: "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
								} 
								alt=""
								height="100px"
							/> 

							<div className="txt_field_img"> 
								<label htmlFor="file"> 
									Image 
									<FontAwesomeIcon className="icon"
										icon={faPlusCircle} /> 
								</label> 
								<input 
									type="file"
									id="file"
									onChange={(e) => setFile(e.target.files[0])} 
									style={{ display: "none" }} 
								/> 
							</div> 
						</div> 

						<div className="formInput"> 


							<div className="txt_field"> 
								<input 
									type="text"
									placeholder="username"
									name="username"
									onChange={handleChange} 
									id="username"
									required 
								/> 
							</div> 
							<div className="txt_field"> 
								<input 
									type="email"
									placeholder="email"
									name="email"
									onChange={handleChange} 
									id="email"
									required 
								/> 
							</div> 
							<div className="txt_field"> 
								<input 
									type="password"
									placeholder="password"
									name="password"
									onChange={handleChange} 
									id="password"
									// value={data.password} 
									required 
								/> 
							</div> 
						</div> 
						<div className="login_button"> 
							<button className="button"
								onClick={handleClick}> 
								Register 
							</button> 
						</div> 
						<div className="signup_link"> 
							<p> 
								Already Registered? 
								<Link to="/login">Login</Link> 
							</p> 
						</div> 
					</form> 
				</div> 
			</div> 
		</div> 
	); 
}

export default Register;
