import { createGame } from '@/app/utils/redis';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { fmkId, option1, option2, option3, skin } = await request.json();
    const missingFields = ['fmkId', 'option1', 'option2', 'option3'].filter(field => !eval(field));

    if (missingFields.length) {
        return NextResponse.json({ error: `Missing required fields: ${missingFields.join(', ')}` }, { status: 400 });
    }

    try {
        await createGame(fmkId, option1, option2, option3, skin);
        const frameUrl = request.url.replace('/create-game', '/start/') + fmkId
        return NextResponse.json({ message: `Game created successfully at ${frameUrl}` }, { status: 200 });
    } catch (error) {
        console.error('Error creating game:', error);
        return NextResponse.json({ error: 'Failed to create game' }, { status: 500 });
    }
}

