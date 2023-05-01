//
//  SettingsView.swift
//  SeniorProject
//
//  Created by Milo Cassarino and Abigail Jusiak on 4/17/23.
//

import SwiftUI

struct SettingsView: View {
    
    var body: some View {
        
        ProfileEditView(ProfileClass(0))
    }
}

struct SettingsView_Previews: PreviewProvider {
    static var previews: some View {
        SettingsView()
            .padding(20)
            .addBackground()
    }
}
