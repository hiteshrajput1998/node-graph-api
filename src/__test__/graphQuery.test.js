import { gql } from 'apollo-server';
import testClient from '../handler';
import db from '../config/db';

const { query, mutate } = testClient;

beforeEach(() => {
    db();
});

describe('GraphQuery CRUD', () => {

    it('getCollege', async () => {
        const GET_COLLEGES = gql`
            query{
                getcolleges{
                    id
                    name
                    address
                }
            }
        `;

        const device = {
            inputField: {
                name: "WW",
                address: "Ah'ed"
            }
        };

        const { data } = await query({
            mutation: GET_COLLEGES,
        });

        expect(data).toMatchSnapshot();
    });

    it('getColleges emptyObject', async () => {
        const GET_COLLEGES = gql`
            query{
                getcolleges{
                    id
                    name
                    address
                }
            }
        `;

        const { data } = await query({
            query: GET_COLLEGES
        });

        expect(data).toMatchObject({ "getcolleges": [] });
    });

    afterAll(async () => {
    });
});