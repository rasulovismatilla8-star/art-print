# Art Print

Devor rasmlari do'koni sayti: katalog, xonada oldindan ko'rish, savat va xodimlar uchun sotuv bo'limi.

Sayt: https://art-print-de60e.web.app

## Fayllar

```
index.html, rasmlar.html, dizayn.html,   sahifalar (manzillari o'zgarmasin deb ildizda turadi)
aloqa.html, savat.html, sotuv.html
assets/
  css/style.css                 barcha stillar
  js/config.js                  SOZLAMALAR: telefon, manzil, narxlar, ramkalar, promokodlar
  js/firebase-config.js         Firebase ulanishi va egasining emaili
  js/common.js                  hamma sahifalar uchun umumiy kod (sarlavha, savat, katalog...)
  js/pages/<sahifa>.js          har bir sahifaning o'z kodi
firebase.json, .firebaserc      Firebase Hosting sozlamalari
firestore.rules                 bazani himoya qiluvchi qoidalar
```

Har sahifa skriptlarni shu tartibda yuklaydi: Firebase (kerak bo'lsa) → `firebase-config.js` → `config.js` → `common.js` → `pages/<sahifa>.js`.

## Tez-tez o'zgartiriladigan narsalar

- Telefon, manzil, yetkazish narxi, promokodlar, ramka narxlari: `assets/js/config.js`
- Rasmlar va ularning narxlari: saytning o'zida, `sotuv.html` → «Rasmlar katalogi» (faqat egasi)
- Xodim qo'shish: `sotuv.html` → «Xodimlar» (faqat egasi)

## Saytni yangilash

O'zgarishdan keyin:

```
firebase deploy --only hosting --project art-print-de60e
```

`firestore.rules` o'zgarsa:

```
firebase deploy --only firestore:rules --project art-print-de60e
```

CSS yoki JS o'zgarsa, HTML fayllardagi `?v=` raqamini bittaga oshiring, shunda brauzerlar eski nusxani ishlatmaydi.
