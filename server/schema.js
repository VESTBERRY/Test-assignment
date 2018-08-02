import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLError
} from 'graphql'
import casual from 'casual'

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  description: '...',

  fields: () => {
    return {
      id: {
        type: GraphQLString,
        resolve: company => company.id,
      },
      name: {
        type: GraphQLString,
        resolve: company => company.name,
      },
      stage: {
        type: GraphQLString,
        resolve: company => company.stage,
      },
      sector: {
        type: GraphQLString,
        resolve: company => company.sector,
      },
      investmentSize: {
        type: GraphQLInt,
        resolve: company => company.investmentSize,
      },
    }
  }
})

const sectors = ['Fintech', 'IOT', 'Roboadvisory', 'Insuretech']
const stages = ['Idea', 'Prototype', 'Seed', 'Series A', 'Series B', 'Series C']
const companies = [...Array(Math.round(Math.random() * 3 + 7)).keys()]
  .map(() => ({
    id: casual.random,
    name: casual.company_name,
    stage: casual.random_element(stages),
    sector: casual.random_element(sectors),
    investmentSize: Math.round(Math.random() * 10000000)
  }))

const companyQuery = {
  type: GraphQLList(CompanyType),
  resolve: (root, args, {session, ...data}, d) =>
    companies
}

const sectorQuery = {
  type: GraphQLList(GraphQLString),
  resolve: (root, args, {session, ...data}, d) =>
    sectors
}

const stageQuery = {
  type: GraphQLList(GraphQLString),
  resolve: (root, args, {session, ...data}, d) =>
    stages
}

const query = new GraphQLObjectType({
  name: 'Query',
  description: '...',
  fields: {
    company: companyQuery,
    sector: sectorQuery,
    stage: stageQuery
  }
})

const addCompany = (obj, company) => {
  // const errors = []

  if (company.name.length <= 2) {
    // errors.push(new GraphQLError('Company name has to be longer then 2 characters'))
    throw new GraphQLError('Company name has to be longer then 2 characters')
  }
  if (stages.indexOf(company.stage) === -1) {
    // errors.push(new GraphQLError('Company stage must be in the list'))
    throw new GraphQLError('Company stage must be in the list')
  }
  if (sectors.indexOf(company.sector) === -1) {
    // errors.push(new GraphQLError('Company sector must be in the list'))
    throw new GraphQLError('Company sector must be in the list')
  }
  if (company.investmentSize < 0) {
    // errors.push(new GraphQLError('Investment size has to be positive number'))
    throw new GraphQLError('Investment size has to be positive number')
  }

  // if (errors.length < 0) {
  //   throw new GraphQLError()
  // }

  companies.push(company)

  return company
}

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: '...',
  fields: {
    addCompany: {
      type: CompanyType,
      args: {
        name: {
          type: GraphQLString,
          name: 'name',
        },
        stage: {
          type: GraphQLString,
          name: 'stage',
        },
        sector: {
          type: GraphQLString,
          name: 'sector',
        },
        investmentSize: {
          type: GraphQLInt,
          name: 'investmentSize',
        },
      },
      resolve: addCompany,
    }
  },
})

const schema = new GraphQLSchema({
  query,
  mutation
})

export default schema
