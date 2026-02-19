# multi-stage buildet akarok mert sokkal stabilabb és a végső image nem tartalmazza a gradlet és az src-t!
# tehat elsonek buildelunk aztan csak a jar-t vesszük át

FROM eclipse-temurin:21-jdk-alpine AS builder

WORKDIR /app

COPY gradlew .
COPY gradle/ gradle/
COPY build.gradle.kts .
COPY settings.gradle.kts .

RUN chmod +x gradlew

RUN ./gradlew dependencies --no-daemon --quiet 2>/dev/null || true

COPY src/ src/

RUN ./gradlew bootJar --no-daemon -x test


FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8081

# a flag gyorsabb indulast eredmenyez linuxon, tudtom szerint LOL

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"] 