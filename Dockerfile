FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD=test_pass
# ENV MYSQL_DATABASE=test_db
# ENV MYSQL_USER=test_user
# ENV MYSQL_PASSWORD=test_user_pass

COPY ./create_db.sql /docker-entrypoint-initdb.d/

EXPOSE 3306