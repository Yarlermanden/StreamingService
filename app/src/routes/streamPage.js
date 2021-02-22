import './layout.css';
import React, {useState, Component, useEffect} from 'react';
import { Redirect } from 'react-router-dom'
import image from '../resources/code.jpg'
import socketIOClient from 'socket.io-client';

function Stream() {
	//var image = require('../resources/code.jpg')
	const [response, setResponse] = useState("")
	const [message, setMessage] = useState("")

	const endpoint = "http://212.237.131.28:15002"

	useEffect(() => {
		const socket = socketIOClient(endpoint, {
			withCredentials: true,
			extraHeaders: {
				"my-custom-header": "abcd"
			}
		});
		socket.on("message1", data => {
			console.log(data)
			setResponse(data);
		});

		socket.on("message", data => {
			setMessage(data)
		});

		return() => socket.disconnect();
	}, [])
	
	var i = 0

	function updateImage() {
		return <img src={'data:image/jpeg;base64,'+message} alt="couldn't convert image" />
	}

	return (
		<div>
			<h2> You are now streaming live </h2>
			<div>
				<img src={image} alt="image not found"/>
				{updateImage()}
				<h3> The text should appear here: {message} </h3>
				<p>
					Time: <time dateTime={response}>{response}</time>
				</p>
			</div>
		</div>
	);
}

export default Stream;
