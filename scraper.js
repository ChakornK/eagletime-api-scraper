const fetch = require("node-fetch");

function getCalendar() {
	return new Promise((resolve, reject) => {
		fetch("https://eagletime.appazur.com/a?age=1&ua=1&v=2&dfmt=html")
			.then((response) => response.json())
			.catch(reject)
			.then((data) => {
				resolve(data);
			});
	});
}

function getMessages() {
	return new Promise((resolve, reject) => {
		fetch("https://eagletime.appazur.com/m/json?limit=50")
			.then((response) => response.json())
			.catch(reject)
			.then((data) => {
				resolve(data);
			});
	});
}

function getMessageUrl(url) {
	return new Promise((resolve, reject) => {
		fetch(url)
			.then((response) => response.text())
			.catch(reject)
			.then((data) => {
				const message = data
					.replace(/src="\//g, 'src="https://eagletime.appazur.com/')
					.replace(/href="\//g, 'href="https://eagletime.appazur.com/')
					.replace(/<head>(?:.|\n|\r)+?<\/head>/gm, "")
					.replace(/<script(?:.|\n|\r)+?<\/script>/gm, "")
					.replace('<div class="subject">', "<h2>")
					.replace("</div>", "</h2>");
				resolve(message);
			});
	});
}

function getClasses() {
	return new Promise((resolve, reject) => {
		fetch("https://eagletime.appazur.com/api/f")
			.then((response) => response.json())
			.catch(reject)
			.then((data) => {
				resolve(data);
			});
	});
}

function getBlock() {
	return new Promise((resolve, reject) => {
		fetch("https://eagletime.appazur.com/api/a/block/today")
			.then((response) => response.json())
			.catch(reject)
			.then((data) => {
				resolve(data);
			});
	});
}

function getWeather() {
	return new Promise((resolve, reject) => {
		fetch(
			"https://api.openweathermap.org/data/2.5/weather?lat=49.1705885&lon=-122.8337119&units=metric&appid=APIKEY"
		)
			.then((response) => response.json())
			.catch(reject)
			.then((data) => {
				resolve(data);
			});
	});
}

module.exports = {
	getCalendar,
	getMessages,
	getClasses,
	getBlock,
	getWeather,
	getMessageUrl,
};
