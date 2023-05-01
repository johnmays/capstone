//
//  APITask.swift
//
//  Created by MiloCassarino.
//

import Foundation


class APITask<T: Decodable>: ObservableObject {
    let endpoint: String
    let taskType: APIConnection.TaskType

    @Published var isLoading: Bool = false

    init(
        _ endpoint: String,
        type: T.Type,
        taskType: APIConnection.TaskType = .sendRecieve
    ) where T: Decodable {
        self.endpoint = endpoint
        self.taskType = taskType
    }

    func launch(
        with payload: [String: Any?] = [:],
        ifSuccess onSuccess: @escaping (T) -> Void,
        ifFailure onFailure: @escaping () -> Void
    ) {
        isLoading = true

        APIConnection.main.request(self, passPayload: payload, onSuccess: successWrapper, onFailure: failureWrapper)

        func successWrapper(_ data: T) {
            DispatchQueue.main.async {
                self.isLoading = false
                onSuccess(data)
            }
        }

        func failureWrapper() {
            DispatchQueue.main.async {
                self.isLoading = false
                onFailure()
            }
        }
    }
}

extension APITask where T == NoData {
    func launch(
        with payload: [String: Any?] = [:],
        ifSuccess onSuccess: @escaping () -> Void,
        ifFailure onFailure: @escaping () -> Void
    ) {
        launch(with: payload, ifSuccess: successWrapper, ifFailure: onFailure)

        func successWrapper(_: NoData) {
            onSuccess()
        }
    }

    convenience init(
        _ endpoint: String
    ) {
        self.init(endpoint, type: T.self, taskType: .send)
    }
}
