FROM gcc:latest

RUN apt-get update && apt-get install -y build-essential

WORKDIR /app
COPY . /app

CMD ["g++", "code.file", "-o", "output"]
