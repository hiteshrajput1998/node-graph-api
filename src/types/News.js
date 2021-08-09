import { gql } from 'apollo-server';

const sourceField = `
    name: String
    url: String
`;

const newsField = `
    title: String
    description: String
    content: String
    url: String
    image: String
    publishedAt: String
`;

export default gql`
    type Source{
        ${sourceField}
    }
    type News{
        ${newsField}
        source: Source
    }
    type NewsDetails{
        totalArticles: Int
        articles: [News]
    }
    type Query{
        getNews: NewsDetails
    }
`;