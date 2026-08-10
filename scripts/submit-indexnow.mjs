#!/usr/bin/env node
/**
 * Submits every URL in the live sitemap to IndexNow (Bing, Yandex, Naver,
 * Seznam.cz, Yep). Google does not support IndexNow: sitemaps still need to
 * be (re)submitted manually in Search Console, or via the Search Console
 * API with OAuth credentials.
 *
 * Usage: node scripts/submit-indexnow.mjs
 *
 * Requires the key file to already be live at:
 *   https://www.optmiz.be/<INDEXNOW_KEY>.txt
 */

const HOST = "www.optmiz.be";
const KEY = "48da72fac6cf9ef19f474c829dcf2b62";
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

async function getSitemapUrls() {
  const response = await fetch(SITEMAP_URL);
  if (!response.ok) {
    throw new Error(`Impossible de récupérer ${SITEMAP_URL} (${response.status})`);
  }
  const xml = await response.text();
  const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)];
  return matches.map((match) => match[1].trim());
}

async function submitToIndexNow(urlList) {
  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    }),
  });

  const text = await response.text();
  return { status: response.status, body: text };
}

const urls = await getSitemapUrls();
console.log(`${urls.length} URLs trouvées dans le sitemap.`);
const result = await submitToIndexNow(urls);
console.log(`IndexNow → HTTP ${result.status}`);
if (result.body) console.log(result.body);

if (result.status === 200 || result.status === 202) {
  console.log("Soumis avec succès à Bing, Yandex, Naver, Seznam.cz et Yep.");
} else {
  console.error("La soumission a échoué. Vérifiez que le fichier clé est bien accessible :", KEY_LOCATION);
  process.exitCode = 1;
}
