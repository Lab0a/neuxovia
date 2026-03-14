import express from "express";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Contact Form
  app.post("/api/contact", async (req, res) => {
    const { firstName, lastName, email, company, phone, message, attachment } = req.body;

    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ error: "Tous les champs obligatoires sont requis." });
    }

    try {
      // Check if SMTP credentials are provided
      if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        
        const port = parseInt(process.env.SMTP_PORT || "587");
        const secure = process.env.SMTP_SECURE === "true" || port === 465;

        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: port,
          secure: secure, 
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
          connectionTimeout: 10000, 
          greetingTimeout: 10000,
          socketTimeout: 10000,
        });

        // Prepare attachments
        const attachments = [];
        if (attachment && typeof attachment === 'string') {
          console.log(`Attachment received, length: ${attachment.length}`);
          
          // Robust check for base64 PDF data
          const isPdf = attachment.includes('application/pdf');
          const isBase64 = attachment.includes('base64,');
          
          if (isPdf && isBase64) {
            const base64Data = attachment.split('base64,').pop();
            if (base64Data) {
              console.log("Successfully extracted base64 PDF data");
              attachments.push({
                filename: 'Neuxovia_Recommandation_IA.pdf',
                content: base64Data,
                encoding: 'base64'
              });
            }
          } else {
            console.warn("Attachment received but format is invalid (missing pdf or base64 marker)");
          }
        } else {
          console.log("No attachment received in request body");
        }

        // HTML Email Template
        const htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #1a1a1a; padding: 20px; text-align: center;">
              <h2 style="color: #ffffff; margin: 0; font-family: 'Times New Roman', serif;">NEUXOVIA</h2>
              <p style="color: #cccccc; margin: 5px 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Nouvelle demande de contact</p>
            </div>
            
            <div style="padding: 30px; background-color: #ffffff;">
              <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
                Vous avez reçu un nouveau message via le formulaire de contact du site web.
                ${attachments.length > 0 ? '<br><strong>Note : Une recommandation IA est jointe à cet email.</strong>' : ''}
              </p>
              
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr style="border-bottom: 1px solid #f0f0f0;">
                  <td style="padding: 10px 0; font-weight: bold; color: #555; width: 140px;">Nom complet :</td>
                  <td style="padding: 10px 0; color: #333;">${firstName} ${lastName}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f0f0f0;">
                  <td style="padding: 10px 0; font-weight: bold; color: #555;">Email :</td>
                  <td style="padding: 10px 0; color: #333;"><a href="mailto:${email}" style="color: #0066cc; text-decoration: none;">${email}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #f0f0f0;">
                  <td style="padding: 10px 0; font-weight: bold; color: #555;">Téléphone :</td>
                  <td style="padding: 10px 0; color: #333;">${phone || "Non renseigné"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f0f0f0;">
                  <td style="padding: 10px 0; font-weight: bold; color: #555;">Société :</td>
                  <td style="padding: 10px 0; color: #333;">${company || "Non renseigné"}</td>
                </tr>
              </table>
              
              <div style="background-color: #f9f9f9; padding: 20px; border-radius: 4px; border-left: 4px solid #1a1a1a;">
                <h3 style="margin-top: 0; font-size: 14px; color: #555; text-transform: uppercase;">Message :</h3>
                <p style="margin-bottom: 0; line-height: 1.6; color: #333; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            
            <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #888;">
              <p style="margin: 0;">Cet email a été envoyé automatiquement depuis le site web de Neuxovia.</p>
              <p style="margin: 5px 0 0;">© ${new Date().getFullYear()} Neuxovia. Tous droits réservés.</p>
            </div>
          </div>
        `;

        // Plain Text Fallback
        const textContent = `
          NOUVELLE DEMANDE DE CONTACT - NEUXOVIA
          ----------------------------------------
          
          DÉTAILS DU CONTACT
          Nom : ${lastName}
          Prénom : ${firstName}
          Email : ${email}
          Téléphone : ${phone || "Non renseigné"}
          Société : ${company || "Non renseigné"}
          
          MESSAGE
          ----------------------------------------
          ${message}
          ----------------------------------------
          ${attachments.length > 0 ? 'NOTE : Une recommandation IA est jointe à cet email.' : ''}
        `;

        await transporter.sendMail({
          from: `"${firstName} ${lastName}" <${process.env.SMTP_USER}>`, 
          to: "baptiste@neuxovia.com", 
          replyTo: email,
          subject: `Prise de contact - ${firstName} ${lastName} (${company || "Particulier"})`, 
          text: textContent,
          html: htmlContent,
          attachments: attachments
        });

        console.log("Email sent successfully via SMTP");
      } else {
        // Fallback: Log to console if no SMTP configured
        console.log("---------------------------------------------------");
        console.log("⚠️  SMTP not configured. Email logged to console:");
        console.log(`From: ${firstName} ${lastName} (${email})`);
        console.log(`Company: ${company || "N/A"} | Phone: ${phone || "N/A"}`);
        console.log(`To: baptiste@neuxovia.com`);
        console.log(`Message: ${message}`);
        if (attachment) console.log(`Attachment: [PDF Base64 Data Included]`);
        console.log("---------------------------------------------------");
      }

      res.json({ success: true, message: "Message envoyé avec succès." });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Erreur lors de l'envoi du message." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
