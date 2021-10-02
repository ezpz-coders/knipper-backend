const mongoose = require('mongoose')
const databaseName = 'test'

beforeAll(async () => {
    const url = `mongodb://127.0.0.1/${databaseName}`
    await mongoose.connect(url, { useNewUrlParser: true })
})

it('connection should be defined', async () => {
    const users = db.collection('users');

    const mockUser = { _id: 'some-user-id', name: 'John' };
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({ _id: 'some-user-id' });
    expect(insertedUser).toEqual(mockUser);
})