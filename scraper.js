const fetch = require("node-fetch");

let calendar_api = "";
let messages_api = "";
let classes_api = "";
let block_api = "";
let weather_api = "";

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

function getData() {
	return {
		calendar_api,
		messages_api,
		classes_api,
		block_api,
		weather_api,
		getMessageUrl,
	};
}

module.exports = {
	getData,
};
