//
//  APIConnection.swift
//
//  Created by MiloCassarino.
//

import Foundation
import UIKit.UIDevice

class NoData: Codable {}

class APIConnection: ObservableObject {
    
    private let baseURL: URL

    private var savedBearer: String?

    private var savedLogin: String?

    static var main = APIConnection("http://ec2-3-144-101-12.us-east-2.compute.amazonaws.com:8050")

    private init(_ urlString: String) {
        guard let baseURL = URL(string: urlString) else {
            fatalError("Unable to construct base URL")
        }

        self.baseURL = baseURL
    }

    func request<T: Decodable>(
        _ task: APITask<T>,
        passPayload: [String: Any?],
        onSuccess: @escaping (T) -> Void,
        onFailure: @escaping () -> Void
    ) {
        request(task.endpoint, passPayload, type: task.taskType, onSuccess, onFailure)
    }

    private func request<T: Decodable>(
        _ endpoint: String,
        _ payload: [String: Any?],
        type: TaskType = .sendRecieve,
        _ onSuccess: @escaping (T) -> Void,
        _ onFailure: @escaping () -> Void
    ) {
        dataTask(endpoint, type: type, payload: payload) { result in
            switch result {
            case let .failure(error):
                failed(with: error)

            case let .success(data):

                if T.self == NoData.self {
                    print("Uncaptured Data!")
                }

                print(data)
                print(String(data: data, encoding: .utf8) ?? "No data")


                if type == .send, let nothing = NoData() as? T {
                    success(with: nothing)
                } else if T.self == String.self, let str = String(data: data, encoding: .utf8) as? T {
                    return success(with: str)
                } else {
                    do {
                        
                        let decodedData = try JSONDecoder().decode(T.self, from: data)

                        success(with: decodedData)

                    } catch {
                        failed(with: .dataRead(localError: error))
                    }
                }
            }
        }

        func failed(with error: ServerError) {
            print(error.localizedDescription)
            print(error.debugDescription)
            
            DispatchQueue.main.async {
                onFailure()
            }
        }

        func success(with data: T) {
            DispatchQueue.main.async {
                onSuccess(data)
            }
        }
    }

    private func dataTask(
        _ endpoint: String,
        type: TaskType = .sendRecieve,
        payload: [String: Any?],
        timeout: Double = 20,
        completion: @escaping (Result<Data, ServerError>) -> Void
    ) {

        let pathurl = URL(string: "http://ec2-3-144-101-12.us-east-2.compute.amazonaws.com:8050/")!.appendingPathComponent(endpoint)

        var request = URLRequest(url: pathurl)

        var mutablePayload = payload

        if type != .recieve {
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")

            do {
                request.httpBody = try JSONSerialization.data(withJSONObject: mutablePayload)
            } catch {
                completion(.failure(ServerError.unknown(localError: error)))
                return
            }
        }

        request.httpMethod = type == .recieve ? "GET" : "POST"

        request.timeoutInterval = timeout

        URLSession.shared.dataTask(with: request) { data, response, error in

            guard let data = data, error == nil else {
                completion(.failure(.unknown(localError: error)))
                return
            }

            let response = response as! HTTPURLResponse

            if let statusCodeError = ServerError.statusCode(response.statusCode) {
                print(String(data: data, encoding: .utf8) ?? "None")

                completion(.failure(statusCodeError))
                return
            }
            completion(.success(data))

        }.resume()
    }

    enum ServerError: Error {
        case invalidURL, timeout
        case unknown(localError: Error?)
        case dataRead(localError: Error)

        case imagePayloadCreation

        case maintenance, responseCode(_ code: Int)

        static func statusCode(_ code: Int) -> ServerError? {
            switch code {
            case 200: return nil
            case 502: return .maintenance

            default: return .responseCode(code)
            }
        }

        var debugDescription: String {
            switch self {
            case let .unknown(error): return "Unknown: \(String(describing: error))"
            case let .dataRead(error): return "Decoding: \(error)"
            case let .responseCode(code): return "Code: \(code)"

            case .maintenance: return "Server under maintenance"
            case .invalidURL: return "Invalid URL"
            case .timeout: return "Request timeout"

            case .imagePayloadCreation: return "Failed to send image"
            }
        }
    }

    enum TaskType {
        case send, sendRecieve, recieve, media
    }
}

extension Data {
    func decodeAsPacket() -> [String: Any]? {
        do {
            return try JSONSerialization.jsonObject(with: self, options: []) as? [String: Any]
        } catch {
            print(error.localizedDescription)
        }

        return nil
    }
}
