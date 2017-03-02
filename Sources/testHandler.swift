import Kitura
import LoggerAPI

class TestHandler {
	func show(request: RouterRequest, response: RouterResponse, next: @escaping () -> Void) throws {
		defer { next() }

 		print("GET - /test route handler...")
 		Log.debug("GET - /test route handler...")

		let data = ["test": "hello world > index"]

	    try response.render("test", context: data)
	}
}