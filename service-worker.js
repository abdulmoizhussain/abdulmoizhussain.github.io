/* Replaces the old CRA worker so returning visitors leave its cache-first app. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    await self.registration.unregister();
    const windows = await self.clients.matchAll({ type:'window' });
    for (const client of windows) if (client.url.startsWith(self.registration.scope)) await client.navigate(client.url);
  })());
});
