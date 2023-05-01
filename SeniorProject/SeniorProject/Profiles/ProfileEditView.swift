//
//  ProfileEditView.swift
//  SeniorProject
//
//  Created by Milo Cassarino and Abigail Jusiak on 4/17/23.
//

import SwiftUI

struct ProfileEditView: View {
    
    @State var title : String
    @State var city : String
    @State var state : String
    
    @State var skills : [String]
    @State var bio : String
    
    @State var email : String
    
    let profile = ProfileClass(0)
    
    @State var newSkill = ""
    @State var editing = false
    
    init(_ profile: ProfileClass){
        self._title = .init(initialValue: profile.title)
        self._city = .init(initialValue: profile.city)
        self._state = .init(initialValue: profile.state)
        self._skills = .init(initialValue: profile.skills)
        self._bio = .init(initialValue: profile.bio)
        self._email = .init(initialValue: "test@mail.com")

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
                            
                            if !editing {
                                HStack {
                                    SectionHeading(title)
                                    SectionHeading("•")
                                    SectionHeading("\(city), \(state)")
                                }
                                .foregroundColor(.white)
                            } else {
                                Group {
                                    TextField("Title", text: $title)
                                    TextField("City", text: $city)
                                    TextField("State", text: $state)
                                }
                                .padding(10)
                                .background(
                                    RoundedRectangle(cornerRadius: 10)
                                        .fill(Material.regularMaterial)
                                )
                                
                            }
                            
                        }
                        
                    }
                    
                    aboutSection
                    
                    if !editing {
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
                    
                }
                .padding(20)
                
                
                Button(action: {
                    editing.toggle()
                }){
                    HStack {
                        
                        if editing {
                            Image(systemName: "eye.fill")
                                .font(.title3.weight(.bold))
                            SectionHeading("Preview")
                        } else {
                            Image(systemName: "pencil")
                                .font(.title3.weight(.bold))
                            SectionHeading("Edit")
                        }
                        
                    }
                    .padding(10)
                    .frame(maxWidth: .infinity)
                    .background(
                        RoundedRectangle(cornerRadius: 15)
                            .fill(Material.regularMaterial)
                    )
                }
                .foregroundColor(.DB)
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
                    
                    
                    if !editing {
                        ScrollView(.horizontal, showsIndicators: false){
                            HStack {
                                
                                ForEach(skills, id: \.self){ skill in
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
                    } else {
                        
                        ScrollView(.horizontal, showsIndicators: false){
                            HStack {
                                
                                ForEach(skills, id: \.self){ skill in
                                    Button(action: {
                                        
                                        skills.removeAll(where: {$0 == skill})
                                        
                                    }){
                                        HStack {
                                            Text(skill)
                                                .lineLimit(1)
                                            
                                            Image(systemName: "minus")
                                        }
                                        .padding(5)
                                        .padding(.horizontal, 10)
                                        .foregroundColor(.white)
                                        .background(
                                            Capsule()
                                                .foregroundColor(.DB)
                                        )
                                    }
                                }
                                
                            }
                            .padding(.horizontal, 20)
                        }
                        .padding(.horizontal, -20)
                        
                        HStack {
                            TextField("Skill", text: $newSkill)
                            if !newSkill.isEmpty {
                                Button(action: {
                                    skills.insert(newSkill, at: 0)
                                    newSkill = ""
                                }){
                                    Image(systemName: "plus")
                                }
                            }
                        }
                        .padding(10)
                        .background(
                            RoundedRectangle(cornerRadius: 10)
                                .fill(Material.regularMaterial)
                        )
                    }
                    
                    

                }
                
                Capsule()
                    .frame(height: 2)
                    .opacity(0.2)
                    .padding(.horizontal, -5)
                
                VStack(alignment: .leading, spacing: 10) {
                    SectionHeading("Bio")
                    if editing {
                        
                        ZStack {
                            
                            if #available(iOS 16.0, *) {
                                TextField("Bio", text: $bio, axis: .vertical)
                                    .padding(10)
                                    .background(
                                        RoundedRectangle(cornerRadius: 10)
                                            .fill(Material.regularMaterial)
                                    )
                            } else {
                                
                                TextEditor(text: $bio)
                                    .frame(minHeight: 50)
                                    .padding(10)
                                    .background(
                                        RoundedRectangle(cornerRadius: 10)
                                            .foregroundColor(.white)
                                    )
                            }
                                
                        }

                        
                    } else {
                        Text(bio)
                            .multilineTextAlignment(.leading)
                    }
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

struct ProfileEditView_Previews: PreviewProvider {
    static var previews: some View {
        ProfileEditView(ProfileClass(0))
            .padding()
            .addBackground()
    }
}
