// src/pages/api/items/[itemId].js
export async function GET({ params, request }) {
    const apiUrl = process.env.API_SERVER_URL || 'http://localhost:8080';
    const { itemId } = params;

    try {
        // Validate itemId is a number
        if (!itemId || isNaN(parseInt(itemId))) {
            return new Response(JSON.stringify({
                error: 'Invalid item ID',
                message: 'Item ID must be a valid number'
            }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        const response = await fetch(`${apiUrl}/items/${itemId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            if (response.status === 404) {
                return new Response(JSON.stringify({
                    error: 'Item not found',
                    message: `Item with ID ${itemId} does not exist`
                }), {
                    status: 404,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const item = await response.json();
        return new Response(JSON.stringify(item), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(`API Error - GET /items/${itemId}:`, error);
        return new Response(JSON.stringify({
            error: 'Failed to fetch item',
            message: error.message
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

export async function PUT({ params, request }) {
    const apiUrl = process.env.API_SERVER_URL || 'http://localhost:8080';
    const { itemId } = params;

    try {
        // Validate itemId
        if (!itemId || isNaN(parseInt(itemId))) {
            return new Response(JSON.stringify({
                error: 'Invalid item ID',
                message: 'Item ID must be a valid number'
            }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

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

        const response = await fetch(`${apiUrl}/items/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: body.name,
                quantity: body.quantity
            }),
        });

        if (!response.ok) {
            if (response.status === 404) {
                return new Response(JSON.stringify({
                    error: 'Item not found',
                    message: `Item with ID ${itemId} does not exist`
                }), {
                    status: 404,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            }
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

        const updatedItem = await response.json();
        return new Response(JSON.stringify(updatedItem), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(`API Error - PUT /items/${itemId}:`, error);
        return new Response(JSON.stringify({
            error: 'Failed to update item',
            message: error.message
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

export async function DELETE({ params, request }) {
    const apiUrl = process.env.API_SERVER_URL || 'http://localhost:8080';
    const { itemId } = params;

    try {
        // Validate itemId
        if (!itemId || isNaN(parseInt(itemId))) {
            return new Response(JSON.stringify({
                error: 'Invalid item ID',
                message: 'Item ID must be a valid number'
            }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        const response = await fetch(`${apiUrl}/items/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            if (response.status === 404) {
                return new Response(JSON.stringify({
                    error: 'Item not found',
                    message: `Item with ID ${itemId} does not exist`
                }), {
                    status: 404,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Return 204 No Content as per OpenAPI spec
        return new Response(null, {
            status: 204,
        });
    } catch (error) {
        console.error(`API Error - DELETE /items/${itemId}:`, error);
        return new Response(JSON.stringify({
            error: 'Failed to delete item',
            message: error.message
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}