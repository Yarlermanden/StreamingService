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
			//console.log('message: ' + String.fromCharCode.apply(null, new Uint16Array(data.msg)))
			console.log('message: ' + data)
			setMessage(data)
		});

		return() => socket.disconnect();
	}, [])
	
	var i = 0

	return (
		<div>
			<h2> You are now streaming live </h2>
			<div>
				<img src={image} alt="image not found"/>
				<h3> The text should appear here: {message} </h3>
				<p>
					Time: <time dateTime={response}>{response}</time>
				</p>
			</div>
		</div>
	);
}

export default Stream;
