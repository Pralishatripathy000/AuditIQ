import os
import io
import pandas as pd
import psycopg2
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

CSV_PATH = "../outputs/auditiq_master_with_anomaly_detection.csv"

print("Reading CSV...")
df = pd.read_csv(CSV_PATH)

print(f"Rows: {len(df)}")
print("Preparing upload...")

buffer = io.StringIO()
df.to_csv(buffer, index=False, header=False)
buffer.seek(0)

conn = psycopg2.connect(DATABASE_URL)
cur = conn.cursor()

cur.execute("DROP TABLE IF EXISTS audit_risk_register;")

columns = ", ".join(
    [f'"{c}" TEXT' for c in df.columns]
)

cur.execute(f"""
CREATE TABLE audit_risk_register (
    {columns}
);
""")

copy_sql = f"""
COPY audit_risk_register
FROM STDIN
WITH (
    FORMAT CSV
)
"""

cur.copy_expert(copy_sql, buffer)

conn.commit()

cur.close()
conn.close()

print("Upload completed successfully.")