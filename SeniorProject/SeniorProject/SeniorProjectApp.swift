//
//  SeniorProjectApp.swift
//  SeniorProject
//
//  Created by Milo Cassarino and Abigail Jusiak on 3/7/23.
//

import SwiftUI

@main
struct SeniorProjectApp: App {
//    let persistenceController = PersistenceController.shared

    var body: some Scene {
        WindowGroup {
            ContentView()
                .preferredColorScheme(.light)
//                .environment(\.managedObjectContext, persistenceController.container.viewContext)
        }
    }
}
