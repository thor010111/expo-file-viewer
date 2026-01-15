import ExpoModulesCore

public class ExpoFileViewerModule: Module {
  
  public func definition() -> ModuleDefinition {
    Name("ExpoFileViewer")

    AsyncFunction("openFile") { (filePath: String, promise: Promise) in
        let workItem = DispatchWorkItem {
            guard let activeViewController = UIApplication.shared.topViewController() else {
                promise.reject("NO_VIEW_CONTROLLER", "No active view controller found")
                return
            }
            
            // Handle both file:// URLs and file paths
            let fileURL: URL
            if filePath.hasPrefix("file://") {
                guard let url = URL(string: filePath) else {
                    promise.reject("INVALID_URL", "Invalid file URL: \(filePath)")
                    return
                }
                fileURL = url
            } else {
                fileURL = URL(fileURLWithPath: filePath)
            }
            
            // Check if file exists
            guard FileManager.default.fileExists(atPath: fileURL.path) else {
                promise.reject("FILE_NOT_FOUND", "File does not exist at path: \(fileURL.path)")
                return
            }
            
            let preview = ExpoFileViewerPreview(file: fileURL)
            preview.show(viewController: activeViewController, promise: promise)
        }
        DispatchQueue.main.async(execute: workItem)
    }
  }
}

extension UIApplication {
    func topViewController() -> UIViewController? {
        var topViewController: UIViewController? = nil
        if #available(iOS 13, *) {
            for scene in connectedScenes {
                if let windowScene = scene as? UIWindowScene {
                    for window in windowScene.windows {
                        if window.isKeyWindow {
                            topViewController = window.rootViewController
                        }
                    }
                }
            }
        } else {
            topViewController = keyWindow?.rootViewController
        }
        while true {
            if let presented = topViewController?.presentedViewController {
                topViewController = presented
            } else if let navController = topViewController as? UINavigationController {
                topViewController = navController.topViewController
            } else if let tabBarController = topViewController as? UITabBarController {
                topViewController = tabBarController.selectedViewController
            } else {
                // Handle any other third party container in `else if` if required
                break
            }
        }
        return topViewController
    }
}
