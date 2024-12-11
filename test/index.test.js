const request = require('supertest');
const { app, server } = require('../index.js');
const mysql = require('mysql2');

// Mock the MySQL connection
jest.mock('mysql2', () => ({
    createConnection: jest.fn().mockReturnValue({
        connect: jest.fn((callback) => callback(null)),
        query: jest.fn((query, values, callback) => {
            if (query.includes('INSERT INTO Bus')) {
                callback(null, { insertId: 1 }); // Simulate successful insert
            } else {
                callback(new Error('Unhandled query')); // Simulate unhandled query error
            }
        }),
        end: jest.fn(),
    }),
}));

describe('POST /bus/add', () => {
    afterAll(() => {
        if (server) server.close();
    });

    beforeEach(() => {
        jest.clearAllMocks(); // Clear mock call data before each test
    });

    it('should return 400 if required fields are missing', async () => {
        const incompleteBusRoute = {
            route_name: 'New Route',
            starting_point: 'Dublin',
            destination: 'Galway',
            // Missing 'description'
        };

        const res = await request(app).post('/bus/add').send(incompleteBusRoute);

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe(
            'All fields are required (route_name, starting_point, destination, description)'
        );
    });

    it('should return 201 if all required fields are provided', async () => {
        const completeBusRoute = {
            route_name: 'New Route',
            starting_point: 'Dublin',
            destination: 'Galway',
            description: 'Express route connecting Dublin and Galway',
        };

        const res = await request(app).post('/bus/add').send(completeBusRoute);

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Bus added successfully!');

        // Verify the mock query was called with the correct arguments
        const queryCalls = mysql.createConnection().query.mock.calls;
        expect(queryCalls[0][0]).toContain('INSERT INTO Bus');
        expect(queryCalls[0][1]).toEqual([
            completeBusRoute.route_name,
            completeBusRoute.starting_point,
            completeBusRoute.destination,
            completeBusRoute.description,
        ]);
    });
});
