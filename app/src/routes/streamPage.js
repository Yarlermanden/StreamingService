import './streamPage.css';
import React, {useState, Component, useEffect} from 'react';
import { Redirect } from 'react-router-dom'
import image from '../resources/code.jpg'
import socketIOClient from 'socket.io-client';
import Fullscreen from 'react-full-screen'
//import Lightbox from 'react-images-lightbox'

function Stream() {
	const [response, setResponse] = useState("")
	const [message, setMessage] = useState("")
	const [video, setVideo] = useState([])
	const [time, setTime] = useState(0) // Calculate from frontend
	const [distance, setDistance] = useState(0) //Given from backend
	const [speed, setSpeed] = useState(0) //Given from backend
	const [fps, setFps] = useState(0) //We could have one for backend or for how often we receive..
	const [xSlope, setXSlope] = useState(0) //given from backend
	const [ySlope, setYSlope] = useState(0)

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
		if (message === "") return <img src={image} className="images" alt="No image found"/>
		return <img src={'data:image/jpeg;base64,'+message} className="images" alt="couldn't convert image" />
	}

	return (
		<div class="streamPage">
			<div class="pageContent">
				<div class="pageHeader"> 
					<h2> You are now watching livestream </h2>
				</div>
				<div class="pageBody">
					<div class="videoDiv">
						{updateImage()}
					</div>
					<p>
						Time: <time dateTime={response}>{response}</time>
					</p>
					<div class="outerInformationDiv">
						<div class="informationDiv">
							<div class="textInformationDiv">
								<p> Time since start: {time}s </p> 
								<p> Distance travelled: {distance}m </p>
								<p> Current speed: {speed}km/t </p>
								<p> FPS: {fps} </p>
								<p> xSlope: {xSlope}° </p>
								<p> ySlope: {ySlope}° </p>
							</div>
							<div class="directionDiv">
								<p> Desired direction: </p>
								<div class="outerCircle">
									<div class="innerCircle">
									</div>
								</div>
							</div>
							<div class="slopeDiv">
								<p> This should contain some
									<br/> 
									kind of slope graph </p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Stream;
