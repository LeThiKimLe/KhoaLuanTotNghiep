#### STEP 1: Build the application
FROM maven:3.8.4-openjdk-17-slim as build

WORKDIR /app

# Copy the pom.xml file
COPY pom.xml .

# Download all dependencies
RUN mvn dependency:go-offline

# Copy the project files
COPY src src

# Package the application
RUN mvn package -DskipTests
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)

#### STEP 2: Build the final image
FROM eclipse-temurin:17-jre-alpine

ARG DEPENDENCY=/app/target/dependency

# Copy the dependency application file from build stage
COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app

# Install Python and create a virtual environment
RUN apk update && apk add --no-cache build-base
RUN apk add gcc python3-dev musl-dev linux-headers
RUN apk add --no-cache python3 && \
    python3 -m venv myenv

# Activate the virtual environment and install dependencies
ENV PATH="/myenv/bin:$PATH"
COPY src/main/python/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# COPY python app
COPY src/main/python .

# Copy and run the Python application
# WORKDIR /app/src/main/python
# CMD ["sh", "-c", "source /myenv/bin/activate && python chatbot.py"]

# Execute the application
# WORKDIR /app
# ENTRYPOINT ["java","-cp","app:app/lib/*","com.example.QuanLyNhaXe.QuanLyNhaXeApplication"]
ENTRYPOINT ["/bin/sh", "-c", "\
    source myenv/bin/activate && \
    python chatbot.py & \
    java -cp app:app/lib/* com.example.QuanLyNhaXe.QuanLyNhaXeApplication \
"]