//
//  CourseExplore.swift
//  SeniorProject
//
//  Created by Milo Cassarino and Abigail Jusiak on 4/17/23.
//

import SwiftUI


enum Tag : CaseIterable {
    
    case psychiatry, neurology, gyneocolgy, pediatrics, geriatrics, epedimiology, anesthesiology, dermatology, ophthalamology, radiology, urology, emergency
    
    var title : String {
        switch self {
            
        case .psychiatry:
            return "psychiatry"
        case .neurology:
            return "Neurology"
        case .gyneocolgy:
            return "gyneocolgy"
        case .pediatrics:
            return "pediatrics"
        case .geriatrics:
            return "geriatrics"
        case .epedimiology:
            return "epedimiology"
        case .anesthesiology:
            return "anesthesiology"
        case .dermatology:
            return "dermatology"
        case .ophthalamology:
            return "ophthalamology"
        case .radiology:
            return "radiology"
        case .urology:
            return "urology"
        case .emergency:
            return "emergency"
        }
    }
    
    
    
    var color : Color {
        
        let colors : [Color] = [.red, .orange, .yellow, .green, .indigo, .blue, .purple]
        
        
        return colors.randomElement()!
        
    }
    
}

struct CourseExplore: View {
    
    @State var searchText : String = ""
    
    @State var courses : [CourseClass] = []
    
    var body: some View {
        
        VStack(alignment: .leading, spacing: 20) {
            MainHeader("Explore")
            
            HStack {
                Image(systemName: "magnifyingglass")
                    .font(.body.weight(.bold))
                    .opacity(0)
                TextField("Search", text: $searchText)
                if !searchText.isEmpty {
                    Button(action: {
                        loadCourses()
                    }){
                        
                        Image(systemName: "magnifyingglass")
                            .font(.body.weight(.bold))
//                        Image(systemName: "magnifyingglass")
//                            .foregroundColor(.red)
                    }
                }
            }
            .padding(10)
            .background(
                RoundedRectangle(cornerRadius: 10)
                    .fill(Material.regularMaterial)
            )
            
            ScrollView {
                ZStack {
                    if searchText.isEmpty {
                        quickTagsView
                    } else {
                        resultsView
                    }
                }
                .padding(20)
            }
            .padding(-20)
            
        }
    }
    
    
    var resultsView : some View {
        
        VStack {
            
            ForEach(courses){ course in
                CoursePreview(course)
            }
        }
    }
    
    var quickTagsView : some View {
        VStack(alignment: .leading) {
            SectionHeading("Quick Search")
                .foregroundColor(.white)
            
            LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())]) {
                
                ForEach(Tag.allCases, id: \.self){ tag in
                    
                    quickTagButton(for: tag)
                    
                }
                
            }
        }
    }
    
    func quickTagButton(for tag: Tag) -> some View {
        Button(action: {
            
            searchText = tag.title
            loadCourses()
            
        }){
            
            SectionHeading(tag.title.capitalized)
                .frame(maxWidth: .infinity)
                .frame(height: 100)
                .foregroundColor(.white)
                .background(
                    ZStack {
                        Color.white
                        
                        LinearGradient(colors: [.red.opacity(0.7), tag.color.opacity(1)], startPoint: .bottomLeading, endPoint: .topTrailing)

                    }
                )
                .overlay(
                    RoundedRectangle(cornerRadius: 20)
                        .strokeBorder(lineWidth: 5)
                        .foregroundColor(.white)
                        .opacity(0.5)
                )
                .clipShape(RoundedRectangle(cornerRadius: 20))
        }
    }
    
    func loadCourses(){
        
        let task = APITask("getCourse/field/\(searchText)", type: [CourseClass].self, taskType: .recieve)

        
        task.launch(ifSuccess: { courses in
            
            self.courses = courses
            
        }, ifFailure: {
            
//            self.profile = nil
            
        })
        
    }
    
}

struct CourseExplore_Previews: PreviewProvider {
    static var previews: some View {
        CourseExplore()
            .padding()
            .addBackground()
    }
}
