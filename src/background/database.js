class Database {
	constructor () {
		this.hosts = []
		this.storage = chrome.storage.sync

		this.findHostsWithUrl = this.findHostsWithUrl.bind(this)
		this.commitData = this.commitData.bind(this)
		this.getDataSet = this.getDataSet.bind(this)
		this.add = this.add.bind(this)
		this.remove = this.remove.bind(this)
	}

	findHostsWithUrl (url) {
		return this.hosts.find(p => url === p.host) || null
	}

	commitData (data, callback) {
		var obj = {}

		obj['SAVED_URLS'] = JSON.stringify(data)

		this.storage.set(obj, () => this.getDataSet(callback))
	}

	getDataSet (callback) {
		this.storage.get('SAVED_URLS', (data) => {
			const savedHosts = JSON.parse(data['SAVED_URLS'] == null ? '[]' : data['SAVED_URLS'])

			this.hosts = savedHosts

			if (callback) callback(savedHosts)
		})
	}

	add (item, callback) {
		chromeGetCurrentTab((tab) => {
			var hostOnly = tab.url.replace(/(http|https)\:\/\//g, '').replace(/\/.*/g, '')

				var obj = {
					host: hostOnly,
					filter: item
				}

				this.getDataSet((data) => {
					// Check if url is already present
					// if (data.filter(p => p.host == obj.host).length == 0) {
					// 	data.push(obj)
					// } else {
					// 	data.filter(function(p) {
					// 		return p.host == obj.host
					// 	})[0].filter = obj.filter
					// }

					data.push(obj)

					this.commitData(data, callback)
				})
		})
	}

	remove (host, callback) {
		this.getDataSet((data) => {
			const filtered = data.filter(item => item.host !== host)

			this.commitData(filtered, callback)
		})
	}
}
