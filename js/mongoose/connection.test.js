/**
 * @jest-environment node
 */
jest.mock('mongoose', () => ({
  connect: jest.fn(),
}));

import mongoose from 'mongoose';
import connectToDatabase  from './connection.js';

describe('Test Suite For Mongoose DB Connection', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Test should ensure that mongoose is being called with process.env.MONGODB_URI string', async () => {

    process.env.MONGODB_URI = "MONGODB_URI";

    await connectToDatabase();

    expect(mongoose.connect).toHaveBeenCalledWith("MONGODB_URI");
  });  
});