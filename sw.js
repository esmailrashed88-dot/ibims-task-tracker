/* IBIMS Task Tracker - shows desktop alerts with buttons and opens the tracker when one is clicked */
self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener("notificationclick", function (e) {
  var tag = (e.notification.data && e.notification.data.tag) || e.notification.tag || "", action = e.action || "";
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (list) {
    var scope = self.registration.scope, win = null;
    list.forEach(function (c) { if (!win && c.url.indexOf(scope) === 0) win = c; });
    if (win) { win.postMessage({ type: "notif-click", tag: tag, action: action }); return win.focus(); }
    return self.clients.openWindow(scope);
  }));
});
