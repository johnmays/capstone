//
//  Colors.swift
//  SeniorProject
//
//  Created by Milo Cassarino and Abigail Jusiak on 4/17/23.
//

import Foundation
import SwiftUI

let useOrange = false

extension Color {
    
    static var LB : Color {
        
        if useOrange {
            return Color("Orange2")
        } else {
            return Color("LB")
        }
        
    }
    
    static var DB : Color {
        
        if useOrange {
            return Color("Orange1")
        } else {
            return Color("DB")
        }
        
    }
    
}
