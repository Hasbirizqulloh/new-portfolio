import { NextResponse } from 'next/server';
import { ContactService } from '@/backend/services/contact.service';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        // Validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, error: 'Name, email, and message are required.' },
                { status: 400 }
            );
        }

        // Use the service layer to process the message
        const contactMessage = await ContactService.submitMessage({
            name,
            email,
            subject,
            message,
        });

        return NextResponse.json({
            success: true,
            message: 'Message sent successfully!',
            id: contactMessage.id,
        });
    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error.' },
            { status: 500 }
        );
    }
}
