import { Users, User } from '../../models/users';

const us = new Users();
const usr: User = {
  firstname: 'first',
  lastname: 'last',
  password: 'test12344321',
};
describe('Users Model', () => {
  it('should have an index method', () => {
    expect(us.index).toBeDefined();
  });
  it('should have a show method', () => {
    expect(us.show).toBeDefined();
  });
  it('should have a create method', () => {
    expect(us.create).toBeDefined();
  });
  it('should have an authinticate method', () => {
    expect(us.auth).toBeDefined();
  });
  it('create method should add a new user', async () => {
    const res = await us.create(usr);
    usr.id = res.id;
    expect({
      firstName: res.firstname,
      lastName: res.lastname,
    }).toEqual({
      firstName: usr.firstname,
      lastName: usr.lastname,
    });
  });

  it('auth method should should return user if id and password match', async () => {
    const res = await us.auth(usr.id!, usr.password);
    expect(res).not.toBeNull();
  });
  it('auth method should should return null if id and password mismatch', async () => {
    const res = await us.auth(usr.id!, '');
    expect(res).toBeNull();
  });
  it('show method should should show a user given an id', async () => {
    const res = await us.show(usr.id!);
    expect({
      firstname: res.firstname,
      lastname: res.lastname,
    }).toEqual({
      firstname: usr.firstname,
      lastname: usr.lastname,
    });
  });
  it('index method should should show all users', async () => {
    const res = await us.index();
    expect(res.length).toBeGreaterThan(0);
  });
});
