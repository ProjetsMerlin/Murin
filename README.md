# murin

Révision next.js

## Commandes utiles

npx create-next-app@latest nextjs-dashboard --example "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example" --use-pnpm\
cd nextjs-dashboard\
pnpm i

### Retirer le module natif bcrypt et ses types
pnpm remove bcrypt @types/bcrypt

### Installer la version JavaScript bcryptjs pure
pnpm add bcryptjs

### Supprimer le cache de build proprement
Remove-Item .next -Recurse -Force

### Ajout d'un debounce

pnpm i use-debounce

pnpm dev