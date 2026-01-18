import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQwOTUxMiIsIm5vbWUiOiJWQU5JTFNPTiBaRUNBIFJJQkVJUk8iLCJlbWFpbCI6InZhbmlsc29uLnJpYmVpcm9AbWluZmluLmdvdi5hbyIsIm5pZiI6IjAwMzkxNTMxOUxBMDMwIiwibmlmQW50aWdvIjoiMDAzOTE1MzE5TEEwMzAiLCJjb250cmlidWludGUiOiJJbnRlcm5vIiwicmZEb21pY2lsaW8iOiIwNC4wMyIsInByaW1laXJvQWNlc3NvIjoiRmFsc2UiLCJwYWNvdGUiOlsiIiwiUFBQX0YiLCJPSV9GIiwiSVZNX0YiLCJQQ1JIX0YiXSwidGVsZWZvbmUiOiI5Mzg3NDI5ODMiLCJ0aXBvQ29udHJpYnVpbnRlIjoiU2luZ3VsYXIiLCJzdWJUaXBvQ29udHJpYnVpbnRlIjoiVElQT1NTIiwibmF0dXJlemFKdXJpZGljYSI6IiIsInJlcHJlc2VudGFudGVMZWdhbCI6IkZhbHNlIiwiYVJlcHJlc2VudGFyIjoiRmFsc2UiLCJmdW5jaW9uYXJpbyI6IlRydWUiLCJhY2Vzc29BZG1pbmlzdHJhdGl2byI6IkZhbHNlIiwibnVtZXJvRnVuY2lvbmFyaW8iOiI1NTU5IiwiZW50aWRhZGVNaW5pc3RlcmlhbCI6IjEiLCJjb2RpZ29FbnRpZGFkZU1pbmlzdGVyaWFsIjoiQUdUIiwicmZBbG9jYWNhbyI6IiIsInJmQWxvY2FjYW9EZXNjcmljYW8iOiIiLCJwb3N0b0Zpc2NhbCI6IiIsInNlY3RvckFkdWFuZWlybyI6IiIsInJlZ2lhb1RyaWJ1dGFyaWEiOiJTZWRlLUFHVCIsImVzdGFkbyI6IlRydWUiLCJhcmVhT3JnYW5pemFjaW9uYWwiOiIiLCJhcmVhT3JnYW5pemFjaW9uYWxEZXNjcmljYW8iOiIiLCJhcmVhT3JnYW5pemFjaW9uYWxDb2RpZ28iOiIiLCJjb2xvY2FjYW8iOiJEZXBhcnRhbWVudG8gZGUgRmlzY2FsaXphw6fDo28gQWR1YW5laXJhIiwiZGlyRXN0YW5jaWFUcmlidXRhcmlhIjoiRGlyZWPDp8OjbyBkb3MgU2VydmnDp29zIEFkdWFuZWlyb3MiLCJuYmYiOjE3NDI1NDc0NTMsImV4cCI6MTc0MjU1NDY1MywiaWF0IjoxNzQyNTQ3NDUzLCJpc3MiOiJBR1QifQ.aoIFqN2LRUvVcCf2ouD2p21IkdchjGIYbC-gbvVcd-U'

interface RequestResponse {
  data: Info[]
  paginator: {
    pageNumber: number
    totalElements: number
    totalPages: number
  }
  quantidadeTotalItens: number
}

export type Info = {
  estado : string
  nomeContribuinte: string
  numeroLiquidacao: string
  numeroProcesso: string
}

@Injectable({ 
  providedIn: 'root',
})
export class TableService {
  constructor(private http: HttpClient) {
    
  }

  getInfo() {
    return this.http.get<RequestResponse>('http://conda04.minfin.gov.ao/exefiscal-api/execfiscal/v1/findAllAdmin?page=0&size=5', { headers: {
      'x-token': token,
    } }) 
  }

  filterInfo() {
    return this.http.get<RequestResponse>('http://conda04.minfin.gov.ao/exefiscal-api/execfiscal/v1/findAllAdmin?page=0&size=5&numeroProcesso=000000029/04.03/AGT/2025', { headers: {
      'x-token': token,
    } })
  }
}
 