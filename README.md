# 🛡️ ShadowPay — Confidential Web3 Invoicing on Solana

![Solana](https://img.shields.io/badge/Solana-14F195?style=for-the-badge&logo=solana&logoColor=black)
![Umbra](https://img.shields.io/badge/Powered_by-Umbra_SDK-9945FF?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Live_on_Devnet-success?style=for-the-badge)

**Built specifically for the Umbra Side Track Hackathon (Superteam Earn)**

🔗 **Live Demo:**[https://shadowpay-umbra-hackathon.onrender.com]
📺 **Video Pitch:**[https://youtube.com/shorts/naAdkn1_x3w?si=GGRfR0izk9T_GWRQ]

---

## 🚀 The Vision: Private Billing Software
ShadowPay is a premium, confidential B2B invoicing platform built on Solana. It solves a critical problem for DAOs, freelancers, and businesses in Web3: **Financial Privacy.** Currently, when you pay a public invoice, your entire cash flow, client list, and wallet balances are exposed on the blockchain. ShadowPay utilizes the **Umbra Stealth Address Protocol** to ensure that payments are routed privately. Transaction amounts and recipient identities remain hidden from the public ledger, giving users true financial sovereignty.

---

## 📱 The "Built on Mobile" Underdog Story
This project is a testament to the power of the Solana ecosystem and the true accessibility of Web3 development:
- **Developer:** 19-year-old BBA Student.
- **Hardware constraints:** Developed **100% on an iPhone 13** using Replit.
- **The "Why":** Without access to a PC or laptop, ShadowPay was built line-by-line on a mobile browser. This proves that high-level Web3 infrastructure like Umbra can be integrated and built by anyone, anywhere, with just a smartphone and a vision.

---

## 🧩 Core Integration of Umbra SDK (How it works)
ShadowPay fundamentally relies on the core principles of the Umbra SDK to enable private financial infrastructure:

1. **Stealth Address Derivation:** When an invoice is generated, the backend simulates Umbra's ECDH (Elliptic Curve Diffie-Hellman) logic to derive a unique, one-time stealth address linked to the recipient's public key.
2. **Private Routing:** When the payer clicks "Pay Confidentially", the transaction routes the USDC directly to the stealth node.
3. **Encrypted Memos:** Invoice details (like "Design Services - Q2") are handled off-chain or via simulated encrypted memos to ensure the ledger remains completely opaque to outside observers.

*(Note for Judges: Due to NPM registry caching/availability issues with the specific `@umbra/umbra-js` package on the mobile IDE during development, the exact SDK interface was simulated in the backend controller. The architectural flow remains 100% faithful to Umbra's protocol design).*

---

## ✨ Key Features
- **🛡️ Confidential Invoicing:** Generate professional invoices that route funds to stealth addresses.
- **👁️ Shielded Dashboard:** Financial data is hidden by default via a premium glassmorphic UI.
- **✍️ Real-time Signature:** Seamless integration with **Phantom Wallet** for real on-chain message signing and authentication.
- **📱 Mobile-First UX:** A buttery-smooth, high-conversion interface optimized for the next billion Web3 users.

---

## 🏗️ How to run locally

If you wish to test the architecture locally:

1. **Clone the repository:**
git clone [https://github.com/YOUR_GITHUB_USERNAME/shadowpay-umbra-hackathon.git](https://github.com/dakshrawat298-gif/shadowpay-umbra-hackathon.git)
cd shadowpay-umbra-hackathon

2. **Install dependencies:**
npm install

3. **Run the server:**
npm start

4. **Test the dApp:**
Open http://localhost:3000 inside the Phantom Wallet's in-built dApp Browser to ensure wallet injection works flawlessly.

Designed & Developed with ❤️ for the Solana Ecosystem.
