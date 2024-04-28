# syntax=docker/dockerfile:1
#backend dockerfile
FROM python:3
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/


EXPOSE 8080              
                    #document container-side port
CMD python3 ./manage.py runserver 0.0.0.0:8000  # standard command to run