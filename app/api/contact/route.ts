import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, phone, message } = body;

        // Validate required fields
        if (!firstName || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
        const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
        const MAILGUN_FROM_EMAIL = process.env.MAILGUN_FROM_EMAIL;

        if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN || !MAILGUN_FROM_EMAIL) {
            console.error('Missing Mailgun environment variables');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        // Send confirmation email to user
        const confirmationData = {
            from: MAILGUN_FROM_EMAIL,
            to: email,
            template: 'contact-us confirmation',
            'h:X-Mailgun-Variables': JSON.stringify({
                first_name: firstName,
                message: message
            })
        };

        // Send notification email to team
        const notificationData = {
            from: MAILGUN_FROM_EMAIL,
            to: 'motorsports@ontariotechu.net',
            template: 'contact form submission',
            'h:X-Mailgun-Variables': JSON.stringify({
                email: email,
                first_name: firstName,
                last_name: lastName || '',
                message: message,
                phone: phone || 'Not provided'
            })
        };

        const auth = Buffer.from(`api:${MAILGUN_API_KEY}`).toString('base64');
        const mailgunUrl = `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`;

        // Send both emails
        const [confirmationResponse, notificationResponse] = await Promise.all([
            fetch(mailgunUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${auth}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(confirmationData as any).toString(),
            }),
            fetch(mailgunUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${auth}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(notificationData as any).toString(),
            }),
        ]);

        if (!confirmationResponse.ok || !notificationResponse.ok) {
            const confirmationError = await confirmationResponse.text();
            const notificationError = await notificationResponse.text();
            console.error('Mailgun API error:', { confirmationError, notificationError });
            return NextResponse.json(
                { error: 'Failed to send emails' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
