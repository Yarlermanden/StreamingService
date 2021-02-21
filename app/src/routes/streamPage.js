import './layout.css';
import React, {useState, Component, useEffect} from 'react';
import { Redirect } from 'react-router-dom'
import image from '../resources/code.jpg'
import socketIOClient from 'socket.io-client';

function Stream() {
	//var image = require('../resources/code.jpg')
	const [response, setResponse] = useState("")

	const endpoint = "http://192.168.1.83:5002"

	useEffect(() => {
		const socket = socketIOClient(endpoint, {
			withCredentials: true,
			extraHeaders: {
				"my-custom-header": "abcd"
			}
		});
		socket.on("message", data => {
			console.log(data)
			setResponse(data);
		});

		return() => socket.disconnect();
	}, [])
	
	var i = 0

	return (
		<div>
			<h2> You are now streaming live </h2>
			<div>
				<img src={image} alt="image not found"/>
				<h3> The text should appear here: {response} </h3>
				<p>
					Its <time dateTime={response}>{response}</time>
				</p>
			</div>
		</div>
	);
}

export default Stream;
