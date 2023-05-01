//
//  CoursePreview.swift
//  SeniorProject
//
//  Created by Milo Cassarino and Abigail Jusiak on 4/17/23.
//

import SwiftUI

struct CoursePreview: View {
    
    init(_ course: CourseClass){
        self.course = course
    }
    
    let course : CourseClass
    
    var body: some View {
        
        NavigationLink(destination: {
            CourseDetailView(course)
                .padding(20)
                .addBackground()
        }) {
            VStack(alignment: .leading) {
                
                HStack {
                    SectionHeading(course.title)
                    Text("•")
                    Text(course.host_Safe.fullName)
                    Spacer()
                }
                .multilineTextAlignment(.leading)
                
                if let nextEvent = course.nextEvent {
                    HStack {
                        
                        Text(nextEvent.date)
                        Spacer()
                    }
                }
                
                HStack {
                    
                    ForEach(course.tags.prefix(upTo: min(course.tags.count, 2)), id: \.self){ tag in
                        Text(tag)
                            .lineLimit(1)
                            .padding(5)
                            .padding(.horizontal, 10)
                            .foregroundColor(.white)
                            .background(
                                Capsule()
                                    .foregroundColor(.DB)
                            )
                    }
                    
                    let moreTags = course.tags.count - 2
                    
                    Spacer()
                    
                    if moreTags > 0 {
                        Text("+\(moreTags)")
                            .padding(5)
                            .padding(.horizontal, 10)
                            .foregroundColor(.DB)
                            .overlay(
                                Capsule()
                                    .strokeBorder(lineWidth: 2)
                                    .foregroundColor(.DB)
                            )
                    }
                    
                }
                
            }
            .padding(20)
            .background(
                RoundedRectangle(cornerRadius: 20)
                    .fill(.regularMaterial)
                    .shadow(radius: 10)
            )
            .foregroundColor(.primary)
        }
    }
}

struct CoursePreview_Previews: PreviewProvider {
    static var previews: some View {
        CoursePreview(CourseClass(0))
            .padding()
            .addBackground()
    }
}
