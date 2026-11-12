const MATERIALS = {
  pencernaan: {
    id: 'pencernaan', index: '01', title: 'Sistem Pencernaan', category: 'ANATOMI MANUSIA',
    file: 'assets/models/sistem-pencernaan.glb',
    short: 'Kenali perjalanan makanan dan organ yang bekerja dalam proses pencernaan manusia.',
    long: 'Sistem pencernaan mengolah makanan menjadi zat gizi yang dapat diserap tubuh. Model ini menampilkan beberapa organ utama secara skematis agar hubungan dan posisi relatifnya lebih mudah dipahami.',
    facts: [
      ['01', 'Esofagus', 'Menyalurkan makanan dari faring menuju lambung melalui gerak peristaltik.'],
      ['02', 'Lambung', 'Mengaduk makanan dan membantu proses pencernaan secara mekanis maupun kimiawi.'],
      ['03', 'Usus halus', 'Menjadi lokasi utama penyerapan zat gizi hasil pencernaan.'],
      ['04', 'Usus besar', 'Menyerap air dan membantu pembentukan feses.']
    ],
    alt: 'Model tiga dimensi sistem pencernaan manusia'
  },
  virus: {
    id: 'virus', index: '02', title: 'Struktur Virus', category: 'MIKROBIOLOGI',
    file: 'assets/models/virus.glb',
    short: 'Amati kapsid, materi genetik, dan tonjolan protein penyusun partikel virus.',
    long: 'Virus merupakan agen infeksius aseluler yang membawa materi genetik dan dilindungi oleh kapsid. Sebagian virus memiliki selubung dan protein permukaan yang membantu proses pengenalan serta masuk ke sel inang. Model ini merupakan ilustrasi skematis, bukan representasi satu spesies virus tertentu.',
    facts: [
      ['01', 'Kapsid', 'Selubung protein yang melindungi materi genetik virus.'],
      ['02', 'Materi genetik', 'Berupa DNA atau RNA sebagai informasi genetik virus.'],
      ['03', 'Protein permukaan', 'Membantu virus mengenali dan berikatan dengan sel inang.']
    ],
    alt: 'Model tiga dimensi partikel virus'
  },
  sel: {
    id: 'sel', index: '03', title: 'Sel Hewan', category: 'BIOLOGI SEL',
    file: 'assets/models/sel-hewan.glb',
    short: 'Jelajahi organel sel dan pahami peran setiap bagian dalam menjaga kehidupan.',
    long: 'Sel hewan adalah unit struktural dan fungsional terkecil penyusun tubuh hewan. Model potongan ini menampilkan membran sel, inti sel, mitokondria, badan Golgi, retikulum endoplasma, serta organel lain dalam bentuk yang disederhanakan.',
    facts: [
      ['01', 'Membran sel', 'Mengatur keluar-masuknya zat dan melindungi bagian dalam sel.'],
      ['02', 'Inti sel', 'Menyimpan sebagian besar DNA dan mengatur aktivitas sel.'],
      ['03', 'Mitokondria', 'Tempat berlangsungnya sebagian besar respirasi sel untuk menghasilkan ATP.'],
      ['04', 'Badan Golgi', 'Memodifikasi, mengemas, dan mendistribusikan molekul.']
    ],
    alt: 'Model tiga dimensi sel hewan dan organelnya'
  }
};

const homePage = document.getElementById('homePage');
const viewerPage = document.getElementById('viewerPage');
const modal = document.getElementById('qrModal');
const qrContainer = document.getElementById('qrCode');
let activeQrId = null;

function openModel(id) {
  const item = MATERIALS[id];
  if (!item) return;
  homePage.classList.add('hidden');
  viewerPage.classList.remove('hidden');
  document.body.classList.add('is-viewing');
  document.title = `${item.title} — BioAR Lab`;
  document.getElementById('viewerCategory').textContent = item.category;
  document.getElementById('viewerTitle').textContent = item.title;
  document.getElementById('viewerDescription').textContent = item.short;
  document.getElementById('viewerLongDescription').textContent = item.long;
  document.getElementById('modelIndex').textContent = `BIOAR / ${item.index}`;
  const model = document.getElementById('bioModel');
  model.setAttribute('src', item.file);
  model.setAttribute('alt', item.alt);
  const facts = document.getElementById('viewerFacts');
  facts.innerHTML = item.facts.map(([number, title, description]) => `
    <div class="fact-item">
      <div class="fact-icon">${number}</div>
      <div><strong>${title}</strong><span>${description}</span></div>
    </div>`).join('');
  document.getElementById('exploreOther').href = './#materi';
}

function makeModelUrl(id) {
  const url = new URL(window.location.href);
  url.search = '';
  url.hash = '';
  url.searchParams.set('model', id);
  return url.toString();
}

function openQr(id) {
  const item = MATERIALS[id];
  if (!item) return;
  activeQrId = id;
  document.getElementById('qrTitle').textContent = `QR Code — ${item.title}`;
  document.getElementById('qrDescription').textContent = 'Pindai kode ini dengan kamera ponsel untuk membuka model 3D materi.';
  const targetUrl = makeModelUrl(id);
  document.getElementById('qrUrl').textContent = targetUrl;
  qrContainer.innerHTML = '';
  if (typeof QRCode === 'undefined') {
    qrContainer.textContent = 'Generator QR belum termuat. Periksa koneksi internet lalu muat ulang halaman.';
  } else {
    new QRCode(qrContainer, {
      text: targetUrl,
      width: 208,
      height: 208,
      colorDark: '#071b2a',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });
  }
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeQr() {
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

function downloadQr() {
  const canvas = qrContainer.querySelector('canvas');
  const image = qrContainer.querySelector('img');
  let dataUrl = canvas ? canvas.toDataURL('image/png') : (image ? image.src : null);
  if (!dataUrl) return;
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = `BioAR-QR-${activeQrId || 'materi'}.png`;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

// QR buttons on each learning card
for (const button of document.querySelectorAll('[data-qr]')) {
  button.addEventListener('click', () => openQr(button.dataset.qr));
}
document.getElementById('shareQrButton')?.addEventListener('click', () => {
  const id = new URLSearchParams(location.search).get('model');
  openQr(id);
});
document.getElementById('closeQr').addEventListener('click', closeQr);
document.getElementById('downloadQr').addEventListener('click', downloadQr);
modal.addEventListener('click', (event) => { if (event.target === modal) closeQr(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeQr(); });

// Mobile navigation
const menuToggle = document.getElementById('menuToggle');
menuToggle.addEventListener('click', () => document.querySelector('.nav-links').classList.toggle('open'));
for (const link of document.querySelectorAll('.nav-links a')) {
  link.addEventListener('click', () => document.querySelector('.nav-links').classList.remove('open'));
}

// QR entry point: ?model=pencernaan | virus | sel
const requestedModel = new URLSearchParams(window.location.search).get('model');
if (requestedModel && MATERIALS[requestedModel]) openModel(requestedModel);
