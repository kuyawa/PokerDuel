import Kitura
import Stencil

class App {
	static func getStencilFilters() -> Namespace {
		let ns = Namespace()

		// Filters
		ns.registerFilter("time") { (value: Any?) in 
			if let value = value as? String {
				return "TIME: "+value
			}
			return value
		}

		return ns
	}
}

// End