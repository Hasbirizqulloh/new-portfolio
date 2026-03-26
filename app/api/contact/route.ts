import { NextRequest } from "next/server";
import { ApiHelper } from "@/backend/utils/api-response";
import { ContactService } from "@/backend/services/contact.service";

export async function POST(req: NextRequest) {
    try {
        // 1. Parse incoming request
        const body = await req.json();

        // 2. Delegate to Business Logic Layer (Service)
        await ContactService.submitMessage(body);

        // 3. Return Standardized Response
        return ApiHelper.success(null, "Message sent successfully!");

    } catch (error: any) {
        console.error("[POST /api/contact] Error:", error);

        if (error.message === "Email and message are required.") {
            return ApiHelper.badRequest(error.message);
        }

        return ApiHelper.error("Failed to send message", error);
    }
}
