# KickRewards - Kick Platform Ödül Sistemi

Kick platformu için Blerp benzeri bir web uygulaması. İzleyiciler yayın izledikleri süre boyunca puan kazanır ve bu puanları özellikler satın almak için kullanabilirler.

## 🌟 Özellikler

### 🎯 Ana Özellikler
- **Puan Sistemi**: Yayın izleyerek otomatik puan kazanma
- **Mağaza**: Puanlarla özel özellikler ve ödüller satın alma
- **Gerçek Zamanlı İzleme**: Canlı puan kazanma takibi
- **Kullanıcı Profili**: Detaylı istatistikler ve başarımlar
- **Dashboard**: Kapsamlı analitik ve aktivite takibi

### 📱 Sayfa Yapısı
- **Ana Sayfa**: Öne çıkan yayınlar ve platform tanıtımı
- **Giriş/Kayıt**: Güvenli kullanıcı kimlik doğrulama
- **Puanlarım**: Puan geçmişi ve başarımlar
- **Mağaza**: Satın alınabilir özellikler ve ödüller
- **Profil**: Hesap yönetimi ve ayarlar
- **Yayın**: Canlı yayın izleme ve sohbet
- **Dashboard**: Detaylı istatistikler ve analitik

### 🎨 Modern UI/UX
- Kick platformu temalı koyu tasarım
- Responsive tasarım (mobil uyumlu)
- Smooth animasyonlar ve efektler
- Türkçe dil desteği
- Oyuncu odaklı tasarım öğeleri

## 🚀 Teknolojiler

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **State Management**: React Context API
- **Data Persistence**: LocalStorage

## 📦 Kurulum

### Ön Gereksinimler
- Node.js (v16 veya üzeri)
- npm veya yarn

### Adımlar

1. Proje klasörüne gidin:
```bash
cd kick-rewards-app
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Uygulamayı başlatın:
```bash
npm start
```

4. Tarayıcınızda açın: `http://localhost:3000`

## 🎮 Kullanım

### İlk Adımlar
1. **Kayıt Olun**: Ücretsiz hesap oluşturun
2. **Yayın İzleyin**: Herhangi bir canlı yayını açın
3. **Puan Kazanın**: İzlediğiniz her 30 saniyede puan kazanın
4. **Mağazaya Gidin**: Puanlarınızla özel özellikler satın alın

### Puan Sistemi
- **İzleme**: Dakika başına 2-5 puan
- **Bonus**: %5 şansla rastgele bonus puanlar
- **Çarpanlar**: Özel özelliklerle puan çarpanı artırın
- **Başarımlar**: Hedefleri tamamlayarak ekstra puan kazanın

### Mağaza Öğeleri
- **VIP Rozet** (500 puan): Profilde özel rozet
- **2x Puan Çarpanı** (750 puan): 1 hafta 2x puan
- **Reklamsız Deneyim** (1000 puan): 1 ay reklamsız izleme
- **Steam Kuponu** (2000 puan): 50₺ Steam kuponu
- **PlayStation Store** (4000 puan): 100₺ PlayStation kuponu

## 🏗️ Proje Yapısı

```
src/
├── components/          # Yeniden kullanılabilir bileşenler
│   └── Navbar.tsx      # Navigasyon bileşeni
├── contexts/           # React Context providers
│   ├── AuthContext.tsx # Kimlik doğrulama yönetimi
│   └── PointsContext.tsx # Puan sistemi yönetimi
├── pages/              # Sayfa bileşenleri
│   ├── Home.tsx        # Ana sayfa
│   ├── Login.tsx       # Giriş sayfası
│   ├── Register.tsx    # Kayıt sayfası
│   ├── Points.tsx      # Puanlarım sayfası
│   ├── Shop.tsx        # Mağaza sayfası
│   ├── Profile.tsx     # Profil sayfası
│   ├── Stream.tsx      # Yayın sayfası
│   └── Dashboard.tsx   # Dashboard sayfası
├── App.tsx             # Ana uygulama bileşeni
├── index.tsx           # Uygulama giriş noktası
└── index.css           # Global stiller ve Tailwind
```

## 🎨 Tasarım Sistemi

### Renkler
- **Primary**: `#53fc18` (Kick yeşili)
- **Secondary**: `#00ff41` (Neon yeşil)
- **Dark**: `#0f0f23` (Koyu mavi)
- **Darker**: `#0a0a1a` (Daha koyu)
- **Accent**: `#ff6b6b` (Vurgu kırmızısı)
- **Gold**: `#ffd700` (Puan altını)

### Tipografi
- **Gaming Font**: Orbitron (başlıklar için)
- **Body Font**: Inter (genel metin için)

### Bileşenler
- **Kartlar**: Yuvarlatılmış köşeler, gölgeler
- **Butonlar**: Hover efektleri, geçişler
- **Formlar**: Modern input tasarımı
- **Navigasyon**: Sabit üst menü

## 🔧 Özelleştirme

### Yeni Özellikler Ekleme
1. `src/pages/` altında yeni sayfa oluşturun
2. `App.tsx` içinde route ekleyin
3. `Navbar.tsx` içinde navigasyon bağlantısı ekleyin

### Mağaza Öğesi Ekleme
`Shop.tsx` içindeki `shopItems` dizisine yeni öğe ekleyin:

```typescript
{
  id: 'unique-id',
  name: 'Öğe Adı',
  description: 'Öğe açıklaması',
  price: 1000,
  category: 'features',
  icon: <Icon size={24} />,
  featured: true
}
```

## 🐛 Bilinen Sorunlar

- Mock data kullanılıyor (gerçek API entegrasyonu gerekli)
- Offline mod desteklenmiyor
- Mobil chat optimizasyonu geliştirilebilir

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

Sorular veya geri bildirimler için issue açabilirsiniz.

---

**Not**: Bu uygulama demo amaçlıdır ve gerçek Kick platformu ile bağlantılı değildir.
