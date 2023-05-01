//
//  CourseClass.swift
//  SeniorProject
//
//  Created by Milo Cassarino and Abigail Jusiak on 4/17/23.
//

import Foundation


class CourseClass : Identifiable, Decodable {
    
    let id : String
    
    let title : String

    let host : ProfileClass?
    
    let tags : [String]
    
    let description : String
    
    let event : [CourseEvent]
    
    let instructorID : Int?
    
    let cost : String?
    
    var host_Safe : ProfileClass {
        
        if let host {
            return host
        }
        
        return ProfileClass(0)
        
    }
    
    var nextEvent : CourseEvent? {
        
        return event.first
        
    }
    
    init(_ real: Int? = nil, host: ProfileClass? = nil){
        
        event = [CourseEvent(real)]
        id = UUID().uuidString
        instructorID = nil
        cost = nil
        
        if let host {
            self.host = host
        } else {
            self.host = ProfileClass(real)
        }
        
        if let real {
            
            
            if real == 0 {
                title = "Neurology Seminar"
                
                tags = ["Brain", "Neurology", "Nerves", "Senses"]
                
                description = "Unravel the mysteries of the brain in our cutting-edge Neurology course! From synaptic plasticity to neurological disorders, dive into the fascinating world of neural science and unlock the secrets of the mind. Join us today and expand your understanding of the brain!"
                
            } else if real == 1{
                title = "Psychology Workshop"

                tags = ["Mental Health", "Behavioral Science", "Cognitive Psychology", "Social Psychology"]

                description = "Join our comprehensive Psychology Workshop and explore the intricate workings of the human mind. From cognitive processes to social behavior, our experts will guide you through the fascinating world of psychology. Gain a deeper understanding of mental health and human behavior, and enhance your critical thinking skills in this engaging course."

           
                
                
            } else if real == 2{
                title = "Medical Imaging Conference"

                tags = ["Radiology", "Medical Imaging", "Diagnostic Imaging", "Computed Tomography", "Magnetic Resonance Imaging"]

                description = "Attend our Medical Imaging Conference and discover the latest advancements in radiology and medical imaging technology. Learn about diagnostic imaging techniques such as Computed Tomography (CT) and Magnetic Resonance Imaging (MRI) and their application in modern medicine. Join our expert panel of radiologists and medical imaging specialists as they share their knowledge and expertise in this exciting field."

            } else {
                title = "Environmental Science Symposium"

                tags = ["Climate Change", "Sustainability", "Ecology", "Environmental Pollution", "Renewable Energy"]

                description = "Participate in our Environmental Science Symposium and explore the pressing issues of our time. Gain a deeper understanding of climate change, sustainability, and ecology, and learn about the impact of environmental pollution on our planet. Our expert speakers will discuss innovative solutions such as renewable energy and sustainable practices that can help us create a healthier planet for future generations."
            }
            
        } else {
            
            title = "Title"
            
            tags = ["Skill", "Skill", "Skill", "Skill"]
            
            description = "A description of the course...\nA description of the course...\nA description of the course...\nA description of the course..."

            
        }
        
    }
    
    
    
    enum CodingKeys: String, CodingKey {
        case id = "course_id"
        case instructorId = "instructor_id"
        case description = "description"
        case field = "field"
        case cost = "cost_per_session"
        case title = "title"
    }
    
    required init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        
        let idInt =  try values.decode(Int.self, forKey: .id)
        self.id = "\(idInt)"
        
        self.instructorID = try values.decode(Int.self, forKey: .instructorId)
        self.description = try values.decode(String.self, forKey: .description)
        self.cost = try values.decode(String.self, forKey: .cost)
        self.title = try values.decode(String.self, forKey: .title)
        
        let flatFields = try values.decode(String.self, forKey: .field)
        self.tags = flatFields.components(separatedBy: ",")
        
        self.host = ProfileClass(0)
        self.event = [CourseEvent(cost ?? "$100")]
        
    }
    
}

class CourseEvent : Identifiable {
    
    let id : UUID = UUID()
    
    let date : String
    let time : String
    let price : String
    let location : String
    
    
    init(_ price: String){
        date = "Wednesday, May 3rd"
        time = "2:00 pm"
        self.price = price
        location = "Cleveland, OH"
    }
    
    
    init(_ real: Int? = nil){
        
        if let real {
            
            if real == 0 {
                date = "Friday, April 21st"
                time = "5:00 pm"
                price = "$50"
                location = "Cleveland, OH"
            } else if real == 1 {
                date = "Wednesday, April 26th"
                time = "2:00 pm"
                price = "$75"
                location = "Cleveland, OH"
            } else if real == 2{
                date = "Friday, April 28th"
                time = "5:00 pm"
                price = "$62"
                location = "Cleveland, OH"
            } else {
                date = "Wednesday, May 3rd"
                time = "2:00 pm"
                price = "$100"
                location = "Cleveland, OH"
            }

        } else {
            
            date = "Date"
            time = "Time"
            price = "$Cost"
            location = "City, State"
            
        }
        
    }
    
}
