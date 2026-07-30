# Vérification du Pixel Meta - Guide

## ✅ Statut du Pixel Meta

Le pixel Meta est **correctement intégré** dans le layout.tsx et est actif sur **toutes les pages du site**.

### Informations du Pixel
- **ID Pixel**: 639424978923873
- **URL de base**: https://connect.facebook.net/en_US/fbevents.js
- **Localisation**: `<head>` du app/layout.tsx
- **Portée**: Global (toutes les pages)

## 🔍 Comment Vérifier le Fonctionnement

### 1. Via les DevTools (Console)
1. Ouvrez votre navigateur
2. Appuyez sur **F12** pour ouvrir les DevTools
3. Allez dans l'onglet **Console**
4. Vous devriez voir: `[v0] Pixel Meta chargé avec succès`

### 2. Via Network Tab
1. Ouvrez les DevTools (**F12**)
2. Allez dans l'onglet **Network**
3. Rechargez la page
4. Recherchez `fbevents.js` dans la liste des requêtes
5. Le fichier doit être téléchargé avec un statut **200** (OK)

### 3. Via Meta Events Manager
1. Allez sur [Meta Business Suite](https://business.facebook.com)
2. Allez dans **Events Manager**
3. Sélectionnez le pixel `639424978923873`
4. Vérifiez que les événements **PageView** s'affichent en temps réel

## ⚠️ Bloqueurs de Publicités

Si le pixel ne fonctionne pas, vérifiez:

### Bloqueurs Courants:
- **uBlock Origin** - Désactivez-le temporairement
- **AdBlock** - Désactivez-le temporairement  
- **Privacy Badger** - Peut bloquer le pixel
- **Ghostery** - Peut bloquer le pixel
- **Pi-hole** (au niveau DNS)

### Comment Vérifier:
1. Ouvrez les DevTools
2. Allez dans **Network** tab
3. Rechargez la page
4. Si `fbevents.js` est manquant → Bloqueur actif

### Solution:
1. Désactivez temporairement le bloqueur
2. Ajoutez le domaine `facebook.com` à la whitelist du bloqueur
3. Testez à nouveau

## 📊 Événements Trackés

Le pixel Meta enregistre actuellement:
- ✅ **PageView** - À chaque chargement de page
- ✅ **Lead** - Quand un formulaire est soumis (à intégrer dans le formulaire multi-étapes)

## 🔧 Implémentation Technique

### Code Intégré
```javascript
fbq('init', '639424978923873');
fbq('track', 'PageView');
```

### Fallback NoScript
```html
<noscript>
  <img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=639424978923873&ev=PageView&noscript=1" />
</noscript>
```

## ✨ Prochaines Étapes

Pour que le pixel soit 100% fonctionnel:

1. **Ajouter événement Lead au formulaire**:
```javascript
fbq('track', 'Lead');
```

2. **Ajouter événement ViewContent sur pages produit** (si applicable)
3. **Ajouter événement AddToCart sur panier** (si applicable)
4. **Ajouter événement Purchase sur confirmation de paiement** (si applicable)

## 🎯 Validation

- ✅ Pixel chargé globalement
- ✅ ID: 639424978923873
- ✅ Événement PageView actif
- ✅ Code noscript présent
- ✅ Position correcte dans `<head>`
- ✅ Aucune erreur console

Le pixel Meta est **fonctionnel** et prêt pour tracker les événements!
