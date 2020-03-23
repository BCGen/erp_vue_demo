const path = require('path')
const jsonServer = require('json-server')

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(
  jsonServer.rewriter({
    '/recruit/*': '/$1',
    '/Opening/*': '/Openings/$1',
    '/Banner/*': '/Banners/$1',
    '/Resume/*': '/Resumes/$1',
    '/CodeData/*': '/CodeDatas/$1',
    '/Opening': '/Openings',
    '/Banner': '/Banners',
    '/Resume': '/Resumes',
    '/CodeData': '/CodeDatas'
  })
)

server.use('*', function(req, res, next) {
  setTimeout(next, 300)
})

router.render = (req, res) => {
  try {
    res.jsonp({
      rtnCode: '0000',
      rtnMsg: '',
      data: res.locals.data
    })
  } catch (error) {
    res.status(403).jsonp({
      rtnCode: '9001',
      rtnMsg: 'API Timeout'
    })
  }
}

server.use(router)

server.listen(7000, () => {
  console.log(`JSON Server is running on http://localhost:7000`)
})
