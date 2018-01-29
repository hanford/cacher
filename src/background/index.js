
var database = new Database()
var chromeTabs = new Cacher()

database.getDataSet()

const opts = {
	urls: ['<all_urls>'],
	types: ['script', 'stylesheet', 'image', 'main_frame', 'sub_frame', 'font', 'object', 'xmlhttprequest']
}

chromeTabs.reloadTabs(chromeTabs.setApplicationIcon)
chrome.tabs.onActivated.addListener(chromeTabs.setApplicationIcon)
chrome.tabs.onUpdated.addListener(chromeTabs.setApplicationIcon)
chrome.tabs.onRemoved.addListener(() => chromeTabs.reloadTabs(null))
chrome.webRequest.onHeadersReceived.addListener(onHeadersReceived, opts, ['blocking', 'responseHeaders'])

function chromeGetCurrentTab (callback) {
	chrome.tabs.query({
		active: true,
		url: "*://*/*"
	}, function (tabs) {
		callback(tabs[0])
	})
}


// chrome.webRequest.onBeforeRequest.addListener(sendFakeSw, {urls: ['<all_urls>']}, ['blocking'])

// const js = `
// 	self.addEventListener('install', function(event) {
// 		event.waitUntil(
// 			caches.open('v1').then(function(cache) {
// 				return cache.addAll([
// 					'/index.html',
// 				]);
// 			})
// 		);
// 	});
// `

// function sendFakeSw (details) {
// 	if (details.url.indexOf('news.ycombinator.com/sw.js') > -1) {
// 		return {
// 			cancel: true
// 			redirectUrl: 'data:application/json;charset=utf-8,' + encodeURIComponent(js)
// 		}
// 	}
// }
