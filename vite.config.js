import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { coinLimitPlugin } from './src/server/coinLimitPlugin'
import { companyLookupPlugin } from './src/server/companyLookupPlugin'
import { countryInfoPlugin } from './src/server/countryInfoPlugin'
import { cveLookupPlugin } from './src/server/cveLookupPlugin'
import { emailBreachPlugin } from './src/server/emailBreachPlugin'
import { emailDomainIntelPlugin } from './src/server/emailDomainIntelPlugin'
import { newsOsintPlugin } from './src/server/newsOsintPlugin'
import { nikApiPlugin } from './src/server/nikApiPlugin'
import { osintGeneratePlugin } from './src/server/osintGeneratePlugin'
import { osintCheckerPlugin } from './src/server/osintPlugin'
import { osintSearchPlugin } from './src/server/osintSearchPlugin'
import { phoneSpecPlugin } from './src/server/phoneSpecPlugin'
import { sekolahPlugin } from './src/server/sekolahPlugin'
import { settingsPlugin } from './src/server/settingsPlugin'
import { sourceCodePlugin } from './src/server/sourceCodePlugin'
import { sslCheckerPlugin } from './src/server/sslCheckerPlugin'
import { subdomainFinderPlugin } from './src/server/subdomainFinderPlugin'
import { techStackPlugin } from './src/server/techStackPlugin'
import { translatePlugin } from './src/server/translatePlugin'
import { typosquatPlugin } from './src/server/typosquatPlugin'
import { urlSafetyPlugin } from './src/server/urlSafetyPlugin'
import { waybackPlugin } from './src/server/waybackPlugin'
import { websiteStatusPlugin } from './src/server/websiteStatusPlugin'

// CATATAN: file ini kayaknya ke-skip pas export/upload project sebelumnya —
// semua fitur di src/server/*.js itu Vite plugin (nempelin middleware /api/*
// lewat configureServer), tapi tanpa didaftarin di sini mereka ga pernah
// jalan sama sekali walau kodenya lengkap. Ditambahin di sini biar semua
// fitur backend (termasuk /api/settings buat background custom) aktif.
export default defineConfig({
  plugins: [
    react(),
    // PENTING: coinLimitPlugin() harus paling atas (sebelum semua plugin
    // fitur lain) -> middleware /api gate-nya perlu jalan duluan buat
    // motong coin sebelum request diterusin ke handler fitur yang sebenarnya.
    coinLimitPlugin(),
    companyLookupPlugin(),
    countryInfoPlugin(),
    cveLookupPlugin(),
    emailBreachPlugin(),
    emailDomainIntelPlugin(),
    newsOsintPlugin(),
    nikApiPlugin(),
    osintGeneratePlugin(),
    osintCheckerPlugin(),
    osintSearchPlugin(),
    phoneSpecPlugin(),
    sekolahPlugin(),
    settingsPlugin(),
    sourceCodePlugin(),
    sslCheckerPlugin(),
    subdomainFinderPlugin(),
    techStackPlugin(),
    translatePlugin(),
    typosquatPlugin(),
    urlSafetyPlugin(),
    waybackPlugin(),
    websiteStatusPlugin(),
  ],
  server: {
    port: 3000,
  },
})
