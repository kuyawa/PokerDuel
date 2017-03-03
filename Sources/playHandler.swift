import Kitura
import LoggerAPI

class PlayHandler {

    func show(request: RouterRequest, response: RouterResponse, next: @escaping () -> Void) throws {
        defer { next() }

        //print("GET - /play route handler...")
        //Log.debug("GET - /play route handler...")

        let data = ["test": "PLAY"]

        try response.render("play", context: data)
	}

}