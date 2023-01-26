FROM node:lts

COPY src/js/ /app/
COPY src/sh/in.sh /opt/resource/in

ENTRYPOINT [ "/bin/sh" ]