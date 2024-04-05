const express = require("express");
const app = express();

const {
	getCalendar,
	getMessages,
	getClasses,
	getBlock,
	getWeather,
	getMessageUrl,
} = require("./scraper.js");

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

app.get("/calendar", async (req, res) => {
	res.send(await getCalendar());
});
app.get("/messages", async (req, res) => {
	res.send(await getMessages());
});
app.get("/classes", async (req, res) => {
	res.send(await getClasses());
});
app.get("/block", async (req, res) => {
	res.send(await getBlock());
});
app.get("/weather", async (req, res) => {
	res.send(await getWeather());
});
app.get("/message/*", async (req, res) => {
	console.log(req.params[0]);
	res.send(
		await require("./scraper.js")
			.getData()
			.getMessageUrl(`https://eagletime.appazur.com/m/${req.params[0]}`)
	);
});

module.exports = app;
