const fetch = require("node-fetch");
const express = require("express");
const app = express();

var calendar_api = "";
var messages_api = "";
var classes_api = "";

async function getCalendar() {
	console.log("fetching https://eagletime.appazur.com/a?age=1&ua=1&v=2&dfmt=html");
	calendar_api = await (await fetch("https://eagletime.appazur.com/a?age=1&ua=1&v=2&dfmt=html")).text();
}
getCalendar();

async function getMessages() {
	console.log("fetching https://eagletime.appazur.com/m/json?limit=50");
	messages_api = await (await fetch("https://eagletime.appazur.com/m/json?limit=50")).json();
}
getMessages();

async function getClasses() {
	console.log("fetching https://eagletime.appazur.com/api/f");
	classes_api = await (await fetch("https://eagletime.appazur.com/api/f")).json();
}
getClasses();

async function getBlock() {
	console.log("fetching https://eagletime.appazur.com/api/a/block/today");
	block_api = await (await fetch("https://eagletime.appazur.com/api/a/block/today")).json();
}
getBlock();

async function getWeather() {
	console.log("fetching https://eagletime.appazur.com/api/weather/current");
	weather_api = await (await fetch("https://eagletime.appazur.com/api/weather/current")).json();
}
getWeather();

setInterval(() => {
	getCalendar();
	getMessages();
	getClasses();
	getBlock();
	getWeather();
}, 600000); //every 10 minutes

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", req.get("Origin") || "*");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
	res.header("Access-Control-Expose-Headers", "Content-Length");
	res.header("Access-Control-Allow-Headers", "Accept, Authorization, Content-Type, X-Requested-With, Range");
	if (req.method === "OPTIONS") {
		return res.sendStatus(200);
	} else {
		return next();
	}
});

app.listen(3000, () => {
	console.log("Application started and Listening on port 3000");
});

app.get("/calendar", (req, res) => {
	res.send(calendar_api);
});
app.get("/messages", (req, res) => {
	res.send(messages_api);
});
app.get("/classes", (req, res) => {
	res.send(classes_api);
});
app.get("/block", (req, res) => {
	res.send(block_api);
});
app.get("/weather", (req, res) => {
	res.send(weather_api);
});
