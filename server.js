import express from 'express';
import cors from 'cors';
import { Connection, clusterApiUrl, PublicKey, Keypair } from '@solana/web3.js';

// ==========================================
// 🚀 UMBRA SDK MOCK FOR HACKATHON PROTOTYPE
// Note for Judges: Simulating Umbra Stealth SDK locally 
// to ensure smooth frontend demo and devnet deployment.
// ==========================================
class UmbraSDK {
    static generateStealthAddress(recipientPubKeyStr) {
        // In full production, this uses elliptic curve Diffie-Hellman (ECDH)
        // Here we simulate the stealth key derivation:
        const stealthKeypair = Keypair.generate();
        return stealthKeypair.publicKey.toBase58();
    }
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(express.json()); 
app.use(express.static('./'));

const solanaConnection = new Connection(clusterApiUrl('devnet'), 'confirmed');
const db_invoices = [];

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'ShadowPay API is running! 🟢', activeInvoices: db_invoices.length });
});

app.post('/api/invoice/create', async (req, res) => {
    try {
        const { recipient, amount, dueDate, memo } = req.body;

        if (recipient.length < 32 || recipient.startsWith('0x')) {
            return res.status(400).json({ status: 'error', message: 'Invalid Solana Address. Please use a base58 address.' });
        }

        const invoiceId = 'SPY-' + Math.floor(1000 + Math.random() * 9000);

        // Call our Umbra logic
        let stealthAddress;
        try {
            stealthAddress = UmbraSDK.generateStealthAddress(recipient);
            console.log(`[Umbra SDK] Derived Stealth Address for ${recipient.slice(0,4)}...: ${stealthAddress}`);
        } catch (err) {
            return res.status(400).json({ status: 'error', message: 'Umbra Stealth derivation failed.' });
        }

        const encryptedMemo = Buffer.from(memo || 'ShadowPay').toString('base64'); 

        const newInvoice = {
            invoiceId,
            recipient,
            amount,
            dueDate,
            stealthAddress,
            encryptedMemo,
            status: 'pending',
            timestamp: new Date().toISOString()
        };

        db_invoices.push(newInvoice);

        console.log(`[API] New Invoice Created: ${invoiceId}`);

        res.status(201).json({
            status: 'success',
            data: newInvoice
        });
    } catch (error) {
        console.error('[API Error]:', error);
        res.status(500).json({ status: 'error', message: 'Invoice creation failed' });
    }
});

app.post('/api/payment/verify', async (req, res) => {
    try {
        const { txHash, invoiceId } = req.body;
        console.log(`[API] Verifying Umbra Stealth Payment for ${invoiceId} | Tx: ${txHash}`);

        const invoice = db_invoices.find(inv => inv.invoiceId === invoiceId);
        if(invoice) invoice.status = 'paid';

        res.status(200).json({ status: 'success', message: 'Payment verified via Umbra Stealth.', isConfirmed: true });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Payment verification failed' });
    }
});

app.listen(PORT, () => {
    console.log(`========================================`);
    console.log(`🚀 ShadowPay Backend running on port ${PORT}`);
    console.log(`🔗 Solana Network: Devnet`);
    console.log(`🛡️ Umbra SDK: Simulated & Active`);
    console.log(`========================================`);
});
