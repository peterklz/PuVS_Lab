// src/pages/api/items.js
export async function GET({ request }) {
    const apiUrl = process.env.API_SERVER_URL || 'http://localhost:8080';

    try {
        const response = await fetch(`${apiUrl}/items`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const items = await response.json();

        return new Response(JSON.stringify(items), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('API Error - GET /items:', error);
        return new Response(JSON.stringify({
            error: 'Failed to fetch shopping items',
            message: error.message
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

export async function POST({ request }) {
    const apiUrl = process.env.API_SERVER_URL || 'http://localhost:8080';

    try {
        const body = await request.json();

        // Validation
        if (!body.name || !body.quantity) {
            return new Response(JSON.stringify({
                error: 'Invalid input',
                message: 'Name and quantity are required'
            }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        if (typeof body.quantity !== 'number' || body.quantity <= 0) {
            return new Response(JSON.stringify({
                error: 'Invalid input',
                message: 'Quantity must be a positive number'
            }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        const response = await fetch(`${apiUrl}/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: body.name,
                quantity: body.quantity
            }),
        });

        if (!response.ok) {
            if (response.status === 400) {
                const errorData = await response.json();
                return new Response(JSON.stringify(errorData), {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const item = await response.json();

        // Return appropriate status based on whether item was created or updated
        const status = response.status === 201 ? 201 : 200;

        return new Response(JSON.stringify(item), {
            status: status,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('API Error - POST /items:', error);
        return new Response(JSON.stringify({
            error: 'Failed to create or update item',
            message: error.message
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}