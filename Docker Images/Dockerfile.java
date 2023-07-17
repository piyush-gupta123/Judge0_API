FROM openjdk:latest

WORKDIR /app
COPY . /app

CMD ["javac", "code.file"]