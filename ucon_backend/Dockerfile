# ucon_backend/Dockerfile
FROM python:3.10

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Collect static files during build
RUN python manage.py collectstatic --noinput

CMD ["gunicorn", "ucon_backend.wsgi:application", "--bind", "0.0.0.0:8000"]
