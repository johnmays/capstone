//
//  EditCourseView.swift
//  SeniorProject
//
//  Created by Milo Cassarino and Abigail Jusiak on 4/17/23.
//

import SwiftUI

struct EditCourseView: View {
    
    let course = CourseClass(0)
    
    let isNew : Bool
    let existingID : String?
    
    @State var editing : Bool = true
    
    
    
//    instructor_id
    @State var title = "" 
    @State var description = "" 
    @State var fields : [String] = []
    @State var cost_per_session = ""
    
    @State var newField = ""
    
    
    init(_ course: CourseClass){
        
        self._title = State(initialValue: course.title)
        self._description = State(initialValue: course.description)
        self._fields = State(initialValue: course.tags)
        self._cost_per_session = State(initialValue: course.nextEvent?.price ?? "")
        self.isNew = false
        self.existingID = course.id
        
    }
    
    init(_ new: Bool){
        self._title = State(initialValue: "")
        self._description = State(initialValue: "")
        self._fields = State(initialValue: [])
        self._cost_per_session = State(initialValue: "")
        self.isNew = new
        self.existingID = nil
    }

    
    var body: some View {
        
        VStack(alignment: .leading, spacing: 10) {
            
            
            MainHeader(editing ? (isNew ? "Creating" : "Editing") : title)
            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    
                    aboutSection
                    
                    if !editing {
                        Group {
                            VStack(alignment: .leading, spacing: 5) {
                                SubHeading("Host")
                                    .foregroundColor(.white)
                                
                                ProfilePreview(course.host_Safe)
                            }
                        }
                        .transition(.scale(scale: 0.9).combined(with: .opacity))
                        
                        
                    }
                    
                    Button(action: {
                        withAnimation {
                            editing.toggle()
                        }
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
                    
                    createButton
                        .foregroundColor(.DB)

                    
                }
                .padding(.horizontal, 20)
            }
            .padding(.horizontal, -20)
            

        }
    }
    
    var createButton : some View {
        
        Button(action: {
            postChanges()
        }){
            
            HStack {
                
                if isNew {
                    Image(systemName: "plus")
                        .font(.title3.weight(.bold))
                    SectionHeading("Create")
                } else {
                    Image(systemName: "pencil")
                        .font(.title3.weight(.bold))
                    SectionHeading("Update")
                }
                
            }
            .padding(10)
            .frame(maxWidth: .infinity)
            .background(
                RoundedRectangle(cornerRadius: 15)
                    .fill(.regularMaterial)
            )
            
            
        }
        
    }
    
    
    func postChanges(){
        
        
        if let existingID {

            let task = APITask("deleteCourse/id/\(existingID)")

            task.launch(ifSuccess: {}, ifFailure: {})
        }
            
        let task = APITask("createCourse")
        
        var flatField = ""
        
        for field in fields {
            flatField.append("\(field), ")
        }
        
        let packet : [String : Any] =
        [
            "instructor_id" : 424870,
            "title" : title,
            "description" : description,
            "field" : flatField,
            "cost_per_session" : cost_per_session
        ]
        
        task.launch(with: packet, ifSuccess: {
            
        }, ifFailure: {
            
        })
        
        
    }
    
    var aboutSection : some View {
        
        VStack(spacing: 5) {
            
            VStack(alignment: .leading) {
                
                VStack(alignment: .leading, spacing: 10) {
                    
                    
                    if editing {
                        Text("Title")
                        HStack {
                            TextField("Title", text: $title)
                        }
                        .padding(10)
                        .background(
                            RoundedRectangle(cornerRadius: 10)
                                .fill(Material.regularMaterial)
                        )
                    }
                    
                    SectionHeading("Tags")
                        .font(.title3.bold())
                    
                    
                    if !editing {
                        ScrollView(.horizontal, showsIndicators: false){
                            HStack {
                                
                                ForEach(fields, id: \.self){ skill in
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
                                
                                ForEach(fields, id: \.self){ skill in
                                    Button(action: {
                                        
                                        fields.removeAll(where: {$0 == skill})
                                        
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
                            TextField("Tag", text: $newField)
                            if !newField.isEmpty {
                                Button(action: {
                                    fields.insert(newField, at: 0)
                                    newField = ""
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
                    SectionHeading("Description")
                    
                    
                    if editing {
                        
                        ZStack {
                            
                            if #available(iOS 16.0, *) {
                                TextField("Bio", text: $description, axis: .vertical)
                                    .padding(10)
                                    .background(
                                        RoundedRectangle(cornerRadius: 10)
                                            .fill(Material.regularMaterial)
                                    )
                            } else {
                                
                                TextEditor(text: $description)
                                    .frame(minHeight: 50)
                                    .padding(10)
                                    .background(
                                        RoundedRectangle(cornerRadius: 10)
                                            .foregroundColor(.white)
                                    )
                            }
                                
                        }

                        
                    } else {
                        Text(description)
                            .multilineTextAlignment(.leading)
                    }
                }
                
                Capsule()
                    .frame(height: 2)
                    .opacity(0.2)
                    .padding(.horizontal, -5)
                
                
                VStack(alignment: .leading, spacing: 10) {
                    SectionHeading("Sessions")
                    
                    if !editing {
                        ForEach(course.event, id: \.date){ event in
                            
                            if event.id != course.event.first?.id {
                                Capsule()
                                    .frame(height: 1)
                                    .opacity(0.2)
                            }
                            
                            sessionView(for: event)
                            
                        }
                    } else {
                        Text("Cost")
                        HStack {
                            TextField("Cost", text: $cost_per_session)
                        }
                        .padding(10)
                        .background(
                            RoundedRectangle(cornerRadius: 10)
                                .fill(Material.regularMaterial)
                        )
                    }
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
        Button(action: {}){
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
                Text(cost_per_session)
                Image(systemName: "chevron.right")
            }
            .foregroundColor(.primary)
        }
        
    }
}

struct EditCourseView_Previews: PreviewProvider {
    static var previews: some View {
        EditCourseView(CourseClass(0))
            .padding(20)
            .addBackground()
    }
}
