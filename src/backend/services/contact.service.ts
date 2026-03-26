// This is where the business logic goes (e.g., sending emails, saving to DB)
// It is completely decoupled from Next.js Request/Response objects.

interface ContactPayload {
    name: string;
    email: string;
    message: string;
}

export class ContactService {
    /**
     * Processes a new contact message.
     * @param payload The contact form data
     * @returns A boolean indicating success, or throws an error.
     */
    static async submitMessage(payload: ContactPayload): Promise<boolean> {
        try {
            // 1. Validate payload (you could use Zod here)
            if (!payload.email || !payload.message) {
                throw new Error("Email and message are required.");
            }

            // 2. Add your business logic here
            // Example: await Resend.emails.send({...})
            // Example: await prisma.contact.create({...})

            console.log("[ContactService] Processing message from:", payload.email);

            // Simulate network delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            return true;
        } catch (error) {
            console.error("[ContactService] Error submitting message:", error);
            throw error;
        }
    }
}
