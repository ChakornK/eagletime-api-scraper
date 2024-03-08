const fetch = require("node-fetch");
const express = require("express");
const app = express();

let calendar_api = "";
let messages_api = "";
let classes_api = "";

async function getCalendar() {
	console.log(
		"fetching https://eagletime.appazur.com/a?age=1&ua=1&v=2&dfmt=html"
	);
	calendar_api = await (
		await fetch("https://eagletime.appazur.com/a?age=1&ua=1&v=2&dfmt=html")
	).json();
}
getCalendar();

async function getMessages() {
	console.log("fetching https://eagletime.appazur.com/m/json?limit=50");
	messages_api = await (
		await fetch("https://eagletime.appazur.com/m/json?limit=50")
	).json();
}
getMessages();

async function getMessageUrl(url) {
	console.log("fetching", url);
	let message;
	await fetch(url)
		.then((response) => response.text())
		.catch((err) => console.error(err))
		.then((data) => {
			// console.log(data);
			message = data;
		});
	message = message
		.replace(/src="\//g, 'src="https://eagletime.appazur.com/')
		.replace(/href="\//g, 'href="https://eagletime.appazur.com/')
		.replace(/<head>(?:.|\n|\r)+?<\/head>/gm, "")
		.replace(/<script(?:.|\n|\r)+?<\/script>/gm, "")
		.replace('<div class="subject">', "<h2>")
		.replace("</div>", "</h2>");
	return message;
}

async function getClasses() {
	console.log("fetching https://eagletime.appazur.com/api/f");
	classes_api = await (
		await fetch("https://eagletime.appazur.com/api/f")
	).json();
}
getClasses();

async function getBlock() {
	console.log("fetching https://eagletime.appazur.com/api/a/block/today");
	block_api = await (
		await fetch("https://eagletime.appazur.com/api/a/block/today")
	).json();
}
getBlock();

async function getWeather() {
	console.log(
		"fetching https://api.openweathermap.org/data/2.5/weather?lat=49.1705885&lon=-122.8337119&units=metric&appid=APITOKENHERE"
	);
	weather_api = await (
		await fetch(
			"https://api.openweathermap.org/data/2.5/weather?lat=49.1705885&lon=-122.8337119&units=metric&appid=APITOKENHERE"
		)
	).json();
}
getWeather();

setInterval(() => {
	getCalendar();
	getMessages();
	getClasses();
	getBlock();
	getWeather();
}, 600000); //every 10 minutes

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", req.get("Origin") || "*");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
	res.header("Access-Control-Expose-Headers", "Content-Length");
	res.header(
		"Access-Control-Allow-Headers",
		"Accept, Authorization, Content-Type, X-Requested-With, Range"
	);
	if (req.method === "OPTIONS") {
		return res.sendStatus(200);
	}
	return next();
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
app.get("/message/*", async (req, res) => {
	console.log(req.params[0]);
	res.send(
		await getMessageUrl(`https://eagletime.appazur.com/m/${req.params[0]}`)
	);
});

module.exports = app;
