FROM node:22-alpine

WORKDIR /runtime
COPY server.mjs ./server.mjs
COPY render-plan.mjs ./render-plan.mjs

ENV NODE_ENV=production \
    PORT=4018 \
    CONTROL_PLANE_URL=http://host.docker.internal:3001

EXPOSE 4018
USER node
CMD ["node", "server.mjs"]
