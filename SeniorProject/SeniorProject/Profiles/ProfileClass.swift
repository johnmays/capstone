//
//  ProfileClass.swift
//  SeniorProject
//
//  Created by Milo Cassarino and Abigail Jusiak on 4/17/23.
//

import Foundation
import UIKit.UIImage


class ProfileClass : Identifiable {
    
    let id: UUID = UUID()
    
    let firstName : String
    let lastName : String
    let title : String
    
    let profileImg : UIImage?
    let bio : String
    
    let skills : [String]
    
    let city : String
    let state : String
    let zip : String
    
    var courses : [CourseClass]
    
    var fullName : String {
        
        "\(firstName) \(lastName)"
    }
    
    init(firstName: String, lastName: String, title: String, bio: String, skills: [String], city: String, state: String, zip: String) {
        self.firstName = firstName
        self.lastName = lastName
        self.title = title
        
        self.profileImg = nil
        self.bio = bio
        
        self.skills = skills
        
        self.city = city
        self.state = state
        self.zip = zip
        
        self.courses = []
    }
    
    convenience init(_ real: Int? = nil) {
        
        
        if let real {
            self.init(
                firstName: "Dr. John",
                lastName: "Smith",
                title: "Neurologist",
                bio: "I'm a board-certified neurologist with over 10 years of experience.",
                skills: ["Neurology", "Clinical Research", "Patient Care", "Patient Care 2"],
                city: "Cleveland",
                state: "OH", zip:
                    "44113"
            )
            
            self.courses = [CourseClass(0, host: self), CourseClass(1, host: self), CourseClass(2, host: self), CourseClass(3, host: self)]

        } else {
            self.init(
                firstName: "First",
                lastName: "Last",
                title: "Title",
                bio: "User Bio \nUser Bio \nUser Bio \nUser Bio",
                skills: ["Skill 1", "Skill 2", "Skill 3", "Skill 4"],
                city: "City",
                state: "State", zip:
                    "Zip"
            )
            
            self.courses = [CourseClass(host: self), CourseClass(host: self)]

        }
        
        
    }
    
}
