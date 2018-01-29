class Cacher {
	constructor () {
		this.tabs = []

		this.reloadTabs = this.reloadTabs.bind(this)
		this.findById = this.findById.bind(this)
    this.list = this.list.bind(this)
    this.setApplicationIcon = this.setApplicationIcon.bind(this)
    this.isCachingEnabledOnTab = this.isCachingEnabledOnTab.bind(this)
	}

	reloadTabs (callback) {
		chrome.tabs.query({}, tabs => {
			this.tabs = tabs

			if (callback) { callback() }
		})
	}

	findById (id)  {
		return this.tabs.filter(p => p.id === id)[0]
	}

	list () {
		return this.tabs
  }

  isCachingEnabledOnTab (id) {
    const tab = this.findById(id)

    if (tab != null) {
      const host = database.findHostsWithUrl(tab.url)

      if (host != null) {
        return true
      }
    }

    return false
  }

  setApplicationIcon () {
    this.reloadTabs(() => {
      for (var i = this.list().length - 1; i >= 0; i--) {

        const { id, url } = this.list()[i]
        //var tab = this.findById(tabId)

        if (['chrome://', 'chrome-devtools://'].filter(function(p) {
          return url.indexOf(p) > -1
        }).length == 0) {
          // console.log("Showing Icon", id, url)

          chrome.pageAction.show(id)

          const enabled = this.isCachingEnabledOnTab(id)

          const iconPath = enabled === true ? "assets/cache_black.png" : "assets/cache_fade.png"

          chrome.pageAction.setIcon({
            tabId: id,
            path: iconPath
          })
        }
      }
    })
  }
}
