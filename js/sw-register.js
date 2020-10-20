// Invoke Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register("../service-worker.js")
      .then(() => {
        console.log('Service worker berhasil didaftarkan');
      })
      .catch((e) => {
        console.log('Gagal, Service worker tidak terdaftarkan Log: ' + e);
      });
  });
} else {
  console.log('Browser tidak mendukung fitur service worker');
}