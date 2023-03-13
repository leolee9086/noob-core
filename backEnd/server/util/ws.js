import { requireDep } from './requirePolyfill.js'
const { WebSocketServer } = requireDep("ws")
export function wss(app){
            app.on(
                "upgrade", (req, socket, head) => {
                    let _url = new URL(`http://127.0.0.1${req.url}`)
                    const obj = app.wsRoute[_url.pathname]
                    obj ? obj.wss.handleUpgrade(req, socket, head, ws => obj.mid(ws, req)) : socket.destroy()
                })
            app.ws = (route, mid) => {
                app.wsRoute = app.wsRoute || {}
                app.wsRoute[route] = {
                    wss: new WebSocketServer({ noServer: true }),
                    mid,
                }
            }

}