from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from urllib.parse import quote_plus
import os

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    DB_USER = "postgres"
    DB_PASSWORD = quote_plus("pralisha")
    DB_HOST = "127.0.0.1"
    DB_PORT = "5432"
    DB_NAME = "AuditIQ_DB"

    DATABASE_URL = f"postgresql://auditiq_user:XLvKtT8sEgfOrdq4QmZGOo21sQXzlp1Z@dpg-d9417lsvikkc73badla0-a/auditiq"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)