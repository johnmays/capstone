//
//  CourseDetailView.swift
//  SeniorProject
//
//  Created by Milo Cassarino and Abigail Jusiak on 4/17/23.
//

import SwiftUI
import AppClip
import UIKit
import StoreKit

struct CourseDetailView: View {
    
    init(_ course: CourseClass){
        self.course = course
    }
    
    let course : CourseClass
    
    #if APPCLIP
    @State var showApp : Bool = false
    #else
    @State var alert : Bool = false
    #endif
    
    var body: some View {
        
        VStack(alignment: .leading, spacing: 10) {
            
            MainHeader(course.title)
            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    
                    aboutSection
                    
                    VStack(alignment: .leading, spacing: 5) {
                        SubHeading("Host")
                            .foregroundColor(.white)
                        
                        ProfilePreview(course.host_Safe)
                    }
                    
                }
                .padding(.horizontal, 20)
            }
            .padding(.horizontal, -20)
        }
    }
    
    var aboutSection : some View {
        
        VStack(spacing: 5) {
            
            VStack(alignment: .leading) {
                
                VStack(alignment: .leading, spacing: 10) {
                    
                    SectionHeading("Tags")
                        .font(.title3.bold())
                    
                    ScrollView(.horizontal, showsIndicators: false){
                        HStack {
                            
                            ForEach(course.tags, id: \.self){ tag in
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
                            
                        }
                        .padding(.horizontal, 20)
                    }
                    .padding(.horizontal, -20)

                }
                
                Capsule()
                    .frame(height: 2)
                    .opacity(0.2)
                    .padding(.horizontal, -5)
                
                VStack(alignment: .leading, spacing: 10) {
                    SectionHeading("Description")
                    
                    
                    Text(course.description)
                        .multilineTextAlignment(.leading)
                }
                
                Capsule()
                    .frame(height: 2)
                    .opacity(0.2)
                    .padding(.horizontal, -5)
                
                
                VStack(alignment: .leading, spacing: 10) {
                    SectionHeading("Sessions")
                    
                    #if APPCLIP
                    ForEach(course.event, id: \.date){ event in
                        
                        if event.id != course.event.first?.id {
                            Capsule()
                                .frame(height: 1)
                                .opacity(0.2)
                        }
                        
                        sessionView(for: event)
                            
                        
                    }
                    .appStoreOverlay(isPresented: $showApp) {
                        SKOverlay.AppClipConfiguration(position: .bottom)
                    }
                    #else
                    ForEach(course.event, id: \.date){ event in
                        
                        if event.id != course.event.first?.id {
                            Capsule()
                                .frame(height: 1)
                                .opacity(0.2)
                        }
                        
                        sessionView(for: event)
                            
                        
                    }
                    .alert("Coming Soon", isPresented: $alert){
                        Button("OK", role: .cancel) { }
                    }
                    #endif
                    
                }
                
            }
            .padding(20)
            .background(
                RoundedRectangle(cornerRadius: 20)
                    .fill(Material.regularMaterial)
            )
        }
        
    }
    
    
    func sessionView(for session: CourseEvent) -> some View {
        
        return
        Button(action: {
            #if APPCLIP
            showApp = true
            #else
            alert = true
            #endif
        }){
            HStack {
                VStack {
                    HStack {
                        Text(session.date)
                        Text("•")
                        Text(session.time)
                        Spacer()
                        
                        
                    }
                    HStack {
                        Text(session.location)
                        Spacer()
                    }
                    
                }
                Text(session.price)
                Image(systemName: "chevron.right")
            }
            .foregroundColor(.primary)
        }
        
    }
}

struct CourseDetailView_Previews: PreviewProvider {
    static var previews: some View {
        CourseDetailView(CourseClass(0))
            .padding(20)
            .addBackground()
    }
}
