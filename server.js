const express = require('express')
const path = require('path')
const fs = require('fs')
const favicon = require('serve-favicon')
const { createBundleRenderer } = require('vue-server-renderer')

const isProd = process.env.NODE_ENV === 'production'

const e = express()
// const createApp = require('./dist/server-bundle.js')['default']
// const clientBundle = '/app.js'
e.use(favicon('./public/logo-48.png'))
e.use(express.static('dist'))

// 模板页面
const templatePath = path.resolve(__dirname, './src/index.template.html')
// 自动注入
let renderer
let readyPromise
if (isProd) {
	// serverBundle
	const serverBundle = require('./dist/vue-ssr-server-bundle.json')
	// clientMainfest
	const clientManifest = require('./dist/vue-ssr-client-manifest.json')
	renderer = createBundleRenderer(serverBundle, {
		template: fs.readFileSync(templatePath, 'utf-8'),
		clientManifest
	})
} else {
  readyPromise = require('./build/setup-dev-server')(
    e,
    templatePath,
    (bundle, options) => {
      renderer = createBundleRenderer(bundle, options)
    }
  )
}

// mock一些数据
const arr = [
	{ title: 'Koa2中间件原理', id: 1, content: 'Koa是一个node框架。。。' },
	{ title: 'Vue-SSR 采坑及简单demo', id: 2, content: 'Vue-ssr的实现很简单' },
	{ title: 'replace第二个参数为function的用法', id: 3, content: '利用正则和replace来实现强大的文本替换' }
]
e.get('/api/user', (req, res) => {
  console.log(1)
	res.send({ name: 'lee', sex: 'male', age: 20 })
})

e.get('/api/articles', (req, res) => {
	res.send(arr)
})
e.get('/api/article/:id', (req, res) => {
	res.send(arr.filter(item => item.id.toString() === req.params.id)[0])
})

function render (req, res) {
	res.setHeader('Content-Type', 'text/html')

	const handleError = err => {
		if (err.url) {
			res.redirect(err.url)
		} else if (err.code === 404) {
			res.status(404).send('404 | Page Not Found')
		} else {
			// Render Error Page or Redirect
			res.status(500).send('500 | Internal Server Error')
			console.error(`error during render : ${req.url}`)
			console.error(err.stack)
		}
	}

	const context = { url: req.url }
	renderer.renderToString(context, (err, html) => {
		if (err) {
			return handleError(err)
    }
		res.send(html)
	})
}

e.get('*', isProd ? render : (req, res) => {
  readyPromise.then(() => render(req, res))
})
// e.get('*', (req, res) => {
// 	render(req, res)
	// createApp(context)
	// 	.then(app => {
	//     let state = JSON.stringify(context.state)
	//     // console.log(state)
	// 		renderer.renderToString(app).then(html => {
	// 			res.end(`<!DOCTYPE html>
	//   <html lang="en">
	//       <head>
	//           <meta charset="UTF-8">
	//           <title>Vue2.0 SSR渲染页面</title>
	//           <script>window.__INITIAL_STATE__ = ${state}</script>
	//       </head>
	//       <body>
	//           <div id="app">${html}</div>
	//           <script src="${clientBundle}"></script>
	//       </body>
	//   </html>
	//   `)
	// 		})
	// 	})
	// 	.catch(err => {
	// 		res.send(err.code)
	// 	})
// })
// {
// 	template: require('fs').readFileSync('./src/index.template.html', 'utf-8')
// }
e.listen(3000)
