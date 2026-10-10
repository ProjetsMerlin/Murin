# murin

Révision next.js

## Commandes utiles

npx create-next-app@latest nextjs-dashboard --example "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example" --use-pnpm\
cd nextjs-dashboard\
pnpm add -D eslint eslint-config-next\
pnpm i use-debounce
pnpm i next-auth@beta
pnpm i
pnpm dev

### Retirer le module natif bcrypt et ses types
pnpm remove bcrypt @types/bcrypt

### Installer la version JavaScript bcryptjs pure
pnpm add bcryptjs

### Supprimer le cache de build proprement
Remove-Item .next -Recurse -Force

## Commandes GIT

git init
git config core.autocrlf
git add .
git commi -a -m "CRUD"
git push origin main