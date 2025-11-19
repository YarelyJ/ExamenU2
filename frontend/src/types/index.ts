export interface Topic {
  name: string;
  description: string;
  code: string;
  fullDescription: string;
}

export interface Module {
  id: number;
  title: string;
  docNumber: string;
  description: string;
  topics: Topic[];
  chartData: any[];
  keyPoints: string[];
}

export interface ApiResponse {
  modules: Module[];
}
