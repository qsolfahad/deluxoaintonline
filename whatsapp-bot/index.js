const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason
} = require("@whiskeysockets/baileys");
const P = require("pino");
const qrcode = require("qrcode-terminal");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.WHATSAPP_PORT || 3001;

app.use(cors());
app.use(express.json());

let isConnected = false;

// Initialize Baileys WhatsApp Socket
async function startBot() {
    try {
        const { state, saveCreds } = await useMultiFileAuthState("./auth");

        const sock = makeWASocket({
            auth: state,
            logger: P({ level: "silent" }),
            printQRInTerminal: false
        });

        sock.ev.on("creds.update", saveCreds);

        sock.ev.on("connection.update", ({ connection, qr, lastDisconnect }) => {
            if (qr) {
                console.log("\n==========================================");
                console.log("📲 SCAN THIS QR CODE WITH YOUR WHATSAPP:");
                console.log("WhatsApp -> Linked Devices -> Link a Device");
                console.log("==========================================\n");
                qrcode.generate(qr, { small: true });
            }

            if (connection === "open") {
                isConnected = true;
                console.log("✅ WhatsApp Connected Successfully!");
            }

            if (connection === "close") {
                isConnected = false;
                const statusCode = lastDisconnect?.error?.output?.statusCode;
                const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
                console.log(`❌ Connection closed (StatusCode: ${statusCode}). Reconnecting: ${shouldReconnect}`);

                if (shouldReconnect) {
                    setTimeout(startBot, 3000);
                } else {
                    console.log("⚠️ Logged out from WhatsApp. Clear ./auth folder and restart to pair again.");
                }
            }
        });

        global.sock = sock;
    } catch (error) {
        console.error("❌ Error starting WhatsApp Bot:", error);
        setTimeout(startBot, 5000);
    }
}

// Start WhatsApp Socket Connection
startBot();

// Health Check Endpoint
app.get("/status", (req, res) => {
    res.json({
        success: true,
        connected: isConnected,
        message: isConnected ? "WhatsApp Bot connected and ready." : "WhatsApp Bot not connected yet."
    });
});

// Express API Endpoint to Send WhatsApp Messages
app.post("/send", async (req, res) => {
    try {
        const { phone, message } = req.body;

        if (!phone || !message) {
            return res.status(400).json({
                success: false,
                error: "Both 'phone' and 'message' fields are required."
            });
        }

        if (!global.sock || !isConnected) {
            return res.status(503).json({
                success: false,
                error: "WhatsApp Bot is not connected yet. Please scan the QR code in the bot terminal."
            });
        }

        // Format phone number to WhatsApp JID format
        let cleanPhone = String(phone).replace(/[^0-9]/g, "");
        if (!cleanPhone.endsWith("@s.whatsapp.net")) {
            cleanPhone += "@s.whatsapp.net";
        }

        console.log(`[WhatsApp API] Sending message to ${cleanPhone}...`);

        const result = await global.sock.sendMessage(cleanPhone, {
            text: message
        });

        console.log(`[WhatsApp API] Message sent successfully! ID: ${result?.key?.id}`);

        res.json({
            success: true,
            messageId: result?.key?.id || null,
            recipient: cleanPhone
        });

    } catch (error) {
        console.error("[WhatsApp API] Error sending message:", error);
        res.status(500).json({
            success: false,
            error: error.message || "Failed to send WhatsApp message."
        });
    }
});

// Start Express Server
app.listen(PORT, () => {
    console.log(`\n==========================================`);
    console.log(`🚀 WhatsApp Bot Server Running on http://localhost:${PORT}`);
    console.log(`==========================================\n`);
});
