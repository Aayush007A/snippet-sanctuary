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
  type: string;
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
}

export const mockSnippets: Snippet[] = [
  {
    id: '1',
    type: 'JET',
    title: 'Convert XLS to CSV',
    description: 'Efficiently converts Excel spreadsheets to CSV format with proper encoding and delimiter handling.',
    language: 'Python',
    code: `import pandas as pd
from pathlib import Path

def convert_xls_to_csv(input_path: str, output_path: str, sheet_name: str = None) -> None:
    """
    Convert an Excel file to CSV format.
    
    Args:
        input_path: Path to the input XLS/XLSX file
        output_path: Path for the output CSV file
        sheet_name: Optional sheet name to convert (defaults to first sheet)
    """
    # Read the Excel file
    df = pd.read_excel(
        input_path,
        sheet_name=sheet_name or 0,
        engine='openpyxl'
    )
    
    # Clean column names
    df.columns = df.columns.str.strip().str.lower().str.replace(' ', '_')
    
    # Export to CSV with UTF-8 encoding
    df.to_csv(output_path, index=False, encoding='utf-8')
    
    print(f"Successfully converted {input_path} to {output_path}")
    print(f"Total rows: {len(df)}, Columns: {list(df.columns)}")

# Example usage
if __name__ == "__main__":
    convert_xls_to_csv("data/sales_report.xlsx", "output/sales_report.csv")`,
    inputSample: `| Product ID | Product Name  | Sales Q1 | Sales Q2 |
|------------|---------------|----------|----------|
| P001       | Widget Alpha  | 1500     | 1750     |
| P002       | Widget Beta   | 2300     | 2100     |
| P003       | Widget Gamma  | 890      | 1200     |`,
    outputSample: `product_id,product_name,sales_q1,sales_q2
P001,Widget Alpha,1500,1750
P002,Widget Beta,2300,2100
P003,Widget Gamma,890,1200`,
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
        createdAt: '2024-01-15T10:30:00Z'
      },
      {
        id: 'r2',
        userId: 'user3',
        userName: 'Emma Wilson',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
        rating: 4,
        comment: 'Great snippet! Would love to see multi-sheet support.',
        createdAt: '2024-01-14T15:45:00Z'
      }
    ],
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-12T14:30:00Z'
  },
  {
    id: '2',
    type: 'JET',
    title: 'Data Transformation Pipeline',
    description: 'Spark Scala pipeline for complex data transformations including filtering, aggregation, and joins.',
    language: 'Spark Scala',
    code: `import org.apache.spark.sql.{SparkSession, DataFrame}
import org.apache.spark.sql.functions._
import org.apache.spark.sql.types._

object DataTransformationPipeline {
  
  def main(args: Array[String]): Unit = {
    val spark = SparkSession.builder()
      .appName("DataTransformationPipeline")
      .config("spark.sql.adaptive.enabled", "true")
      .getOrCreate()
    
    import spark.implicits._
    
    // Read source data
    val salesDF = spark.read
      .option("header", "true")
      .option("inferSchema", "true")
      .csv("hdfs://data/sales/*.csv")
    
    // Transform and aggregate
    val transformedDF = salesDF
      .filter($"status" === "completed")
      .withColumn("sale_date", to_date($"timestamp"))
      .withColumn("revenue", $"quantity" * $"unit_price")
      .groupBy($"region", $"sale_date")
      .agg(
        sum($"revenue").alias("total_revenue"),
        count("*").alias("transaction_count"),
        avg($"quantity").alias("avg_quantity")
      )
      .orderBy($"sale_date".desc, $"total_revenue".desc)
    
    // Write output
    transformedDF.write
      .mode("overwrite")
      .partitionBy("region")
      .parquet("hdfs://output/sales_summary/")
  }
}`,
    inputSample: `region,timestamp,product_id,quantity,unit_price,status
NORTH,2024-01-15 10:30:00,P001,5,99.99,completed
SOUTH,2024-01-15 11:45:00,P002,3,149.99,completed
NORTH,2024-01-15 14:20:00,P001,2,99.99,pending`,
    outputSample: `region,sale_date,total_revenue,transaction_count,avg_quantity
NORTH,2024-01-15,499.95,1,5.0
SOUTH,2024-01-15,449.97,1,3.0`,
    tags: ['spark', 'etl', 'aggregation', 'big-data'],
    authorId: 'user2',
    authorName: 'Mike Johnson',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    reviews: [
      {
        id: 'r3',
        userId: 'user1',
        userName: 'Sarah Chen',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        rating: 5,
        comment: 'Excellent performance optimization with adaptive query execution!',
        createdAt: '2024-01-16T09:00:00Z'
      }
    ],
    createdAt: '2024-01-11T12:00:00Z',
    updatedAt: '2024-01-13T16:45:00Z'
  },
  {
    id: '3',
    type: 'Omnia',
    title: 'Customer Segmentation Query',
    description: 'SQL query for RFM-based customer segmentation with dynamic scoring.',
    language: 'SQL',
    code: `-- Customer RFM Segmentation Query
WITH customer_metrics AS (
    SELECT 
        customer_id,
        MAX(order_date) AS last_order_date,
        COUNT(DISTINCT order_id) AS frequency,
        SUM(total_amount) AS monetary_value,
        DATEDIFF(CURRENT_DATE, MAX(order_date)) AS recency_days
    FROM orders
    WHERE order_status = 'completed'
      AND order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 365 DAY)
    GROUP BY customer_id
),
rfm_scores AS (
    SELECT 
        customer_id,
        recency_days,
        frequency,
        monetary_value,
        NTILE(5) OVER (ORDER BY recency_days DESC) AS r_score,
        NTILE(5) OVER (ORDER BY frequency ASC) AS f_score,
        NTILE(5) OVER (ORDER BY monetary_value ASC) AS m_score
    FROM customer_metrics
)
SELECT 
    customer_id,
    recency_days,
    frequency,
    ROUND(monetary_value, 2) AS monetary_value,
    r_score,
    f_score,
    m_score,
    CONCAT(r_score, f_score, m_score) AS rfm_segment,
    CASE 
        WHEN r_score >= 4 AND f_score >= 4 THEN 'Champions'
        WHEN r_score >= 3 AND f_score >= 3 AND m_score >= 4 THEN 'Loyal Customers'
        WHEN r_score >= 4 AND f_score <= 2 THEN 'New Customers'
        WHEN r_score <= 2 AND f_score >= 4 THEN 'At Risk'
        WHEN r_score <= 2 AND f_score <= 2 THEN 'Lost'
        ELSE 'Regular'
    END AS customer_segment
FROM rfm_scores
ORDER BY monetary_value DESC;`,
    inputSample: `customer_id | order_id | order_date | total_amount | order_status
C001        | O1001    | 2024-01-10 | 250.00       | completed
C001        | O1002    | 2024-01-15 | 180.00       | completed
C002        | O1003    | 2023-06-20 | 75.00        | completed
C003        | O1004    | 2024-01-18 | 450.00       | completed`,
    outputSample: `customer_id | recency | freq | monetary | r | f | m | segment     | label
C003        | 2       | 1    | 450.00   | 5 | 1 | 5 | 515         | New Customers
C001        | 5       | 2    | 430.00   | 5 | 4 | 4 | 544         | Champions
C002        | 200     | 1    | 75.00    | 1 | 1 | 1 | 111         | Lost`,
    tags: ['sql', 'analytics', 'rfm', 'segmentation', 'marketing'],
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
        comment: 'This is exactly what our marketing team needed. Clear and efficient!',
        createdAt: '2024-01-17T11:30:00Z'
      },
      {
        id: 'r5',
        userId: 'user1',
        userName: 'Sarah Chen',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        rating: 4,
        comment: 'Great use of window functions. Added this to our analytics toolkit.',
        createdAt: '2024-01-16T16:00:00Z'
      }
    ],
    createdAt: '2024-01-12T09:30:00Z',
    updatedAt: '2024-01-14T11:00:00Z'
  },
  {
    id: '4',
    type: 'Omnia',
    title: 'JSON Data Parser',
    description: 'Python utility for parsing nested JSON structures into flat DataFrames.',
    language: 'Python',
    code: `import json
import pandas as pd
from typing import Dict, List, Any, Optional
from collections.abc import MutableMapping

def flatten_json(nested_json: Dict, separator: str = '_') -> Dict:
    """
    Flatten a nested JSON object into a single-level dictionary.
    
    Args:
        nested_json: The nested JSON object to flatten
        separator: Separator to use between nested keys
    
    Returns:
        Flattened dictionary with concatenated keys
    """
    out = {}
    
    def flatten(x: Any, name: str = '') -> None:
        if isinstance(x, MutableMapping):
            for key, value in x.items():
                flatten(value, f"{name}{separator}{key}" if name else key)
        elif isinstance(x, list):
            for i, item in enumerate(x):
                flatten(item, f"{name}{separator}{i}")
        else:
            out[name] = x
    
    flatten(nested_json)
    return out

def parse_json_to_dataframe(
    json_data: List[Dict],
    columns: Optional[List[str]] = None
) -> pd.DataFrame:
    """
    Parse a list of JSON objects into a pandas DataFrame.
    
    Args:
        json_data: List of JSON objects
        columns: Optional list of columns to include
    
    Returns:
        Pandas DataFrame with flattened data
    """
    flattened_data = [flatten_json(record) for record in json_data]
    df = pd.DataFrame(flattened_data)
    
    if columns:
        df = df[[col for col in columns if col in df.columns]]
    
    return df

# Example usage
if __name__ == "__main__":
    sample_data = [
        {"user": {"name": "Alice", "email": "alice@example.com"}, "orders": [{"id": 1, "total": 99.99}]},
        {"user": {"name": "Bob", "email": "bob@example.com"}, "orders": [{"id": 2, "total": 149.99}]}
    ]
    
    df = parse_json_to_dataframe(sample_data)
    print(df.to_string())`,
    inputSample: `[
  {
    "user": {
      "name": "Alice",
      "email": "alice@example.com"
    },
    "orders": [{"id": 1, "total": 99.99}]
  }
]`,
    outputSample: `user_name  user_email          orders_0_id  orders_0_total
Alice      alice@example.com   1            99.99`,
    tags: ['json', 'parsing', 'pandas', 'data-processing'],
    authorId: 'user4',
    authorName: 'David Park',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    reviews: [],
    createdAt: '2024-01-13T14:00:00Z',
    updatedAt: '2024-01-13T14:00:00Z'
  },
  {
    id: '5',
    type: 'JET',
    title: 'Incremental Data Load',
    description: 'Spark Scala job for efficient incremental data loading with watermark tracking.',
    language: 'Spark Scala',
    code: `import org.apache.spark.sql.{SparkSession, DataFrame, SaveMode}
import org.apache.spark.sql.functions._
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

object IncrementalDataLoader {
  
  case class WatermarkState(tableName: String, lastProcessedTs: String)
  
  def getWatermark(spark: SparkSession, tableName: String): Option[String] = {
    try {
      val watermarkDF = spark.read
        .format("delta")
        .load(s"hdfs://metadata/watermarks/$tableName")
      
      Some(watermarkDF.select("last_processed_ts").first().getString(0))
    } catch {
      case _: Exception => None
    }
  }
  
  def loadIncremental(
    spark: SparkSession,
    sourcePath: String,
    targetPath: String,
    tableName: String,
    timestampCol: String
  ): Long = {
    import spark.implicits._
    
    val watermark = getWatermark(spark, tableName)
    
    val sourceDF = spark.read
      .format("parquet")
      .load(sourcePath)
    
    val filteredDF = watermark match {
      case Some(ts) => sourceDF.filter(col(timestampCol) > lit(ts))
      case None => sourceDF
    }
    
    val recordCount = filteredDF.count()
    
    if (recordCount > 0) {
      filteredDF.write
        .mode(SaveMode.Append)
        .partitionBy("date")
        .format("delta")
        .save(targetPath)
      
      val maxTs = filteredDF.agg(max(timestampCol)).first().getString(0)
      updateWatermark(spark, tableName, maxTs)
    }
    
    recordCount
  }
  
  def updateWatermark(spark: SparkSession, tableName: String, ts: String): Unit = {
    import spark.implicits._
    
    Seq(WatermarkState(tableName, ts)).toDF()
      .write
      .mode(SaveMode.Overwrite)
      .format("delta")
      .save(s"hdfs://metadata/watermarks/$tableName")
  }
}`,
    inputSample: `id,event_type,timestamp,payload
1,click,2024-01-15 10:00:00,{"page":"home"}
2,view,2024-01-15 10:05:00,{"page":"products"}
3,purchase,2024-01-15 10:10:00,{"amount":99.99}`,
    outputSample: `Incremental Load Summary:
- Table: events
- Previous Watermark: 2024-01-15 09:00:00
- New Records Loaded: 3
- New Watermark: 2024-01-15 10:10:00`,
    tags: ['spark', 'delta-lake', 'incremental', 'etl'],
    authorId: 'user1',
    authorName: 'Sarah Chen',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    reviews: [
      {
        id: 'r6',
        userId: 'user2',
        userName: 'Mike Johnson',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
        rating: 5,
        comment: 'Production-ready code. Handles edge cases beautifully.',
        createdAt: '2024-01-18T08:00:00Z'
      }
    ],
    createdAt: '2024-01-14T10:00:00Z',
    updatedAt: '2024-01-15T09:00:00Z'
  },
  {
    id: '6',
    type: 'Omnia',
    title: 'Time Series Aggregation',
    description: 'SQL query for multi-granularity time series aggregation with gap filling.',
    language: 'SQL',
    code: `-- Time Series Aggregation with Gap Filling
WITH RECURSIVE date_series AS (
    -- Generate continuous date series
    SELECT DATE('2024-01-01') AS date
    UNION ALL
    SELECT DATE_ADD(date, INTERVAL 1 DAY)
    FROM date_series
    WHERE date < DATE('2024-01-31')
),
hourly_metrics AS (
    SELECT 
        DATE(timestamp) AS metric_date,
        HOUR(timestamp) AS metric_hour,
        sensor_id,
        AVG(value) AS avg_value,
        MIN(value) AS min_value,
        MAX(value) AS max_value,
        COUNT(*) AS reading_count
    FROM sensor_readings
    WHERE timestamp BETWEEN '2024-01-01' AND '2024-01-31'
    GROUP BY DATE(timestamp), HOUR(timestamp), sensor_id
),
daily_summary AS (
    SELECT 
        metric_date,
        sensor_id,
        AVG(avg_value) AS daily_avg,
        MIN(min_value) AS daily_min,
        MAX(max_value) AS daily_max,
        SUM(reading_count) AS total_readings
    FROM hourly_metrics
    GROUP BY metric_date, sensor_id
)
SELECT 
    ds.date AS metric_date,
    COALESCE(d.sensor_id, 'SENSOR_001') AS sensor_id,
    COALESCE(d.daily_avg, 0) AS daily_avg,
    COALESCE(d.daily_min, 0) AS daily_min,
    COALESCE(d.daily_max, 0) AS daily_max,
    COALESCE(d.total_readings, 0) AS total_readings,
    CASE WHEN d.sensor_id IS NULL THEN 'gap_filled' ELSE 'actual' END AS data_type
FROM date_series ds
LEFT JOIN daily_summary d ON ds.date = d.metric_date
ORDER BY ds.date;`,
    inputSample: `sensor_id  | timestamp           | value
SENSOR_001 | 2024-01-01 08:00:00 | 23.5
SENSOR_001 | 2024-01-01 09:00:00 | 24.1
SENSOR_001 | 2024-01-01 10:00:00 | 25.8
SENSOR_001 | 2024-01-03 08:00:00 | 22.3`,
    outputSample: `metric_date | sensor_id  | daily_avg | daily_min | daily_max | readings | type
2024-01-01  | SENSOR_001 | 24.47     | 23.5      | 25.8      | 3        | actual
2024-01-02  | SENSOR_001 | 0.00      | 0.0       | 0.0       | 0        | gap_filled
2024-01-03  | SENSOR_001 | 22.30     | 22.3      | 22.3      | 1        | actual`,
    tags: ['sql', 'time-series', 'aggregation', 'analytics'],
    authorId: 'user3',
    authorName: 'Emma Wilson',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    reviews: [],
    createdAt: '2024-01-15T11:00:00Z',
    updatedAt: '2024-01-15T11:00:00Z'
  }
];

export const currentUser = {
  id: 'user1',
  name: 'Sarah Chen',
  email: 'sarah.chen@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
};
