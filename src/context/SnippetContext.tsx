// import React, { createContext, useContext, ReactNode, useCallback } from 'react';
// import { useLocalStorage } from '@/hooks/useLocalStorage';

// // Types
// export type Language = 'Python' | 'Spark Scala' | 'SQL' | 'JavaScript' | 'Java' | 'C++' | 'Go' | 'HTML/CSS';

// export interface Review {
//   id: string;
//   userId: string;
//   userName: string;
//   userAvatar: string;
//   rating: number;
//   comment: string;
//   createdAt: string;
// }

// export interface Snippet {
//   id: string;
//   categoryId: string;
//   title: string;
//   description: string;
//   code: string;
//   inputSample: string;
//   outputSample: string;
//   language: Language;
//   tags: string[];
//   authorId: string;
//   authorName: string;
//   authorAvatar: string;
//   reviews: Review[];
//   createdAt: string;
//   updatedAt: string;
// }

// export interface Category {
//   id: string;
//   name: string;
//   description: string;
//   icon: string;
//   gradient: string;
//   isDefault: boolean;
//   createdAt: string;
// }

// interface SnippetContextType {
//   categories: Category[];
//   snippets: Snippet[];
//   addCategory: (category: Omit<Category, 'id' | 'createdAt' | 'isDefault'>) => void;
//   deleteCategory: (id: string) => void;
//   addSnippet: (snippet: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt' | 'reviews'>) => void;
//   updateSnippet: (id: string, updates: Partial<Snippet>) => void;
//   deleteSnippet: (id: string) => void;
//   addReview: (snippetId: string, review: Omit<Review, 'id' | 'createdAt'>) => void;
//   getSnippetsByCategory: (categoryId: string) => Snippet[];
//   getSnippetById: (id: string) => Snippet | undefined;
//   getCategoryById: (id: string) => Category | undefined;
// }

// // Default categories
// const defaultCategories: Category[] = [
//   {
//     id: 'jet',
//     name: 'JET',
//     description: 'High-performance data processing snippets for JET pipelines. Spark, Python, and SQL transformations.',
//     icon: 'Zap',
//     gradient: 'gradient-jet',
//     isDefault: true,
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: 'omnia',
//     name: 'Omnia',
//     description: 'Comprehensive analytics and reporting snippets for Omnia workflows. Query templates and utilities.',
//     icon: 'Globe',
//     gradient: 'gradient-omnia',
//     isDefault: true,
//     createdAt: new Date().toISOString(),
//   },
// ];

// // Seed snippets
// const seedSnippets: Snippet[] = [
//   {
//     id: '1',
//     categoryId: 'jet',
//     title: 'Convert XLS to CSV',
//     description: 'Efficiently converts Excel spreadsheets to CSV format with proper encoding and delimiter handling.',
//     language: 'Python',
//     code: `import pandas as pd
// from pathlib import Path

// def convert_xls_to_csv(input_path: str, output_path: str, sheet_name: str = None) -> None:
//     """Convert an Excel file to CSV format."""
//     df = pd.read_excel(input_path, sheet_name=sheet_name or 0, engine='openpyxl')
//     df.columns = df.columns.str.strip().str.lower().str.replace(' ', '_')
//     df.to_csv(output_path, index=False, encoding='utf-8')
//     print(f"Successfully converted {input_path} to {output_path}")

