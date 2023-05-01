//
//  MainHeader.swift
//  SeniorProject
//
//  Created by Milo Cassarino and Abigail Jusiak on 4/17/23.
//

import SwiftUI

struct MainHeader: View {
    
    let text : String
    
    init(_ text: String){
        self.text = text
    }
    
    var body: some View {
        
        Text(text)
            .font(.largeTitle.weight(.bold))
            .foregroundColor(.white)
            .shadow(radius: 10)
    }
}

struct SectionHeading: View {
    
    let text : String
    
    init(_ text: String){
        self.text = text
    }
    
    var body: some View {
        
        Text(text)
            .font(.title3.weight(.bold))
    }
}

struct SubHeading: View {
    
    let text : String
    
    init(_ text: String){
        self.text = text
    }
    
    var body: some View {
        
        Text(text)
            .font(.title.weight(.bold))
    }
}

struct MainHeader_Previews: PreviewProvider {
    static var previews: some View {
        VStack {
            MainHeader("Title")
            SubHeading("Title")
        }
        .frame(maxWidth: .infinity)
        .addBackground()
    }
}
