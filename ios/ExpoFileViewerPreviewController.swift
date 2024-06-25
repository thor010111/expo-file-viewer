//
//  ExpoFileViewerPreviewController.swift
//  ExpoFileViewer
//
//  Created by Thorsten Kehren on 25.06.24.
//

import UIKit
import QuickLook
import ExpoModulesCore

class ExpoFileViewerPreview: QLPreviewControllerDataSource {
    
    private let file: URL
    
    init(file: URL) {
        self.file = file
    }
    
    func numberOfPreviewItems(in controller: QLPreviewController) -> Int {
        return 1
    }
    
    func previewController(_ controller: QLPreviewController, previewItemAt index: Int) -> QLPreviewItem {
        return file as QLPreviewItem
    }   

    func show(viewController: UIViewController, promise: Promise) {
        let previewViewController = ExpoFileViewerPreviewViewController()
        previewViewController.dataSource = self
        previewViewController.presentModal(viewController: viewController, promise: promise)
    }
}

class ExpoFileViewerPreviewViewController: QLPreviewController {
    
    var promise: Promise?
    
    func presentModal(viewController: UIViewController, promise: Promise) {
        self.promise = promise
        viewController.present(self, animated: true)
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        promise?.resolve()
        super.viewWillDisappear(animated)
    }
}