// if __name__ == "__main__":
//     convert_xls_to_csv("data/sales.xlsx", "output/sales.csv")`,
//     inputSample: `Product ID,Product Name,Sales Q1,Sales Q2
// P001,Widget Alpha,1500,1750
// P002,Widget Beta,2300,2100`,
//     outputSample: `product_id,product_name,sales_q1,sales_q2
// P001,Widget Alpha,1500,1750
// P002,Widget Beta,2300,2100`,
//     tags: ['data-conversion', 'excel', 'csv', 'pandas'],
//     authorId: 'user1',
//     authorName: 'Sarah Chen',
//     authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
//     reviews: [
//       {
//         id: 'r1',
//         userId: 'user2',
//         userName: 'Mike Johnson',
//         userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
//         rating: 5,
//         comment: 'Works perfectly! Saved me hours of manual work.',
//         createdAt: '2024-01-15T10:30:00Z',
//       },
//     ],
//     createdAt: '2024-01-10T08:00:00Z',
//     updatedAt: '2024-01-12T14:30:00Z',
//   },
//   {
//     id: '2',
//     categoryId: 'jet',
//     title: 'Data Transformation Pipeline',
//     description: 'Spark Scala pipeline for complex data transformations including filtering and aggregation.',
//     language: 'Spark Scala',
//     code: `import org.apache.spark.sql.{SparkSession, DataFrame}
// import org.apache.spark.sql.functions._

// object DataTransformationPipeline {
//   def main(args: Array[String]): Unit = {
//     val spark = SparkSession.builder()
//       .appName("DataTransformationPipeline")
//       .getOrCreate()
    
//     val salesDF = spark.read.option("header", "true").csv("data/sales.csv")
    
//     val transformedDF = salesDF
//       .filter($"status" === "completed")
//       .groupBy($"region")
//       .agg(sum($"revenue").alias("total_revenue"))
    
//     transformedDF.write.mode("overwrite").parquet("output/sales_summary/")
//   }
// }`,
//     inputSample: `region,revenue,status
// NORTH,500,completed
// SOUTH,300,completed
// NORTH,200,pending`,
//     outputSample: `region,total_revenue
// NORTH,500
// SOUTH,300`,
//     tags: ['spark', 'etl', 'aggregation'],
//     authorId: 'user2',
//     authorName: 'Mike Johnson',
//     authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
//     reviews: [],
//     createdAt: '2024-01-11T12:00:00Z',
//     updatedAt: '2024-01-13T16:45:00Z',
//   },
//   {
//     id: '3',
//     categoryId: 'omnia',
//     title: 'Customer Segmentation Query',
//     description: 'SQL query for RFM-based customer segmentation with dynamic scoring.',
//     language: 'SQL',
//     code: `-- Customer RFM Segmentation Query
// WITH customer_metrics AS (
//     SELECT 
//         customer_id,
//         COUNT(DISTINCT order_id) AS frequency,
//         SUM(total_amount) AS monetary_value,
//         DATEDIFF(CURRENT_DATE, MAX(order_date)) AS recency_days
//     FROM orders
//     WHERE order_status = 'completed'
//     GROUP BY customer_id
// )
// SELECT 
//     customer_id,
//     recency_days,
//     frequency,
//     monetary_value,
//     CASE 
//         WHEN recency_days <= 30 AND frequency >= 5 THEN 'Champions'
//         WHEN recency_days <= 60 THEN 'Loyal'
//         ELSE 'At Risk'
//     END AS segment
// FROM customer_metrics;`,
//     inputSample: `customer_id,order_id,order_date,total_amount,order_status
// C001,O1001,2024-01-10,250.00,completed
// C001,O1002,2024-01-15,180.00,completed
// C002,O1003,2023-06-20,75.00,completed`,
//     outputSample: `customer_id,recency_days,frequency,monetary_value,segment
// C001,5,2,430.00,Champions
// C002,200,1,75.00,At Risk`,
//     tags: ['sql', 'analytics', 'rfm', 'segmentation'],
//     authorId: 'user3',
//     authorName: 'Emma Wilson',
//     authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
//     reviews: [
//       {
//         id: 'r4',
//         userId: 'user4',
//         userName: 'David Park',
//         userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
//         rating: 5,
//         comment: 'This is exactly what our marketing team needed!',
//         createdAt: '2024-01-17T11:30:00Z',
//       },
//     ],
//     createdAt: '2024-01-12T09:30:00Z',
//     updatedAt: '2024-01-14T11:00:00Z',
//   },
//   {
//     id: '4',
//     categoryId: 'omnia',
//     title: 'JSON Data Parser',
//     description: 'Python utility for parsing nested JSON structures into flat DataFrames.',
//     language: 'Python',
//     code: `import json
// import pandas as pd
// from typing import Dict, List, Any

