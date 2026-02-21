# Portfolio Content Guide - Doldurmanız Gereken Yerler

Bu dosya, portföy sitenizde doldurmanız gereken tüm yerleri detaylı olarak açıklar.

## 📋 İçindekiler

1. [Kişisel Bilgiler](#kişisel-bilgiler)
2. [Hakkımda Bölümü](#hakkımda-bölümü)
3. [Projeler](#projeler)
4. [Sertifikalar](#sertifikalar)
5. [Yetenekler](#yetenekler)
6. [İletişim Bilgileri](#iletişim-bilgileri)

---

## Kişisel Bilgiler

### 📍 Dosya: `index.html` - Hero Section (Satır ~70-85)

```html
<!-- TODO: Add your full name here -->
<span class="name">Ben Mahdi Shahrouei</span>
```

**Ne yapmalısınız:**
- Adınızı ve soyadınızı buraya yazın
- Örnek: `Mehdi Shahrouei` veya tam adınız

---

### 📸 Profil Fotoğrafı

**Dosya:** `assets/images/profile.jpg`

**Ne yapmalısınız:**
1. Profesyonel bir fotoğrafınızı seçin
2. Fotoğrafı `profile.jpg` olarak kaydedin
3. `assets/images/` klasörüne koyun
4. Önerilen boyut: 500x500px veya daha büyük (kare format)

**İpuçları:**
- Düz bir arka plan kullanın
- İyi aydınlatma olsun
- Profesyonel kıyafet giyin
- Gülümseyin ve göz teması kurun

---

## Hakkımda Bölümü

### 📍 Dosya: `index.html` - About Section (Satır ~120-135)

#### Türkçe Metin
```html
<p data-tr="<!-- TODO: Add your about text in Turkish -->" data-en="...">
```

**Ne yazmalısınız:**
- Kendinizi tanıtın (2-3 cümle)
- Eğitiminiz ve ilgi alanlarınız
- Kariyer hedefleriniz

**Örnek:**
```
Bilgisayar Mühendisliği 3. sınıf öğrencisiyim. Yapay zeka, makine öğrenmesi ve derin öğrenme alanlarında uzmanlaşmak istiyorum. Python, TensorFlow ve PyTorch kullanarak çeşitli projeler geliştirdim.
```

#### İngilizce Metin
```html
<p data-tr="..." data-en="<!-- TODO: Add your about text in English -->">
```

**Örnek:**
```
I'm a 3rd year Computer Engineering student. I want to specialize in artificial intelligence, machine learning, and deep learning. I've developed various projects using Python, TensorFlow, and PyTorch.
```

---

### 📊 İstatistikler

**Dosya:** `index.html` - About Stats (Satır ~140-155)

```html
<h3 class="stat-number"><!-- TODO: Add number of projects -->10+</h3>
<h3 class="stat-number"><!-- TODO: Add number of certificates -->5+</h3>
<h3 class="stat-number"><!-- TODO: Add years of experience -->2+</h3>
```

**Ne yapmalısınız:**
- Proje sayınızı yazın (örn: `12+`, `8`)
- Sertifika sayınızı yazın (örn: `5+`, `10`)
- Deneyim yılınızı yazın (örn: `2+`, `3`)

---

## Projeler

### 📍 Dosya: `index.html` - Projects Section (Satır ~165-230)

Her proje için bir kart oluşturmanız gerekiyor. Mevcut kart şablonunu kopyalayıp çoğaltın.

### Proje Kartı Şablonu

```html
<div class="project-card">
    <div class="project-media">
        <!-- Resim veya video ekleyin -->
        <img src="assets/images/projects/project1.jpg" alt="Project 1">
        <!-- Video için: <video src="assets/videos/project1.mp4" controls></video> -->
    </div>
    <div class="project-content">
        <h3 class="project-title" data-tr="Türkçe Başlık" data-en="English Title">
            Proje Başlığı
        </h3>
        <p class="project-description" data-tr="Türkçe açıklama" data-en="English description">
            Proje açıklaması
        </p>
        <div class="project-tags">
            <span class="tag">Python</span>
            <span class="tag">TensorFlow</span>
        </div>
        <div class="project-links">
            <a href="GITHUB_LINK" class="project-link" target="_blank">GitHub</a>
            <a href="DEMO_LINK" class="project-link" target="_blank">Demo</a>
        </div>
    </div>
</div>
```

### Her Proje İçin Doldurmanız Gerekenler:

1. **Proje Görseli/Videosu:**
   - Resim: `assets/images/projects/` klasörüne ekleyin
   - Video: `assets/videos/` klasörüne ekleyin
   - `src` özelliğini güncelleyin

2. **Proje Başlığı (Türkçe ve İngilizce):**
   ```html
   data-tr="Görüntü Sınıflandırma Sistemi"
   data-en="Image Classification System"
   ```

3. **Proje Açıklaması (Türkçe ve İngilizce):**
   - Ne yaptığınızı açıklayın (2-3 cümle)
   - Hangi teknolojileri kullandınız
   - Ne gibi sonuçlar elde ettiniz

4. **Teknoloji Etiketleri:**
   ```html
   <span class="tag">Python</span>
   <span class="tag">TensorFlow</span>
   <span class="tag">OpenCV</span>
   ```

5. **Proje Linkleri:**
   - GitHub linki: `href="https://github.com/kullaniciadi/proje-adi"`
   - Demo linki (varsa): `href="https://demo-link.com"`

---

## Sertifikalar

### 📍 Dosya: `index.html` - Certificates Section (Satır ~240-280)

### Sertifika Kartı Şablonu

```html
<div class="certificate-card">
    <div class="certificate-image">
        <img src="assets/certificates/cert1.jpg" alt="Certificate 1">
    </div>
    <div class="certificate-content">
        <h3 class="certificate-title" data-tr="Türkçe Sertifika Adı" data-en="English Certificate Name">
            Sertifika Adı
        </h3>
        <p class="certificate-issuer">Veren Kuruluş</p>
        <p class="certificate-date">2024</p>
        <a href="DOGRULAMA_LINKI" class="certificate-link" target="_blank">Doğrula</a>
    </div>
</div>
```

### Her Sertifika İçin Doldurmanız Gerekenler:

1. **Sertifika Görseli:**
   - Sertifika resmini `assets/certificates/` klasörüne ekleyin
   - Dosya adını güncelleyin (örn: `google-ai-cert.jpg`)

2. **Sertifika Adı (Türkçe ve İngilizce):**
   ```html
   data-tr="Google Yapay Zeka Sertifikası"
   data-en="Google AI Certificate"
   ```

3. **Veren Kuruluş:**
   - Örnek: `Coursera / Google`, `Udemy`, `DeepLearning.AI`

4. **Tarih:**
   - Sertifikayı aldığınız yıl veya ay/yıl

5. **Doğrulama Linki:**
   - Sertifika doğrulama URL'si (varsa)
   - Yoksa `href="#"` olarak bırakın

---

## Yetenekler

### 📍 Dosya: `index.html` - Skills Section (Satır ~290-360)

### Yetenek Kategorileri

Üç kategori var:
1. Programlama Dilleri
2. Yapay Zeka & Makine Öğrenmesi
3. Araçlar & Framework'ler

### Yetenek Ekleme/Düzenleme

```html
<div class="skill-item">
    <span class="skill-name">Python</span>
    <div class="skill-bar">
        <div class="skill-progress" style="width: 90%"></div>
    </div>
</div>
```

**Ne yapmalısınız:**
1. Yetenek adını yazın
2. Yüzdeyi ayarlayın (`width: 90%`)
   - Başlangıç: 30-50%
   - Orta: 50-70%
   - İleri: 70-85%
   - Uzman: 85-95%

**Yetenek Ekleme:**
- Mevcut yetenek şablonunu kopyalayın
- Yeni yetenek adı ve yüzdesini yazın

**Yetenek Silme:**
- İlgili `<div class="skill-item">` bloğunu silin

---

## İletişim Bilgileri

### 📍 Dosya: `index.html` - Contact Section (Satır ~370-400)

### E-posta
```html
<a href="mailto:your.email@example.com">your.email@example.com</a>
```
**Değiştirin:** `your.email@example.com` → Gerçek e-posta adresiniz

### LinkedIn
```html
<a href="https://linkedin.com/in/yourprofile" target="_blank">linkedin.com/in/yourprofile</a>
```
**Değiştirin:** `yourprofile` → LinkedIn kullanıcı adınız

### GitHub
```html
<a href="https://github.com/yourusername" target="_blank">github.com/yourusername</a>
```
**Değiştirin:** `yourusername` → GitHub kullanıcı adınız

### Footer Sosyal Medya Linkleri

**Dosya:** `index.html` - Footer (Satır ~450-470)

```html
<a href="https://github.com/yourusername" target="_blank">...</a>
<a href="https://linkedin.com/in/yourprofile" target="_blank">...</a>
```

Aynı linkleri burada da güncelleyin.

---

## ✅ Kontrol Listesi

Portföyünüzü yayınlamadan önce:

### Kişisel Bilgiler
- [ ] Adınızı güncellediniz
- [ ] Profil fotoğrafınızı eklediniz
- [ ] Hakkımda bölümünü Türkçe yazdınız
- [ ] Hakkımda bölümünü İngilizce yazdınız
- [ ] İstatistikleri güncellediniz

### Projeler
- [ ] En az 3-5 proje eklediniz
- [ ] Her proje için resim/video eklediniz
- [ ] Proje açıklamalarını Türkçe yazdınız
- [ ] Proje açıklamalarını İngilizce yazdınız
- [ ] GitHub linklerini eklediniz
- [ ] Teknoloji etiketlerini güncellediniz

### Sertifikalar
- [ ] Sertifika resimlerini eklediniz
- [ ] Sertifika adlarını Türkçe yazdınız
- [ ] Sertifika adlarını İngilizce yazdınız
- [ ] Veren kuruluşları yazdınız
- [ ] Tarihleri güncellediniz

### Yetenekler
- [ ] Programlama dillerinizi eklediniz
- [ ] AI/ML yeteneklerinizi eklediniz
- [ ] Araçları ve framework'leri eklediniz
- [ ] Yüzdeleri gerçekçi ayarladınız

### İletişim
- [ ] E-posta adresinizi güncellediniz
- [ ] LinkedIn profilinizi eklediniz
- [ ] GitHub profilinizi eklediniz
- [ ] Footer linklerini güncellediniz

### Test
- [ ] Tarayıcıda açıp kontrol ettiniz
- [ ] Dil değiştirme çalışıyor
- [ ] Tema değiştirme çalışıyor
- [ ] Mobil görünümü test ettiniz
- [ ] Tüm linkler çalışıyor

---

## 🎨 Renk ve Stil Özelleştirme (İsteğe Bağlı)

Renkleri değiştirmek isterseniz, `styles.css` dosyasının başındaki değişkenleri düzenleyin:

```css
:root {
    --accent-purple: #8B5CF6;  /* Mor renk */
    --accent-blue: #3B82F6;    /* Mavi renk */
    --accent-cyan: #06B6D4;    /* Turkuaz renk */
}
```

---

## 📞 Yardım

Herhangi bir sorunuz olursa:
1. `README.md` dosyasını okuyun
2. `assets/README.md` dosyasını kontrol edin
3. HTML dosyasındaki `<!-- TODO -->` yorumlarını takip edin

**Başarılar! 🚀**
