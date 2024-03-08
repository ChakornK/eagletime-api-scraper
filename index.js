const express = require("express");
const app = express();

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
	res.send(require("./scraper.js").getData().calendar_api);
});
app.get("/messages", (req, res) => {
	res.send(require("./scraper.js").getData().messages_api);
});
app.get("/classes", (req, res) => {
	res.send(require("./scraper.js").getData().classes_api);
});
app.get("/block", (req, res) => {
	res.send(require("./scraper.js").getData().block_api);
});
app.get("/weather", (req, res) => {
	res.send(require("./scraper.js").getData().weather_api);
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
