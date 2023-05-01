//
//  ContentView.swift
//  SeniorProject
//
//  Created by Milo Cassarino and Abigail Jusiak on 3/7/23.
//

import SwiftUI
import CoreData


enum AppState {
    
    case explore, hosting, attending, settings
    
    
    var title : String {
        
        switch self {
            
        case .explore: return "Explore"
            
        case .hosting: return "Hosting"
            
        case .attending: return "Attending"
            
        case .settings: return "Profile"
            
        }
        
    }
    
    var symbol : String {
        
        switch self {
            
        case .explore: return "magnifyingglass"
            
        case .hosting: return "stethoscope"
            
        case .attending: return "book.fill"
            
        case .settings: return "person.fill"
            
        }
        
    }
    
}

struct ContentView: View {
    
    @State var selected : AppState = .explore
    
    var body: some View {
        
        NavigationView {
            VStack {
                VStack(spacing: 20) {
                    
                    ZStack {
                        switch selected {
                            
                        case .attending:
                            AttendingView()
                            
                        case .hosting:
                            HostingView()
                            
                        case .explore:
                            CourseExplore()
                            
                        case .settings:
                            SettingsView()
                            
                        }
                    }
                    .padding([.horizontal, .top], 20)
                    
                    
                    
                    HStack {
                        
                        tabItem(for: .explore)
                        
                        tabItem(for: .attending)
                        
                        tabItem(for: .hosting)
                        
                        tabItem(for: .settings)
                        
                    }
                    .padding(.top, 10)
                    .background(
                        Rectangle()
                            .fill(.regularMaterial)
                            .shadow(radius: 10)
                            .edgesIgnoringSafeArea(.bottom)
                    )
                    .foregroundColor(.DB)
                    .ignoresSafeArea(.keyboard)
                }
            }
            .addBackground()
            .ignoresSafeArea(.keyboard)

        }
    }
    
    func tabItem(for state: AppState) -> some View {
        
        Button(action: {
            self.selected = state
        }){
            VStack(spacing: 5) {
                
                Image(systemName: state.symbol)
                    .font(.title2.bold())
                
                Text(state.title)
                    .font(.caption)
                    .frame(maxWidth: .infinity)
            }
        }
        .foregroundColor(selected == state ? .DB : .black.opacity(0.5))
        
    }
}


struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
        
    }
}
