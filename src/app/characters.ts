export interface Characters {
    code: number
    status: string
    copyright: string
    attributionText: string
    attributionHTML: string
    etag: string
    data: Data
  }
  
  export interface Data {
    offset: number
    limit: number
    total: number
    count: number
    results: Result[]
  }
  
  export interface Result {
    id: number
    name: string
    description: string
    modified: string
    thumbnail: Thumbnail
    resourceURI: string
  }
  
  export interface Thumbnail {
    path: string
    extension: string
  }
  
  
 
  