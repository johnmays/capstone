//
//  HostingView.swift
//  SeniorProject
//
//  Created by Milo Cassarino and Abigail Jusiak on 4/17/23.
//

import SwiftUI

struct HostingView: View {
    
    let attending : [CourseClass] = [
        CourseClass(0),
        CourseClass(1),
        CourseClass(2),
        CourseClass(3),
        CourseClass(4),
    ]
    
    @State var creating : Bool = false
    
    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            
            HStack {
                MainHeader("Hosting")
                
                Spacer()
                
                Button(action: {
                    creating = true
                }){
                    HStack {
                        Image(systemName: "plus")
                            .font(.title3.weight(.bold))
                        SectionHeading("New")
                        
                    }
                    .padding(10)
                    .background(
                        RoundedRectangle(cornerRadius: 15)
                            .fill(Material.regularMaterial)
                    )
                    .overlay(
                        RoundedRectangle(cornerRadius: 15)
                            .strokeBorder(lineWidth: 3)
                    )
                }
                .foregroundColor(.DB)

            }
            
            ScrollView {
                VStack(spacing: 20) {
                    ForEach(attending){ course in
                        CoursePreview(course)
                    }
                }
                .padding(20)
            }
            .padding(-20)
            .padding(.top, 20)
        }
        .popover(isPresented: $creating){
            EditCourseView(true)
                .padding(20)
                .addBackground()
        }
    }
    
}

struct HostingView_Previews: PreviewProvider {
    static var previews: some View {
        HostingView()
            .padding(20)
            .addBackground()
            .accentColor(.DB)
    }
}
