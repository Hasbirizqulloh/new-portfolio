import { NextResponse } from "next/server";

export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
}

export class ApiHelper {
    static success<T>(data: T, message: string = "Success", status: number = 200) {
        const response: ApiResponse<T> = {
            success: true,
            message,
            data,
        };
        return NextResponse.json(response, { status });
    }

    static error(message: string, error?: any, status: number = 500) {
        const response: ApiResponse = {
            success: false,
            message,
            error: error instanceof Error ? error.message : String(error),
        };
        return NextResponse.json(response, { status });
    }

    static badRequest(message: string = "Bad Request") {
        return this.error(message, null, 400);
    }

    static unauthorized(message: string = "Unauthorized") {
        return this.error(message, null, 401);
    }
}
