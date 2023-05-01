//
//  ProfileDetailView.swift
//  SeniorProject
//
//  Created by Milo Cassarino and Abigail Jusiak on 4/17/23.
//

import SwiftUI

struct ProfileDetailView: View {
    
    
    let profile : ProfileClass
    
    init(_ profile: ProfileClass){
        self.profile = profile
    }
    
    var body: some View {
        
        VStack {
            Text("")
            
            ScrollView {
                
                VStack(alignment: .center, spacing: 20) {
                    
                    
                    Circle()
                        .shadow(radius: 10)
                        .frame(height: 175)
                        .overlay(
                            ZStack {
                                Image("SampleHeadshot")
                                    .resizable()
                                    .aspectRatio(contentMode: .fill)
                                    .clipShape(Circle())
                                
                                Circle()
                                    .strokeBorder(lineWidth: 2)
                                    .foregroundColor(.white)
                            }
                        )
                    
                    HStack(spacing: 20) {
                        
                        VStack(alignment: .center) {
                            
                            MainHeader(profile.fullName)
                            
                            HStack {
                                SectionHeading(profile.title)
                                SectionHeading("•")
                                SectionHeading("\(profile.city), \(profile.state)")
                            }
                            .foregroundColor(.white)
                            
                        }
                        
                    }
                    
                    aboutSection
                    
                    VStack(spacing: 5) {
                        HStack {
                            SubHeading("Hosting")
                                .foregroundColor(.white)
                                .shadow(radius: 5)
                            Spacer()
                        }
                        
                        VStack(spacing: 20) {
                            ForEach(profile.courses){ course in
                                CoursePreview(course)
                            }
                        }
                    }
                    
                }
                .padding(20)
            }
            .padding(-20)
        }
    }
    
    
    
    var aboutSection : some View {
        
        VStack(spacing: 5) {
            HStack {
                SubHeading("About")
                    .foregroundColor(.white)
                    .shadow(radius: 5)
                Spacer()
            }
            
            VStack(alignment: .leading) {
                
                VStack(alignment: .leading, spacing: 10) {
                    
                    SectionHeading("Skills")
                        .font(.title3.bold())
                    
                    ScrollView(.horizontal, showsIndicators: false){
                        HStack {
                            
                            ForEach(profile.skills, id: \.self){ skill in
                                Text(skill)
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
                    SectionHeading("Bio")
                    
                    Text(profile.bio)
                        .multilineTextAlignment(.leading)
                }
                
                
                Capsule()
                    .frame(height: 2)
                    .opacity(0.2)
                    .padding(.horizontal, -5)
                
                
                    
                Button(action: {
                    
                    let url = URL(string: "mailto:Milo@case.edu")!
                    
                    UIApplication.shared.openURL(url)
                    
                    
                }){
                    VStack(alignment: .leading, spacing: 10) {
                        SectionHeading("Contact")
                        
                        HStack {
                            Label("Email", systemImage: "envelope.fill")
                            Spacer()
                            Image(systemName: "chevron.right")
                        }
                    }
                    .foregroundColor(.primary)
                    
                }
            }
            .padding(20)
            .background(
                RoundedRectangle(cornerRadius: 20)
                    .fill(Material.regularMaterial)
            )
        }
        
    }
}

struct ProfileDetailView_Previews: PreviewProvider {
    static var previews: some View {
        ProfileDetailView(ProfileClass(0))
            .padding(.horizontal, 20)
            .addBackground()
    }
}
