import serviceWorkerURL from "file-loader?name=service-worker.js!babel-loader!./serviceWorker.js"

export default () => {
  if (typeof window !== 'object')
    return null;

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {

      navigator.serviceWorker.register(serviceWorkerURL).then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      }).catch(function(err) {
        console.log(err)
      });
    });
  } else {
    console.log('service worker is not supported');
  }
}
