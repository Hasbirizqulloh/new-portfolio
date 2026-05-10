import prisma from "@/lib/prisma";

interface ContactPayload {
    name: string;
    email: string;
    subject?: string;
    message: string;
}

export class ContactService {
    static async submitMessage(payload: ContactPayload) {
        try {
            const contactMessage = await prisma.contactMessage.create({
                data: {
                    senderName: payload.name,
                    senderEmail: payload.email,
                    subject: payload.subject || null,
                    message: payload.message,
                },
            });

            return contactMessage;
        } catch (error) {
            console.error("[ContactService] Error submitting message:", error);
            throw error;
        }
    }
}
