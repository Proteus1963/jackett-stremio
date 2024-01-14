const { URL } = require('url');

const defaultConfig = {

	"responseTimeout": process.env.RESPONSE_TIMEOUT || 11000,

	"addonPort": process.env.PORT || 7000,

	"minimumSeeds": process.env.MIN_SEED || 3,

	"maximumResults": process.env.MAX_RESULTS || 10,

	"maximumSize": process.env.MAX_SIZE || 10000000000, // 10GB

	"maxQueueSize": process.env.MAX_QUEUE_SIZE || 100,

	"jackett": {
		"host": process.env.JACKETT_HOST || "http://127.0.0.1:9117/",

		"readTimeout": process.env.JACKETT_RTIMEOUT || 10000,

		"openTimeout": process.env.JACKETT_OTIMEOUT || 10000

	}
}

function correctAndValidateURL(input) {
  try {
    const parsedURL = new URL(input);

    if (parsedURL.protocol === 'http:' && /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(parsedURL.hostname)) {
      return parsedURL.href; // Return the original URL if it's valid
    }

    parsedURL.protocol = 'http:';

    if (!parsedURL.pathname) {
      parsedURL.pathname = '/';
    }

    const correctedURL = parsedURL.href;

    return correctedURL;
  } catch (error) {
    console.error(`URL ${input} doesn't seem like a valid URL. Using it anyway.`)
    return input;
  }
}

defaultConfig.jackett.host = correctAndValidateURL(defaultConfig.jackett.host) 

module.exports = defaultConfig
