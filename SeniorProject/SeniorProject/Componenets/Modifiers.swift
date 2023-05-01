//
//  Modifiers.swift
//  SeniorProject
//
//  Created by Milo Cassarino and Abigail Jusiak on 4/17/23.
//

import Foundation
import SwiftUI

struct DefaultBackground: ViewModifier {
    func body(content: Content) -> some View {
        content
            .frame(maxHeight: .infinity)
            .background(
                LinearGradient(colors: [.LB, .DB], startPoint: .topLeading, endPoint: .bottomTrailing)
            )
    }
}


extension View {
    func addBackground() -> some View {
        modifier(DefaultBackground())
    }
}
