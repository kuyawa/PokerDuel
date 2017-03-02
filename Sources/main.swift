import Kitura
import LoggerAPI
import HeliumLogger
import KituraStencil
import Foundation

//typealias RouterNext = @escaping () -> Void

print("\n----------\nRunning PokerDuel on Kitura dev...\n")

HeliumLogger.use()
//Log.logger = HeliumLogger()

let router  = Router()
let port    = Int(ProcessInfo.processInfo.environment["PORT"] ?? "8090") ?? 8090
let stencil = StencilTemplateEngine(namespace: App.getStencilFilters())

router.setDefault(templateEngine: stencil)
router.all("/public", middleware: StaticFileServer())

// Routes
router.get("/", handler: IndexHandler().index)
router.get("/index", handler: IndexHandler().index)
router.get("/test",  handler: TestHandler().show)


Kitura.addHTTPServer(onPort: port, with: router)
Kitura.run()

// End