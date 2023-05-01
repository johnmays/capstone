//
//  AttendingView.swift
//  SeniorProject
//
//  Created by Milo Cassarino and Abigail Jusiak on 4/17/23.
//

import SwiftUI

struct AttendingView: View {
    
    let attending : [CourseClass] = [
        CourseClass(0),
        CourseClass(1),
        CourseClass(2),
        CourseClass(3),
        CourseClass(4),
    ]
    
    var body: some View {
        
        VStack(alignment: .leading) {
            MainHeader("Attending")

            
            ScrollView {
                VStack(spacing: 20) {
                    ForEach(attending){ course in
                        CoursePreview(course)
                    }
                }
                .padding(20)
            }
            .padding(-20)
        }
    }
}

struct AttendingView_Previews: PreviewProvider {
    static var previews: some View {
        AttendingView()
            .padding(20)
            .addBackground()
    }
}