// def flatten_json(nested_json: Dict, separator: str = '_') -> Dict:
//     """Flatten a nested JSON object."""
//     out = {}
//     def flatten(x: Any, name: str = '') -> None:
//         if isinstance(x, dict):
//             for k, v in x.items():
//                 flatten(v, f"{name}{separator}{k}" if name else k)
//         elif isinstance(x, list):
//             for i, item in enumerate(x):
//                 flatten(item, f"{name}{separator}{i}")
//         else:
//             out[name] = x
//     flatten(nested_json)
//     return out

// def parse_json_to_dataframe(json_data: List[Dict]) -> pd.DataFrame:
//     return pd.DataFrame([flatten_json(r) for r in json_data])`,
//     inputSample: `[{"user": {"name": "Alice"}, "total": 99.99}]`,
//     outputSample: `user_name,total
// Alice,99.99`,
//     tags: ['json', 'parsing', 'pandas'],
//     authorId: 'user4',
//     authorName: 'David Park',
//     authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
//     reviews: [],
//     createdAt: '2024-01-13T14:00:00Z',
//     updatedAt: '2024-01-13T14:00:00Z',
//   },
// ];

// const SnippetContext = createContext<SnippetContextType | undefined>(undefined);

// export const SnippetProvider = ({ children }: { children: ReactNode }) => {
//   const [categories, setCategories] = useLocalStorage<Category[]>('snippet-categories', defaultCategories);
//   const [snippets, setSnippets] = useLocalStorage<Snippet[]>('snippet-data', seedSnippets);

//   const addCategory = useCallback((category: Omit<Category, 'id' | 'createdAt' | 'isDefault'>) => {
//     const newCategory: Category = {
//       ...category,
//       id: `cat-${Date.now()}`,
//       isDefault: false,
//       createdAt: new Date().toISOString(),
//     };
//     setCategories(prev => [...prev, newCategory]);
//   }, [setCategories]);

//   const deleteCategory = useCallback((id: string) => {
//     setCategories(prev => prev.filter(c => !c.isDefault && c.id !== id));
//     setSnippets(prev => prev.filter(s => s.categoryId !== id));
//   }, [setCategories, setSnippets]);

//   const addSnippet = useCallback((snippet: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt' | 'reviews'>) => {
//     const newSnippet: Snippet = {
//       ...snippet,
//       id: `snip-${Date.now()}`,
//       reviews: [],
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//     };
//     setSnippets(prev => [...prev, newSnippet]);
//   }, [setSnippets]);

//   const updateSnippet = useCallback((id: string, updates: Partial<Snippet>) => {
//     setSnippets(prev => prev.map(s => 
//       s.id === id ? { ...s, ...updates, updatedAt: new Date().toISOString() } : s
//     ));
//   }, [setSnippets]);

//   const deleteSnippet = useCallback((id: string) => {
//     setSnippets(prev => prev.filter(s => s.id !== id));
//   }, [setSnippets]);

//   const addReview = useCallback((snippetId: string, review: Omit<Review, 'id' | 'createdAt'>) => {
//     const newReview: Review = {
//       ...review,
//       id: `rev-${Date.now()}`,
//       createdAt: new Date().toISOString(),
//     };
//     setSnippets(prev => prev.map(s => 
//       s.id === snippetId 
//         ? { ...s, reviews: [...s.reviews, newReview], updatedAt: new Date().toISOString() }
//         : s
//     ));
//   }, [setSnippets]);

//   const getSnippetsByCategory = useCallback((categoryId: string) => {
//     return snippets.filter(s => s.categoryId === categoryId);
//   }, [snippets]);

//   const getSnippetById = useCallback((id: string) => {
//     return snippets.find(s => s.id === id);
//   }, [snippets]);

//   const getCategoryById = useCallback((id: string) => {
//     return categories.find(c => c.id === id);
//   }, [categories]);

