FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set up build arguments for NEXT_PUBLIC_ variables
ARG NEXT_PUBLIC_API_URL_BASE
ARG NEXT_PUBLIC_GOOGLE_RECAPTHA_SITE_KEY
ARG NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY

ENV NEXT_PUBLIC_API_URL_BASE=$NEXT_PUBLIC_API_URL_BASE
ENV NEXT_PUBLIC_GOOGLE_RECAPTHA_SITE_KEY=$NEXT_PUBLIC_GOOGLE_RECAPTHA_SITE_KEY
ENV NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY

# Disable telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerelease cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Leverage standalone output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
