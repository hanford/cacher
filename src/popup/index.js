var elements = document.getElementsByClassName("selectable")
var background = chrome.extension.getBackgroundPage()

// var getPopUpData = function () {
// 	var values = {}
// 	for (var i = 0; i < elements.length; i++) {
// 		var e = elements[i];
// 		var key = e.attributes["data-bind"].value;
// 		values[key] = e.value;
// 	}
// 	return values;
// };

// var setPopUpData = function () {
// 	bg.chromeGetCurrentTab(function(tab) {
// 		var item = bg.database.findHostsWithUrl(tab.url)

// 		for (var i = 0; i < elements.length; i++) {
// 			var e = elements[i];
// 			e.selectedIndex = 0;

// 			if (item != null) {
// 				var selectedValue = item.filter[e.attributes["data-bind"].nodeValue];
// 				for (var j in e.options) {
// 					if (e.options[j].value == selectedValue) {
// 						e.selectedIndex = j;
// 						break;
// 					}
// 				};

// 			}
// 		}
// 	})
// }

// setPopUpData()

background.database.add({
	image: "cache",
	script: "cache",
	stylesheet: "cache"
})

// var onSaveButtonClick = function () {
// 	var data = getPopUpData()

// 	bg.database.add(data, savedCallback)
// }

// var savedCallback = function () {
// 	bg.chromeTabs.setApplicationIcon()

// 	window.close()
// }

// var saveButton = document.getElementById("saveButton")

// saveButton.addEventListener("click", onSaveButtonClick)

// chrome.tabs.onActivated.addListener(setPopUpData)
// chrome.tabs.onUpdated.addListener(setPopUpData)
