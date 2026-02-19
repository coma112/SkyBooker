FROM python:3.12-alpine
WORKDIR /app
RUN pip install psycopg2-binary faker --no-cache-dir

COPY mockdata.py .

CMD ["python", "mockdata.py"]