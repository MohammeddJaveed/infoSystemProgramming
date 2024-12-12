const request = require('supertest');
const { app, server } = require('../index.js');
const mysql = require('mysql2');

jest.mock('mysql2', () => ({
    createConnection: jest.fn().mockReturnValue({
        connect: jest.fn((callback) => callback(null)),
        query: jest.fn((query, values, callback) => {
            if (query.includes('INSERT INTO Bus')) {
                callback(null, { insertId: 1 });
            } else if (query.includes('DELETE FROM Bus')) {
                if (values[0] === 1) {
                    callback(null, { affectedRows: 1 }); 
                } else {
                    callback(null, { affectedRows: 0 }); 
                }
            } else {
                callback(new Error('Unhandled query'));
            }
        }),
        end: jest.fn(),
    }),
}));

describe('Bus API Tests', () => {
    afterAll(() => {
        if (server) server.close();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /bus/add', () => {
        it('should return 400 if required fields are missing', async () => {
            const incompleteBusRoute = {
                route_name: 'New Route',
                starting_point: 'Dublin',
                destination: 'Galway',
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

    describe('DELETE /bus/delete/:id', () => {

        it('should return 404 if the route does not exist', async () => {
            const id = 999;

            const res = await request(app).delete(`/bus/delete/${id}`);

            expect(res.statusCode).toBe(404);
            expect(res.body.error).toBe('Route not found');
        });

        it('should return 500 if the database connection fails', async () => {
            jest.spyOn(mysql, 'createConnection').mockImplementation(() => ({
                connect: (callback) => callback(new Error('Connection failed')),
                query: jest.fn(),
                end: jest.fn(),
            }));

            const id = 1;

            const res = await request(app).delete(`/bus/delete/${id}`);

            expect(res.statusCode).toBe(500);
            expect(res.body.error).toBe('Database connection failed');
        });

        it('should return 500 if query execution fails', async () => {
            jest.spyOn(mysql, 'createConnection').mockImplementation(() => ({
                connect: (callback) => callback(null),
                query: (query, values, callback) => callback(new Error('Query failed')),
                end: jest.fn(),
            }));

            const routeId = 1;

            const res = await request(app).delete(`/bus/delete/${routeId}`);

            expect(res.statusCode).toBe(500);
            expect(res.body.error).toBe('Query execution failed');
        });
    });
});
