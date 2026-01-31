const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        this.transporter = null;
        this.initTransport();
    }

    async initTransport() {
        if (process.env.SMTP_HOST && process.env.SMTP_USER) {
            // Production/Configured SMTP
            this.transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT || 587,
                secure: process.env.SMTP_SECURE === 'true',
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
            });
            console.log('EmailService: SMTP Transport initialized');
        } else if (process.env.NODE_ENV !== 'production') {
            // Development: Ethereal or Console
            try {
                const testAccount = await nodemailer.createTestAccount();
                this.transporter = nodemailer.createTransport({
                    host: 'smtp.ethereal.email',
                    port: 587,
                    secure: false,
                    auth: {
                        user: testAccount.user,
                        pass: testAccount.pass
                    }
                });
                console.log('EmailService: Development Ethereal Transport initialized');
                console.log(`EmailService: Preview URL available at https://ethereal.email/messages`);
            } catch (err) {
                console.warn('EmailService: Failed to create Ethereal account, falling back to console logging');
                this.transporter = {
                    sendMail: async (mailOptions) => {
                        console.log('EmailService [MOCK]:', JSON.stringify(mailOptions, null, 2));
                        return { messageId: 'mock-id' };
                    }
                };
            }
        } else {
            console.warn('EmailService: No SMTP configuration found in production. Emails will NOT be sent.');
        }
    }

    async sendMail(to, subject, html) {
        if (!this.transporter) {
            await this.initTransport();
        }

        if (!this.transporter) {
            console.error('EmailService: Transporter not ready, skipping email');
            return null;
        }

        try {
            const info = await this.transporter.sendMail({
                from: process.env.EMAIL_FROM || '"Bond Platform" <noreply@bondplatform.com>',
                to,
                subject,
                html
            });

            if (process.env.NODE_ENV !== 'production' && nodemailer.getTestMessageUrl(info)) {
                console.log('EmailService Preview URL: %s', nodemailer.getTestMessageUrl(info));
            }

            return info;
        } catch (error) {
            console.error(`EmailService: Failed to send email to ${to}`, error);
            return null;
        }
    }

    async sendWelcomeEmail(user) {
        const subject = 'Welcome to InfraBond Platform!';
        const html = `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h2>Welcome, ${user.name}!</h2>
                <p>Thank you for registering with the Infrastructure Bond Tokenization Platform.</p>
                <p>Your account has been successfully created.</p>
                <p>You can now:</p>
                <ul>
                    <li>Browse high-yield infrastructure bonds</li>
                    <li>Deposit funds securely</li>
                    <li>Start building your portfolio</li>
                </ul>
                <p>Happy Investing!<br>The InfraBond Team</p>
            </div>
        `;
        return this.sendMail(user.email, subject, html);
    }

    async sendTradeConfirmation(user, transaction, bond) {
        const subject = `Trade Confirmation: ${bond.name}`;
        const html = `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h2>Trade Executed</h2>
                <p>Hello ${user.name},</p>
                <p>Your order to <strong>${transaction.type.toUpperCase()}</strong> has been completed.</p>
                <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
                    <tr style="background-color: #f8f9fa;">
                        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Bond</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${bond.name} (${bond.bond_id})</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Quantity</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${transaction.quantity}</td>
                    </tr>
                    <tr style="background-color: #f8f9fa;">
                        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Price/Unit</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">₹${transaction.price_per_unit}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Total Amount</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">₹${transaction.total_amount}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Transaction ID</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${transaction.transaction_id}</td>
                    </tr>
                </table>
                <p>You can view your updated portfolio in the dashboard.</p>
            </div>
        `;
        return this.sendMail(user.email, subject, html);
    }

    async sendDepositConfirmation(user, amount, newBalance) {
        const subject = 'Deposit Successful';
        const html = `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h2>Funds Deposited</h2>
                <p>Hello ${user.name},</p>
                <p>We have received your deposit of <strong>₹${amount}</strong>.</p>
                <p>Your new wallet balance is: <strong>₹${newBalance}</strong>.</p>
                <p>These funds are now available for trading.</p>
            </div>
        `;
        return this.sendMail(user.email, subject, html);
    }

    async sendOtpEmail(email, otp, purpose = 'verification') {
        const subject = purpose === 'password_reset'
            ? 'Password Reset OTP'
            : 'Verification Code';

        const purposeText = {
            'password_reset': 'reset your password',
            'verification': 'verify your account',
            'login': 'complete your login'
        };

        const html = `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0; font-size: 24px;">InfraBond Platform</h1>
                </div>
                <div style="padding: 40px 30px; background-color: #f8f9fa; border-radius: 0 0 10px 10px;">
                    <h2 style="color: #333; margin-bottom: 20px;">Your Verification Code</h2>
                    <p style="font-size: 16px; color: #666; margin-bottom: 30px;">
                        Use the following code to ${purposeText[purpose] || 'verify your action'}:
                    </p>
                    <div style="background-color: white; padding: 25px; border-radius: 8px; text-align: center; margin: 30px 0;">
                        <div style="font-size: 42px; font-weight: bold; letter-spacing: 8px; color: #667eea; font-family: 'Courier New', monospace;">
                            ${otp}
                        </div>
                    </div>
                    <p style="font-size: 14px; color: #666; margin-top: 30px;">
                        This code will expire in <strong>10 minutes</strong>.
                    </p>
                    <p style="font-size: 14px; color: #666; margin-top: 20px;">
                        If you didn't request this code, please ignore this email or contact support if you're concerned about your account security.
                    </p>
                </div>
                <div style="padding: 20px; text-align: center; color: #999; font-size: 12px;">
                    <p>© 2026 InfraBond Platform. All rights reserved.</p>
                </div>
            </div>
        `;

        return this.sendMail(email, subject, html);
    }
}

module.exports = new EmailService();
