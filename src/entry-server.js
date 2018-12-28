import { createApp } from './app.js'

export default context => {
	return new Promise((resolve, reject) => {
		const { app, router, store } = createApp()
		router.push(context.url)
    
		router.onReady(() => {
			const matchedComponents = router.getMatchedComponents()
			// 匹配不到的路由，执行 reject 函数，并返回 404
			if (!matchedComponents.length) {
				return reject({ code: 404 })
      }
      
			Promise.all(
				matchedComponents.map(item => {
					if (item.asyncData) {
						return item.asyncData({
							store,
							route: router.currentRoute
						})
					}
				})
			).then(() => {
				context.state = store.state

				resolve(app)
			})
		}, reject)
	})
}
