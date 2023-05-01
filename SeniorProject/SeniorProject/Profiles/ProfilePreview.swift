//
//  ProfilePreview.swift
//  SeniorProject
//
//  Created by Milo Cassarino and Abigail Jusiak on 4/17/23.
//

import SwiftUI

struct ProfilePreview: View {
    
    init(_ profile: ProfileClass){
        
        self.profile = profile
        
    }
    
    let profile : ProfileClass
    
    var courseOfferings : Int {
        
        return profile.courses.count
    }
    
    var body: some View {
        NavigationLink(destination: {
            
            ProfileDetailView(profile)
                .padding(20)
                .addBackground()
            
        }
        ){
            VStack(alignment: .leading, spacing: 20) {
                
                HStack {
                    
                    Circle()
                        .frame(height: 50)
                        .overlay(
                            Image("SampleHeadshot")
                                .resizable()
                                .aspectRatio(contentMode: .fill)
                                .clipShape(Circle())
                        )
                    
                    VStack(alignment: .leading) {
                        
                        HStack {
                            SectionHeading(profile.fullName)
                            Spacer()
                        }
                        HStack {
                            Text("\(profile.title)")
                            Text("·")
                            Text("\(profile.city), \(profile.state)")
                        }
                        
                    }
                }
                
                HStack {
                    ForEach(profile.skills.prefix(2), id: \.self){ skill in
                        Text(skill)
                            .lineLimit(1)
                            .padding(5)
                            .padding(.horizontal, 10)
                            .foregroundColor(.white)
                            .background(
                                Capsule()
                                    .foregroundColor(.DB))
                    }
                    
                    let moreTags = profile.skills.count - 2
                    
                    Spacer()
                    
                    if true {
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
                
                Capsule()
                    .frame(height: 2)
                    .opacity(0.2)
                
                HStack {
                    //                Spacer()
                    Image(systemName: "stethoscope")
                    Text("Hosting \(courseOfferings) courses")
                        .font(.body.weight(.bold))
                    Spacer()
                    Image(systemName: "chevron.right")
                }
                
            }
            .frame(maxWidth: .infinity)
            .padding(20)
            .background(
                RoundedRectangle(cornerRadius: 20)
                    .fill(.regularMaterial)
                    .shadow(radius: 10)
            )
            .foregroundColor(.black)
        }
    }
}

struct ProfilePreview_Previews: PreviewProvider {
    static var previews: some View {
        ProfilePreview(ProfileClass(0))
            .padding()
            .addBackground()
    }
}
