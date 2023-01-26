FROM node:lts

COPY src/js/ /app/
COPY src/sh/in.sh /opt/resource/in
COPY src/sh/out.sh /opt/resource/out

ENTRYPOINT [ "/bin/sh" ]