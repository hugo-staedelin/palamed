FROM mariadb:10.6.4
ADD ./init.d /docker-entrypoint-initdb.d
COPY ./utf8.cnf /etc/mysql/mariadb.conf.d/
ENV MYSQL_PASSWORD toor

ENV MYSQL_INITDB_SKIP_TZINFO 1