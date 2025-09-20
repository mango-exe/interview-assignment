FROM postgres:16

ENV POSTGRES_USER=admin \
    POSTGRES_PASSWORD=admin123 \
    POSTGRES_DB=mydb

EXPOSE 5432

VOLUME ["/var/lib/postgresql/data"]

CMD ["postgres"]
