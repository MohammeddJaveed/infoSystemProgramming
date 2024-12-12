const request = require('supertest');
const { app, server } = require('../infoSystemProgramming/index'); 
const mysql = require('mysql2');


jest.mock('mysql2', () => ({
  createConnection: jest.fn().mockReturnValue({
    connect: jest.fn((callback) => callback(null)),
    query: jest.fn().mockImplementation((query, values, callback) => {
      if (query.includes("INSERT INTO Bus")) {
        callback(null, { insertId: 1 });
      } else if (query.includes("SELECT * FROM Bus")) {
        callback(null, [
          { id: 1, route_name: 'Route 1', starting_point: 'Dublin', destination: 'Cork', description: 'Direct route' }
        ]);
      } else if (query.includes("UPDATE Bus")) {
        callback(null, { affectedRows: 1 });
      } else if (query.includes("DELETE FROM Bus")) {
        callback(null, { affectedRows: 1 });
      } else {
        callback(new Error(`Unhandled query: ${query}`));
      }
    }),
    end: jest.fn(),
  }),
}));

afterAll(() => {
  if (server) {
    server.close();
  }
});

describe('POST /bus/add', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should add a new bus route', async () => {
    const newRoute = {
      route_name: 'Route 1',
      starting_point: 'Dublin',
      destination: 'Cork',
      description: 'Direct route',
    };

    const res = await request(app).post('/bus/add').send(newRoute);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Bus added successfully!');
    const queryCalls = mysql.createConnection().query.mock.calls;
    expect(queryCalls[0][0]).toContain('INSERT INTO Bus');
    expect(queryCalls[0][1]).toEqual([newRoute.route_name, newRoute.starting_point, newRoute.destination, newRoute.description]);
  });

  it('should return an error if any field is missing', async () => {
    const incompleteRoute = {
      route_name: 'Route 1',
      starting_point: 'Dublin',
      destination: 'Cork',
    };

    const res = await request(app).post('/bus/add').send(incompleteRoute);

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('All fields are required (route_name, starting_point, destination, description)');
  });

});

describe('GET /bus/', () => {
  it('should return a list of bus routes', async () => {
    const mockRoutes = [
      { id: 1, route_name: 'Route 1', starting_point: 'Dublin', destination: 'Cork', description: 'Direct route' },
      { id: 2, route_name: 'Route 2', starting_point: 'Dublin', destination: 'Galway', description: 'Scenic route' },
    ];

    mysql.createConnection().query.mockImplementationOnce((query, callback) => {
      callback(null, mockRoutes);
    });

    const res = await request(app).get('/bus/');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockRoutes);
  });
});

describe('GET /bus/search', () => {
  it('should return bus routes matching starting point and destination', async () => {
    const searchResult = [
      { id: 1, route_name: 'Route 1', starting_point: 'Dublin', destination: 'Cork', description: 'Direct route' },
    ];

    const res = await request(app).get('/bus/search').query({ starting_point: 'Dublin', destination: 'Cork' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(searchResult);
  });

  it('should return error if starting point or destination is missing', async () => {
    const res = await request(app).get('/bus/search').query({ starting_point: 'Dublin' });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Starting Point and Destination are required');
  });
});


