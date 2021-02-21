import './layout.css';
import React, {useState, Component } from 'react';
import { Redirect } from 'react-router-dom'
import image from '../resources/code.jpg'

function Stream() {
	//var image = require('../resources/code.jpg')
	var i = 5;

	return (
		<div>
			<h2> You are now streaming live </h2>
			<img src={image} alt="image not found"/>
		</div>
	);
}

export default Stream;
