//
//  DemoAppApp.swift
//  DemoApp
//
//  Created by Milo Cassarino and Abigail Jusiak on 4/18/23.
//

import SwiftUI

@main
struct DemoAppApp: App {
    let persistenceController = PersistenceController.shared

    var body: some Scene {
        WindowGroup {
            ContentView()
                .preferredColorScheme(.light)
                .environment(\.managedObjectContext, persistenceController.container.viewContext)
        }
    }
}
