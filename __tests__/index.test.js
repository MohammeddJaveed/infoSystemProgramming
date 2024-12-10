const request = require('supertest');
const {app} = require('../index'); // Import the app directly
const mysql = require('mysql2');
import PostsRouter from '../routes/posts';

// This will return the express application 
const api = request(new App([
        new PostsRouter(),
    ],
    5500).app);

// Mocking MySQL connection
jest.mock('mysql2', () => ({
    createConnection: jest.fn().mockReturnValue({
        connect: jest.fn((callback) => callback(null)),
        query: jest.fn().mockImplementation((query, values, callback) => {
            if (query.includes("INSERT INTO Bus")) {
                callback(null, { insertId: 1 });
            } else if (query.includes("DELETE FROM Bus WHERE id = ?")) {
                const busId = values[0];
                if (busId === 1) {
                    callback(null, { affectedRows: 1 });
                } else {
                    callback(null, { affectedRows: 0 });
                }
            } else if (query.includes("SELECT * FROM Bus WHERE starting_point = ? AND destination = ?")) {
                const [starting_point, destination] = values;
                if (starting_point === "City A" && destination === "City B") {
                    callback(null, [
                        { id: 1, route_name: 'Route 1', starting_point, destination, description: 'Fast Route' },
                    ]);
                } else {
                    callback(null, []);
                }
            } else if (query.includes("SELECT * FROM Bus")) {
                callback(null, [
                    { id: 1, route_name: 'Route A', starting_point: 'City A', destination: 'City B', description: 'Fast Route' },
                    { id: 2, route_name: 'Route B', starting_point: 'City C', destination: 'City D', description: 'Scenic Route' },
                ]);
            } else if (query.includes("UPDATE Bus")) {
                const id = values[4];
                if (id === 1) {
                    callback(null, { affectedRows: 1 });
                } else {
                    callback(null, { affectedRows: 0 });
                }
            } else {
                callback(new Error(`Unhandled query: ${query}`));
            }
        }),
        end: jest.fn(),
    }),
}));

// Clean up after all tests
afterAll(() => {
    if (server) {
        server.close();
    }
});

describe('Bus Routes API', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /', () => {
        it('should return Hello world', async () => {
            const res = await request(app).get('/');
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual({ info: 'Hello world!' });
        });
    });

    describe('GET /bus/', () => {
        it('should return all bus routes', async () => {
            const res = await request(app).get('/bus/');
            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBe(2);
        });

        it('should handle database connection errors', async () => {
            mysql.createConnection().connect.mockImplementationOnce((cb) => cb(new Error('Connection Error')));

            const res = await request(app).get('/bus/');
            expect(res.statusCode).toBe(500);
            expect(res.body).toEqual({ error: 'Database connection failed' });
        });
    });

    describe('POST /bus/add', () => {
        it('should add a new bus route', async () => {
            const newBus = {
                route_name: 'Route C',
                starting_point: 'City E',
                destination: 'City F',
                description: 'New Scenic Route',
            };

            const res = await request(app).post('/bus/add').send(newBus);

            expect(res.statusCode).toBe(201);
            expect(res.body.message).toBe('Bus added successfully');
        });

        it('should return an error for missing fields', async () => {
            const incompleteBus = {
                route_name: 'Route C',
                starting_point: 'City E',
            };

            const res = await request(app).post('/bus/add').send(incompleteBus);
            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe('All fields are required (route_name, starting_point, destination, description)');
        });
    });

    describe('GET /bus/search', () => {
        it('should return the correct route for given starting_point and destination', async () => {
            const res = await request(app).get('/bus/search').query({ starting_point: 'City A', destination: 'City B' });
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveLength(1);
        });

        it('should return an error for missing query parameters', async () => {
            const res = await request(app).get('/bus/search').query({ starting_point: 'City A' });
            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe('Starting Point and Destination are required');
        });
    });

    describe('PUT /bus/update/:id', () => {
        it('should update a bus route successfully', async () => {
            const updatedBus = {
                route_name: 'Updated Route',
                starting_point: 'City G',
                destination: 'City H',
                description: 'Updated Description',
            };

            const res = await request(app).put('/bus/update/1').send(updatedBus);

            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe('Route updated successfully!');
        });

        it('should return an error if the route does not exist', async () => {
            const updatedBus = {
                route_name: 'Updated Route',
                starting_point: 'City G',
                destination: 'City H',
                description: 'Updated Description',
            };

            const res = await request(app).put('/bus/update/999').send(updatedBus);

            expect(res.statusCode).toBe(404);
            expect(res.body.error).toBe('Route not found');
        });
    });

    describe('DELETE /bus/delete/:id', () => {
        it('should delete a bus route successfully', async () => {
            const res = await request(app).delete('/bus/delete/1');
            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe('Route deleted successfully!');
        });

        it('should return an error if the route does not exist', async () => {
            const res = await request(app).delete('/bus/delete/999');
            expect(res.statusCode).toBe(404);
            expect(res.body.error).toBe('Route not found');
        });
    });
});
