import { NextRequest, NextResponse } from 'next/server';

import submitService from '@/services/submitService';

export async function POST(req: NextRequest) {
    try {
        const { candidateResult } = await req.json();
        const response = await submitService(candidateResult);
    
        return NextResponse.json({
            success: true,
            message: 'Successfully submitted the test',
            data: response,
            error: {}
        });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error);
        let message = 'Something went wrong';
        let statusCode = 500;

        if(error.message) {
            message = error.message;
            statusCode = 400;
        }

        return NextResponse.json({
            success: false,
            message: message,
            data: {},
            error
        }, { status: statusCode });
    }
}