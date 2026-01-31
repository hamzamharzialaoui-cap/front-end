# Configuration EmailJS pour recevoir les emails

## 🚨 Problème actuel
Le formulaire utilise `mailto:` qui ouvre seulement votre client email local sans envoyer automatiquement. Pour recevoir les emails directement dans `achking.555@gmail.com`, vous devez configurer EmailJS.

## 🔧 Configuration EmailJS (5 minutes)

### Étape 1 : Créer un compte EmailJS
1. Allez sur [emailjs.com](https://www.emailjs.com/)
2. Créez un compte gratuit (100 emails/mois inclus)
3. Confirmez votre email

### Étape 2 : Configurer le service email
1. Dans le dashboard EmailJS, cliquez sur **"Email Services"**
2. Cliquez **"Add New Service"**
3. Choisissez **"Gmail"** 
4. Connectez votre compte Gmail (`achking.555@gmail.com`)
5. Notez le **Service ID** (ex: `service_abc123`)

### Étape 3 : Créer un template d'email
1. Cliquez sur **"Email Templates"**
2. Cliquez **"Create New Template"**
3. Configurez le template :

```
Subject: Nouvelle demande EnergyBot - {{from_name}}

De: {{from_name}} ({{from_email}})
Entreprise: {{company}}

Message:
{{message}}

---
Envoyé depuis le site EnergyBot
```

4. Notez le **Template ID** (ex: `template_xyz789`)

### Étape 4 : Obtenir la clé publique
1. Allez dans **"Account"** > **"General"**
2. Copiez votre **Public Key** (ex: `user_abcdef123456`)

### Étape 5 : Mettre à jour le code
Dans le fichier `script.js`, remplacez :

```javascript
// Ligne 82
emailjs.init("YOUR_PUBLIC_KEY"); 
// Remplacez par votre vraie clé :
emailjs.init("user_abcdef123456");

// Ligne 98
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
// Remplacez par vos vrais IDs :
emailjs.send('service_abc123', 'template_xyz789', templateParams)
```

## ✅ Test
1. Sauvegardez les modifications
2. Rechargez votre page
3. Remplissez le formulaire de contact
4. Vous devriez recevoir l'email dans `achking.555@gmail.com`

## 🔄 Alternative rapide (si vous voulez tester maintenant)
Si vous voulez tester immédiatement sans configurer EmailJS, le système actuel ouvrira votre client email (Outlook, Gmail app) avec l'email pré-rempli. Vous devez juste cliquer "Envoyer" manuellement.

## 📧 Emails de test
Une fois configuré, vous recevrez des emails comme :
```
Subject: Nouvelle demande EnergyBot - Jean Dupont
De: Jean Dupont (jean@entreprise.com)
Entreprise: Entreprise SA

Message: Nous souhaitons intégrer votre chatbot...
```

## 🆘 Support
- Documentation EmailJS : https://www.emailjs.com/docs/
- Limite gratuite : 100 emails/mois
- Upgrade possible si besoin