//   return (
//     <SnippetContext.Provider value={{
//       categories,
//       snippets,
//       addCategory,
//       deleteCategory,
//       addSnippet,
//       updateSnippet,
//       deleteSnippet,
//       addReview,
//       getSnippetsByCategory,
//       getSnippetById,
//       getCategoryById,
//     }}>
//       {children}
//     </SnippetContext.Provider>
//   );
// };

// export const useSnippets = () => {
//   const context = useContext(SnippetContext);
//   if (!context) {
//     throw new Error('useSnippets must be used within a SnippetProvider');
//   }
//   return context;
// };

// export const currentUser = {
//   id: 'current-user',
//   name: 'You',
//   avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser',
// };

import React, { createContext, useContext, ReactNode, useCallback } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

// Types
export type Language = 'Python' | 'Spark Scala' | 'SQL' | 'JavaScript' | 'Java' | 'C++' | 'Go' | 'HTML/CSS';

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Snippet {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  code: string;
  inputSample: string;
  outputSample: string;
  language: Language;
  tags: string[];
  authorId: string;
  authorName: string;
  authorAvatar: string;
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
  type?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  gradient: string;
  isDefault: boolean;
  createdAt: string;
}

interface SnippetContextType {
  categories: Category[];
  snippets: Snippet[];
  addCategory: (category: Omit<Category, 'id' | 'createdAt' | 'isDefault'>) => void;
  deleteCategory: (id: string) => void;
  addSnippet: (snippet: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt' | 'reviews'>) => void;
  updateSnippet: (id: string, updates: Partial<Snippet>) => void;
  deleteSnippet: (id: string) => void;
  addReview: (snippetId: string, review: Omit<Review, 'id' | 'createdAt'>) => void;
  getSnippetsByCategory: (categoryId: string) => Snippet[];
  getSnippetById: (id: string) => Snippet | undefined;
  getCategoryById: (id: string) => Category | undefined;
}

// Default categories
const defaultCategories: Category[] = [
  {
    id: 'jet',
    name: 'JET',
    description: 'High-performance data processing snippets for JET pipelines. Spark, Python, and SQL transformations.',
    icon: 'Zap',
    gradient: 'gradient-jet',
    isDefault: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'omnia',
    name: 'Omnia',
    description: 'Comprehensive analytics and reporting snippets for Omnia workflows. Query templates and utilities.',
    icon: 'Globe',
    gradient: 'gradient-omnia',
    isDefault: true,
    createdAt: new Date().toISOString(),
  },
];

// Seed snippets - Updated to include ALL 6 snippets
const seedSnippets: Snippet[] = [
  // --- JET SNIPPETS ---
  {
    id: '1',
    categoryId: 'jet',
    title: 'Convert XLS to CSV',
    description: 'Efficiently converts Excel spreadsheets to CSV format with proper encoding and delimiter handling.',
    language: 'Python',
    code: `import pandas as pd\nfrom pathlib import Path\n\ndef convert_xls_to_csv(input_path: str, output_path: str, sheet_name: str = None) -> None:\n    """Convert an Excel file to CSV format."""\n    df = pd.read_excel(input_path, sheet_name=sheet_name or 0, engine='openpyxl')\n    df.columns = df.columns.str.strip().str.lower().str.replace(' ', '_')\n    df.to_csv(output_path, index=False, encoding='utf-8')\n    print(f"Successfully converted {input_path} to {output_path}")`,
    inputSample: `Product ID,Product Name,Sales Q1,Sales Q2\nP001,Widget Alpha,1500,1750`,
    outputSample: `product_id,product_name,sales_q1,sales_q2\nP001,Widget Alpha,1500,1750`,
    tags: ['data-conversion', 'excel', 'csv', 'pandas'],
    authorId: 'user1',
    authorName: 'Sarah Chen',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    reviews: [
      {
        id: 'r1',
        userId: 'user2',
        userName: 'Mike Johnson',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
        rating: 5,
        comment: 'Works perfectly! Saved me hours of manual work.',
        createdAt: '2024-01-15T10:30:00Z',
      },
    ],
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-12T14:30:00Z',
  },
  {
    id: '2',
    categoryId: 'jet',
    title: 'Data Transformation Pipeline',
    description: 'Spark Scala pipeline for complex data transformations including filtering and aggregation.',
    language: 'Spark Scala',
    code: `val df = spark.read.parquet("source")\nval result = df.filter($"amount" > 100)\n  .groupBy($"category")\n  .agg(sum($"amount").as("total"))\nresult.write.mode("overwrite").save("dest")`,
    inputSample: `region,revenue,status\nNORTH,500,completed`,
    outputSample: `region,total_revenue\nNORTH,500`,
    tags: ['spark', 'etl', 'aggregation'],
    authorId: 'user2',
    authorName: 'Mike Johnson',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    reviews: [],
    createdAt: '2024-01-11T12:00:00Z',
    updatedAt: '2024-01-13T16:45:00Z',
  },
  {
    id: '5', // Added Snippet 5
    categoryId: 'jet',
    title: 'Incremental Data Load',
    description: 'Spark Scala job for efficient incremental data loading with watermark tracking.',
    language: 'Spark Scala',
    code: `// Define watermark logic\nval watermark = spark.read.table("watermark_table")\nval newData = sourceDf.filter($"timestamp" > watermark)\n\nnewData.write.mode("append").saveAsTable("target_table")`,
    inputSample: `id,timestamp,value\n1,2024-01-01 10:00,100`,
    outputSample: `Status: Success\nRows Appended: 150`,
    tags: ['spark', 'delta-lake', 'incremental'],
    authorId: 'user3',
    authorName: 'Alex Kim',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    reviews: [],
    createdAt: '2024-01-08T09:15:00Z',
    updatedAt: '2024-01-08T09:15:00Z',
  },

  // --- OMNIA SNIPPETS ---
  {
    id: '3',
    categoryId: 'omnia',
    title: 'Customer Segmentation Query',
    description: 'SQL query for RFM-based customer segmentation with dynamic scoring.',
    language: 'SQL',
    code: `SELECT \n  customer_id,\n  NTILE(5) OVER (ORDER BY recency) as r_score,\n  NTILE(5) OVER (ORDER BY frequency) as f_score\nFROM customer_stats`,
    inputSample: `customer_id,recency,frequency\nC1,10,5`,
    outputSample: `customer_id,r_score,f_score\nC1,5,5`,
    tags: ['sql', 'analytics', 'rfm', 'segmentation'],
    authorId: 'user3',
    authorName: 'Emma Wilson',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    reviews: [
      {
        id: 'r4',
        userId: 'user4',
        userName: 'David Park',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
        rating: 5,
        comment: 'This is exactly what our marketing team needed!',
        createdAt: '2024-01-17T11:30:00Z',
      },
    ],
    createdAt: '2024-01-12T09:30:00Z',
    updatedAt: '2024-01-14T11:00:00Z',
  },
  {
    id: '4',
    categoryId: 'omnia',
    title: 'JSON Data Parser',
    description: 'Python utility for parsing nested JSON structures into flat DataFrames.',
    language: 'Python',
    code: `import json\nimport pandas as pd\n\ndef parse_nested_json(json_file):\n    with open(json_file) as f:\n        data = json.load(f)\n    return pd.json_normalize(data, sep='_')`,
    inputSample: `[{"user": {"name": "Alice"}, "total": 99.99}]`,
    outputSample: `user_name,total\nAlice,99.99`,
    tags: ['json', 'parsing', 'pandas'],
    authorId: 'user4',
    authorName: 'David Park',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    reviews: [],
    createdAt: '2024-01-13T14:00:00Z',
    updatedAt: '2024-01-13T14:00:00Z',
  },
  {
    id: '6', // Added Snippet 6
    categoryId: 'omnia',
    title: 'Time Series Aggregation',
    description: 'SQL query for multi-granularity time series aggregation with gap filling.',
    language: 'SQL',
    code: `SELECT \n  DATE_TRUNC('hour', event_time) as time_bucket,\n  COUNT(*) as event_count,\n  AVG(value) as avg_value\nFROM events\nGROUP BY 1\nORDER BY 1 DESC`,
    inputSample: `event_time,value\n2024-01-01 10:15,50`,
    outputSample: `time_bucket,event_count,avg_value\n2024-01-01 10:00,1,50`,
    tags: ['sql', 'time-series', 'aggregation'],
    authorId: 'user2',
    authorName: 'Mike Johnson',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    reviews: [],
    createdAt: '2024-01-06T13:10:00Z',
    updatedAt: '2024-01-06T13:10:00Z',
  },
];

const SnippetContext = createContext<SnippetContextType | undefined>(undefined);

export const SnippetProvider = ({ children }: { children: ReactNode }) => {
  // CHANGED KEYS to 'v2' to force reload of new seed data
  const [categories, setCategories] = useLocalStorage<Category[]>('snippet-categories-v2', defaultCategories);
  const [snippets, setSnippets] = useLocalStorage<Snippet[]>('snippet-data-v2', seedSnippets);

  const addCategory = useCallback((category: Omit<Category, 'id' | 'createdAt' | 'isDefault'>) => {
    const newCategory: Category = {
      ...category,
      id: `cat-${Date.now()}`,
      isDefault: false,
      createdAt: new Date().toISOString(),
    };
    setCategories(prev => [...prev, newCategory]);
  }, [setCategories]);

  const deleteCategory = useCallback((id: string) => {
    setCategories(prev => prev.filter(c => !c.isDefault && c.id !== id));
    setSnippets(prev => prev.filter(s => s.categoryId !== id));
  }, [setCategories, setSnippets]);

  const addSnippet = useCallback((snippet: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt' | 'reviews'>) => {
    const newSnippet: Snippet = {
      ...snippet,
      id: `snip-${Date.now()}`,
      reviews: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSnippets(prev => [...prev, newSnippet]);
  }, [setSnippets]);

  const updateSnippet = useCallback((id: string, updates: Partial<Snippet>) => {
    setSnippets(prev => prev.map(s => 
      s.id === id ? { ...s, ...updates, updatedAt: new Date().toISOString() } : s
    ));
  }, [setSnippets]);

  const deleteSnippet = useCallback((id: string) => {
    setSnippets(prev => prev.filter(s => s.id !== id));
  }, [setSnippets]);

  const addReview = useCallback((snippetId: string, review: Omit<Review, 'id' | 'createdAt'>) => {
    const newReview: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setSnippets(prev => prev.map(s => 
      s.id === snippetId 
        ? { ...s, reviews: [...s.reviews, newReview], updatedAt: new Date().toISOString() }
        : s
    ));
  }, [setSnippets]);

  const getSnippetsByCategory = useCallback((categoryId: string) => {
    return snippets.filter(s => s.categoryId === categoryId);
  }, [snippets]);

  const getSnippetById = useCallback((id: string) => {
    return snippets.find(s => s.id === id);
  }, [snippets]);

  const getCategoryById = useCallback((id: string) => {
    return categories.find(c => c.id === id);
  }, [categories]);

  return (
    <SnippetContext.Provider value={{
      categories,
      snippets,
      addCategory,
      deleteCategory,
      addSnippet,
      updateSnippet,
      deleteSnippet,
      addReview,
      getSnippetsByCategory,
      getSnippetById,
      getCategoryById,
    }}>
      {children}
    </SnippetContext.Provider>
  );
};

export const useSnippets = () => {
  const context = useContext(SnippetContext);
  if (!context) {
    throw new Error('useSnippets must be used within a SnippetProvider');
  }
  return context;
};

// UPDATE THIS SECTION AT THE BOTTOM OF THE FILE
export const currentUser = {
  id: 'user1',
  name: 'Sarah Chen',
  email: 'sarah.chen@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
};