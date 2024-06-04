// client/src/pages/Create.jsx 

import React, { useContext, useState } from 'react';
import axios from "axios";
import { AuthContext } from '../authContext'; 
import "../styles/create.css";
import { useNavigate } from 'react-router-dom'; 
import Navbar from '../components/Navbar'; 
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import "../styles/create.css";
import SimpleMDE from 'react-simplemde-editor';
import styles from "../styles/create.css";

const Create = () => { 
	const navigate = useNavigate(); 
	const { user } = useContext(AuthContext); 
	const [files, setFiles] = useState(""); 
	const [info, setInfo] = useState({});
	console.log(info);

	const options = React.useMemo(
		() => ({
			spellChecker: false,
			maxHeight: '400px',
			autofocus: true,
			placeholder: 'Введите текст...',
			status: false,
			autosave: {
				enabled: true,
				delay: 1000,
			},
		}),
		[],
	);

	// set the usestate to the data user passed 
	const handleChange = (e) => { 
		setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value })); 
	};

	// post the usestate to database 
	const handleClick = async (e) => { 
		e.preventDefault();

		var newEntry

		if (files) { 
			const list = await Promise.all(Object.values(files).map(async (file) => { 
				const data = new FormData();
				data.append("image", file);
				const uploadRes = await axios.post( 
					// "http://localhost:5500/upload",
					"https://travel-journal-server.onrender.com/upload",
					data
				);
				const url = "https://travel-journal-server.onrender.com/uploads/" + uploadRes.data.id;
				return url; 
			}));

			newEntry = { 
				...info, author: user._id, photos: list 
			};

		} 
		else { 
			newEntry = { 
				...info, author: user._id 
			};
		} 


		try {
			const response = await axios.post('https://travel-journal-server.onrender.com/api/entries/',
				newEntry, { 
				withCredentials: false
			});

			navigate(`/`);
		} 
		catch (err) { 
			console.log(err);
		} 
	}

	return ( 
		<div className='create'> 
			<Navbar /> 
			<div className="createContainer"> 

				<div className="picsContainer"> 

					<div className="formInput"> 
						<h2>Upload Images (Max 3)</h2> 
						<label htmlFor="file"> 
							<FontAwesomeIcon 
								className="icon" icon={faPlusCircle} /> 
						</label> 
						<input 
							type="file"
							id="file"
							multiple 
							onChange={(e) => setFiles(e.target.files)} 
							style={{ display: "none" }} 
						/> 
					</div> 
					<div className="uploadedPictures"> 
						<div className="upload_pic"> 
							<img 
								src={ 
									files[0] 
										? URL.createObjectURL(files[0]) 
										: ""
								} 
								alt=""
								height="80px"
							/> 
						</div> 
						<div className="upload_pic"> 
							<img 
								src={ 
									files[1] 
										? URL.createObjectURL(files[1]) 
										: ""
								} 
								alt=""
								height="80px"
							/> 
						</div> 
						<div className="upload_pic"> 
							<img 
								src={ 
									files[2] 
										? URL.createObjectURL(files[2]) 
										: ""
								} 
								alt=""
								height="80px"
							/> 
						</div> 
					</div> 

				</div> 

				<div className="input"> 
					<label htmlFor="title">Title</label> 
					<input 
						onChange={handleChange} 
						type="text"
						id="title"
						placeholder="Enter Title"
					/> 
				</div> 
				<div className="input"> 
					<label htmlFor="title"> 
						Location 
					</label> 
					<input 
						onChange={handleChange} 
						type="text"
						id="location"
						placeholder="Enter Location"
					/> 
				</div> 

				<div className="input"> 
					<label htmlFor="date"> 
						What is the Date 
					</label> 
					<input 
						onChange={handleChange} 
						type="date"
						id="date"
						placeholder="Choose Date"
					/> 
				</div> 

				<div className="input"> 
					<label htmlFor="entry"> 
						Write your thoughts.. 
					</label>

					{/*<SimpleMDE className={styles.editor} value={info} onChange={handleChange} options={options} />*/}
					{/*<SimpleMDE className={styles.editor} value={} />*/}
					<textarea
						name='entry'
						id='text'
						cols="150"
						rows='25'
						onChange={handleChange}
						autoFocus
					></textarea>
				</div> 

				<button className='createBtn'
					onClick={handleClick}> 
					Create Entry 
				</button> 
			</div> 
		</div> 
	);
};

export default Create
