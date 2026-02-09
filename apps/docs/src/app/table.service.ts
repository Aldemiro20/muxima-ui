import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';

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

// Mock data for demonstration purposes
const MOCK_DATA: RequestResponse = {
  data: [
    {
      estado: 'Active',
      nomeContribuinte: 'Sample Company A',
      numeroLiquidacao: '00001',
      numeroProcesso: '000000001/01.01/DEMO/2025'
    },
    {
      estado: 'Pending',
      nomeContribuinte: 'Sample Company B',
      numeroLiquidacao: '00002',
      numeroProcesso: '000000002/02.02/DEMO/2025'
    },
    {
      estado: 'Active',
      nomeContribuinte: 'Sample Company C',
      numeroLiquidacao: '00003',
      numeroProcesso: '000000003/03.03/DEMO/2025'
    }
  ],
  paginator: {
    pageNumber: 0,
    totalElements: 3,
    totalPages: 1
  },
  quantidadeTotalItens: 3
};

@Injectable({ 
  providedIn: 'root',
})
export class TableService {
  constructor() {}

  getInfo(): Observable<RequestResponse> {
    // Returns mock data for demonstration
    return of(MOCK_DATA);
  }

  filterInfo(): Observable<RequestResponse> {
    // Returns filtered mock data for demonstration
    const filtered = {
      ...MOCK_DATA,
      data: MOCK_DATA.data.filter(item => 
        item.numeroProcesso.includes('000000001')
      )
    };
    return of(filtered);
  }
}
 