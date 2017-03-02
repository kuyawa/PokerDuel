import Kitura
import LoggerAPI

class IndexHandler {
	func index(request: RouterRequest, response: RouterResponse, next: @escaping () -> Void) throws {
		defer { next() }

 		print("GET - /index route handler...")
 		Log.debug("GET - /index route handler...")

 		let data = ["test": "hello world > test"]

	    try response.render("index", context: data)
	}
}